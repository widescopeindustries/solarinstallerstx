import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Panel Types: Monocrystalline vs Polycrystalline | Guide',
  description: 'Compare different solar panel technologies to find the best option for your home. Learn about monocrystalline, polycrystalline, and thin-film solar panels.',
  keywords: ['solar panel types', 'monocrystalline', 'polycrystalline', 'solar panel comparison', 'best solar panels'],
  openGraph: {
    title: 'Solar Panel Types: Complete Comparison Guide',
    description: 'Compare different solar panel technologies to find the best option for your Texas home',
    type: 'article',
  },
}

export const revalidate = 86400

export default function SolarPanelTypesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">Solar Panel Types: Complete Comparison Guide</h1>
          <p className="text-xl text-blue-100">Understanding monocrystalline, polycrystalline, and thin-film solar technologies</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Monocrystalline Solar Panels</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">Most Efficient & Popular Choice</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Characteristics:</h4>
                <ul className="space-y-2 ml-4">
                  <li>• Made from single-crystal silicon</li>
                  <li>• Distinctive black appearance</li>
                  <li>• Efficiency: 18-22%</li>
                  <li>• Lifespan: 25-30+ years</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-green-600">Advantages:</h4>
                <ul className="space-y-2 ml-4">
                  <li>✓ Highest efficiency of all panel types</li>
                  <li>✓ Best performance in hot Texas climate</li>
                  <li>✓ Space-efficient for limited roof space</li>
                  <li>✓ Better low-light performance</li>
                  <li>✓ Sleek aesthetic appeal</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-red-600">Disadvantages:</h4>
                <ul className="space-y-2 ml-4">
                  <li>• Higher upfront cost</li>
                  <li>• Performance drops slightly in very high heat</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded">
                <p className="font-medium">Best For:</p>
                <p className="text-sm">Homeowners with limited roof space who want maximum energy production and long-term value</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Polycrystalline Solar Panels</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-semibold">Budget-Friendly Option</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Characteristics:</h4>
                <ul className="space-y-2 ml-4">
                  <li>• Made from multiple silicon crystals</li>
                  <li>• Blue, speckled appearance</li>
                  <li>• Efficiency: 15-17%</li>
                  <li>• Lifespan: 25+ years</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-green-600">Advantages:</h4>
                <ul className="space-y-2 ml-4">
                  <li>✓ Lower cost than monocrystalline</li>
                  <li>✓ Simpler manufacturing process</li>
                  <li>✓ Good performance in moderate climates</li>
                  <li>✓ Less waste in production</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-red-600">Disadvantages:</h4>
                <ul className="space-y-2 ml-4">
                  <li>• Lower efficiency requires more roof space</li>
                  <li>• Slightly shorter lifespan</li>
                  <li>• Lower heat tolerance (important in Texas)</li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-4 rounded">
                <p className="font-medium">Best For:</p>
                <p className="text-sm">Budget-conscious homeowners with ample roof space</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Comparison Table</h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Feature</th>
                  <th className="px-4 py-3 text-left">Monocrystalline</th>
                  <th className="px-4 py-3 text-left">Polycrystalline</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Efficiency</td>
                  <td className="px-4 py-3 text-green-600">18-22%</td>
                  <td className="px-4 py-3">15-17%</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3 font-medium">Cost</td>
                  <td className="px-4 py-3">$$-$$$</td>
                  <td className="px-4 py-3 text-green-600">$-$$</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Lifespan</td>
                  <td className="px-4 py-3 text-green-600">25-30+ years</td>
                  <td className="px-4 py-3">25+ years</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3 font-medium">Heat Tolerance</td>
                  <td className="px-4 py-3 text-green-600">Better</td>
                  <td className="px-4 py-3">Good</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Appearance</td>
                  <td className="px-4 py-3 text-green-600">Sleek black</td>
                  <td className="px-4 py-3">Blue speckled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Choice for Texas Homeowners</h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <p className="font-semibold mb-3">Our Recommendation:</p>
            <p className="mb-4">
              For most Texas homeowners, <strong>monocrystalline panels</strong> are the best choice due to:
            </p>
            <ul className="space-y-2 ml-4">
              <li>✓ Superior heat tolerance for hot Texas summers</li>
              <li>✓ Higher efficiency means more energy in limited space</li>
              <li>✓ Better long-term ROI despite higher upfront cost</li>
              <li>✓ Longer warranty periods (25-30 years typical)</li>
            </ul>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 my-8">
          <Link href="/quote" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-8 hover:bg-primary/90">
            Get Free Solar Quotes
          </Link>
          <Link href="/installers" className="inline-flex items-center justify-center rounded-md border border-input bg-background h-11 px-8 hover:bg-accent">
            Browse TX Installers
          </Link>
        </div>
      </div>
    </div>
  )
}
