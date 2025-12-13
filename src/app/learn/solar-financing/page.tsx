import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Financing Options in Texas | Loans, Leases & PPAs',
  description: 'Explore solar financing options including loans, leases, and power purchase agreements. Compare costs, benefits, and find the best option for your budget.',
  keywords: ['solar financing', 'solar loans', 'solar lease', 'solar PPA', 'cash vs loan solar'],
  openGraph: {
    title: 'Solar Financing Options in Texas | Solar Installers TX',
    description: 'Complete guide to solar loans, leases, and PPAs for Texas homeowners.',
    type: 'article',
    url: 'https://solarinstallerstx.com/learn/solar-financing',
    images: [{ url: '/opengraph-image.svg', width: 1200, height: 630, alt: 'Solar Financing Options in Texas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Financing Options in Texas',
    description: 'Complete guide to solar loans, leases, and PPAs for Texas homeowners.',
    images: ['/opengraph-image.svg'],
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/learn/solar-financing',
  },
}

export const revalidate = 86400

export default function SolarFinancingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">Solar Financing Options in Texas</h1>
          <p className="text-xl text-blue-100">Compare loans, leases, and PPAs to find the best financing for your solar project</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Cash Purchase</h3>
            <p className="text-sm text-gray-600">Best ROI</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Solar Loan</h3>
            <p className="text-sm text-gray-600">Own the system</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Solar Lease</h3>
            <p className="text-sm text-gray-600">$0 down</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">PPA</h3>
            <p className="text-sm text-gray-600">Pay per kWh</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Cash Purchase</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-600 mb-3">Advantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ Lowest total cost (no interest)</li>
                  <li>✓ Fastest payback period (6-9 years)</li>
                  <li>✓ Maximum 25-year savings ($40,000-$60,000)</li>
                  <li>✓ Qualify for all incentives and tax credits</li>
                  <li>✓ No monthly payments</li>
                  <li>✓ Increases home value immediately</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-3">Disadvantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Requires $15,000-$30,000 upfront</li>
                  <li>• Ties up liquid capital</li>
                  <li>• May have better investment opportunities</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-green-50 p-4 rounded">
              <p className="font-medium mb-2">Example Savings (25 years):</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>System Cost:</span>
                  <span>$25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Federal Tax Credit (30%):</span>
                  <span className="text-green-600">-$7,500</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Net Cost:</span>
                  <span>$17,500</span>
                </div>
                <div className="flex justify-between text-green-600 font-bold">
                  <span>25-Year Savings:</span>
                  <span>$45,000+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Solar Loan</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-600 mb-3">Advantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ $0-$1,000 down payment</li>
                  <li>✓ You own the system and equipment</li>
                  <li>✓ Keep all tax credits and incentives</li>
                  <li>✓ Monthly payment often less than electric bill</li>
                  <li>✓ Increases home value</li>
                  <li>✓ Various term lengths (10-25 years)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-3">Disadvantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Interest increases total cost by 30-40%</li>
                  <li>• Longer payback period (12-16 years)</li>
                  <li>• Monthly loan obligation</li>
                  <li>• Credit check required</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded">
              <p className="font-medium mb-2">Typical Loan Terms:</p>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Interest Rates:</strong> 3.99% - 8.99% (depends on credit)</li>
                <li>• <strong>Loan Term:</strong> 10, 15, 20, or 25 years</li>
                <li>• <strong>Monthly Payment (20-year, $25k):</strong> $150-$190/month</li>
                <li>• <strong>Total Cost:</strong> $30,000-$38,000 over loan life</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Solar Lease</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-600 mb-3">Advantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ $0 upfront cost</li>
                  <li>✓ No maintenance responsibility</li>
                  <li>✓ Predictable monthly payments</li>
                  <li>✓ No credit check (in most cases)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-3">Disadvantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• You don&apos;t own the system</li>
                  <li>• Leasing company keeps all tax credits</li>
                  <li>• Complicates home sale (buyer must qualify)</li>
                  <li>• Lower long-term savings (50% less than ownership)</li>
                  <li>• Annual payment escalator (2-3% increases)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded">
              <p className="font-medium mb-2">⚠️ Important Note:</p>
              <p className="text-sm">
                Solar leases are becoming less common in Texas as loan options have improved. Most financial advisors recommend ownership (cash or loan) over leasing for better long-term value.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Power Purchase Agreement (PPA)</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-600 mb-3">Advantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ $0 upfront cost</li>
                  <li>✓ Pay only for power produced</li>
                  <li>✓ Rate typically lower than utility</li>
                  <li>✓ No maintenance responsibility</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-3">Disadvantages:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Don&apos;t own the system</li>
                  <li>• PPA company keeps all incentives</li>
                  <li>• Annual rate escalator (1.5-3%)</li>
                  <li>• Complicates home sale</li>
                  <li>• Lower savings than ownership</li>
                  <li>• <strong>Not available in Texas due to regulations</strong></li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-red-50 p-4 rounded border-l-4 border-red-500">
              <p className="font-medium mb-2">❌ Texas Restriction:</p>
              <p className="text-sm">
                PPAs are generally not available in Texas for residential customers due to state regulations around retail electricity sales. Texas homeowners should focus on cash purchase or solar loans.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Comparison: Which Option Saves the Most?</h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Option</th>
                  <th className="px-4 py-3 text-left">Upfront Cost</th>
                  <th className="px-4 py-3 text-left">25-Yr Savings</th>
                  <th className="px-4 py-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t bg-green-50">
                  <td className="px-4 py-3 font-medium">Cash Purchase</td>
                  <td className="px-4 py-3">$17,500</td>
                  <td className="px-4 py-3 text-green-600 font-bold">$45,000+</td>
                  <td className="px-4 py-3">Maximum savings</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Solar Loan</td>
                  <td className="px-4 py-3">$0-$1,000</td>
                  <td className="px-4 py-3 font-bold">$30,000-$35,000</td>
                  <td className="px-4 py-3">Own with $0 down</td>
                </tr>
                <tr className="border-t bg-yellow-50">
                  <td className="px-4 py-3 font-medium">Solar Lease</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">$15,000-$20,000</td>
                  <td className="px-4 py-3">No credit/budget concerns</td>
                </tr>
                <tr className="border-t bg-red-50">
                  <td className="px-4 py-3 font-medium">PPA</td>
                  <td className="px-4 py-3">$0</td>
                  <td className="px-4 py-3">N/A</td>
                  <td className="px-4 py-3">Not available in TX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3">Our Recommendation for Texas Homeowners</h3>
          <p className="mb-4">
            Based on long-term value and available incentives:
          </p>
          <ol className="space-y-2">
            <li><strong>1st Choice:</strong> Cash purchase (if affordable) - Maximum savings and fastest ROI</li>
            <li><strong>2nd Choice:</strong> Solar loan - Own the system with no money down, still get tax credits</li>
            <li><strong>3rd Choice:</strong> Solar lease - Only if ownership isn&apos;t feasible</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 my-8">
          <Link href="/quote" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-8 hover:bg-primary/90">
            Get Financing Quotes
          </Link>
          <Link href="/installers" className="inline-flex items-center justify-center rounded-md border border-input bg-background h-11 px-8 hover:bg-accent">
            Browse TX Installers
          </Link>
        </div>
      </div>
    </div>
  )
}
