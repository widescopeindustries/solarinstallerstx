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
        title="Best Solar Installers Austin, TX | NABCEP Certified | Free Quotes | SolarInstallersTX"
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
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Austin, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Tap into the power of the Texas sun in the heart of the Hill Country. See why Austin's unique solar programs make it one of the best cities in the nation for clean energy.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  Welcome to your complete guide for going solar in Austin. In a city that prides itself on innovation and sustainability, solar power isn't just an energy choice—it's a statement. From the pioneering 'Value of Solar' tariff to generous local rebates, Austin offers a solar landscape unlike any other city in Texas. This guide will walk you through harnessing it.
                </p>

                <h2 className="mt-12">The Austin Advantage: More Than Just Sunshine</h2>
                <p>
                  Austin's reputation as a green, tech-forward city is well-earned, and its approach to solar energy is no exception. The city's official climate goals and progressive utility programs create a perfect environment for homeowners to invest in clean energy, ensuring both financial returns and a positive environmental impact.
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

                <h2>Dissecting the Austin Energy Solar Rebate & VoS Tariff</h2>
                <p>
                  The powerful, two-part incentive from Austin Energy is what truly sets the city apart. It's designed to make solar accessible and maximize your return on investment.
                </p>
                <ol>
                  <li>
                    <strong>The Upfront Rebate:</strong> Austin Energy provides a substantial one-time rebate of <strong>$2,500</strong> for qualifying residential solar systems. This isn't a tax credit you wait for; it's paid directly to your installer, instantly reducing your initial out-of-pocket cost.
                  </li>
                  <li>
                    <strong>The Value of Solar (VoS) Tariff:</strong> This is the game-changer. Instead of traditional net metering (where you're only credited for *excess* energy), Austin Energy credits you for <em>every single kilowatt-hour (kWh)</em> your system produces, at a premium rate. For 2024, that rate is <strong>$0.097 per kWh</strong>.
                  </li>
                </ol>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-blue-800">
                    💡 <strong>Here's why VoS is better:</strong> Imagine you're on vacation for a week. With old-school net metering, you'd only get a small credit for the little energy you export. In Austin, you get paid for <em>every single ray of sun</em> your panels capture while you're gone, maximizing your earnings and accelerating your payback period.
                  </p>
                </div>

                <h2 className="mt-12">Navigating the Solar Scene in ATX: Finding the Right Installer</h2>
                <p>
                  Choosing a qualified installer is the most important decision you'll make. In Austin, it's absolutely critical to select an installer who is not only NABCEP certified but also an <strong>official Austin Energy Partner</strong>. This dual qualification is your assurance that they have deep experience with the city's specific permitting processes, inspection requirements, and rebate application system. An approved partner will handle all the paperwork, ensuring you get every dollar you're entitled to.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Local Code Masters:</strong> They understand Austin's unique building codes and utility interconnection standards.</li>
                    <li><strong>Rebate Experts:</strong> Approved partners will file all Austin Energy rebate and VoS paperwork on your behalf.</li>
                    <li><strong>Proven Quality:</strong> NABCEP certification is the highest mark of professionalism and skill in the solar industry.</li>
                </ul>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Browse Austin's Top-Rated Installers
                    </Button>
                </div>

                <h2 className="mt-12">Breaking Down the Cost of Solar in Austin</h2>
                <p>
                  Let's look at the investment for a typical solar installation in the Austin area. While costs vary based on your home's needs, Austin residents have a clear financial advantage thanks to local incentives that dramatically reduce the final price tag.
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
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Solar Panel Installation",
            "provider": {
              "@type": "Organization",
              "name": "SolarInstallersTX"
            },
            "areaServed": {
              "@type": "City",
              "name": "Austin"
            },
            "description": "Professional residential and commercial solar panel installation in Austin, TX. Connect with NABCEP certified installers and get free quotes.",
            "name": "Austin Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default AustinPage;
