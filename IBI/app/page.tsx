import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import HeroSearch from '@/components/HeroSearch'
import RepCard from '@/components/RepCard'
import type { ProfileWithCompanies } from '@/lib/types/database'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured companies
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .limit(8)

  // Fetch featured pro reps
  const { data: profiles } = await supabase
    .from('profiles')
    .select(`
      *,
      companies:rep_companies(
        company:companies(*)
      ),
      reviews(rating)
    `)
    .eq('is_pro_subscriber', true)
    .limit(6)

  // Transform data for RepCard
  const featuredReps: ProfileWithCompanies[] = (profiles || []).map((profile) => {
    const companies = profile.companies?.map((rc: any) => rc.company) || []
    const reviews = profile.reviews || []
    const average_rating = reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : undefined

    return {
      ...profile,
      companies,
      reviews,
      average_rating,
    }
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Find a Direct Sales Rep{' '}
              <span className="text-primary-600">Near You</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Connect with trusted representatives from Mary Kay, Pampered Chef,
              Avon, and hundreds of other direct sales companies.
            </p>

            {/* Search Component */}
            <div className="mt-10">
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Popular Companies
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Find representatives from these trusted brands
          </p>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
            {companies?.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.slug}`}
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                {company.logo_url && (
                  <div className="relative h-16 w-full">
                    <Image
                      src={company.logo_url}
                      alt={company.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="mt-4 text-center text-sm font-medium text-gray-900">
                  {company.name}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/companies"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View all companies →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Reps */}
      {featuredReps.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Featured Representatives
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Connect with our premium members
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredReps.map((rep) => (
                <RepCard key={rep.id} rep={rep} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/search" className="btn btn-primary">
                Browse All Representatives
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl bg-primary-600 px-6 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold text-white">
              Are you a Direct Sales Representative?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Join our directory and connect with customers in your area
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/signup" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Join Now
              </Link>
              <Link href="/auth/login" className="btn btn-outline border-white text-white hover:bg-primary-700">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
