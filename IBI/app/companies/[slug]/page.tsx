import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import RepCard from '@/components/RepCard'
import type { ProfileWithCompanies } from '@/lib/types/database'

interface CompanyPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch company
  const { data: company, error } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !company) {
    notFound()
  }

  // Fetch all reps for this company
  const { data: repCompanies } = await supabase
    .from('rep_companies')
    .select(`
      rep_id,
      profiles (
        *,
        rep_companies (
          company:companies(*)
        ),
        reviews(rating)
      )
    `)
    .eq('company_id', company.id)

  // Transform data for RepCard
  const reps: ProfileWithCompanies[] = (repCompanies || [])
    .map((rc: any) => rc.profiles)
    .filter(Boolean)
    .map((profile: any) => {
      const companies = profile.rep_companies?.map((rc: any) => rc.company).filter(Boolean) || []
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
    // Sort pro subscribers first
    .sort((a: any, b: any) => {
      if (a.is_pro_subscriber && !b.is_pro_subscriber) return -1
      if (!a.is_pro_subscriber && b.is_pro_subscriber) return 1
      return 0
    })

  return (
    <div className="py-8">
      <div className="container">
        {/* Company Header */}
        <div className="card">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {company.logo_url && (
              <div className="relative h-32 w-64 flex-shrink-0">
                <Image
                  src={company.logo_url}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              {company.category && (
                <p className="mt-2 text-sm font-medium text-primary-600">
                  {company.category}
                </p>
              )}
              {company.description && (
                <p className="mt-4 text-gray-700">{company.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Representatives */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {company.name} Representatives ({reps.length})
          </h2>
          <p className="mt-2 text-gray-600">
            Find a trusted representative near you
          </p>

          {reps.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reps.map((rep) => (
                <RepCard key={rep.id} rep={rep} />
              ))}
            </div>
          ) : (
            <div className="mt-6 text-center py-12">
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
                No representatives yet
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Be the first to join as a {company.name} representative!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
