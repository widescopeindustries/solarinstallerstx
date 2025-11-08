import React from 'react';
import { ArrowLeft, Zap, DollarSign, Thermometer, Award, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';

export default function SolarPanelTypesGuide() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Solar Panel Types: Monocrystalline vs Polycrystalline',
    description: 'Comprehensive guide to different types of solar panels and which is best for Texas homeowners',
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
        title="Solar Panel Types Guide - Comparison"
        description="Compare solar panel types: monocrystalline, polycrystalline, and thin-film for Texas homes."
        canonicalUrl="https://solarinstallerstx.com/learn/solar-panel-types-guide"
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
            <h1 className="text-4xl font-bold mb-4">Solar Panel Types: Complete Comparison</h1>
            <p className="text-xl text-blue-100">Monocrystalline vs Polycrystalline vs Thin-Film: Which is right for your Texas home?</p>
            <div className="mt-6 flex items-center text-sm text-blue-100">
              <Zap className="h-4 w-4 mr-2" />
              <span>10 min read • Technology Guide</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Decision Guide */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              Quick Decision Guide
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong className="text-blue-600">Choose Monocrystalline if:</strong> You have limited roof space, want maximum efficiency, and can afford premium pricing</p>
              <p><strong className="text-green-600">Choose Polycrystalline if:</strong> You have adequate roof space, want good value, and prefer a lower upfront cost</p>
              <p><strong className="text-orange-600">Choose Thin-Film if:</strong> You have a commercial building, need flexible installations, or have significant shading issues</p>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Solar Panel Technology</h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Not all solar panels are created equal. The type of solar panel you choose affects your system's efficiency,
                cost, appearance, and long-term performance. In Texas's hot, sunny climate, understanding these differences
                is crucial to maximizing your solar investment.
              </p>

              <p>
                The three main types of solar panels available for residential installation are:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-white p-5 rounded-lg shadow-md border-t-4 border-blue-600">
                  <h3 className="font-semibold text-lg mb-2">Monocrystalline</h3>
                  <p className="text-sm text-gray-600">Made from single-crystal silicon</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">18-22%</p>
                  <p className="text-xs text-gray-500">Efficiency Range</p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md border-t-4 border-green-600">
                  <h3 className="font-semibold text-lg mb-2">Polycrystalline</h3>
                  <p className="text-sm text-gray-600">Made from multiple silicon crystals</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">15-17%</p>
                  <p className="text-xs text-gray-500">Efficiency Range</p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md border-t-4 border-orange-600">
                  <h3 className="font-semibold text-lg mb-2">Thin-Film</h3>
                  <p className="text-sm text-gray-600">Various thin semiconductor materials</p>
                  <p className="text-2xl font-bold text-orange-600 mt-2">10-13%</p>
                  <p className="text-xs text-gray-500">Efficiency Range</p>
                </div>
              </div>
            </div>
          </section>

          {/* Monocrystalline Panels */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Monocrystalline Solar Panels</h2>
                <p className="text-gray-600">The premium, high-efficiency choice</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Monocrystalline panels are made from single-crystal silicon, giving them their characteristic uniform dark
                appearance. They're the most efficient and longest-lasting solar panels available for residential use.
              </p>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden my-6">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">✓ Advantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Highest Efficiency:</strong> 18-22%, meaning more power per square foot</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Best for Limited Space:</strong> Produces more power with fewer panels</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Longer Lifespan:</strong> Typically 25-30+ years with minimal degradation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Better Heat Tolerance:</strong> Performs better in Texas's hot climate</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Sleek Appearance:</strong> Uniform black color looks more aesthetically pleasing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Better Low-Light Performance:</strong> Generates more power on cloudy days</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Higher Resale Value:</strong> Premium panels increase home value more</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">✗ Disadvantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Higher Cost:</strong> 15-30% more expensive than polycrystalline</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>More Waste in Production:</strong> Manufacturing creates more silicon waste</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Performance Drop with Damage:</strong> Even small damage can significantly reduce efficiency</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Popular Monocrystalline Brands</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Premium Tier:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• SunPower (22-22.8% efficiency)</li>
                      <li>• LG (21-22% efficiency)</li>
                      <li>• Panasonic (21.2% efficiency)</li>
                      <li>• REC Solar (21.7% efficiency)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Mid-Range Tier:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Q CELLS (19-20.6% efficiency)</li>
                      <li>• Canadian Solar (19-20% efficiency)</li>
                      <li>• Trina Solar (19-21% efficiency)</li>
                      <li>• Jinko Solar (19-20.7% efficiency)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Typical Pricing (Texas, 2024)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Cost per Watt:</span>
                    <span className="font-bold text-blue-600">$2.75 - $3.50/W</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>6 kW System:</span>
                    <span className="font-bold">$16,500 - $21,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>After 30% Federal Tax Credit:</span>
                    <span className="font-bold text-green-600">$11,550 - $14,700</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Polycrystalline Panels */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Polycrystalline Solar Panels</h2>
                <p className="text-gray-600">The value-oriented choice</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Polycrystalline panels are made from multiple silicon crystals melted together, giving them a distinctive
                blue, speckled appearance. They offer a good balance of cost and performance for homeowners with adequate roof space.
              </p>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden my-6">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">✓ Advantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Lower Cost:</strong> 15-30% cheaper than monocrystalline</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Good Efficiency:</strong> 15-17%, suitable for most homes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Less Waste:</strong> Simpler manufacturing process creates less silicon waste</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Reliable Performance:</strong> Proven technology with consistent results</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Widely Available:</strong> More options from various manufacturers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Better ROI:</strong> Lower cost can mean faster payback period</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">✗ Disadvantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Lower Efficiency:</strong> Need more panels to produce same power</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>More Space Required:</strong> Not ideal for limited roof area</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Heat Sensitivity:</strong> Slightly worse performance in Texas heat</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Less Aesthetic:</strong> Blue, speckled appearance less uniform</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Shorter Lifespan:</strong> Typically 20-25 years vs 25-30+ for mono</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Popular Polycrystalline Brands</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Canadian Solar:</strong> Affordable, reliable panels (15-17% efficiency)</li>
                  <li>• <strong>Trina Solar:</strong> Good value with solid warranties (15-17% efficiency)</li>
                  <li>• <strong>Jinko Solar:</strong> Budget-friendly option (15-16% efficiency)</li>
                  <li>• <strong>Astronergy:</strong> Lesser-known but quality option (15-16% efficiency)</li>
                </ul>
                <p className="text-sm mt-4 text-gray-600">
                  <strong>Note:</strong> Many manufacturers are phasing out polycrystalline in favor of monocrystalline
                  as production costs have decreased. Availability may be limited.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Typical Pricing (Texas, 2024)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Cost per Watt:</span>
                    <span className="font-bold text-green-600">$2.25 - $2.75/W</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>6 kW System:</span>
                    <span className="font-bold">$13,500 - $16,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>After 30% Federal Tax Credit:</span>
                    <span className="font-bold text-green-600">$9,450 - $11,550</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Thin-Film Panels */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Thin-Film Solar Panels</h2>
                <p className="text-gray-600">The specialized, flexible option</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Thin-film panels are made by depositing thin layers of photovoltaic material onto a substrate. They're
                lighter, more flexible, and less common for residential installations but have specific use cases.
              </p>

              <div className="bg-orange-50 p-4 rounded-lg mb-6">
                <p className="text-sm font-medium">
                  <strong>Common Thin-Film Technologies:</strong> Amorphous Silicon (a-Si), Cadmium Telluride (CdTe),
                  and Copper Indium Gallium Selenide (CIGS)
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden my-6">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">✓ Advantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Flexible & Lightweight:</strong> Can conform to curved surfaces</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Better Shade Tolerance:</strong> Performs better with partial shading</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Heat Resistant:</strong> Less affected by high temperatures</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Easier Installation:</strong> Lightweight reduces structural requirements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Uniform Appearance:</strong> Solid black color, no grid lines visible</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Low-Light Performance:</strong> Works well in diffuse or indirect light</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">✗ Disadvantages</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Very Low Efficiency:</strong> 10-13%, requiring much more space</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Not Space Efficient:</strong> Need 2-3x more roof space</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Faster Degradation:</strong> Efficiency drops more over time</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Shorter Lifespan:</strong> Typically 10-20 years</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Limited Residential Options:</strong> Few manufacturers offer residential thin-film</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span><strong>Lower Resale Value:</strong> Less desirable to future homebuyers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">When to Consider Thin-Film</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ Large commercial buildings with ample flat roof space</li>
                  <li>✓ Buildings with structural limitations (can't support heavy crystalline panels)</li>
                  <li>✓ RVs, boats, or other mobile applications</li>
                  <li>✓ Installations with significant shading that can't be mitigated</li>
                  <li>✓ Areas with extreme heat where temp coefficient benefits outweigh efficiency loss</li>
                  <li>✗ <strong>Rarely recommended for Texas residential installations</strong> due to space requirements</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Typical Pricing (Texas, 2024)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Cost per Watt:</span>
                    <span className="font-bold text-orange-600">$2.00 - $2.50/W</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Note: Lower $/W but need ~2x the wattage for same production</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Side-by-Side Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Side-by-Side Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-center font-semibold text-blue-700">Monocrystalline</th>
                    <th className="px-4 py-3 text-center font-semibold text-green-700">Polycrystalline</th>
                    <th className="px-4 py-3 text-center font-semibold text-orange-700">Thin-Film</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 font-medium">Efficiency</td>
                    <td className="px-4 py-3 text-center bg-green-50">18-22% ⭐⭐⭐</td>
                    <td className="px-4 py-3 text-center bg-yellow-50">15-17% ⭐⭐</td>
                    <td className="px-4 py-3 text-center bg-red-50">10-13% ⭐</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Cost per Watt</td>
                    <td className="px-4 py-3 text-center">$2.75-$3.50</td>
                    <td className="px-4 py-3 text-center bg-green-50">$2.25-$2.75 ⭐⭐⭐</td>
                    <td className="px-4 py-3 text-center">$2.00-$2.50</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Lifespan</td>
                    <td className="px-4 py-3 text-center bg-green-50">25-30+ years ⭐⭐⭐</td>
                    <td className="px-4 py-3 text-center">20-25 years ⭐⭐</td>
                    <td className="px-4 py-3 text-center bg-red-50">10-20 years ⭐</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Space Required</td>
                    <td className="px-4 py-3 text-center bg-green-50">Least ⭐⭐⭐</td>
                    <td className="px-4 py-3 text-center">Moderate ⭐⭐</td>
                    <td className="px-4 py-3 text-center bg-red-50">Most ⭐</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Heat Tolerance</td>
                    <td className="px-4 py-3 text-center bg-green-50">Excellent ⭐⭐⭐</td>
                    <td className="px-4 py-3 text-center">Good ⭐⭐</td>
                    <td className="px-4 py-3 text-center bg-green-50">Excellent ⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Appearance</td>
                    <td className="px-4 py-3 text-center bg-green-50">Uniform black ⭐⭐⭐</td>
                    <td className="px-4 py-3 text-center">Blue, speckled ⭐⭐</td>
                    <td className="px-4 py-3 text-center">Uniform black ⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Low-Light Performance</td>
                    <td className="px-4 py-3 text-center bg-green-50">Very Good ⭐⭐⭐</td>
                    <td className="px-4 py-3 text-center">Good ⭐⭐</td>
                    <td className="px-4 py-3 text-center bg-green-50">Very Good ⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Warranty (Power)</td>
                    <td className="px-4 py-3 text-center">25 years typical</td>
                    <td className="px-4 py-3 text-center">25 years typical</td>
                    <td className="px-4 py-3 text-center">10-25 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Best For Texas?</td>
                    <td className="px-4 py-3 text-center bg-green-50">Yes ⭐⭐⭐</td>
                    <td className="px-4 py-3 text-center">Yes ⭐⭐</td>
                    <td className="px-4 py-3 text-center bg-red-50">Rarely ⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Temperature Coefficient */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <Thermometer className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Temperature Coefficient: Critical for Texas</h2>
                <p className="text-gray-600">Why this matters in hot climates</p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                The temperature coefficient measures how much a panel's efficiency decreases as temperatures rise above 77°F (25°C).
                In Texas, where roof temperatures can exceed 150°F in summer, this is crucial.
              </p>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Typical Temperature Coefficients</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Premium Monocrystalline (SunPower)</span>
                      <span className="text-green-600 font-bold">-0.29%/°C</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Standard Monocrystalline</span>
                      <span className="text-blue-600 font-bold">-0.35 to -0.40%/°C</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Polycrystalline</span>
                      <span className="text-orange-600 font-bold">-0.40 to -0.45%/°C</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Thin-Film</span>
                      <span className="text-green-600 font-bold">-0.20 to -0.25%/°C</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <p className="font-medium text-gray-900 mb-2">Real-World Impact in Texas:</p>
                <p className="text-gray-700 text-sm">
                  On a 150°F Texas roof (75°F above standard test conditions), a panel with -0.40%/°C loses 30% of its rated
                  power, while a premium panel at -0.29%/°C loses only 22%. Over 25 years, this difference can mean thousands
                  of dollars in lost production.
                </p>
              </div>
            </div>
          </section>

          {/* Decision Guide for Texas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Which Panel Type is Right for Your Texas Home?</h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Choose Monocrystalline If:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>You have limited roof space (need maximum power per square foot)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>You want the best long-term performance and ROI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Aesthetics matter (sleek black appearance)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>You plan to stay in your home long-term (maximize 25+ year lifespan)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>You can afford the premium (15-30% higher upfront cost)</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm font-medium text-blue-900">
                  <strong>Bottom Line:</strong> Best choice for most Texas homeowners who can afford it.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h3 className="text-xl font-semibold text-green-900 mb-3">Choose Polycrystalline If:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>You have plenty of roof space (can fit more panels)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Upfront cost is your primary concern</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>You want faster payback period</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Appearance is less important than function</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>You can find them (increasingly difficult as manufacturers shift to mono)</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm font-medium text-green-900">
                  <strong>Bottom Line:</strong> Good value option if budget-constrained and have roof space.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg shadow-md border-l-4 border-orange-600">
                <h3 className="text-xl font-semibold text-orange-900 mb-3">Choose Thin-Film If:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>You have a commercial building with vast roof space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>Your roof can't support heavy crystalline panels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>You have significant shading that can't be avoided</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    <span>You need flexibility (RV, boat, unusual architecture)</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm font-medium text-orange-900">
                  <strong>Bottom Line:</strong> Rarely the best choice for Texas residential installations.
                </p>
              </div>
            </div>
          </section>

          {/* Expert Recommendation */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Our Expert Recommendation for Texas Homeowners</h2>
              <p className="text-blue-100 mb-4">
                <strong className="text-white">Go with monocrystalline panels from a reputable manufacturer.</strong>
              </p>
              <p className="text-blue-100 mb-4">
                Texas's intense heat and abundant sunshine make high-efficiency, heat-tolerant panels essential. While
                monocrystalline panels cost 15-30% more upfront, they deliver:
              </p>
              <ul className="space-y-2 text-blue-100 mb-6">
                <li>• 15-20% more production over the system lifetime</li>
                <li>• Better performance in Texas's extreme heat</li>
                <li>• Longer warranties and lifespan (25-30+ years)</li>
                <li>• Higher home resale value</li>
                <li>• Better ROI despite higher initial cost</li>
              </ul>
              <p className="text-sm text-blue-100">
                For most Texas homeowners, the extra upfront investment in monocrystalline panels pays for itself within
                the first 5-7 years through higher production, then continues delivering superior performance for decades.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Can I mix different panel types on my roof?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  While technically possible, it's not recommended. Different panel types have different electrical
                  characteristics (voltage, current), which can cause system inefficiencies and complicate inverter selection.
                  If you must expand your system later, try to use the same panel type or use separate inverters.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  How much does panel efficiency really matter?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  Efficiency matters most when you have limited roof space. If you have ample roof area, you can achieve
                  the same total production with more lower-efficiency panels. However, higher efficiency usually also means
                  better temperature tolerance and longer lifespan, which matters in Texas's climate.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Do panel types affect warranty coverage?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  Not directly, but premium monocrystalline panels often come with longer and more comprehensive warranties.
                  Most panels (mono and poly) offer 25-year power warranties, but premium brands may offer better production
                  guarantees (e.g., 92% vs 85% at year 25) and stronger manufacturer backing.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Are bifacial panels worth considering?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  Bifacial panels (which capture light from both front and back) are typically monocrystalline and can
                  provide 5-20% more energy in ideal conditions (light-colored roofs, ground-mounted systems). For most
                  Texas residential rooftops, the premium cost doesn't justify the modest gains. They're better suited
                  for commercial or ground-mounted installations.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-5">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  How do I know if the quoted panels are high quality?
                </summary>
                <p className="mt-3 text-gray-700 text-sm">
                  Check: (1) Manufacturer's tier ranking (Tier 1 is best), (2) PAN file listing (indicates IEC certification),
                  (3) Warranty terms and company financial stability, (4) Independent test results from PVEL or similar,
                  (5) Reviews from EnergySage or Solar Reviews. Avoid no-name brands offering suspiciously low prices.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Solar Quotes with Premium Panels?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Compare quotes from Texas installers offering high-efficiency monocrystalline panels
            </p>
            <Link
              to="/"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Free Solar Quotes
            </Link>
            <p className="mt-4 text-sm text-blue-100">
              All installers use Tier 1 equipment from trusted manufacturers
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
