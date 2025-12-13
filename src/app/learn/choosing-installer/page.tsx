import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Award, FileText, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Choose the Best Solar Installer in Texas | Guide',
  description: 'Learn how to choose the best solar installer in Texas. Complete guide covering certifications, red flags, questions to ask, and what to look for.',
  keywords: ['choose solar installer', 'NABCEP certification', 'solar installer reviews', 'texas solar companies', 'best solar installer'],
  openGraph: {
    title: 'How to Choose the Best Solar Installer in Texas | Solar Installers TX',
    description: 'Your complete guide to finding a qualified, trustworthy solar installer in Texas.',
    type: 'article',
    url: 'https://solarinstallerstx.com/learn/choosing-installer',
    images: [{ url: '/opengraph-image.svg', width: 1200, height: 630, alt: 'How to Choose the Best Solar Installer in Texas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Choose the Best Solar Installer in Texas',
    description: 'Your complete guide to finding a qualified, trustworthy solar installer in Texas.',
    images: ['/opengraph-image.svg'],
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/learn/choosing-installer',
  },
}

export const revalidate = 86400

export default function ChoosingInstallerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">How to Choose the Best Solar Installer</h1>
          <p className="text-xl text-blue-100">Your complete guide to finding a qualified, trustworthy solar installer in Texas</p>
          <div className="mt-6 flex items-center text-sm text-blue-100">
            <Search className="h-4 w-4 mr-2" />
            <span>6 min read • Essential Guide</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
            What Makes a Great Solar Installer
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>NABCEP certification and proper state licensing</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Strong local reputation with verified customer reviews</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Comprehensive warranties on equipment and workmanship</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Transparent pricing with detailed written quotes</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Local presence and post-installation support</span>
            </li>
          </ul>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Your Installer Choice Matters</h2>

          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Choosing the right solar installer is one of the most important decisions you&apos;ll make in your solar journey.
              A quality installer ensures:
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold mb-2">Safe Installation</h3>
                <p className="text-sm">Proper electrical work and roof mounting that protects your home and family</p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md">
                <Award className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Maximum Performance</h3>
                <p className="text-sm">Optimal system design that maximizes energy production and savings</p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md">
                <FileText className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">Long-Term Support</h3>
                <p className="text-sm">Reliable warranty service and ongoing maintenance when you need it</p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
              <p className="font-medium text-gray-900 mb-2">⚠️ The Cost of a Bad Installer:</p>
              <p className="text-gray-700">
                Poor installation can lead to roof leaks, electrical fires, underperforming systems, voided warranties,
                and companies that disappear when you need service. The cheapest quote often becomes the most expensive mistake.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Essential Certifications & Licenses</h2>
              <p className="text-gray-600">Non-negotiable credentials to verify</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold mt-6 mb-3">1. NABCEP Certification</h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4">
                <strong>NABCEP (North American Board of Certified Energy Practitioners)</strong> is the gold standard
                for solar installer certification. It demonstrates:
              </p>
              <ul className="space-y-2 ml-4">
                <li>✓ Rigorous testing on solar design, installation, and safety</li>
                <li>✓ Continuing education requirements to stay current</li>
                <li>✓ Commitment to industry best practices</li>
                <li>✓ Proven technical knowledge and experience</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">2. Texas State Licenses</h3>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4">Required licenses for solar installation in Texas:</p>
              <ul className="space-y-3">
                <li>
                  <strong>Electrical Contractor License:</strong> Required for all electrical work. Verify through the
                  Texas Department of Licensing and Regulation (TDLR).
                </li>
                <li>
                  <strong>Master Electrician:</strong> Must be on staff for all electrical installations.
                </li>
                <li>
                  <strong>Roofing Contractor License:</strong> If installer performs roofing work or roof penetrations.
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Red Flags to Avoid</h3>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <ul className="space-y-2">
                <li>❌ High-pressure sales tactics or &quot;today only&quot; pricing</li>
                <li>❌ No NABCEP certification or proper licensing</li>
                <li>❌ Requests for full payment upfront</li>
                <li>❌ No physical business address</li>
                <li>❌ Can&apos;t provide local references</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 my-8">
          <Link href="/installers" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-8 hover:bg-primary/90">
            Find Certified Installers
          </Link>
          <Link href="/safety-score-explained" className="inline-flex items-center justify-center rounded-md border border-input bg-background h-11 px-8 hover:bg-accent">
            Learn About Safety Scores
          </Link>
        </div>
      </div>
    </div>
  )
}
