'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile, Company } from '@/lib/types/database'

interface ProfileFormProps {
  profile: Profile | null
  userId: string
  allCompanies: Company[]
  currentCompanies: Company[]
}

export default function ProfileForm({
  profile,
  userId,
  allCompanies,
  currentCompanies,
}: ProfileFormProps) {
  const [firstName, setFirstName] = useState(profile?.first_name || '')
  const [lastName, setLastName] = useState(profile?.last_name || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [city, setCity] = useState(profile?.city || '')
  const [state, setState] = useState(profile?.state || '')
  const [zipCode, setZipCode] = useState(profile?.zip_code || '')
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState(
    profile?.personal_website_url || ''
  )
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<number[]>(
    currentCompanies.map((c) => c.id)
  )
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  )

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          bio,
          city,
          state,
          zip_code: zipCode,
          personal_website_url: personalWebsiteUrl,
        })
        .eq('id', userId)

      if (profileError) throw profileError

      // Update rep_companies
      // First, delete existing relationships
      await supabase.from('rep_companies').delete().eq('rep_id', userId)

      // Then insert new ones
      if (selectedCompanyIds.length > 0) {
        const { error: companiesError } = await supabase.from('rep_companies').insert(
          selectedCompanyIds.map((companyId) => ({
            rep_id: userId,
            company_id: companyId,
          }))
        )

        if (companiesError) throw companiesError
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' })

      // Refresh the page to show updated data
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCompanyToggle = (companyId: number) => {
    setSelectedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="label">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="label">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="label">
          About Me
        </label>
        <textarea
          id="bio"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="input"
          placeholder="Tell customers about yourself and your experience..."
        />
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="city" className="label">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="state" className="label">
            State (2-letter code)
          </label>
          <input
            type="text"
            id="state"
            maxLength={2}
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
            className="input"
            placeholder="TX"
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="label">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            maxLength={5}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="input"
            placeholder="75001"
          />
        </div>
      </div>

      {/* Personal Website URL */}
      <div>
        <label htmlFor="personalWebsiteUrl" className="label">
          Your Sales Website
        </label>
        <input
          type="url"
          id="personalWebsiteUrl"
          value={personalWebsiteUrl}
          onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
          className="input"
          placeholder="https://www.marykay.com/yourusername"
        />
        <p className="mt-1 text-sm text-gray-500">
          Link to your official sales page (e.g., Mary Kay, Pampered Chef site)
        </p>
      </div>

      {/* Companies */}
      <div>
        <label className="label">Companies You Represent</label>
        <div className="mt-2 max-h-64 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-4">
          {allCompanies.map((company) => (
            <label
              key={company.id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={selectedCompanyIds.includes(company.id)}
                onChange={() => handleCompanyToggle(company.id)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">{company.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" disabled={isSaving} className="btn btn-primary">
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
