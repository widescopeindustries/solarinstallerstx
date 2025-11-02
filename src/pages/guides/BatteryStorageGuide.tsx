import React from 'react';
import { ArrowLeft, Battery, DollarSign, Zap, Home, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function BatteryStorageGuide() {
  return (
    <>
      <Helmet>
        <title>Solar Battery Storage for Texas Homes | Complete Guide 2024</title>
        <meta
          name="description"
          content="Complete guide to solar battery storage systems for Texas homes. Learn about Tesla Powerwall, LG Chem, costs, benefits, and whether battery storage is worth it for your home."
        />
        <meta name="keywords" content="solar battery storage Texas, Tesla Powerwall Texas, home battery backup, solar battery cost, battery storage worth it, solar plus storage" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Battery Storage Systems for Texas Homes: Complete Guide',
            description: 'Comprehensive guide to solar battery storage including costs, benefits, and best options for Texas homeowners',
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
            <h1 className="text-4xl font-bold mb-4">Battery Storage Systems for Texas Homes</h1>
            <p className="text-xl text-blue-100">Everything you need to know about adding battery backup to your solar system</p>
            <div className="mt-6 flex items-center text-sm text-blue-100">
              <Battery className="h-4 w-4 mr-2" />
              <span>9 min read • Essential Guide</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Key Takeaways */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Battery className="h-5 w-5 mr-2 text-blue-600" />
              Key Takeaways
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Battery storage adds $10,000-$20,000 to your solar system cost</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Texas grid instability (Winter Storm Uri) makes batteries increasingly valuable</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Federal ITC covers 30% of battery cost when installed with solar</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Typical payback period: 15-20 years (mainly provides backup value, not financial ROI)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Tesla Powerwall, LG Chem, and Enphase are the leading residential options</span>
              </li>
            </ul>
          </div>

          {/* Why Battery Storage */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Add Battery Storage to Your Solar System?</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Solar panels only generate electricity when the sun is shining. Without battery storage, excess solar
                energy is sent back to the grid, and you draw from the grid at night. Battery storage changes this dynamic
                by storing your excess solar energy for use when you need it most.
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Home className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Backup Power During Outages</h3>
                  <p className="text-sm text-gray-600">
                    Keep essential appliances running during grid failures. Critical after events like Winter Storm Uri (2021).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <DollarSign className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Energy Independence</h3>
                  <p className="text-sm text-gray-600">
                    Reduce reliance on the grid by using stored solar energy at night instead of buying grid power.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Zap className="h-8 w-8 text-yellow-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Time-of-Use Rate Optimization</h3>
                  <p className="text-sm text-gray-600">
                    Use stored solar during peak rate hours to avoid high electricity costs (if your utility has TOU rates).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <CheckCircle className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Grid Services & Incentives</h3>
                  <p className="text-sm text-gray-600">
                    Participate in grid services programs and earn payments for making your battery available to the grid.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <p className="font-medium text-gray-900 mb-2">⚡ Texas Grid Reliability Concerns:</p>
                <p className="text-gray-700 text-sm">
                  Texas's independent grid (ERCOT) has experienced several high-profile failures, including the 2021
                  Winter Storm Uri that left millions without power for days. Battery storage provides peace of mind and
                  protection against future grid instability.
                </p>
              </div>
            </div>
          </section>

          {/* How Battery Storage Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Solar Battery Storage Works</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">1. During the Day (Sunny Weather)</h3>
                  <div className="bg-yellow-50 p-4 rounded">
                    <p className="text-sm mb-2">☀️ Solar panels generate electricity</p>
                    <p className="text-sm">
                      <strong>Priority 1:</strong> Power your home's immediate needs<br/>
                      <strong>Priority 2:</strong> Charge your battery<br/>
                      <strong>Priority 3:</strong> Send excess to grid (if net metering available)
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">2. During the Evening/Night</h3>
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-sm mb-2">🌙 Solar panels are not producing</p>
                    <p className="text-sm">
                      <strong>Without Battery:</strong> You draw power from the grid and pay retail rates<br/>
                      <strong>With Battery:</strong> You use stored solar energy from your battery first, avoiding grid charges
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">3. During Grid Outages</h3>
                  <div className="bg-red-50 p-4 rounded">
                    <p className="text-sm mb-2">⚠️ Grid power is unavailable</p>
                    <p className="text-sm">
                      <strong>Without Battery:</strong> Your solar system shuts down (safety requirement) and you have no power<br/>
                      <strong>With Battery:</strong> Your system disconnects from grid, and battery powers essential loads automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <p className="text-sm text-gray-700">
                <strong>💡 Important Note:</strong> Most solar systems without batteries shut down during grid outages
                due to anti-islanding requirements. This safety feature prevents solar systems from feeding power to the
                grid while utility workers are making repairs. Battery systems include special equipment that safely
                disconnects from the grid while keeping your home powered.
              </p>
            </div>
          </section>

          {/* Popular Battery Options */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Battery Storage Options for Texas Homes</h2>

            <div className="space-y-6">
              {/* Tesla Powerwall */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4">
                  <h3 className="text-2xl font-bold">Tesla Powerwall 3</h3>
                  <p className="text-red-100">Most popular residential battery</p>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Specifications</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Capacity:</strong> 13.5 kWh usable</li>
                        <li>• <strong>Power Output:</strong> 11.5 kW continuous (peak higher)</li>
                        <li>• <strong>Efficiency:</strong> 97.5% round-trip</li>
                        <li>• <strong>Warranty:</strong> 10 years</li>
                        <li>• <strong>Dimensions:</strong> 43.25" x 24" x 7.6"</li>
                        <li>• <strong>Weight:</strong> 287 lbs</li>
                        <li>• <strong>Installation:</strong> Indoor or outdoor (NEMA 3R rated)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Pros & Cons</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-green-700 font-medium text-sm mb-1">✓ Advantages:</p>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• Integrated inverter (no separate solar inverter needed)</li>
                            <li>• Sleek, modern design</li>
                            <li>• Excellent monitoring app</li>
                            <li>• Scalable (up to 4 units for 54 kWh)</li>
                            <li>• Strong brand reputation</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-red-700 font-medium text-sm mb-1">✗ Disadvantages:</p>
                          <ul className="text-xs space-y-1 ml-4">
                            <li>• Must be installed by Tesla-certified installers</li>
                            <li>• Limited installer availability in some areas</li>
                            <li>• Can have long wait times for installation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 bg-gray-50 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Typical Cost (Texas):</span>
                      <span className="text-2xl font-bold text-red-600">$11,500 - $14,000</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Includes equipment and installation. After 30% federal ITC: $8,050 - $9,800</p>
                  </div>
                </div>
              </div>

              {/* LG Chem/Enphase */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
                  <h3 className="text-2xl font-bold">LG Chem RESU / Enphase IQ Battery</h3>
                  <p className="text-blue-100">Flexible, installer-friendly options</p>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">LG Chem RESU Prime</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Capacity:</strong> 16 kWh usable</li>
                        <li>• <strong>Power Output:</strong> 7 kW continuous, 11 kW peak</li>
                        <li>• <strong>Efficiency:</strong> 95% round-trip</li>
                        <li>• <strong>Warranty:</strong> 10 years</li>
                        <li>• <strong>Installation:</strong> Indoor/outdoor rated</li>
                      </ul>
                      <p className="text-green-700 text-xs mt-3">✓ Higher capacity than Powerwall</p>
                      <p className="text-red-700 text-xs">✗ Requires separate inverter</p>
                      <div className="mt-4 bg-gray-50 p-3 rounded">
                        <p className="font-semibold text-sm">Cost: $12,000 - $15,000</p>
                        <p className="text-xs text-gray-600">After 30% ITC: $8,400 - $10,500</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Enphase IQ Battery 5P</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Capacity:</strong> 5 kWh per unit (modular)</li>
                        <li>• <strong>Power Output:</strong> 3.84 kW continuous per unit</li>
                        <li>• <strong>Efficiency:</strong> 89% round-trip</li>
                        <li>• <strong>Warranty:</strong> 15 years (best in class)</li>
                        <li>• <strong>Installation:</strong> Indoor or outdoor</li>
                      </ul>
                      <p className="text-green-700 text-xs mt-3">✓ Modular design (add more anytime)</p>
                      <p className="text-green-700 text-xs">✓ Works with Enphase microinverters</p>
                      <div className="mt-4 bg-gray-50 p-3 rounded">
                        <p className="font-semibold text-sm">Cost: $7,000 - $9,000 per unit</p>
                        <p className="text-xs text-gray-600">3 units (15 kWh) = $21,000-$27,000</p>
                        <p className="text-xs text-gray-600">After 30% ITC: $14,700 - $18,900</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Options */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Other Notable Options</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold mb-2">Sonnen eco</h4>
                    <p className="text-sm text-gray-700 mb-2">Premium German battery with longest lifespan</p>
                    <ul className="text-xs space-y-1">
                      <li>• 10-20 kWh options</li>
                      <li>• 10,000 cycle warranty (vs 4,000-7,000 others)</li>
                      <li>• Premium cost: $15,000 - $25,000+</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-2">Generac PWRcell</h4>
                    <p className="text-sm text-gray-700 mb-2">Modular system from generator company</p>
                    <ul className="text-xs space-y-1">
                      <li>• 9-18 kWh modular capacity</li>
                      <li>• Backed by established company</li>
                      <li>• Cost: $12,000 - $20,000</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-2">Franklin WH aPower</h4>
                    <p className="text-sm text-gray-700 mb-2">Newer entrant with competitive specs</p>
                    <ul className="text-xs space-y-1">
                      <li>• 13.6 kWh usable</li>
                      <li>• 12 kW continuous power</li>
                      <li>• Cost: $11,000 - $14,000</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-2">SolarEdge Home Battery</h4>
                    <p className="text-sm text-gray-700 mb-2">Integrated with SolarEdge inverters</p>
                    <ul className="text-xs space-y-1">
                      <li>• 9.7 kWh per unit</li>
                      <li>• Works with existing SolarEdge systems</li>
                      <li>• Cost: $10,000 - $13,000</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Breakdown */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Complete Cost Breakdown</h2>
                <p className="text-gray-600">What you'll actually pay for battery storage</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Typical Solar + Storage System (Texas, 2024)</h3>

              <div className="bg-white p-6 rounded-lg mb-4">
                <h4 className="font-semibold mb-3">7 kW Solar System + Single Tesla Powerwall</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>7 kW Solar System:</span>
                    <span className="font-bold">$19,250</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Tesla Powerwall 3 (13.5 kWh):</span>
                    <span className="font-bold">$13,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Additional Installation/Equipment:</span>
                    <span className="font-bold">$2,000</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg border-b pb-2">
                    <span>Total System Cost:</span>
                    <span>$34,250</span>
                  </div>
                  <div className="flex justify-between items-center text-green-700 font-bold text-lg">
                    <span>After 30% Federal ITC:</span>
                    <span>$23,975</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold mb-2">Solar Only System</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-1">$13,475</p>
                  <p className="text-sm text-gray-600">After federal ITC</p>
                </div>
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold mb-2">Solar + Battery Premium</h4>
                  <p className="text-3xl font-bold text-orange-600 mb-1">+$10,500</p>
                  <p className="text-sm text-gray-600">Additional cost for battery</p>
                </div>
              </div>
            </div>
          </section>

          {/* Is It Worth It? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Is Battery Storage Worth It for Your Texas Home?</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Battery storage adds significant cost but provides value beyond financial ROI. Here's how to determine
                if it's worth it for your situation:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">✓ Battery Storage Makes Sense If:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You experienced extended outages during Winter Storm Uri or other events</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You have medical equipment or work-from-home needs requiring reliable power</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Your utility has time-of-use (TOU) rates with significant peak/off-peak differences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You live in rural areas with frequent outages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You value energy independence and peace of mind</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Your utility has poor net metering or low buyback rates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You can afford the $10,000-$15,000 premium after incentives</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">✗ You Can Skip Batteries If:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Your primary goal is maximizing financial ROI</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>You rarely experience power outages in your area</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Budget is tight and solar-only already stretches finances</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>You have good net metering with 1:1 credit ratios</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>You already have a backup generator</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>You don't mind losing power during rare grid outages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Your utility doesn't have TOU rates or demand charges</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">💡 Our Recommendation for Texas Homeowners:</h3>
                <p className="text-sm mb-3">
                  Given Texas's grid reliability concerns and the devastating impact of Winter Storm Uri (2021), battery
                  storage is increasingly valuable for Texas homeowners—not for financial ROI, but for resilience and peace of mind.
                </p>
                <p className="text-sm">
                  <strong>Best Approach:</strong> If budget allows, install battery with solar initially (shares installation
                  costs and qualifies battery for federal ITC). If budget is tight, install solar-only now and add battery
                  later when prices drop or your financial situation improves.
                </p>
              </div>
            </div>
          </section>

          {/* Sizing Your Battery */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Size Your Battery Storage System</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Battery size depends on what you want to power and for how long during an outage. Here's a framework:
              </p>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Essential Loads to Calculate</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Critical Loads Only (Minimal Backup)</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Refrigerator: 150-400W</li>
                      <li>• Lights: 100-300W</li>
                      <li>• WiFi/Router: 10-20W</li>
                      <li>• Phone charging: 20-50W</li>
                      <li>• Medical devices (if applicable): varies</li>
                    </ul>
                    <p className="text-sm mt-2 font-medium">
                      <strong>Estimated Total:</strong> 300-800W continuous<br/>
                      <strong>Battery Recommendation:</strong> Single 10-13 kWh battery sufficient
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Comfortable Living (Moderate Backup)</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• All critical loads above</li>
                      <li>• TV and entertainment: 100-300W</li>
                      <li>• Window AC unit (1 room): 1,000-1,500W</li>
                      <li>• Microwave (intermittent): 1,000W</li>
                      <li>• Washer/Dryer (if needed): 1,000-5,000W</li>
                    </ul>
                    <p className="text-sm mt-2 font-medium">
                      <strong>Estimated Total:</strong> 1,500-3,000W continuous (more for AC)<br/>
                      <strong>Battery Recommendation:</strong> 15-20 kWh (1-2 batteries)
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Whole Home Backup (Maximum Comfort)</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• All moderate loads above</li>
                      <li>• Central AC: 3,000-5,000W</li>
                      <li>• Electric water heater: 4,000-5,500W</li>
                      <li>• All appliances as needed</li>
                    </ul>
                    <p className="text-sm mt-2 font-medium">
                      <strong>Estimated Total:</strong> 5,000-10,000W peak (with load management)<br/>
                      <strong>Battery Recommendation:</strong> 25-40+ kWh (2-3 batteries minimum)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-medium text-gray-900 mb-2">⚠️ Important Considerations:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Air Conditioning:</strong> Central AC is the biggest power draw. Most single batteries
                  can't run central AC for extended periods in Texas heat.</li>
                  <li>• <strong>Electric Heat:</strong> Heating loads (heat pump, electric resistance) can quickly drain batteries in winter.</li>
                  <li>• <strong>Load Management:</strong> Smart systems can prioritize loads or cycle high-draw appliances to maximize backup time.</li>
                  <li>• <strong>Solar Recharging:</strong> During multi-day outages, solar can recharge battery during the day, extending backup indefinitely.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Battery vs Generator */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Battery Storage vs. Backup Generator</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold text-blue-700">Battery Storage</th>
                    <th className="px-4 py-3 text-center font-semibold text-orange-700">Backup Generator</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 font-medium">Upfront Cost</td>
                    <td className="px-4 py-3 text-center">$10,000-$20,000+</td>
                    <td className="px-4 py-3 text-center bg-green-50">$3,000-$10,000 ⭐</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Ongoing Costs</td>
                    <td className="px-4 py-3 text-center bg-green-50">Minimal ⭐</td>
                    <td className="px-4 py-3 text-center">Fuel + maintenance</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Switchover Time</td>
                    <td className="px-4 py-3 text-center bg-green-50">Instant ⭐</td>
                    <td className="px-4 py-3 text-center">30-60 seconds</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Runtime</td>
                    <td className="px-4 py-3 text-center">Limited by capacity</td>
                    <td className="px-4 py-3 text-center bg-green-50">Unlimited (with fuel) ⭐</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Noise</td>
                    <td className="px-4 py-3 text-center bg-green-50">Silent ⭐</td>
                    <td className="px-4 py-3 text-center">Loud (60-70 dB)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Emissions</td>
                    <td className="px-4 py-3 text-center bg-green-50">Zero ⭐</td>
                    <td className="px-4 py-3 text-center">CO2, requires ventilation</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Maintenance</td>
                    <td className="px-4 py-3 text-center bg-green-50">Minimal ⭐</td>
                    <td className="px-4 py-3 text-center">Regular oil changes, testing</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Federal Incentive</td>
                    <td className="px-4 py-3 text-center bg-green-50">30% ITC ⭐</td>
                    <td className="px-4 py-3 text-center">None</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Daily Value</td>
                    <td className="px-4 py-3 text-center bg-green-50">TOU/demand savings ⭐</td>
                    <td className="px-4 py-3 text-center">None (outage only)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Lifespan</td>
                    <td className="px-4 py-3 text-center">10-15 years</td>
                    <td className="px-4 py-3 text-center bg-green-50">20-30 years ⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <p className="text-sm font-medium text-gray-900 mb-2">💡 Best of Both Worlds:</p>
              <p className="text-sm text-gray-700">
                Some homeowners install both: Battery for instant, silent backup of critical loads and daily TOU savings,
                plus a generator for extended outages or whole-home backup. The battery covers 95% of outages while the
                generator sits ready for rare, extended grid failures.
              </p>
            </div>
          </section>

          {/* Installation & Permitting */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Installation & Permitting</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <h3 className="text-xl font-semibold mt-6 mb-3">What to Expect</h3>

              <ol className="space-y-3 ml-4">
                <li>
                  <strong>1. Site Assessment:</strong> Installer evaluates electrical panel, mounting location (indoor/outdoor),
                  and determines critical load panel requirements.
                </li>
                <li>
                  <strong>2. Permitting:</strong> Building permits required for electrical work. Timeline: 2-6 weeks depending
                  on jurisdiction.
                </li>
                <li>
                  <strong>3. Installation:</strong> Typically 1-2 days for battery installation, longer if upgrading electrical
                  panel or adding critical load subpanel.
                </li>
                <li>
                  <strong>4. Inspection:</strong> Electrical inspection required before activation. Schedule depends on local
                  inspector availability.
                </li>
                <li>
                  <strong>5. Utility Permission-to-Operate (PTO):</strong> Required for systems that can export to grid.
                  Can take 1-8 weeks.
                </li>
              </ol>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-semibold mb-4">Installation Considerations</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Location:</strong> Batteries should be installed in temperature-controlled environments when
                    possible. Most modern batteries are rated for outdoor installation but perform best between 50-85°F.
                    Texas's extreme heat can reduce battery lifespan.
                  </li>
                  <li>
                    <strong>Electrical Panel:</strong> You may need a panel upgrade if your existing panel doesn't have
                    capacity for battery connections. Add $2,000-$5,000 if required.
                  </li>
                  <li>
                    <strong>Critical Load Panel:</strong> Many installations use a subpanel for critical loads to maximize
                    battery runtime. Not always required but highly recommended.
                  </li>
                  <li>
                    <strong>Installers:</strong> Only use certified installers for your battery brand. Poor installation
                    can void warranties and create safety hazards.
                  </li>
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
                  Can I add a battery to my existing solar system?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  Yes, in most cases. However, your existing inverter must be compatible, or you may need to add a separate
                  battery inverter. If you have micro-inverters (Enphase, APsystems), you'll need an AC-coupled battery
                  solution. Adding a battery after solar installation is more expensive than installing together initially,
                  and the battery may not qualify for the federal ITC unless charged 75%+ by your solar system.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  How long will a battery power my home during an outage?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  It depends on your usage. A typical 13.5 kWh battery can power essential loads (refrigerator, lights,
                  WiFi, small appliances) for 12-24 hours. Running central AC in Texas heat will drain a single battery
                  in 2-4 hours. If the outage occurs during daytime with sun, your solar panels can recharge the battery,
                  potentially providing indefinite backup for critical loads.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  What happens when my battery warranty expires?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  Most batteries have 10-year warranties guaranteeing 70% of original capacity. After warranty expiration,
                  the battery continues working but with reduced capacity. You can continue using it, replace it with a
                  newer/better model, or remove it. Battery technology and prices improve rapidly, so replacement batteries
                  in 10-15 years will likely be much better and cheaper than today's options.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Can I go completely off-grid with solar + battery?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  Technically yes, but it's extremely expensive and not recommended for most homes. True off-grid requires
                  oversized solar arrays (2-3x normal size) and massive battery banks (40-100+ kWh) to handle cloudy days
                  and winter months with less sun. Most "off-grid" setups still struggle in Texas summers with AC demand.
                  Grid-tied solar with battery backup provides 95% of the benefits at 20% of the cost.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Do batteries require maintenance?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  Modern lithium-ion batteries require minimal maintenance. No regular servicing needed like with generators.
                  However, you should monitor system performance through the app, ensure proper ventilation, and schedule
                  professional inspection every 2-3 years. Keep the area around the battery clean and dry. Firmware updates
                  are typically automatic via WiFi.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Solar + Storage Quotes?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Compare quotes from installers offering battery storage options for your Texas home
            </p>
            <Link
              to="/"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Free Solar Quotes
            </Link>
            <p className="mt-4 text-sm text-blue-100">
              Installers will provide pricing for solar-only and solar + battery options
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
