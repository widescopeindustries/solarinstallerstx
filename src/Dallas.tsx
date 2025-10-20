import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const DallasPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Dallas, TX | NABCEP Certified | Free Quotes"
        description="Find the best NABCEP certified solar installers in Dallas, TX. Get free quotes from top-rated companies, learn about Oncor's net metering, and hail-resistant panels."
        canonicalUrl="https://solarinstallerstx.com/dallas"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <OptimizedImage
              src="/assets/dallas-skyline-solar.webp"
              alt="Dallas skyline with solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Dallas, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Power your DFW home with clean energy. Compare Dallas's top solar providers and lock in your energy savings for decades.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  In the thriving Dallas-Fort Worth metroplex, solar energy is a smart financial decision for homeowners looking to combat rising electricity costs. With a deregulated market and strong solar buyback programs available, Dallas residents can achieve a rapid return on their solar investment. This guide details the benefits of going solar in Dallas, from Oncor's interconnection process to choosing hail-resistant panels.
                </p>

                <h2 className="mt-12">Why Dallas is a Hotspot for Solar Power</h2>
                <p>
                  Dallas combines strong economic growth with excellent solar resources, making it a leading city for solar adoption in Texas. The financial incentives are compelling for both homeowners and businesses.
                </p>

                {/* Dallas-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Dallas Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Peak Sun Hours</td>
                        <td className="py-3">~5.2 hours/day (234 sunny days/year)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Oncor Interconnection</td>
                        <td className="py-3">Streamlined process for grid connection</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ Net Metering</td>
                        <td className="py-3">Strong solar buyback plans from numerous REPs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">26% of total system cost, an average savings of over $5,500</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">🔨 Hail Resistance</td>
                        <td className="py-3">Modern panels are rated to withstand severe DFW weather, including hail</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Oncor, REPs, and Net Metering in Dallas</h2>
                <p>
                  Like Houston, Dallas is in a deregulated energy market. Oncor is the utility that manages the grid infrastructure, while you choose your Retail Electric Provider (REP). Your solar installer will work with Oncor to get your system interconnected, and you will work with your REP to get on a solar buyback plan.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-6">
                  <p className="text-sm font-medium text-purple-800">
                    💡 <strong>Expert Advice:</strong> The key to maximizing savings in Dallas is choosing an REP with a favorable solar buyback rate. Plans can vary, so it's wise to compare options from providers like TXU Energy, Rhythm Energy, and Gexa Energy. A good installer will provide guidance on this.
                  </p>
                </div>

                <h2 className="mt-12">Finding Qualified Solar Installers in the DFW Area</h2>
                <p>
                  The DFW metroplex has hundreds of solar companies. To ensure a high-quality, long-lasting system, you must filter for NABCEP certified installers. These professionals have proven their expertise and are up-to-date on the latest technologies and DFW-specific installation requirements, including standards for hail and wind resistance.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Dallas's Top-Rated Installers
                    </Button>
                </div>

                <h2 className="mt-12">Cost of Solar Panels in Dallas, TX</h2>
                <p>
                  The average cost for a solar installation in Dallas is approximately $2.75 to $3.40 per watt. For a 7kW system, common for a typical Dallas-area home, the gross cost is around $21,000 before incentives.
                </p>

                {/* Cost Breakdown Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">Sample 7kW Solar System Cost in Dallas</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Gross System Cost</td>
                        <td className="py-2 text-right">$21,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">(-) 26% Federal Tax Credit</td>
                        <td className="py-2 text-right">-$5,460</td>
                      </tr>
                      <tr className="bg-green-50 border-green-200">
                        <td className="py-3 font-bold text-lg">Net Cost After Incentives</td>
                        <td className="py-3 text-right font-bold text-lg text-green-600">$15,540</td>
                      </tr>
                    </tbody>
                  </table>
                   <p className="text-sm text-muted-foreground mt-4">
                    *This is an estimate. Your final cost will depend on the equipment chosen and your specific roof.
                  </p>
                </div>

                <h2 className="mt-12">Dallas Solar Customer Reviews</h2>
                <div className="space-y-6">
                    <div className="bg-card border rounded-lg p-6">
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">★★★★★</div>
                            <span className="ml-2 font-semibold">Jennifer L., Plano</span>
                        </div>
                        <blockquote className="italic text-muted-foreground">
                        "We were worried about hail, but our installer recommended top-tier, hail-rated panels. The system has already been through a few storms with no issues. Our Oncor bill is now just the base connection fee. It's the best home improvement we've ever made."
                        </blockquote>
                    </div>
                    <div className="bg-card border rounded-lg p-6">
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">★★★★★</div>
                            <span className="ml-2 font-semibold">Mark B., Frisco</span>
                        </div>
                        <blockquote className="italic text-muted-foreground">
                        "The team we hired was incredibly professional. They handled the city permits in Frisco and the Oncor interconnection seamlessly. We were generating our own power in less than 6 weeks from signing the contract."
                        </blockquote>
                    </div>
                </div>

                <h2 className="mt-12">Frequently Asked Questions for Dallas Solar</h2>
                 <div className="space-y-4">
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">Are solar panels durable enough for Dallas hail storms?</h3>
                     <p className="text-muted-foreground">Yes. Reputable solar panel manufacturers test their panels to withstand significant hail impact. Look for panels with a Class 3 or Class 4 hail rating, which are designed to resist damage from hailstones up to 2 inches in diameter. A qualified installer will recommend panels appropriate for the DFW climate.</p>
                   </div>
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">Are there any city-specific rebates in Dallas?</h3>
                     <p className="text-muted-foreground">The City of Dallas has periodically offered programs and incentives for energy efficiency and solar. While there isn't a standing rebate like in Austin, it's important to check with the Dallas Office of Environmental Quality & Sustainability for any current programs. The main financial benefits remain the federal tax credit and REP buyback plans.</p>
                   </div>
                   <div className="bg-card border rounded-lg p-6">
                     <h3 className="text-xl font-semibold mb-2">How long does it take to get solar installed in Dallas?</h3>
                     <p className="text-muted-foreground">The total timeline is typically 4-8 weeks. The physical installation takes only 1-3 days. The remaining time is for system design, city permitting, and the final interconnection approval from Oncor. An experienced local installer can often expedite this process.</p>
                   </div>
                 </div>

              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="dallas-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Dallas Solar ROI
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find out how much you can save. Our calculator provides a custom solar savings estimate for your DFW home in seconds.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Get Started with Solar in Dallas-Fort Worth</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Receive free, competitive quotes from the most trusted NABCEP certified solar installers in the DFW metroplex. Start saving and declare your energy independence.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Dallas Solar Quotes
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
                "name": "Are solar panels resistant to hail in Dallas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, high-quality solar panels are tested and rated to withstand significant hail impact. Installers in the DFW area recommend Class 3 or Class 4 hail-rated panels, which are designed to resist damage from hailstones common in North Texas weather."
                }
              },
              {
                "@type": "Question",
                "name": "What solar incentives are available in Dallas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The primary incentives for Dallas residents are the 26% federal solar tax credit and solar buyback plans (net metering) offered by various Retail Electric Providers (REPs) in the Oncor service area. The City of Dallas may also offer periodic energy efficiency programs."
                }
              },
              {
                "@type": "Question",
                "name": "How much does solar panel installation cost in Dallas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average cost of solar panels in Dallas is between $2.75 and $3.40 per watt. A typical 7kW system costs around $21,000 before the federal tax credit, which can reduce the price by over $5,400."
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
            "name": "Best Solar Installers in Dallas, TX",
            "description": "Find top-rated NABCEP certified solar installers in Dallas, TX. Learn about Oncor interconnection, solar buyback plans, and choosing hail-resistant solar panels for your DFW home.",
            "url": "https://solarinstallerstx.com/dallas",
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
                  "name": "Dallas Solar Installers",
                  "item": "https://solarinstallerstx.com/dallas"
                }
              ]
            }
          }
        `}
      </script>
    </>
  );
};

export default DallasPage;