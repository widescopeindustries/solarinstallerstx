import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Battery } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Battery Storage Systems for Texas Homes | Solar Guide',
  description: 'Learn about solar battery options for energy independence and backup power. Compare Tesla Powerwall, LG Chem, and other battery storage systems.',
  keywords: ['solar battery storage', 'tesla powerwall', 'solar backup power', 'energy storage texas', 'solar batteries'],
  openGraph: {
    title: 'Battery Storage Systems for Texas Homes | Solar Installers TX',
    description: 'Complete guide to solar battery options for energy independence and backup power.',
    type: 'article',
    url: 'https://solarinstallerstx.com/learn/battery-storage',
    images: [{ url: '/opengraph-image.svg', width: 1200, height: 630, alt: 'Battery Storage Systems for Texas Homes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Battery Storage Systems for Texas Homes',
    description: 'Complete guide to solar battery options for energy independence and backup power.',
    images: ['/opengraph-image.svg'],
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/learn/battery-storage',
  },
}

export const revalidate = 86400

export default function BatteryStoragePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">Battery Storage Systems for Texas Homes</h1>
          <p className="text-xl text-blue-100">Your guide to solar battery options for energy independence and backup power</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Battery className="h-5 w-5 mr-2 text-blue-600" />
            Why Battery Storage Matters in Texas
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Protection during ERCOT grid outages (Winter Storm Uri, summer blackouts)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Energy independence and self-sufficiency</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Time-of-use rate optimization</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Federal tax credit covers 30% of battery cost when paired with solar</span>
            </li>
          </ul>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Battery Systems for Texas</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Tesla Powerwall 3</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Specifications:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Capacity: 13.5 kWh</li>
                    <li>• Continuous Power: 11.5 kW</li>
                    <li>• Warranty: 10 years</li>
                    <li>• Cost: $11,500-$14,000 installed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best For:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Whole-home backup</li>
                    <li>✓ Sleek integration with solar</li>
                    <li>✓ Advanced app control</li>
                    <li>✓ Industry-leading brand</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">LG Chem RESU</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Specifications:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Capacity: 9.8-16 kWh options</li>
                    <li>• Continuous Power: 5-7 kW</li>
                    <li>• Warranty: 10 years</li>
                    <li>• Cost: $8,000-$12,000 installed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best For:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Budget-conscious buyers</li>
                    <li>✓ Compact installation</li>
                    <li>✓ Proven reliability</li>
                    <li>✓ Multiple size options</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Enphase IQ Battery</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Specifications:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Capacity: 3.36 kWh per unit (modular)</li>
                    <li>• Continuous Power: 1.28 kW per unit</li>
                    <li>• Warranty: 10-15 years</li>
                    <li>• Cost: $6,000+ per unit installed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best For:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Modular scalability</li>
                    <li>✓ Enphase microinverter systems</li>
                    <li>✓ Easy expansion over time</li>
                    <li>✓ Safe chemistry (LFP)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sizing Your Battery System</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">How Much Storage Do You Need?</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold">Essential Backup (1-2 days):</p>
                <p className="text-sm">10-13.5 kWh - Covers critical loads (fridge, lights, internet, medical devices)</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">Partial Home Backup (2-3 days):</p>
                <p className="text-sm">20-27 kWh - Essential loads plus AC/heating, major appliances</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold">Whole Home Backup (3+ days):</p>
                <p className="text-sm">30-40+ kWh - Full home power including all HVAC, appliances, EV charging</p>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded">
              <p className="font-medium mb-2">Texas Consideration:</p>
              <p className="text-sm">
                After Winter Storm Uri 2021, many Texas homeowners opt for 20+ kWh to ensure 3+ days of backup power during extended outages.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost & Incentives</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Battery Cost Breakdown</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span>Battery System Cost:</span>
                <span className="font-bold">$10,000 - $20,000</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Installation Labor:</span>
                <span className="font-bold">$2,000 - $4,000</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Electrical Upgrades:</span>
                <span className="font-bold">$1,000 - $3,000</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2 text-lg">
                <span className="font-semibold">Total Cost:</span>
                <span className="font-bold">$13,000 - $27,000</span>
              </div>
              <div className="flex justify-between items-center text-green-600 text-lg">
                <span className="font-semibold">After 30% Federal Tax Credit:</span>
                <span className="font-bold">$9,100 - $18,900</span>
              </div>
            </div>

            <div className="mt-6 bg-green-50 p-4 rounded">
              <p className="font-medium mb-2">💡 Tax Credit Tip:</p>
              <p className="text-sm">
                Battery storage qualifies for the 30% federal solar tax credit when installed with a solar system. Standalone batteries (not paired with solar) do not qualify for the credit under current law.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3">Is Battery Storage Worth It in Texas?</h3>
          <p className="mb-4">
            Given Texas&apos;s independent ERCOT grid and history of weather-related outages, battery storage offers:
          </p>
          <ul className="space-y-2">
            <li>✓ Peace of mind during grid emergencies</li>
            <li>✓ Protection for medical equipment and essential appliances</li>
            <li>✓ Potential savings with time-of-use electricity rates</li>
            <li>✓ Increased home value and energy independence</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 my-8">
          <Link href="/quote" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-8 hover:bg-primary/90">
            Get Battery Storage Quotes
          </Link>
          <Link href="/installers" className="inline-flex items-center justify-center rounded-md border border-input bg-background h-11 px-8 hover:bg-accent">
            Find Solar + Storage Installers
          </Link>
        </div>
      </div>
    </div>
  )
}
