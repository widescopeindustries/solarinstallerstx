'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface Installer {
  id: string
  company_name: string
  location_city: string
  location_state: string
  tier: string
  is_verified: boolean
  subscription_status: string | null
}

interface ClaimResult {
  id: string
  company_name: string
  profile_url: string
  badge_url: string
}

export default function ClaimPageClient() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('company') || '')
  const [results, setResults] = useState<Installer[]>([])
  const [selected, setSelected] = useState<Installer | null>(null)
  const [searching, setSearching] = useState(false)
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [claimed, setClaimed] = useState<ClaimResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    setSearching(true)
    try {
      const res = await fetch(`/api/claim-listing?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    } finally {
      setSearching(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300)
    return () => clearTimeout(timer)
  }, [query, search])

  useEffect(() => {
    const company = searchParams.get('company')
    if (company && company.length >= 2) search(company)
  }, [searchParams, search])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/claim-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ installerId: selected.id, ...form }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setClaimed(data.installer)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const embedCode = claimed ? `<a href="${claimed.profile_url}" target="_blank" rel="noopener">
  <img src="${claimed.badge_url}" alt="Verified Texas Solar Pro | SolarInstallersTX.com" width="200" />
</a>` : ''

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (claimed) {
    return (
      <main className="min-h-screen bg-gray-950 text-white">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">You&apos;re Verified!</h1>
            <p className="text-gray-300 text-lg">
              <span className="font-semibold text-white">{claimed.company_name}</span> is now claimed on SolarInstallersTX.com
            </p>
          </div>

          <div className="bg-gray-900 border border-yellow-500/30 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Your Badge Embed Code</h2>
            <p className="text-gray-400 text-sm mb-4">
              Paste this on your website — footer, contact page, or sidebar. It links directly to your verified profile.
            </p>
            <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400 mb-4 overflow-x-auto whitespace-pre">
              {embedCode}
            </div>
            <button
              onClick={copyEmbed}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy Embed Code'}
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-3">Badge Preview</h2>
            <a href={claimed.profile_url} target="_blank" rel="noopener noreferrer">
              <Image src="/badges/badge-verified.png" alt="Verified Texas Solar Pro" width={200} height={67} />
            </a>
          </div>

          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-300 mb-2">Want leads sent directly to you?</h2>
            <p className="text-gray-400 text-sm mb-4">
              Premium partners receive homeowner leads routed directly to their phone and email within 60 seconds of a quote request in their service area.
            </p>
            <a
              href="/upgrade-to-premium"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              See Premium Plans →
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
            🏆 Free Verification Program
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Claim Your Free<br />
            <span className="text-yellow-400">Verified Texas Solar Pro</span> Badge
          </h1>
          <p className="text-gray-400 text-lg">
            Your company is already listed. Claim it in 60 seconds and get a trust badge for your website.
          </p>
        </div>

        <div className="bg-gray-900 border border-red-500/20 rounded-xl p-5 mb-8">
          <p className="text-sm text-gray-300 leading-relaxed">
            <span className="text-red-400 font-semibold">The 30% federal solar tax credit is gone.</span> Texas homeowners are spending $30,000+ with no safety net — and they&apos;re vetting every installer before they sign. After Texas passed SB 1036 in response to widespread solar fraud, homeowners specifically filter for <span className="text-yellow-400 font-semibold">verified, trusted installers</span>. The badge tells them you&apos;re the real deal.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center text-sm flex-shrink-0">1</div>
            <h2 className="text-lg font-semibold">Find your company</h2>
          </div>

          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(null) }}
            placeholder="Start typing your company name..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
          />

          {searching && <p className="text-gray-500 text-sm mt-2">Searching...</p>}

          {results.length > 0 && !selected && (
            <div className="mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              {results.map(installer => (
                <button
                  key={installer.id}
                  onClick={() => { setSelected(installer); setResults([]) }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-0"
                >
                  <div className="font-medium text-white">{installer.company_name}</div>
                  <div className="text-sm text-gray-400">{installer.location_city}, {installer.location_state}</div>
                </button>
              ))}
            </div>
          )}

          {selected && (
            <div className="mt-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-yellow-400">{selected.company_name}</div>
                <div className="text-sm text-gray-400">{selected.location_city}, {selected.location_state}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-sm">Change</button>
            </div>
          )}
        </div>

        {selected && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center text-sm flex-shrink-0">2</div>
              <h2 className="text-lg font-semibold">Confirm your details</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">First Name *</label>
                  <input type="text" required value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                  <input type="text" value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Business Email *</label>
                <input type="email" required value={form.email} placeholder="you@yourcompany.com"
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone (optional)</label>
                <input type="tel" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">{error}</div>
            )}

            <button type="submit" disabled={submitting}
              className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg text-lg transition-colors">
              {submitting ? 'Claiming...' : 'Claim My Badge & Get Embed Code →'}
            </button>
            <p className="text-center text-gray-600 text-xs mt-3">No cost. No contracts. Unsubscribe anytime.</p>
          </form>
        )}

        {!selected && (
          <div className="border-t border-gray-800 pt-8 mt-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">What you get</h3>
            <div className="space-y-3">
              {([
                ['🏆', 'Verified badge for your website', "Link back to your profile — homeowners see you're legit"],
                ['📈', 'Priority in search results', 'Verified installers rank above unverified listings'],
                ['📊', 'Monthly profile view reports', 'See how many homeowners are finding you'],
              ] as [string, string, string][]).map(([icon, title, desc]) => (
                <div key={title} className="flex gap-3 bg-gray-900 rounded-lg p-4">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-medium text-white">{title}</div>
                    <div className="text-sm text-gray-400">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
