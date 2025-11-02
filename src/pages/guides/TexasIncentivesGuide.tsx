import React from 'react';
import { ArrowLeft, DollarSign, FileText, TrendingDown, Calendar, Building2, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function TexasIncentivesGuide() {
  return (
    <>
      <Helmet>
        <title>Texas Solar Incentives & Tax Credits 2024 | Complete Guide</title>
        <meta
          name="description"
          content="Comprehensive guide to solar incentives and tax credits available in Texas. Learn about federal ITC, state exemptions, utility rebates, and local incentives to maximize your solar savings."
        />
        <meta name="keywords" content="Texas solar incentives, solar tax credits Texas, federal solar tax credit, Texas property tax exemption, solar rebates Texas, ITC solar credit" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Texas Solar Incentives & Tax Credits 2024: Complete Guide',
            description: 'Comprehensive guide to all available solar incentives and tax credits in Texas, including federal, state, and local programs.',
            author: {
              '@type': 'Organization',
              name: 'SolarInstallersTX'
            },
            datePublished: '2024-01-15',
            dateModified: '2024-01-15'
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/learn" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learning Hub
            </Link>
            <h1 className="text-4xl font-bold mb-4">Texas Solar Incentives & Tax Credits 2024</h1>
            <p className="text-xl text-blue-100">Your complete guide to maximizing solar savings through federal, state, and local incentive programs</p>
            <div className="mt-6 flex items-center text-sm text-blue-100">
              <Calendar className="h-4 w-4 mr-2" />
              <span>8 min read • Updated January 2024</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Takeaways */}
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

          {/* Federal Solar Investment Tax Credit */}
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

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <p className="font-medium text-gray-900 mb-2">Important Note on Tax Liability:</p>
                <p className="text-gray-700">
                  The ITC is a non-refundable tax credit, meaning it can only reduce your tax liability to zero—it won't result
                  in a refund. However, you can carry forward any unused credit to future tax years.
                </p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">What Costs Are Included?</h3>
              <p>The ITC covers the total cost of your solar system installation, including:</p>
              <ul className="space-y-2 ml-4">
                <li>• Solar panels and racking equipment</li>
                <li>• Inverters and electrical components</li>
                <li>• Labor costs for installation</li>
                <li>• Permitting fees and inspection costs</li>
                <li>• Sales tax on equipment and installation</li>
                <li>• Energy storage systems (batteries) installed with solar</li>
              </ul>
            </div>
          </section>

          {/* Texas Property Tax Exemption */}
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
                system won't increase your property taxes. This is codified under Texas Tax Code Section 11.27.
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

              <h3 className="text-xl font-semibold mt-6 mb-3">How to Claim the Exemption</h3>
              <ol className="space-y-3 ml-4">
                <li>
                  <strong>1. Complete the Application:</strong> File Form 50-123 (Application for Exemption of Solar and Wind-Powered
                  Energy Devices) with your county appraisal district.
                </li>
                <li>
                  <strong>2. Provide Documentation:</strong> Include proof of installation, system specifications, and cost documentation.
                </li>
                <li>
                  <strong>3. Submit Before Deadline:</strong> Applications must be filed by April 30th of the tax year, though late
                  applications may be accepted.
                </li>
                <li>
                  <strong>4. Renewal:</strong> The exemption is automatic once approved and continues as long as you own the property
                  and solar system.
                </li>
              </ol>

              <div className="bg-blue-50 p-4 rounded-lg my-6">
                <p className="font-medium text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-gray-700">
                  Most solar installers in Texas will help you complete and file the property tax exemption paperwork as part of
                  their service. Ask about this during the consultation process.
                </p>
              </div>
            </div>
          </section>

          {/* Utility Company Rebates */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Utility Company Rebates & Programs</h2>
                <p className="text-gray-600">Additional savings from your local utility</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Many Texas utility companies offer rebates and incentive programs for solar installations. These programs vary
                significantly by utility and are subject to funding availability.
              </p>

              <div className="bg-white rounded-lg shadow-md overflow-hidden my-6">
                <h3 className="text-xl font-semibold p-6 bg-gray-50 border-b">Major Texas Utility Solar Programs</h3>

                <div className="divide-y">
                  {/* Austin Energy */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">Austin Energy</h4>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Solar PV Rebate:</strong> $2,500 for residential systems</li>
                      <li>• <strong>Value of Solar (VOS) Rate:</strong> Credit for excess generation</li>
                      <li>• <strong>Eligibility:</strong> Austin Energy customers with qualifying installations</li>
                      <li>• <strong>Application:</strong> Pre-approval required before installation</li>
                    </ul>
                  </div>

                  {/* CPS Energy */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">CPS Energy (San Antonio)</h4>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>SolarHost Program:</strong> Lease your roof space to CPS Energy</li>
                      <li>• <strong>Buyback Rate:</strong> Credit for excess solar generation</li>
                      <li>• <strong>Performance Payment:</strong> $0.06/kWh for solar production</li>
                      <li>• <strong>Term:</strong> 25-year agreement options available</li>
                    </ul>
                  </div>

                  {/* Oncor */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">Oncor (Dallas/Fort Worth)</h4>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Limited</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Distributed Renewable Generation:</strong> Limited rebate program</li>
                      <li>• <strong>Amount:</strong> Varies based on funding availability</li>
                      <li>• <strong>Note:</strong> Program frequently reaches capacity quickly</li>
                      <li>• <strong>Check:</strong> Oncor's website for current program status</li>
                    </ul>
                  </div>

                  {/* El Paso Electric */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">El Paso Electric</h4>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Residential Solar Program:</strong> Net metering available</li>
                      <li>• <strong>Credits:</strong> Retail rate credit for excess generation</li>
                      <li>• <strong>Interconnection:</strong> Streamlined application process</li>
                    </ul>
                  </div>

                  {/* Green Mountain Energy */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">Green Mountain Energy</h4>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Renewable Rewards Buyback:</strong> Credits for excess solar</li>
                      <li>• <strong>Rate:</strong> Competitive buyback rates (varies by plan)</li>
                      <li>• <strong>Availability:</strong> Deregulated market areas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <p className="font-medium text-gray-900 mb-2">⚠️ Important:</p>
                <p className="text-gray-700">
                  Utility rebate programs are subject to change and may have limited funding. Always check with your specific
                  utility company for current program details and availability before making solar purchasing decisions.
                </p>
              </div>
            </div>
          </section>

          {/* Net Metering & Buyback */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <TrendingDown className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Net Metering & Buyback Programs</h2>
                <p className="text-gray-600">Get credit for excess solar production</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                While Texas doesn't have a statewide net metering mandate, many utilities offer buyback programs that credit you
                for excess solar electricity sent back to the grid.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">How Buyback Programs Work</h3>
              <ol className="space-y-3 ml-4">
                <li>
                  <strong>1. Daytime Production:</strong> Your solar panels produce electricity during sunny hours, often more
                  than your home uses.
                </li>
                <li>
                  <strong>2. Excess to Grid:</strong> Extra electricity flows back to the grid through your meter.
                </li>
                <li>
                  <strong>3. Credit Applied:</strong> You receive credits on your utility bill for the excess power.
                </li>
                <li>
                  <strong>4. Evening Usage:</strong> You use grid power when solar isn't producing, offsetting it with credits earned.
                </li>
              </ol>

              <div className="bg-white p-6 rounded-lg shadow-md my-6">
                <h3 className="text-xl font-semibold mb-4">Typical Buyback Rate Comparison</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Full Retail Rate (1:1 credit)</span>
                    <span className="text-green-600 font-bold">Best Value</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Value of Solar Rate (VOS)</span>
                    <span className="text-blue-600 font-bold">Good Value</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Wholesale/Avoided Cost</span>
                    <span className="text-orange-600 font-bold">Lower Value</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>No Buyback Program</span>
                    <span className="text-red-600 font-bold">No Value</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Maximizing Buyback Value</h3>
              <ul className="space-y-2 ml-4">
                <li>✓ Choose a utility or retail provider with favorable buyback rates</li>
                <li>✓ Size your system to match your annual usage (avoid significant overproduction)</li>
                <li>✓ Consider battery storage to store excess power instead of selling at low rates</li>
                <li>✓ Shift high-energy activities (laundry, EV charging) to daytime solar hours</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg my-6">
                <p className="font-medium text-gray-900 mb-2">💡 Pro Tip for Deregulated Markets:</p>
                <p className="text-gray-700">
                  In Texas's deregulated electricity markets (most of the state), you can shop for retail electricity providers
                  that offer better solar buyback rates. Compare providers on <a href="http://www.powertochoose.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">PowerToChoose.org</a>
                  and look for "solar buyback" or "distributed generation" plans.
                </p>
              </div>
            </div>
          </section>

          {/* Local & Municipal Incentives */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Local & Municipal Incentives</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Some Texas cities and counties offer additional solar incentives beyond state and federal programs. These vary
                widely by location.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Notable Local Programs</h3>

              <div className="space-y-4">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Austin</h4>
                  <p>
                    • Expedited permitting for solar installations<br/>
                    • Free solar site assessments for residents<br/>
                    • Green building incentives for solar-ready construction
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">San Antonio</h4>
                  <p>
                    • SA Climate Ready program resources<br/>
                    • Streamlined permitting through CPS Energy coordination<br/>
                    • Solar-ready building codes for new construction
                  </p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Dallas</h4>
                  <p>
                    • Green building standards encouraging solar<br/>
                    • Expedited plan review for solar permits<br/>
                    • Partnership programs with Oncor
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Combining Incentives */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Combining Incentives: Real-World Example</h2>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Total Savings Breakdown</h3>

              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span>Solar System Cost (7 kW)</span>
                    <span className="font-bold">$25,000</span>
                  </div>

                  <div className="border-t-2 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-green-700">
                      <span>Federal ITC (30%)</span>
                      <span className="font-bold">-$7,500</span>
                    </div>
                    <div className="flex justify-between items-center text-green-700">
                      <span>Utility Rebate (Austin Energy)</span>
                      <span className="font-bold">-$2,500</span>
                    </div>
                    <div className="flex justify-between items-center text-green-700">
                      <span>Property Tax Savings (25 years)</span>
                      <span className="font-bold">-$11,250</span>
                    </div>
                  </div>

                  <div className="border-t-2 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Net Investment</span>
                      <span className="text-green-600">$15,000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                      <span>Total Savings</span>
                      <span>40% reduction</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                *This example includes 25-year property tax savings. Actual savings vary based on location, system size, and available programs.
              </div>
            </div>
          </section>

          {/* How to Claim Incentives */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Claim Your Incentives</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Step-by-Step Process</h3>

                <ol className="space-y-4">
                  <li>
                    <strong className="text-blue-600">Before Installation:</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>• Research available utility rebates and apply for pre-approval if required</li>
                      <li>• Confirm your installer is familiar with local incentive programs</li>
                      <li>• Document all system specifications and costs</li>
                    </ul>
                  </li>

                  <li>
                    <strong className="text-blue-600">During Installation:</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>• Keep all receipts, invoices, and payment documentation</li>
                      <li>• Take photos of the installation process</li>
                      <li>• Obtain final inspection approval</li>
                    </ul>
                  </li>

                  <li>
                    <strong className="text-blue-600">After Installation:</strong>
                    <ul className="mt-2 ml-4 space-y-1">
                      <li>• File IRS Form 5695 with your federal tax return</li>
                      <li>• Submit property tax exemption application (Form 50-123)</li>
                      <li>• Complete utility rebate applications with required documentation</li>
                      <li>• Set up net metering or buyback agreement with utility</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <p className="font-medium text-gray-900 mb-2">📋 Documents to Keep:</p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Final itemized invoice from installer</li>
                  <li>• Proof of payment (canceled checks, credit card statements)</li>
                  <li>• System specifications and equipment details</li>
                  <li>• Final inspection certificate</li>
                  <li>• Interconnection agreement with utility</li>
                  <li>• Warranty documents</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Important Considerations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Considerations</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3">❌ Common Mistakes to Avoid</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Not checking tax liability before claiming ITC</li>
                  <li>• Missing utility rebate application deadlines</li>
                  <li>• Forgetting to file property tax exemption</li>
                  <li>• Not keeping adequate documentation</li>
                  <li>• Assuming leased systems qualify for ITC</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-3">✓ Best Practices</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Consult with tax professional about ITC</li>
                  <li>• Apply for utility rebates before installation</li>
                  <li>• File property tax exemption promptly</li>
                  <li>• Keep digital and physical copies of all documents</li>
                  <li>• Work with experienced solar installers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Can I claim the federal ITC if I finance my solar system?
                </summary>
                <p className="mt-3 text-gray-700">
                  Yes! As long as you own the system (through cash purchase or a solar loan), you can claim the ITC.
                  However, leased systems or those under a Power Purchase Agreement (PPA) do not qualify because the
                  third-party owner claims the credit.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  What if I don't have enough tax liability to use the full ITC?
                </summary>
                <p className="mt-3 text-gray-700">
                  The ITC is non-refundable but can be carried forward to future tax years. If you can't use the full
                  credit in the year of installation, you can apply the remaining credit to your taxes in subsequent years
                  until it's fully utilized.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Does the property tax exemption expire?
                </summary>
                <p className="mt-3 text-gray-700">
                  No, the Texas property tax exemption for solar installations continues indefinitely as long as you own
                  the property and the solar system remains installed. You only need to file the application once.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Are utility rebate programs first-come, first-served?
                </summary>
                <p className="mt-3 text-gray-700">
                  Many utility rebate programs have limited annual funding and operate on a first-come, first-served basis.
                  It's important to apply early in the year and get pre-approval before installation to ensure you receive
                  the rebate.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Can I combine battery storage with my solar system and claim incentives?
                </summary>
                <p className="mt-3 text-gray-700">
                  Yes! Battery storage systems installed with solar panels are eligible for the federal ITC. The battery
                  must be charged by the solar system at least 75% of the time to qualify for the credit. Some utilities
                  also offer separate incentives for battery storage.
                </p>
              </details>
            </div>
          </section>

          {/* Next Steps CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Saving with Solar?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Get free quotes from vetted Texas solar installers who can help you maximize all available incentives
            </p>
            <Link
              to="/"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Free Solar Quotes
            </Link>
            <p className="mt-4 text-sm text-blue-100">
              No obligation • Compare 3-4 installers • Save up to 20% by comparing
            </p>
          </div>

          {/* Back to Learn */}
          <div className="mt-12 text-center">
            <Link
              to="/learn"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learning Hub
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
