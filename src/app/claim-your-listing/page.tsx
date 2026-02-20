import { Suspense } from 'react'
import ClaimPageClient from './ClaimPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claim Your Free Verified Badge | Solar Installers TX',
  description: 'Texas solar installers: claim your free Verified Texas Solar Pro badge and get a trust signal that converts homeowners. 60 seconds to claim.',
  alternates: { canonical: 'https://solarinstallerstx.com/claim-your-listing' },
}

export default function ClaimYourListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <ClaimPageClient />
    </Suspense>
  )
}
