import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const LubbockSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Lubbock, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Lubbock, TX. Learn about maximizing solar production in the sunny South Plains with Lubbock Power & Light (LP&L)."
        canonicalUrl="https://solarinstallerstx.com/lubbock-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-red-600 to-orange-400 text-white">
            <OptimizedImage
              src="/assets/lubbock-skyline-solar.webp"
              alt="Lubbock, TX skyline with wind turbines and solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Lubbock, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Powering the Hub City with Sunshine. Discover how Lubbock's abundant sunny days make it a perfect place for a solar investment.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  As the economic and agricultural heart of the South Plains, Lubbock is a city built on smart, practical investments. With some of the most consistent sunshine in Texas, solar energy represents a secure and profitable investment for homeowners looking to reduce their reliance on Lubbock Power & Light (LP&L) and lock in their energy costs for the future.
                </p>

                <h2 className="mt-12">Capitalizing on the South Plains Sunshine</h2>
                <p>
                  The "Hub City" enjoys over 260 sunny days per year, making it an incredibly productive location for solar panels. This high level of solar irradiance means your system will generate a significant amount of power, leading to a faster payback period and greater lifetime savings.
                </p>

                {/* Lubbock-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Lubbock Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Peak Sun Hours</td>
                        <td className="py-3">A fantastic <strong>~5.4 hours/day</strong></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ LP&L Net Metering</td>
                        <td className="py-3">Get credit from Lubbock Power & Light for your excess solar energy</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">Reduce your system's cost by 30% with the federal solar tax credit</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">🏠 Energy Security</td>
                        <td className="py-3">Gain independence from fluctuating electricity rates</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Working with Lubbock Power & Light (LP&L)</h2>
                <p>
                  As a municipal utility, Lubbock Power & Light offers a net metering program for its customers. This allows you to connect your solar system to the grid and receive credits for any surplus energy you produce. A qualified, NABCEP certified installer will be familiar with LP&L's specific interconnection standards and application process, making your transition to solar smooth and hassle-free.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-red-800">
                    💡 <strong>Local Knowledge is Key:</strong> Choosing an installer with experience in the LP&L service area is crucial. They will ensure your system is designed and installed to meet all local requirements, preventing any delays in getting your system activated.
                  </p>
                </div>

                <h2 className="mt-12">Finding a Solar Installer for the "Hub City"</h2>
                <p>
                  A professional solar installer in Lubbock will know how to build a system that can handle the West Texas climate. This means using durable panels and robust mounting systems that can withstand high winds and seasonal temperature changes, ensuring your investment is protected for its 25+ year lifespan. Prioritizing a NABCEP certified installer is the best way to guarantee you're working with a top-tier professional.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Lubbock's Best Solar Installers
                    </Button>
                </div>

                <h2 className="mt-12">Solar Panel Costs in Lubbock, TX</h2>
                <p>
                  The cost of solar in Lubbock is very competitive, generally ranging from $2.50 to $3.15 per watt. Due to the high solar productivity in the region, the return on investment is often excellent for Lubbock homeowners.
                </p>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="lubbock-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Lubbock Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See how much the South Plains sun can save you. Get a free, instant estimate for your home.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Go Solar in the Hub City</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from NABCEP certified solar installers who have proven experience building high-performance systems in Lubbock.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Lubbock Solar Quotes
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
            "name": "Best Solar Installers in Lubbock, TX",
            "description": "Find top NABCEP certified solar installers in Lubbock. Learn about maximizing your solar investment with Lubbock Power & Light (LP&L) in the sunny South Plains.",
            "url": "https://solarinstallerstx.com/lubbock-solar-installers"
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
              "name": "Lubbock"
            },
            "description": "Professional residential and commercial solar panel installation in Lubbock, TX, designed to maximize production in the high-sunshine climate of the South Plains.",
            "name": "Lubbock Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default LubbockSolarPage;
