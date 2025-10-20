import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const FortWorthSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Fort Worth, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top-rated NABCEP certified solar installers in Fort Worth, TX. Get free quotes on durable solar systems perfect for Tarrant County's climate and Oncor's grid."
        canonicalUrl="https://solarinstallerstx.com/fort-worth-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-blue-800 to-purple-600 text-white">
            <OptimizedImage
              src="/assets/fort-worth-skyline-solar.webp"
              alt="Fort Worth skyline with solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Fort Worth, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Where the West begins, so does your energy independence. Discover Fort Worth's leading solar experts and build a system as resilient as the city itself.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  In Fort Worth, a city that perfectly blends its rich Western heritage with modern innovation, solar power is a natural fit. For homeowners in Tarrant County looking for a smart, long-term investment, a solar energy system offers both financial savings and a dependable source of power. This guide is tailored for Fort Worth residents, focusing on building a durable system and maximizing returns in the Oncor service area.
                </p>

                <h2 className="mt-12">Why Fort Worth is a Wise Choice for Solar</h2>
                <p>
                  Fort Worth's sunny skies and strong economic outlook make it a prime location for solar. The financial incentives are clear, and the technology is perfectly suited to the North Texas climate.
                </p>

                {/* Fort Worth-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Fort Worth Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Abundant Sunshine</td>
                        <td className="py-3">~5.1 hours/day of peak sunlight</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Strong ROI</td>
                        <td className="py-3">Competitive solar buyback plans available from numerous REPs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">30% of your total system cost credited back on your federal taxes</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">🏠 Long-Term Value</td>
                        <td className="py-3">Increase your property's value while locking in low energy costs for decades</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Partnering with Oncor and Your REP in Fort Worth</h2>
                <p>
                  Like its neighbor Dallas, Fort Worth is in a deregulated energy market. Your utility, <strong>Oncor</strong>, manages the power grid and connects your solar system. You get to choose your <strong>Retail Electric Provider (REP)</strong>, the company that sells you electricity and buys your excess solar power. A skilled local installer will handle the entire interconnection process with Oncor, making it seamless for you.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-blue-800">
                    💡 <strong>Smart Shopping Saves Money:</strong> The key to a fast payback period in Fort Worth is selecting an REP with a high solar buyback rate. Ask your NABCEP certified installer for recommendations on the best plans currently available to maximize your savings.
                  </p>
                </div>

                <h2 className="mt-12">Finding an Installer Who Knows Tarrant County</h2>
                <p>
                  A great solar installation in Fort Worth requires more than just technical skill; it requires local knowledge. You need a NABCEP certified professional who understands the permitting processes for Fort Worth and surrounding cities like Arlington, Keller, and Southlake. They'll recommend durable, hail-rated panels and ensure your system is built to last for 25+ years in the demanding North Texas climate.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Fort Worth's Top-Rated Installers
                    </Button>
        </div>

                <h2 className="mt-12">Cost of Solar Panels in Fort Worth, TX</h2>
                <p>
                  The average cost for a residential solar system in Fort Worth is between $2.70 and $3.35 per watt. For a 7kW system, a common size to offset a significant portion of a Tarrant County home's energy use, the gross cost is typically around $20,650 before the 30% federal tax credit.
                </p>

                {/* Cost Breakdown Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">Sample 7kW Solar System Cost in Fort Worth</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Gross System Cost</td>
                        <td className="py-2 text-right">$20,650</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">(-) 30% Federal Tax Credit</td>
                        <td className="py-2 text-right">-$6,195</td>
                      </tr>
                      <tr className="bg-green-50 border-green-200">
                        <td className="py-3 font-bold text-lg">Net Cost After Incentives</td>
                        <td className="py-3 text-right font-bold text-lg text-green-600">$14,455</td>
                      </tr>
                    </tbody>
                  </table>
                   <p className="text-sm text-muted-foreground mt-4">
                    *This is an estimate. Your final cost will depend on the equipment chosen and your home's specific characteristics.
              </p>
            </div>
              </div>
              </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="fort-worth-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Fort Worth Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Use our free calculator to get a custom solar savings estimate for your Fort Worth home in just a few seconds.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Go Solar in "Cowtown"</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free, competitive quotes from Fort Worth's most trusted NABCEP certified solar installers. It's time to lock in your energy savings.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Fort Worth Solar Quotes
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
            "@type": "WebPage",
            "name": "Best Solar Installers in Fort Worth, TX",
            "description": "Find top-rated NABCEP certified solar installers in Fort Worth. Learn about Oncor interconnection, solar buyback plans, and choosing the right system for your Tarrant County home.",
            "url": "https://solarinstallerstx.com/fort-worth-solar-installers"
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
              "name": "Fort Worth"
            },
            "description": "Professional residential and commercial solar panel installation in Fort Worth, TX. Connect with NABCEP certified installers for durable, high-performance solar systems.",
            "name": "Fort Worth Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default FortWorthSolarPage;
