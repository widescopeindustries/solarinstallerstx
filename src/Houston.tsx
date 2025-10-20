import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const HoustonPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Houston, TX | NABCEP Certified | Free Quotes | SolarInstallersTX"
        description="Find top-rated NABCEP certified solar installers in Houston, TX. Get free quotes, learn about CenterPoint Energy interconnection, and see why Houston is a top solar city."
        canonicalUrl="https://solarinstallerstx.com/houston"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
            <OptimizedImage
              src="/assets/houston-skyline-solar.webp"
              alt="Houston skyline with solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Houston, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Harness the power of the sun in the Energy Capital of the World. Compare Houston's best solar companies and start your savings journey.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  As the energy capital, Houston is rapidly embracing solar power. High electricity rates and abundant sunshine make Houston a prime location for residential and commercial solar installations. This guide covers everything you need to know about going solar in the Houston area, from navigating CenterPoint Energy's policies to finding expert local installers.
                </p>

                <h2 className="mt-12">The Financial Case for Solar in Houston</h2>
                <p>
                  With some of the highest electricity consumption rates in the nation due to its hot and humid climate, Houston homeowners can see a dramatic reduction in their energy bills by switching to solar.
                </p>

                {/* Houston-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Houston Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Peak Sun Hours</td>
                        <td className="py-3">~5.1 hours/day (204 sunny days/year)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Avg. Electricity Bill</td>
                        <td className="py-3">Among the highest in Texas, maximizing savings potential</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ Net Metering</td>
                        <td className="py-3">Available through various Retail Electric Providers (REPs)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">26% of total system cost, saving thousands on installation</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">🌪️ Energy Resilience</td>
                        <td className="py-3">Gain protection from grid outages during hurricane season with battery storage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Navigating Net Metering in Houston's Deregulated Market</h2>
                <p>
                  Houston has a deregulated electricity market, which means you choose your Retail Electric Provider (REP). Many REPs offer excellent solar buyback plans (a form of net metering) that credit you for the excess energy your system sends to the grid.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
                  <p className="text-sm font-medium text-yellow-800">
                    💡 <strong>Pro Tip:</strong> It's crucial to work with an installer who understands the different REP solar plans. They can help you choose a provider that offers the best buyback rates to maximize your ROI. Popular providers with good solar plans include TXU Energy, Green Mountain Energy, and Reliant.
                  </p>
                </div>

                <h2 className="mt-12">Finding Top-Rated Solar Installers in Houston</h2>
                <p>
                  In a large market like Houston, quality can vary. Prioritizing NABCEP certified installers is essential. These professionals are verified experts who understand Houston's specific challenges, such as local building codes, HOA requirements in master-planned communities, and designing systems to withstand hurricane-force winds. The <a href="https://www.nabcep.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">North American Board of Certified Energy Practitioners (NABCEP)</a> is the gold standard for solar professional certification.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Get Quotes from Houston's Best Installers
                    </Button>
                </div>

                <h2 className="mt-12">Cost of Solar Panels in Houston, TX</h2>
                <p>
                  The average cost of a solar system in Houston is competitive, typically ranging from $2.60 to $3.20 per watt. For a standard 8kW system to offset high air conditioning usage, the gross cost is around $22,000.
                </p>

                {/* Cost Breakdown Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">Sample 8kW Solar System Cost in Houston</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Gross System Cost</td>
                        <td className="py-2 text-right">$22,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">(-) 26% Federal Tax Credit</td>
                        <td className="py-2 text-right">-$5,720</td>
                      </tr>
                      <tr className="bg-green-50 border-green-200">
                        <td className="py-3 font-bold text-lg">Net Cost After Incentives</td>
                        <td className="py-3 text-right font-bold text-lg text-green-600">$16,280</td>
                      </tr>
                    </tbody>
                  </table>
                   <p className="text-sm text-muted-foreground mt-4">
                    *This is an estimate. Actual costs depend on equipment, installer, and REP plan.
                  </p>
                </div>

                <h2 className="mt-12">Houston Solar Customer Stories</h2>
                <div className="space-y-6">
                    <div className="bg-card border rounded-lg p-6">
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">★★★★★</div>
                            <span className="ml-2 font-semibold">Michael R., Katy</span>
                        </div>
                        <blockquote className="italic text-muted-foreground">
                        "Our summer electricity bills were insane. After installing solar panels with a battery, we barely notice grid outages and our bill is a fraction of what it was. The installer we chose was a true professional and handled everything with CenterPoint."
                        </blockquote>
                    </div>
                    <div className="bg-card border rounded-lg p-6">
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">★★★★★</div>
                            <span className="ml-2 font-semibold">Linda T., The Woodlands</span>
                        </div>
                        <blockquote className="italic text-muted-foreground">
                        "Getting HOA approval was my biggest worry, but our installer had experience with The Woodlands' covenants and got it approved without a hitch. The installation was clean, fast, and the system looks great."
                        </blockquote>
                    </div>
                </div>

                <h2 className="mt-12">Frequently Asked Questions for Houston Solar</h2>
                 <div className="space-y-4">
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">How do solar panels hold up in a hurricane?</h3>
                     <p className="text-muted-foreground">Modern solar panels are built to be incredibly durable, with wind ratings of 140 mph or higher. When installed by a certified professional according to local code, your system is designed to withstand hurricane-force winds. Many homeowners pair their system with a battery for power during grid outages caused by storms.</p>
                   </div>
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">Are there any local rebates in Houston?</h3>
                     <p className="text-muted-foreground">While CenterPoint Energy does not offer a direct solar rebate like Austin Energy, some Retail Electric Providers (REPs) offer sign-on bonuses or bill credits for new solar customers. The primary financial incentive in Houston comes from the federal tax credit and strong net metering (solar buyback) plans.</p>
                   </div>
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">How does the interconnection process with CenterPoint Energy work?</h3>
                     <p className="text-muted-foreground">Your solar installer will submit an interconnection application to CenterPoint Energy on your behalf. CenterPoint will review the system design to ensure it meets safety and grid standards. After the system passes city inspection, CenterPoint gives "Permission to Operate" (PTO), which usually takes 2-4 weeks.</p>
                   </div>
                 </div>

              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="houston-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How Much Can You Save in Houston?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Use our free calculator to get a real-time estimate of your solar savings based on your Houston address and energy usage.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Houston Solar Project Today</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free, no-pressure quotes from Houston's most trusted NABCEP certified solar installers. Lock in your savings before electricity rates rise again.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Houston Solar Quotes
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
                "name": "How do solar panels perform during a hurricane in Houston?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Professionally installed solar panels are rated to withstand winds of 140 mph or more, making them resilient during Houston's hurricane season. Pairing them with a solar battery provides backup power during grid outages."
                }
              },
              {
                "@type": "Question",
                "name": "Are there solar rebates in Houston?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While there are no utility-wide rebates from CenterPoint Energy, many Retail Electric Providers (REPs) in Houston offer competitive solar buyback plans (net metering) and sign-on bonuses, which provide significant financial returns."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a solar system cost in Houston?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average cost of solar installation in Houston is $2.60 to $3.20 per watt. An 8kW system may cost around $22,000 before the 26% federal tax credit, resulting in a net cost of approximately $16,280."
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
            "name": "Best Solar Installers in Houston, TX",
            "description": "Find top-rated NABCEP certified solar installers in Houston, TX. Learn about CenterPoint Energy interconnection, solar buyback plans, and hurricane-rated systems.",
            "url": "https://solarinstallerstx.com/houston",
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
                  "name": "Houston Solar Installers",
                  "item": "https://solarinstallerstx.com/houston"
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
              "name": "Houston"
            },
            "description": "Professional residential and commercial solar panel installation in Houston, TX. Connect with NABCEP certified installers and get free quotes for hurricane-rated systems.",
            "name": "Houston Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default HoustonPage;