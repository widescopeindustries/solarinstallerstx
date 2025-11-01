'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSearch() {
  const router = useRouter()
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (company) params.set('company', company.toLowerCase().replace(/\s+/g, '-'))
    if (location) params.set('location', location)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Company Input */}
        <div className="flex-1">
          <label htmlFor="company" className="sr-only">
            Company
          </label>
          <input
            type="text"
            id="company"
            placeholder="Company (e.g., Mary Kay, Pampered Chef)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input"
          />
        </div>

        {/* Location Input */}
        <div className="flex-1">
          <label htmlFor="location" className="sr-only">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="City, State or ZIP Code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary md:w-auto w-full">
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </button>
      </div>
    </form>
  )
}
