import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Star, Award, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';

export default function ChoosingInstallerGuide() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Choose the Best Solar Installer in Texas',
    description: 'Complete guide to selecting a qualified and trustworthy solar installer in Texas',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Verify Certifications and Licensing',
        text: 'Check for NABCEP certification, proper Texas licensing, and insurance coverage'
      },
      {
        '@type': 'HowToStep',
        name: 'Research Company Reputation',
        text: 'Review online ratings, Better Business Bureau accreditation, and customer testimonials'
      },
      {
        '@type': 'HowToStep',
        name: 'Evaluate Experience and Expertise',
        text: 'Assess years in business, local installations completed, and product knowledge'
      },
      {
        '@type': 'HowToStep',
        name: 'Compare Multiple Quotes',
        text: 'Obtain at least 3-4 detailed quotes and compare equipment, pricing, and warranties'
      },
      {
        '@type': 'HowToStep',
        name: 'Review Contracts Carefully',
        text: 'Examine all terms, warranties, payment schedules, and cancellation policies'
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="How to Choose the Best Solar Installer in Texas | Guide"
        description="Learn how to choose the best solar installer in Texas. Complete guide covering certifications, red flags, questions to ask, and what to look for."
        canonicalUrl="https://solarinstallerstx.com/learn/choosing-installer-guide"
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
            <h1 className="text-4xl font-bold mb-4">How to Choose the Best Solar Installer</h1>
            <p className="text-xl text-blue-100">Your complete guide to finding a qualified, trustworthy solar installer in Texas</p>
            <div className="mt-6 flex items-center text-sm text-blue-100">
              <Search className="h-4 w-4 mr-2" />
              <span>6 min read • Essential Guide</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Takeaways */}
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

          {/* Why Installer Choice Matters */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Your Installer Choice Matters</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Choosing the right solar installer is one of the most important decisions you'll make in your solar journey.
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

          {/* Essential Certifications */}
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
                <div className="mt-4 bg-green-50 p-3 rounded">
                  <p className="text-sm">
                    <strong>Look for:</strong> NABCEP PV Installation Professional Certification or at minimum,
                    NABCEP PV Associate certification for newer companies.
                  </p>
                </div>
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
                <div className="mt-4 bg-blue-50 p-3 rounded">
                  <p className="text-sm">
                    <strong>How to Verify:</strong> Check licenses at{' '}
                    <a href="https://www.tdlr.texas.gov" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      TDLR.texas.gov
                    </a>
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">3. Insurance Coverage</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4">Your installer must carry adequate insurance:</p>
                <ul className="space-y-2 ml-4">
                  <li>
                    <strong>General Liability Insurance:</strong> Minimum $1-2 million coverage to protect your property
                    from damage during installation
                  </li>
                  <li>
                    <strong>Workers' Compensation:</strong> Protects you from liability if a worker is injured on your property
                  </li>
                  <li>
                    <strong>Errors & Omissions Insurance:</strong> Covers design or installation mistakes
                  </li>
                </ul>
                <div className="mt-4 bg-yellow-50 p-3 rounded">
                  <p className="text-sm">
                    <strong>Ask for proof:</strong> Request current certificates of insurance and verify coverage directly
                    with the insurance company if needed.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">4. Manufacturer Certifications</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-3">
                  Top solar equipment manufacturers require installers to be certified to install their products:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Panel Manufacturers:</strong> SunPower, LG, Panasonic, Q CELLS, etc.</li>
                  <li>• <strong>Inverter Manufacturers:</strong> Enphase, SolarEdge, Tesla</li>
                  <li>• <strong>Battery Manufacturers:</strong> Tesla Powerwall, LG Chem, Enphase</li>
                </ul>
                <p className="mt-3 text-sm">
                  Manufacturer certification ensures the installer is trained on proper installation techniques and
                  can provide full warranty coverage.
                </p>
              </div>
            </div>
          </section>

          {/* Reputation & Experience */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Evaluating Reputation & Experience</h2>
                <p className="text-gray-600">Research beyond the sales pitch</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <h3 className="text-xl font-semibold mt-6 mb-3">Where to Research</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h4 className="font-semibold mb-3 text-green-700">✓ Trusted Sources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Better Business Bureau (BBB):</strong> Check rating and complaint history</li>
                    <li>• <strong>Google Reviews:</strong> Look for patterns in recent reviews</li>
                    <li>• <strong>Solar Reviews:</strong> Specialized solar company ratings</li>
                    <li>• <strong>EnergySage:</strong> Verified installer reviews</li>
                    <li>• <strong>Yelp:</strong> Additional customer experiences</li>
                    <li>• <strong>Local References:</strong> Ask for recent customer contacts</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg shadow">
                  <h4 className="font-semibold mb-3 text-red-700">✗ Red Flags</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• No online presence or reviews</li>
                    <li>• Multiple complaints about abandoned projects</li>
                    <li>• Pattern of warranty service issues</li>
                    <li>• Recent business name changes</li>
                    <li>• Unwillingness to provide references</li>
                    <li>• Negative BBB rating or unresolved complaints</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Experience Factors to Consider</h3>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Years in Business</h4>
                    <p className="text-sm">
                      Look for at least 3-5 years in the solar industry. Newer companies can be good, but established
                      companies are more likely to honor long-term warranties.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Local Installation Count</h4>
                    <p className="text-sm">
                      Ask how many installations they've completed in your area. Local experience means familiarity
                      with local codes, permitting, and utility interconnection processes.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Project Portfolio</h4>
                    <p className="text-sm">
                      Request to see photos of completed installations similar to your home. Quality installers proudly
                      showcase their work.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Local Presence</h4>
                    <p className="text-sm">
                      Prefer companies with local offices and service teams over national companies operating remotely.
                      Local companies are easier to reach for warranty service and support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Questions to Ask */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">20 Critical Questions to Ask Every Installer</h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white px-6 py-3">
                  <h3 className="font-semibold">Company Credentials & Experience</h3>
                </div>
                <div className="p-6">
                  <ol className="space-y-3">
                    <li>1. Are you NABCEP certified? Which installers on my project are certified?</li>
                    <li>2. What is your Texas electrical contractor license number?</li>
                    <li>3. How long have you been installing solar in Texas?</li>
                    <li>4. How many installations have you completed in my city/area?</li>
                    <li>5. Can you provide references from recent customers?</li>
                  </ol>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-600 text-white px-6 py-3">
                  <h3 className="font-semibold">System Design & Equipment</h3>
                </div>
                <div className="p-6">
                  <ol className="space-y-3" start={6}>
                    <li>6. How did you calculate my system size? Can you show me the analysis?</li>
                    <li>7. What panel brand and model are you proposing? Why?</li>
                    <li>8. What inverter brand and type (string vs. micro-inverters)?</li>
                    <li>9. What is the expected annual production in kWh?</li>
                    <li>10. Can you provide a shade analysis and production estimate?</li>
                  </ol>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-purple-600 text-white px-6 py-3">
                  <h3 className="font-semibold">Warranties & Support</h3>
                </div>
                <div className="p-6">
                  <ol className="space-y-3" start={11}>
                    <li>11. What warranties are included (equipment, workmanship, production)?</li>
                    <li>12. Who is responsible for warranty claims - you or the manufacturer?</li>
                    <li>13. What is your workmanship warranty coverage and duration?</li>
                    <li>14. Do you offer monitoring? What happens if production drops?</li>
                    <li>15. What is your typical response time for service calls?</li>
                  </ol>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-orange-600 text-white px-6 py-3">
                  <h3 className="font-semibold">Project Details & Timeline</h3>
                </div>
                <div className="p-6">
                  <ol className="space-y-3" start={16}>
                    <li>16. What is the complete timeline from contract to activation?</li>
                    <li>17. Who handles permits and utility interconnection?</li>
                    <li>18. Do you use subcontractors or employees?</li>
                    <li>19. What happens if there are delays or problems during installation?</li>
                    <li>20. Is there a cancellation policy? Are there any cancellation fees?</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Pro Tip:</strong> A quality installer will welcome these questions and provide clear, detailed
                answers. Be wary of any installer who becomes defensive or provides vague responses.
              </p>
            </div>
          </section>

          {/* Red Flags */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Major Red Flags to Avoid</h2>
                <p className="text-gray-600">Warning signs of a bad installer</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">High-Pressure Sales Tactics</h3>
                </div>
                <p className="text-sm text-gray-700">
                  "This deal expires today!" or "Sign now or lose the discount." Legitimate installers give you time
                  to make informed decisions.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">Door-to-Door Sales</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Unsolicited door-to-door salespeople are often commission-only reps from national companies with
                  poor local support.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">Upfront Payment Demands</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Never pay more than a small deposit (10-20%) upfront. Most payment should be due after installation
                  and inspection.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">Too-Good-To-Be-True Pricing</h3>
                </div>
                <p className="text-sm text-gray-700">
                  If a quote is 30%+ below competitors, question the quality. Low-ball quotes often use inferior
                  equipment or cut corners.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">Vague or Missing Warranties</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Quality installers provide detailed warranty information upfront. Vague warranties or "lifetime"
                  claims without details are red flags.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">No Physical Address</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Companies with only PO boxes or virtual offices may not be around for long-term warranty service.
                  Verify a physical office location.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">Pushy on Financing</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Installers who push specific financing without explaining options may be earning high commissions.
                  Compare financing options independently.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-semibold text-red-900">No Site Visit</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Quotes based only on satellite imagery without a physical site inspection often lead to problems
                  during installation.
                </p>
              </div>
            </div>
          </section>

          {/* Comparing Quotes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comparing Multiple Quotes</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Always get at least 3-4 quotes from different installers. This ensures competitive pricing and helps you
                identify outliers (both high and low).
              </p>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">What to Compare in Quotes</h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-1">Equipment Specifications</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Exact panel make, model, and wattage</li>
                      <li>• Inverter brand, type, and model</li>
                      <li>• Racking system and mounting hardware</li>
                      <li>• Total system size (kW DC rating)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold mb-1">Performance Estimates</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Expected annual production (kWh)</li>
                      <li>• First-year offset percentage</li>
                      <li>• 25-year production estimate with degradation</li>
                      <li>• Shading analysis methodology</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-1">Pricing & Incentives</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Total system cost (before incentives)</li>
                      <li>• Cost per watt ($/W)</li>
                      <li>• Incentives and rebates included</li>
                      <li>• Net cost after federal tax credit</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-1">Warranties</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Panel warranty (typically 25 years)</li>
                      <li>• Inverter warranty (typically 10-25 years)</li>
                      <li>• Workmanship warranty (should be 5-10+ years)</li>
                      <li>• Production guarantee, if offered</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold mb-1">Timeline & Process</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Estimated timeline to installation</li>
                      <li>• Who handles permits and approvals</li>
                      <li>• Installation crew size and duration</li>
                      <li>• Post-installation inspection and activation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <p className="font-medium text-gray-900 mb-2">💡 Don't Just Choose the Cheapest!</p>
                <p className="text-gray-700">
                  The lowest quote often uses cheaper equipment, has shorter warranties, or cuts corners on installation
                  quality. Look for the best value—the optimal balance of price, quality, and service.
                </p>
              </div>
            </div>
          </section>

          {/* Final Checklist */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Decision Checklist</h2>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg shadow-md">
              <p className="mb-4 font-medium">Before signing a contract, verify all of the following:</p>

              <div className="space-y-2">
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Verified NABCEP certification and Texas licenses</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Confirmed insurance coverage (general liability & workers comp)</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Checked BBB rating and online reviews</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Contacted at least 3 customer references</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Obtained and compared 3-4 detailed quotes</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Reviewed all warranty documents in writing</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Understood payment schedule and terms</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Confirmed local office address and service availability</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Reviewed complete contract with no pressure to sign immediately</span>
                </label>
                <label className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">✓ Comfortable with installer's communication and professionalism</span>
                </label>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Compare Pre-Vetted Installers?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Get free quotes from NABCEP-certified, licensed Texas solar installers
            </p>
            <Link
              to="/"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Free Solar Quotes
            </Link>
            <p className="mt-4 text-sm text-blue-100">
              All installers are pre-screened for licensing, certification, and customer reviews
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
