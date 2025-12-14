import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, DollarSign, FileText, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Texas Solar Incentives & Tax Credits 2025 | Complete Guide',
  description: 'Comprehensive guide to solar incentives and tax credits available in Texas. Learn about federal ITC, state exemptions, utility rebates, and local incentives.',
  keywords: ['texas solar incentives', 'solar tax credit', 'ITC texas', 'property tax exemption', 'solar rebates texas'],
  openGraph: {
    title: 'Texas Solar Incentives & Tax Credits 2025 | Solar Installers TX',
    description: 'Your complete guide to maximizing solar savings through federal, state, and local incentive programs.',
    type: 'article',
    url: 'https://solarinstallerstx.com/learn/texas-incentives',
    images: [{ url: 'https://solarinstallerstx.com/opengraph-image', width: 1200, height: 630, alt: 'Texas Solar Incentives & Tax Credits 2025' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Solar Incentives & Tax Credits 2025',
    description: 'Complete guide to maximizing solar savings through federal, state, and local incentive programs.',
    images: ['https://solarinstallerstx.com/opengraph-image'],
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/learn/texas-incentives',
  },
}

export const revalidate = 86400

export default function TexasIncentivesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">Texas Solar Incentives & Tax Credits 2025</h1>
          <p className="text-xl text-blue-100">Your complete guide to maximizing solar savings through federal, state, and local incentive programs</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Federal Solar Investment Tax Credit (ITC) provides 30% of system cost back as a tax credit through 2032</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Texas offers 100% property tax exemption for solar installations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Multiple utility companies offer rebates ranging from $0.10 to $0.60 per watt</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Combined incentives can reduce total solar costs by 40-50%</span>
            </li>
          </ul>
        </div>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Federal Solar Investment Tax Credit (ITC)</h2>
              <p className="text-gray-600">The most valuable solar incentive available</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The federal Solar Investment Tax Credit (ITC) is the single most valuable solar incentive available to Texas homeowners.
              This federal tax credit allows you to deduct 30% of your solar system cost from your federal taxes.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md my-6">
              <h3 className="text-xl font-semibold mb-4">ITC Timeline & Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">2024-2032:</span>
                  <span className="text-green-600 font-bold text-lg">30% Tax Credit</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">2033:</span>
                  <span className="text-orange-600 font-bold">26% Tax Credit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">2034:</span>
                  <span className="text-red-600 font-bold">22% Tax Credit</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">How the ITC Works</h3>
            <p>
              The ITC is a dollar-for-dollar reduction in your federal income tax liability. For example, if your solar system
              costs $25,000, you can claim a $7,500 tax credit (30% of $25,000).
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-4">
              <h4 className="font-semibold mb-3">Example Calculation:</h4>
              <ul className="space-y-2">
                <li>• Solar System Cost: $25,000</li>
                <li>• Federal Tax Credit (30%): -$7,500</li>
                <li className="text-green-600 font-bold">• Net Cost After Federal Credit: $17,500</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">ITC Eligibility Requirements</h3>
            <ul className="space-y-2 ml-4">
              <li>✓ You own the solar system (not leased or under a PPA)</li>
              <li>✓ The system is installed at your primary or secondary residence in the United States</li>
              <li>✓ The solar panels are new (not used)</li>
              <li>✓ You have sufficient tax liability to claim the credit</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Texas Property Tax Exemption</h2>
              <p className="text-gray-600">Protect your property value from tax increases</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              Texas offers a 100% property tax exemption for solar panel installations, meaning the added value of your solar
              system won&apos;t increase your property taxes. This is codified under Texas Tax Code Section 11.27.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md my-6">
              <h3 className="text-xl font-semibold mb-4">Property Tax Exemption Benefits</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Typical Scenario:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Solar system adds $25,000 to home value</li>
                    <li>• Average Texas property tax rate: 1.8%</li>
                    <li>• Annual tax savings: $450/year</li>
                    <li className="text-green-600 font-bold">• 25-year savings: $11,250</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Utility-Specific Rebates</h3>
            <ul className="space-y-2">
              <li><strong>Austin Energy:</strong> Value of Solar tariff program</li>
              <li><strong>CPS Energy:</strong> $0.60/watt rebate program</li>
              <li><strong>El Paso Electric:</strong> Renewable energy credits</li>
              <li><strong>Oncor:</strong> Streamlined interconnection process</li>
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
