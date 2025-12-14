import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Award, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Safety Score System Explained | 100-Point Installer Rating',
  description: 'Learn how our 100-point Safety Score System evaluates solar installers across 16 data points in 4 categories to protect Texas homeowners.',
  keywords: ['solar safety score', 'installer rating system', 'nabcep certification', 'solar installer review'],
  openGraph: {
    title: 'Safety Score System Explained | Solar Installers TX',
    description: 'Learn how our 100-point Safety Score System evaluates solar installers across 16 data points in 4 categories.',
    type: 'article',
    url: 'https://solarinstallerstx.com/safety-score-explained',
    images: [
      {
        url: 'https://solarinstallerstx.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Safety Score System - 100-Point Solar Installer Rating',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safety Score System Explained | Solar Installers TX',
    description: 'Learn how our 100-point Safety Score System evaluates solar installers.',
    images: ['https://solarinstallerstx.com/opengraph-image'],
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/safety-score-explained',
  },
}

export default function SafetyScoreExplainedPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Safety Score System Explained</h1>
          <p className="text-xl text-muted-foreground">
            Our 100-point scoring system helps you find the most qualified, trustworthy solar installers in Texas
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We automatically evaluate every solar installer across 16 critical data points in 4 categories. The total score (0-100) determines their tier ranking.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Gold Tier</h3>
                <p className="text-sm">85-100 points</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-200 to-gray-300 border-gray-400">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Silver Tier</h3>
                <p className="text-sm">70-84 points</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Bronze Tier</h3>
                <p className="text-sm">60-69 points</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Unranked</h3>
                <p className="text-sm">&lt;60 points</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-bold mb-4">1. Financial Stability (30 points)</h3>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Insurance Coverage (10 pts):</strong> Active general liability insurance
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Bonding Status (10 pts):</strong> Bonded business license
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Bankruptcy History (10 pts):</strong> No bankruptcy records
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">2. Professional Credentials (25 points)</h3>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>NABCEP Certification (15 pts):</strong> North American Board of Certified Energy Practitioners
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>State License (5 pts):</strong> Valid solar/electrical license in Texas
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Master Electrician (5 pts):</strong> Additional master electrician qualification
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">3. Customer Protection (25 points)</h3>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Warranty Details (10 pts):</strong> Equipment and workmanship warranties in place
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>BBB Rating (10 pts):</strong> A+ (10 pts), A (8 pts), B (5 pts)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Complaint History (5 pts):</strong> No unresolved complaints
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">4. Track Record (20 points)</h3>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Years in Business (10 pts):</strong> 10+ years (10 pts), 5-10 years (5 pts)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Installations Completed (5 pts):</strong> 1000+ installations
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Customer Ratings (5 pts):</strong> Average rating 4.5+ stars
                </div>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-primary/10 border-l-4 border-primary p-6 rounded">
          <h3 className="text-xl font-semibold mb-3">Why This Matters</h3>
          <p className="mb-4">
            The Safety Score System protects Texas homeowners from:
          </p>
          <ul className="space-y-2">
            <li>• Unqualified or unlicensed installers</li>
            <li>• Companies with bankruptcy or complaint history</li>
            <li>• Inadequate insurance or warranty coverage</li>
            <li>• New or inexperienced installation companies</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/installers">Browse Certified Installers</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
