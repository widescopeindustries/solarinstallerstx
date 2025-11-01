import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export default async function CompaniesPage() {
  const supabase = await createClient()

  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .order('name')

  // Group by category
  const groupedByCategory = (companies || []).reduce((acc: any, company) => {
    const category = company.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(company)
    return acc
  }, {})

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Companies</h1>
          <p className="mt-2 text-gray-600">
            Find representatives from your favorite direct sales companies
          </p>
        </div>

        {Object.entries(groupedByCategory).map(([category, categoryCompanies]: [string, any]) => (
          <div key={category} className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">{category}</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {categoryCompanies.map((company: any) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.slug}`}
                  className="card group"
                >
                  {company.logo_url && (
                    <div className="relative h-24 w-full">
                      <Image
                        src={company.logo_url}
                        alt={company.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="mt-4 text-center font-medium text-gray-900 group-hover:text-primary-600">
                    {company.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
