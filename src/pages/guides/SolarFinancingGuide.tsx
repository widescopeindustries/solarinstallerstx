import React from 'react';
import { ArrowLeft, DollarSign, CreditCard, FileText, TrendingUp, Calculator, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';

export default function SolarFinancingGuide() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Solar Financing Options in Texas: Complete Comparison Guide',
    description: 'Comprehensive guide to financing your solar installation including cash, loans, leases, and power purchase agreements',
    author: {
      '@type': 'Organization',
      name: 'SolarInstallersTX'
    },
    datePublished: '2024-01-15',
    dateModified: '2024-01-15'
  };

  return (
    <>
      <SEOHead
        title="Solar Financing Options in Texas | Cash, Loans & PPAs"
        description="Complete guide to solar financing options in Texas. Compare cash purchase, solar loans, leases, and PPAs. Learn which financing option offers the best ROI."
        canonicalUrl="https://solarinstallerstx.com/learn/solar-financing-guide"
        schema={schema}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/learn" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learning Hub
            </Link>
            <h1 className="text-4xl font-bold mb-4">Solar Financing Options in Texas</h1>
            <p className="text-xl text-blue-100">Compare cash, loans, leases, and PPAs to find the best financing for your situation</p>
            <div className="mt-6 flex items-center text-sm text-blue-100">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>7 min read • Financial Guide</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Comparison */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-blue-600" />
              Quick Comparison
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong className="text-blue-600">Cash Purchase:</strong> Best ROI, full ownership, qualify for all incentives</p>
              <p><strong className="text-green-600">Solar Loan:</strong> Own system, $0 down options, qualify for incentives</p>
              <p><strong className="text-orange-600">Solar Lease:</strong> Low/no upfront cost, no maintenance responsibility</p>
              <p><strong className="text-purple-600">PPA:</strong> Pay only for power produced, no system ownership</p>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Your Solar Financing Options</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                How you finance your solar installation significantly impacts your long-term savings, ownership rights,
                and overall financial return. Texas homeowners have four main options, each with distinct advantages and tradeoffs.
              </p>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">The Four Main Financing Options</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-1">Cash Purchase</h4>
                    <p className="text-sm text-gray-600">Pay full cost upfront, own system immediately</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold mb-1">Solar Loan</h4>
                    <p className="text-sm text-gray-600">Finance through secured or unsecured loan</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-1">Solar Lease</h4>
                    <p className="text-sm text-gray-600">Rent the system, make fixed monthly payments</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-1">Power Purchase Agreement (PPA)</h4>
                    <p className="text-sm text-gray-600">Pay per kWh produced by the system</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cash Purchase */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Option 1: Cash Purchase</h2>
                <p className="text-gray-600">Maximum savings, full ownership</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Paying cash upfront offers the best financial return over the system's lifetime. You own the system
                immediately, qualify for all incentives, and have no interest payments reducing your savings.
              </p>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">✓ Advantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Highest ROI:</strong> No interest costs eating into savings</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Fastest Payback:</strong> Typically 6-9 years in Texas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Full Federal ITC:</strong> 30% back as tax credit</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Immediate Ownership:</strong> You own all equipment from day one</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Maximum Home Value:</strong> Owned systems increase home value most</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>No Monthly Payments:</strong> Immediate positive cash flow after installation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Simplest:</strong> No loan documents, credit checks, or financing fees</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">✗ Disadvantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Large Upfront Cost:</strong> $15,000-$30,000+ out of pocket</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Opportunity Cost:</strong> Money tied up in solar vs investments</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Delayed ITC Benefit:</strong> Tax credit comes next year, not immediately</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>You Pay for Repairs:</strong> Responsible for any maintenance costs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Cash Purchase Example (7 kW Texas System)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>System Cost:</span>
                    <span className="font-bold">$19,250</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Federal Tax Credit (30%):</span>
                    <span className="text-green-600 font-bold">-$5,775</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 font-bold text-lg">
                    <span>Net Cost:</span>
                    <span className="text-blue-600">$13,475</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Annual Savings (electricity):</span>
                    <span>~$1,800</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Payback Period:</span>
                    <span>~7.5 years</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-green-700">
                    <span>25-Year Total Savings:</span>
                    <span>$31,525</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Best For:</strong> Homeowners with available cash, high tax liability to use the ITC,
                  and who plan to stay in their home long-term (7+ years).
                </p>
              </div>
            </div>
          </section>

          {/* Solar Loans */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Option 2: Solar Loans</h2>
                <p className="text-gray-600">Own the system with $0 down</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Solar loans allow you to own your system without the large upfront cost. You'll still qualify for
                the federal tax credit and other incentives, but loan interest reduces overall savings compared to cash.
              </p>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">✓ Advantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>No/Low Upfront Cost:</strong> Many loans offer $0 down</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Own the System:</strong> You own equipment and get all production</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Federal ITC:</strong> Qualify for 30% tax credit</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Immediate Savings:</strong> Loan payment often less than electric bill</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Home Value Increase:</strong> Owned systems boost property value</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Flexible Terms:</strong> 5-25 year loan options available</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">✗ Disadvantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Interest Costs:</strong> Can add $5,000-$15,000 over loan term</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Credit Check:</strong> Requires good credit (typically 650+ FICO)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Monthly Obligation:</strong> Payment required even if system underperforms</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Dealer Fees:</strong> Some loans include hidden origination fees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Home Sale Complexity:</strong> Must pay off or transfer loan</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4">Types of Solar Loans</h3>

              <div className="space-y-4">
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h4 className="font-semibold text-lg mb-3">1. Secured Solar Loans (Home Equity)</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">How It Works:</p>
                      <p className="text-gray-600">
                        Loan secured by your home equity (HELOC, home equity loan, or cash-out refinance).
                        Lower interest rates because loan is secured.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Typical Terms:</p>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Interest Rate: 6-9% APR</li>
                        <li>• Term: 5-20 years</li>
                        <li>• Down Payment: 0-10%</li>
                        <li>• Tax Deductible: Interest may be tax deductible</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 bg-yellow-50 p-3 rounded text-xs">
                    <strong>⚠️ Risk:</strong> Your home is collateral. Defaulting could lead to foreclosure.
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h4 className="font-semibold text-lg mb-3">2. Unsecured Solar Loans</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">How It Works:</p>
                      <p className="text-gray-600">
                        Personal loan not secured by collateral. Faster approval, but higher interest rates.
                        Most common type for solar installations.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Typical Terms:</p>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Interest Rate: 7-12% APR</li>
                        <li>• Term: 5-20 years (most common: 10-15 years)</li>
                        <li>• Down Payment: $0 available</li>
                        <li>• Credit Requirement: 650+ FICO</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 bg-green-50 p-3 rounded text-xs">
                    <strong>✓ Benefit:</strong> No collateral at risk. Simpler qualification process.
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h4 className="font-semibold text-lg mb-3">3. Dealer/Installer Financing</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-2">How It Works:</p>
                      <p className="text-gray-600">
                        Financing arranged through solar installer (they partner with lenders like Sunlight Financial,
                        Mosaic, GoodLeap, etc.). One-stop-shop convenience.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Typical Terms:</p>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Interest Rate: 2-10% APR (varies widely)</li>
                        <li>• Term: 10-25 years</li>
                        <li>• Down Payment: $0 common</li>
                        <li>• Special Features: Some offer 18-month 0% periods</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 bg-yellow-50 p-3 rounded text-xs">
                    <strong>⚠️ Watch For:</strong> Dealer fees (3-8% of loan) may be hidden in system price. Compare
                    rates independently before committing.
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-semibold mb-4">Solar Loan Example (7 kW System, 12-Year Loan @ 7.5% APR)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>System Cost:</span>
                    <span className="font-bold">$19,250</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Down Payment:</span>
                    <span className="font-bold">$0</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Monthly Payment:</span>
                    <span className="font-bold text-blue-600">$184</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 border-b pb-2">
                    <span>Monthly Electric Bill (before solar):</span>
                    <span>~$150</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 border-b pb-2">
                    <span>Monthly Electric Bill (after solar):</span>
                    <span>~$20</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 font-medium text-green-700">
                    <span>Net Monthly Cost (years 1-12):</span>
                    <span>$54 ($184 loan - $130 savings)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Federal Tax Credit (apply to principal):</span>
                    <span className="text-green-600">-$5,775</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2 font-bold">
                    <span>Total Interest Paid (12 years):</span>
                    <span className="text-red-600">$7,576</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-green-700">
                    <span>25-Year Total Savings:</span>
                    <span>$24,000</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-4">
                  *After loan payoff (year 13+), full $1,800/year savings with no payment. Assumes you apply ITC to
                  reduce principal in year 2.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Best For:</strong> Homeowners who want to own their system but don't have cash available.
                  Works best if you have good credit and plan to use the federal ITC to pay down principal.
                </p>
              </div>
            </div>
          </section>

          {/* Solar Leases */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Option 3: Solar Lease</h2>
                <p className="text-gray-600">Rent the system, pay fixed monthly fee</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                With a solar lease, a third-party company owns the system installed on your roof. You pay a fixed
                monthly fee (typically less than your current electric bill) for the right to use the solar electricity
                the system produces.
              </p>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">✓ Advantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>No/Low Upfront Cost:</strong> Typically $0-$1,000 down</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>No Maintenance Responsibility:</strong> Leasing company handles repairs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Predictable Costs:</strong> Fixed monthly payment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>No Credit Check:</strong> Easier qualification than loans</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Immediate Savings:</strong> Lower than current electric bill from day one</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">✗ Disadvantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>No Ownership:</strong> You don't own the equipment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>No Federal ITC:</strong> Leasing company claims the tax credit, not you</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Lower Total Savings:</strong> 40-60% less savings than ownership</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Escalator Clause:</strong> Payments typically increase 2-5% annually</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Home Sale Complications:</strong> Must transfer lease or buy out</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>No Home Value Increase:</strong> Leased systems don't add property value</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Long-Term Contract:</strong> 20-25 year commitment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Solar Lease Example (7 kW System)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Current Electric Bill:</span>
                    <span className="font-bold">$150/month</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Monthly Lease Payment (Year 1):</span>
                    <span className="font-bold text-orange-600">$110</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Remaining Electric Bill:</span>
                    <span className="font-bold">$20</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 font-medium text-green-700">
                    <span>Year 1 Monthly Savings:</span>
                    <span>$20 ($150 - $110 - $20)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Annual Escalator:</span>
                    <span>2.9% (payment increases yearly)</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2 font-bold">
                    <span>25-Year Total Savings:</span>
                    <span className="text-green-700">~$8,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>Compare to: Cash purchase savings</span>
                    <span>$31,525 (4x more)</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm">
                  <strong>⚠️ Warning:</strong> Solar leases provide the lowest total savings of any financing option.
                  They're convenient, but you give up most of the financial benefits of solar to the leasing company.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-sm">
                  <strong>💡 Best For:</strong> Homeowners who want solar but can't qualify for loans, don't have cash,
                  and prioritize simplicity over maximum savings. NOT recommended if you qualify for cash or loan options.
                </p>
              </div>
            </div>
          </section>

          {/* PPAs */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Option 4: Power Purchase Agreement (PPA)</h2>
                <p className="text-gray-600">Pay only for solar power produced</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                A PPA is similar to a lease, but instead of paying a fixed monthly fee, you pay for the actual
                electricity the solar system produces (usually at a per-kWh rate lower than utility rates).
              </p>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">✓ Advantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>No/Low Upfront Cost:</strong> Typically $0 down</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Pay Only for Production:</strong> If system underperforms, you pay less</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>No Maintenance Responsibility:</strong> Company handles all repairs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Performance Guarantee:</strong> Company incentivized to keep system running</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Immediate Savings:</strong> PPA rate lower than utility rate</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">✗ Disadvantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>No Ownership:</strong> You don't own the system</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>No Federal ITC:</strong> Company claims the tax credit</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Lower Total Savings:</strong> Similar to leases, much less than ownership</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Rate Escalator:</strong> PPA rate typically increases 2-5% annually</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Variable Costs:</strong> Payment varies with production (less predictable)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Not Available Everywhere:</strong> Some states ban PPAs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Home Sale Complications:</strong> Must transfer or buy out agreement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">PPA Example (7 kW System)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Utility Rate:</span>
                    <span className="font-bold">$0.12/kWh</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>PPA Rate (Year 1):</span>
                    <span className="font-bold text-purple-600">$0.09/kWh</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Annual Solar Production:</span>
                    <span className="font-bold">10,500 kWh</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Annual PPA Cost (Year 1):</span>
                    <span className="font-bold">$945 (10,500 × $0.09)</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>What You Would Have Paid (utility):</span>
                    <span className="font-bold">$1,260</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 font-medium text-green-700">
                    <span>Year 1 Savings:</span>
                    <span>$315</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Annual PPA Rate Increase:</span>
                    <span>2.9%</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2 font-bold">
                    <span>25-Year Total Savings:</span>
                    <span className="text-green-700">~$9,500</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Best For:</strong> Similar to leases—homeowners who want solar but can't or won't finance/purchase
                  outright. Performance risk is on the PPA company, which some prefer.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Side-by-Side Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-3 text-left font-semibold">Feature</th>
                    <th className="px-3 py-3 text-center font-semibold text-blue-700">Cash</th>
                    <th className="px-3 py-3 text-center font-semibold text-green-700">Loan</th>
                    <th className="px-3 py-3 text-center font-semibold text-orange-700">Lease</th>
                    <th className="px-3 py-3 text-center font-semibold text-purple-700">PPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-2 font-medium">Ownership</td>
                    <td className="px-3 py-2 text-center bg-green-50">You own ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50">You own ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-red-50">Company owns</td>
                    <td className="px-3 py-2 text-center bg-red-50">Company owns</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Upfront Cost</td>
                    <td className="px-3 py-2 text-center bg-red-50">$15K-$30K</td>
                    <td className="px-3 py-2 text-center bg-green-50">$0 possible ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50">$0-$1K ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50">$0 typical ⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Federal ITC</td>
                    <td className="px-3 py-2 text-center bg-green-50">You get 30% ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50">You get 30% ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-red-50">Company gets it</td>
                    <td className="px-3 py-2 text-center bg-red-50">Company gets it</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">25-Year Savings</td>
                    <td className="px-3 py-2 text-center bg-green-50">$31,525 ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50">$24,000 ⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-red-50">$8,000 ⭐</td>
                    <td className="px-3 py-2 text-center bg-red-50">$9,500 ⭐</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Monthly Payment</td>
                    <td className="px-3 py-2 text-center bg-green-50">None ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center">Loan payment</td>
                    <td className="px-3 py-2 text-center">Fixed lease</td>
                    <td className="px-3 py-2 text-center">Per kWh cost</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Maintenance</td>
                    <td className="px-3 py-2 text-center">Your responsibility</td>
                    <td className="px-3 py-2 text-center">Your responsibility</td>
                    <td className="px-3 py-2 text-center bg-green-50">Included ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50">Included ⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Home Value Impact</td>
                    <td className="px-3 py-2 text-center bg-green-50">Increases ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50">Increases ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-red-50">Neutral/negative</td>
                    <td className="px-3 py-2 text-center bg-red-50">Neutral/negative</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Selling Home</td>
                    <td className="px-3 py-2 text-center bg-green-50">Simple ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center">Pay off loan</td>
                    <td className="px-3 py-2 text-center bg-red-50">Transfer/buyout</td>
                    <td className="px-3 py-2 text-center bg-red-50">Transfer/buyout</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Credit Required</td>
                    <td className="px-3 py-2 text-center bg-green-50">None ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center">650+ FICO</td>
                    <td className="px-3 py-2 text-center bg-green-50">Minimal ⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50">Minimal ⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Overall Best Value</td>
                    <td className="px-3 py-2 text-center bg-green-50 font-bold">1st ⭐⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-green-50 font-bold">2nd ⭐⭐</td>
                    <td className="px-3 py-2 text-center bg-red-50">4th ⭐</td>
                    <td className="px-3 py-2 text-center bg-red-50">3rd ⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Decision Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Which Financing Option Should You Choose?</h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Choose Cash Purchase If:</h3>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li>✓ You have $15,000-$30,000 available without depleting emergency funds</li>
                  <li>✓ You have sufficient tax liability to use the full federal ITC</li>
                  <li>✓ You want maximum long-term savings</li>
                  <li>✓ You plan to stay in your home 7+ years</li>
                  <li>✓ You want the simplest option with no monthly payments</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h3 className="text-xl font-semibold text-green-900 mb-3">Choose Solar Loan If:</h3>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li>✓ You have good credit (650+ FICO)</li>
                  <li>✓ You want to own the system but don't have cash available</li>
                  <li>✓ You can use the federal ITC to reduce loan principal</li>
                  <li>✓ You're comfortable with monthly loan payments</li>
                  <li>✓ You want strong ROI (better than lease/PPA)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md border-l-4 border-orange-600">
                <h3 className="text-xl font-semibold text-orange-900 mb-3">Choose Solar Lease If:</h3>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li>✓ You can't qualify for a loan or don't have cash</li>
                  <li>✓ You want predictable, fixed monthly payments</li>
                  <li>✓ You prioritize simplicity and no maintenance responsibility</li>
                  <li>✓ You're OK with lower savings (but still some savings)</li>
                  <li>✓ You may move before loan payback period ends</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md border-l-4 border-purple-600">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Choose PPA If:</h3>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li>✓ You prefer to pay only for actual solar production</li>
                  <li>✓ You want performance risk on the provider, not you</li>
                  <li>✓ You like the idea of "solar utility" vs owning equipment</li>
                  <li>✓ Same situations as lease, but prefer variable vs fixed payments</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Expert Recommendation */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Our Expert Recommendation</h2>
              <div className="space-y-4 text-blue-100">
                <p>
                  <strong className="text-white">1st Choice: Cash Purchase</strong><br/>
                  If you have the cash available and sufficient tax liability, cash purchase offers the best financial
                  return by far. Your 25-year savings will be 3-4x higher than lease/PPA options.
                </p>
                <p>
                  <strong className="text-white">2nd Choice: Solar Loan</strong><br/>
                  If cash isn't available, a solar loan with competitive rates (under 8% APR) is the next best option.
                  You still own the system, get the federal ITC, and see strong savings—just lower than cash due to
                  interest costs.
                </p>
                <p>
                  <strong className="text-white">Avoid if Possible: Leases & PPAs</strong><br/>
                  While convenient, leases and PPAs deliver only 25-30% of the savings you'd get from ownership.
                  The leasing company captures most of the value. Only consider these if you absolutely cannot access
                  cash or credit.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Compare Financing Options?</h2>
            <p className="text-xl mb-6 text-green-100">
              Get free quotes from Texas installers and compare cash, loan, and lease options
            </p>
            <Link
              to="/"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Get Free Solar Quotes
            </Link>
            <p className="mt-4 text-sm text-green-100">
              Installers will provide multiple financing options so you can compare
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
