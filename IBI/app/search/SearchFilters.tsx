'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Company } from '@/lib/types/database'

interface SearchFiltersProps {
  companies: Company[]
  currentCompany?: string
  currentLocation?: string
}

export default function SearchFilters({
  companies,
  currentCompany,
  currentLocation,
}: SearchFiltersProps) {
  const router = useRouter()
  const [selectedCompany, setSelectedCompany] = useState(currentCompany || '')
  const [location, setLocation] = useState(currentLocation || '')

  const handleApplyFilters = () => {
    const params = new URLSearchParams()
    if (selectedCompany) params.set('company', selectedCompany)
    if (location) params.set('location', location)

    router.push(`/search?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setSelectedCompany('')
    setLocation('')
    router.push('/search')
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

      {/* Company Filter */}
      <div className="mt-6">
        <label htmlFor="company-filter" className="label">
          Company
        </label>
        <select
          id="company-filter"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="input"
        >
          <option value="">All Companies</option>
          {companies.map((company) => (
            <option key={company.id} value={company.slug}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="mt-4">
        <label htmlFor="location-filter" className="label">
          Location
        </label>
        <input
          type="text"
          id="location-filter"
          placeholder="City, State or ZIP"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-2">
        <button onClick={handleApplyFilters} className="btn btn-primary w-full">
          Apply Filters
        </button>
        <button onClick={handleClearFilters} className="btn btn-secondary w-full">
          Clear All
        </button>
      </div>
    </div>
  )
}
