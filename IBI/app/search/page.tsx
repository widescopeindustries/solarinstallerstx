import { createClient } from '@/lib/supabase/server'
import RepCard from '@/components/RepCard'
import type { ProfileWithCompanies } from '@/lib/types/database'
import SearchFilters from './SearchFilters'

interface SearchPageProps {
  searchParams: Promise<{
    company?: string
    location?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query
  let query = supabase
    .from('profiles')
    .select(`
      *,
      companies:rep_companies(
        company:companies(*)
      ),
      reviews(rating)
    `)

  // Filter by company slug if provided
  if (params.company) {
    const { data: company } = await supabase
      .from('companies')
      .select('id')
      .eq('slug', params.company)
      .single()

    if (company) {
      // Get rep IDs that sell for this company
      const { data: repCompanies } = await supabase
        .from('rep_companies')
        .select('rep_id')
        .eq('company_id', company.id)

      if (repCompanies) {
        const repIds = repCompanies.map((rc) => rc.rep_id)
        query = query.in('id', repIds)
      }
    }
  }

  // Filter by location if provided
  if (params.location) {
    const location = params.location.toLowerCase()
    // Try to match city, state, or zip
    query = query.or(
      `city.ilike.%${location}%,state.ilike.%${location}%,zip_code.ilike.%${location}%`
    )
  }

  // Order by pro status first, then created date
  query = query.order('is_pro_subscriber', { ascending: false })
  query = query.order('created_at', { ascending: false })

  const { data: profiles, error } = await query

  // Transform data for RepCard
  const reps: ProfileWithCompanies[] = (profiles || []).map((profile) => {
    const companies = profile.companies?.map((rc: any) => rc.company).filter(Boolean) || []
    const reviews = profile.reviews || []
    const average_rating =
      reviews.length > 0
        ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
        : undefined

    return {
      ...profile,
      companies,
      reviews,
      average_rating,
    }
  })

  // Get all companies for filter
  const { data: allCompanies } = await supabase
    .from('companies')
    .select('*')
    .order('name')

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Representative</h1>
          {(params.company || params.location) && (
            <p className="mt-2 text-gray-600">
              Showing {reps.length} {reps.length === 1 ? 'rep' : 'reps'}
              {params.company && ` for ${params.company.replace(/-/g, ' ')}`}
              {params.location && ` near ${params.location}`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <SearchFilters
              companies={allCompanies || []}
              currentCompany={params.company}
              currentLocation={params.location}
            />
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            {reps.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No representatives found
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Try adjusting your search filters or browse all reps
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {reps.map((rep) => (
                  <RepCard key={rep.id} rep={rep} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
