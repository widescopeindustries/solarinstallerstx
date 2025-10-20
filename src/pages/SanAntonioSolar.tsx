import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const SanAntonioSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers San Antonio, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top-rated NABCEP certified solar installers in San Antonio, TX. Get free quotes, learn about CPS Energy's solar rebate program, and calculate your savings."
        canonicalUrl="https://solarinstallerstx.com/san-antonio-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
            <OptimizedImage
              src="/assets/san-antonio-skyline-solar.webp"
              alt="San Antonio skyline with the Tower of the Americas and solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in San Antonio, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Home of the Alamo and some of Texas's most powerful solar incentives. Learn how CPS Energy's programs can make your switch to solar incredibly affordable.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  In San Antonio, going solar is one of the smartest home investments you can make, thanks in large part to the city's forward-thinking utility, CPS Energy. With some of the most generous and straightforward incentives in the nation, the path to energy independence here is clearer and more financially rewarding than in almost any other Texas city.
                </p>

                <h2 className="mt-12">Powered by CPS Energy: San Antonio's Solar Boom</h2>
                <p>
                  While many cities have complex solar programs, San Antonio's is refreshingly direct. The combination of a significant upfront rebate and a true net metering program creates a powerful one-two punch for savings, making the payback period for solar here remarkably short.
                </p>

                {/* San Antonio-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The San Antonio Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Peak Sun Hours</td>
                        <td className="py-3">~5.4 hours/day (220 sunny days/year)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 CPS Energy Rebate</td>
                        <td className="py-3">Up to <strong>$2,500</strong> for residential solar + additional bonuses</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ Full Retail Net Metering</td>
                        <td className="py-3">Get 1-to-1 credit for excess energy sent to the grid</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">30% of total system cost (average savings of $6,000+)</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">📈 Property Value Increase</td>
                        <td className="py-3">Boost your home's value without increasing property taxes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>The CPS Energy Advantage: Rebates & True Net Metering</h2>
                <p>
                  CPS Energy's commitment to renewable energy directly benefits homeowners. Their program is designed to remove financial barriers and maximize your return.
                </p>
                <ol>
                  <li>
                    <strong>A Powerful Upfront Rebate:</strong> CPS Energy offers a direct, upfront rebate of <strong>$2,500</strong> for qualifying residential systems. They may also provide "adders" for using locally sourced components, further increasing your initial savings.
                  </li>
                  <li>
                    <strong>True 1-to-1 Net Metering:</strong> This is a huge advantage. For every excess kilowatt-hour (kWh) your system sends to the grid, you get a full credit on your bill at the retail rate. It's a simple, transparent system that ensures you get full value for your investment.
                  </li>
                </ol>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-green-800">
                    💡 <strong>Don't Miss Out:</strong> These incentive programs have limited funding and can change. Locking in your project with a qualified installer is the best way to secure these fantastic financial benefits.
                  </p>
                </div>

                <h2 className="mt-12">The Golden Ticket: Finding a CPS Energy Registered Installer</h2>
                <p>
                  This is the most critical step for any San Antonio resident. To be eligible for the valuable CPS Energy rebate, your installation *must* be performed by a contractor who is not only NABCEP Certified but also officially on the <strong>CPS Energy Registered Installers list</strong>. This ensures your project is done to the highest standards of safety and quality, and it guarantees your eligibility for the utility's incentives. Don't even consider an installer who isn't on this list.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Browse CPS Energy Registered Installers
                    </Button>
                </div>

                <h2 className="mt-12">Calculating Your Investment in San Antonio</h2>
                <p>
                  The cost of solar in San Antonio is competitive, typically running from $2.80 to $3.50 per watt. For a 7kW system, a common size in Bexar County, the gross cost might be around $22,400 before the powerful local and federal incentives are applied.
                </p>

                {/* Cost Breakdown Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">Sample 7kW Solar System Cost in San Antonio</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Gross System Cost</td>
                        <td className="py-2 text-right">$22,400</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">(-) CPS Energy Rebate</td>
                        <td className="py-2 text-right">-$2,500</td>
                      </tr>
                      <tr className="border-b bg-muted/30">
                        <td className="py-2 font-semibold">Cost After Rebate</td>
                        <td className="py-2 text-right font-semibold">$19,900</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">(-) 30% Federal Tax Credit</td>
                        <td className="py-2 text-right">-$5,970</td>
                      </tr>
                      <tr className="bg-green-50 border-green-200">
                        <td className="py-3 font-bold text-lg">Net Cost After All Incentives</td>
                        <td className="py-3 text-right font-bold text-lg text-green-600">$13,930</td>
                      </tr>
                    </tbody>
                  </table>
                   <p className="text-sm text-muted-foreground mt-4">
                    *Estimates only. Actual costs and savings vary. Use our solar calculator for a more personalized assessment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="san-antonio-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your San Antonio Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Enter your address and average monthly bill to see your personalized savings estimate with a San Antonio solar system.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Go Solar in San Antonio?</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free, no-obligation quotes from San Antonio's top-rated, NABCEP certified solar installers. Lock in your energy savings and take advantage of CPS Energy's fantastic rebate program.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free San Antonio Solar Quotes
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
            "@type": "Service",
            "serviceType": "Solar Panel Installation",
            "provider": {
              "@type": "Organization",
              "name": "SolarInstallersTX"
            },
            "areaServed": {
              "@type": "City",
              "name": "San Antonio"
            },
            "description": "Professional residential and commercial solar panel installation in San Antonio, TX. Connect with NABCEP certified installers to take advantage of the CPS Energy rebate program.",
            "name": "San Antonio Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default SanAntonioSolarPage;
