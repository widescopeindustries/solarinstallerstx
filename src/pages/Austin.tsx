import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const AustinPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Austin, TX | NABCEP Certified | Free Quotes"
        description="Find the best NABCEP certified solar installers in Austin, TX. Get free quotes from top-rated companies, learn about Austin Energy rebates, and calculate your savings."
        canonicalUrl="https://solarinstallerstx.com/austin"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-green-500 text-white">
            <OptimizedImage
              src="/assets/austin-skyline-solar.webp"
              alt="Austin skyline with solar panels in the foreground"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              width={1920}
              height={400}
              sizes="100vw"
              fetchpriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Austin, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Your complete guide to going solar in the heart of Texas. Compare top NABCEP certified installers and maximize your savings with local rebates.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  Welcome to your definitive resource for solar energy in Austin, Texas. As a national leader in renewable energy, Austin offers some of the best incentives and highest potential for solar savings in the country. This guide will walk you through everything you need to know, from finding the best local installers to understanding the unique benefits available to Austin residents.
                </p>

                <h2 className="mt-12">Why Austin is a Premier City for Solar Energy</h2>
                <p>
                  Austin's commitment to sustainability, combined with its sunny climate and progressive utility programs, makes it an ideal location for solar panel installation. Homeowners and businesses in Austin can take advantage of significant financial and environmental benefits.
                </p>

                {/* Austin-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Austin Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Peak Sun Hours</td>
                        <td className="py-3">~5.3 hours/day (228 sunny days/year)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Austin Energy Rebate</td>
                        <td className="py-3">Up to <strong>$2,500</strong> for residential solar systems</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ Value of Solar Tariff</td>
                        <td className="py-3">Get credited for all the solar energy you produce at a premium rate</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">26% of total system cost (reducing average cost by $5,000+)</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">📈 Property Value</td>
                        <td className="py-3">Increases home value by an average of 4.1% without raising property taxes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Understanding the Austin Energy Solar Rebate & VoS Tariff</h2>
                <p>
                  Austin Energy's solar programs are a key reason why going solar in Austin is so financially attractive. Unlike other parts of Texas, Austin has a unique two-part incentive:
                </p>
                <ol>
                  <li>
                    <strong>Upfront Rebate:</strong> Austin Energy provides a one-time rebate of $2,500 to qualifying homeowners who install a solar panel system. This is paid directly to your installer, reducing your initial out-of-pocket cost.
                  </li>
                  <li>
                    <strong>Value of Solar (VoS) Tariff:</strong> Instead of traditional net metering, Austin Energy credits you for <em>every kilowatt-hour (kWh)</em> your system produces. This rate is calculated based on the value solar provides to the grid, often resulting in a higher credit than standard net metering. For 2024, the VoS rate is <strong>$0.097 per kWh</strong>.
                  </li>
                </ol>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                  <p className="text-sm font-medium text-blue-800">
                    💡 <strong>Key Takeaway:</strong> The VoS tariff means you benefit from your system's full production, regardless of how much electricity you use at home. This maximizes your return on investment.
                  </p>
                </div>

                <h2 className="mt-12">Finding the Best NABCEP Certified Installers in Austin</h2>
                <p>
                  Choosing a qualified installer is the most important step in your solar journey. In Austin, it's crucial to select an installer who is not only NABCEP certified but also an approved Austin Energy partner. This ensures they are familiar with local permitting, inspection processes, and rebate applications.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Local Expertise:</strong> They understand Austin's specific building codes and utility requirements.</li>
                    <li><strong>Rebate Processing:</strong> Approved partners handle all Austin Energy rebate paperwork for you.</li>
                    <li><strong>Quality Assurance:</strong> NABCEP certification guarantees the highest level of professionalism and technical skill.</li>
                </ul>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Austin's Top Solar Installers
                    </Button>
                </div>

                <h2 className="mt-12">Cost of Solar Panels in Austin, TX</h2>
                <p>
                  The average cost of a residential solar system in Austin ranges from $2.70 to $3.30 per watt. For a typical 6kW system, the total cost before incentives is around $17,100.
                </p>

                {/* Cost Breakdown Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">Sample 6kW Solar System Cost in Austin</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Gross System Cost</td>
                        <td className="py-2 text-right">$17,100</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">(-) Austin Energy Rebate</td>
                        <td className="py-2 text-right">-$2,500</td>
                      </tr>
                      <tr className="border-b bg-muted/30">
                        <td className="py-2 font-semibold">Cost After Rebate</td>
                        <td className="py-2 text-right font-semibold">$14,600</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">(-) 26% Federal Tax Credit</td>
                        <td className="py-2 text-right">-$3,796</td>
                      </tr>
                      <tr className="bg-green-50 border-green-200">
                        <td className="py-3 font-bold text-lg">Net Cost After All Incentives</td>
                        <td className="py-3 text-right font-bold text-lg text-green-600">$10,804</td>
                      </tr>
                    </tbody>
                  </table>
                   <p className="text-sm text-muted-foreground mt-4">
                    *This is an estimate. Actual costs and savings will vary. Use our calculator for a personalized estimate.
                  </p>
                </div>

                <h2 className="mt-12">Austin Solar Customer Testimonials</h2>
                <div className="space-y-6">
                    <div className="bg-card border rounded-lg p-6">
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">★★★★★</div>
                            <span className="ml-2 font-semibold">Sarah M., South Austin</span>
                        </div>
                        <blockquote className="italic text-muted-foreground">
                        "The installer we found through this site handled our Austin Energy rebate and made the whole process effortless. Our summer electricity bills went from over $300 to just the minimum connection fee. It's been a fantastic investment for our family."
                        </blockquote>
                    </div>
                    <div className="bg-card border rounded-lg p-6">
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">★★★★★</div>
                            <span className="ml-2 font-semibold">David L., Round Rock</span>
                        </div>
                        <blockquote className="italic text-muted-foreground">
                        "As an engineer, I was impressed with the technical knowledge of the NABCEP certified team. They designed a high-efficiency system perfect for our roof. The Value of Solar tariff has been even better than we expected."
                        </blockquote>
                    </div>
                </div>

                <h2 className="mt-12">Frequently Asked Questions for Austin Solar</h2>
                 <div className="space-y-4">
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">How does the Value of Solar (VoS) tariff work?</h3>
                     <p className="text-muted-foreground">Instead of just crediting you for excess energy sent to the grid, Austin Energy credits you for ALL energy your solar panels produce. This credit is applied to your monthly bill, offsetting your total energy consumption. If you produce more than you use, the credit rolls over to the next month.</p>
                   </div>
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">Do I need a battery storage system in Austin?</h3>
                     <p className="text-muted-foreground">While not required, a battery system like a Tesla Powerwall is highly recommended for energy independence. It allows you to store excess solar energy to use during power outages or at night, providing true energy security. Austin Energy also offers incentives for participating in battery demand response programs.</p>
                   </div>
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">How long does the permitting process take in Austin?</h3>
                     <p className="text-muted-foreground">The City of Austin's permitting process for solar can take anywhere from 2 to 6 weeks, depending on the complexity of the project and current application volumes. Working with an experienced local installer is key to navigating this process smoothly.</p>
                   </div>
                 </div>

              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="austin-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Austin Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Enter your address and average monthly bill to get a personalized estimate of your potential savings with an Austin solar system.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Go Solar in Austin?</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Take the next step towards energy independence and lower electricity bills. Get free, no-obligation quotes from top-rated, NABCEP certified solar installers in the Austin area.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Austin Solar Quotes
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does the Value of Solar (VoS) tariff work in Austin?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Instead of traditional net metering, Austin Energy credits you for all energy your solar panels produce at a specific Value of Solar (VoS) rate. This credit is applied to your monthly bill, offsetting your total energy consumption. For 2024, the rate is $0.097 per kWh."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Austin Energy solar rebate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Austin Energy offers a one-time rebate of up to $2,500 for qualifying residential solar panel installations. This rebate is paid directly to your installer, which reduces your upfront system cost."
                }
              },
              {
                "@type": "Question",
                "name": "How much do solar panels cost in Austin, TX?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average cost for a solar panel system in Austin is between $2.70 and $3.30 per watt. A typical 6kW system costs around $17,100 before the $2,500 Austin Energy rebate and the 26% federal tax credit, bringing the net cost down significantly."
                }
              }
            ]
          }
        `}
      </script>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Best Solar Installers in Austin, TX",
            "description": "Your complete guide to finding the best NABCEP certified solar installers in Austin, Texas. Learn about local incentives like the Austin Energy rebate and Value of Solar tariff.",
            "url": "https://solarinstallerstx.com/austin",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://solarinstallerstx.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Austin Solar Installers",
                  "item": "https://solarinstallerstx.com/austin"
                }
              ]
            }
          }
        `}
      </script>
    </>
  );
};

export default AustinPage;
