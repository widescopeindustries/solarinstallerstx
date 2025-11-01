import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import SubmitReviewForm from './SubmitReviewForm'

interface RepProfilePageProps {
  params: Promise<{
    profileId: string
  }>
}

export default async function RepProfilePage({ params }: RepProfilePageProps) {
  const { profileId } = await params
  const supabase = await createClient()

  // Fetch rep profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`
      *,
      rep_companies(
        company:companies(*)
      ),
      reviews(*)
    `)
    .eq('id', profileId)
    .single()

  if (error || !profile) {
    notFound()
  }

  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
  const location = [profile.city, profile.state, profile.zip_code]
    .filter(Boolean)
    .join(', ')

  const companies = profile.rep_companies?.map((rc: any) => rc.company).filter(Boolean) || []
  const approvedReviews = profile.reviews?.filter((r: any) => r.is_approved) || []
  const averageRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
        approvedReviews.length
      : null

  return (
    <div className="py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="card">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* Profile Picture */}
            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
              {profile.profile_picture_url ? (
                <Image
                  src={profile.profile_picture_url}
                  alt={fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary-100 text-4xl font-semibold text-primary-600">
                  {profile.first_name?.[0]}
                  {profile.last_name?.[0]}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                  {location && <p className="mt-1 text-gray-600">{location}</p>}

                  {/* Rating */}
                  {averageRating && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-5 w-5 ${
                              star <= averageRating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {averageRating.toFixed(1)} ({approvedReviews.length} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {profile.is_pro_subscriber && (
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                    PRO MEMBER
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {profile.personal_website_url && (
                  <a
                    href={profile.personal_website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Shop My Site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Companies */}
        {companies.length > 0 && (
          <div className="card mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Companies</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {companies.map((company: any) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 transition-shadow hover:shadow-md"
                >
                  {company.logo_url && (
                    <div className="relative h-8 w-16">
                      <Image
                        src={company.logo_url}
                        alt={company.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium">{company.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* About Me */}
        {profile.bio && (
          <div className="card mt-6">
            <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
            <p className="mt-4 whitespace-pre-line text-gray-700">{profile.bio}</p>
          </div>
        )}

        {/* Reviews */}
        <div className="card mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Customer Reviews ({approvedReviews.length})
          </h2>

          {/* Reviews List */}
          {approvedReviews.length > 0 ? (
            <div className="mt-6 space-y-6">
              {approvedReviews.map((review: any) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{review.reviewer_name}</p>
                      <div className="mt-1 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {review.comment && (
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">No reviews yet. Be the first to review!</p>
          )}

          {/* Submit Review Form */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
            <SubmitReviewForm repId={profileId} />
          </div>
        </div>
      </div>
    </div>
  )
}
