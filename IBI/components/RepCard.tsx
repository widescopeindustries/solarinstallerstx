import Link from 'next/link'
import Image from 'next/image'
import { ProfileWithCompanies } from '@/lib/types/database'

interface RepCardProps {
  rep: ProfileWithCompanies
}

export default function RepCard({ rep }: RepCardProps) {
  const fullName = `${rep.first_name || ''} ${rep.last_name || ''}`.trim()
  const location = [rep.city, rep.state].filter(Boolean).join(', ')

  return (
    <Link href={`/rep/${rep.id}`} className="card group">
      <div className="flex items-start gap-4">
        {/* Profile Picture */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
          {rep.profile_picture_url ? (
            <Image
              src={rep.profile_picture_url}
              alt={fullName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary-100 text-lg font-semibold text-primary-600">
              {rep.first_name?.[0]}
              {rep.last_name?.[0]}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {fullName}
            </h3>
            {rep.is_pro_subscriber && (
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                PRO
              </span>
            )}
          </div>

          {location && (
            <p className="mt-1 text-sm text-gray-600">{location}</p>
          )}

          {/* Companies */}
          {rep.companies && rep.companies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {rep.companies.slice(0, 3).map((company) => (
                <span
                  key={company.id}
                  className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                >
                  {company.name}
                </span>
              ))}
              {rep.companies.length > 3 && (
                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                  +{rep.companies.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Rating */}
          {rep.average_rating && (
            <div className="mt-2 flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-4 w-4 ${
                      star <= rep.average_rating!
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
              <span className="text-xs text-gray-600">
                ({rep.reviews?.length || 0})
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
