import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const AmarilloSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Amarillo, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Amarillo, TX. Learn how to maximize savings with Xcel Energy in the Texas Panhandle's prime solar and wind corridor."
        canonicalUrl="https://solarinstallerstx.com/amarillo-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <OptimizedImage
              src="/assets/amarillo-skyline-solar.webp"
              alt="Texas Panhandle landscape with wind turbines and solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Amarillo, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Harness the powerful sun and wind of the Texas Panhandle. Find expert installers who know how to build for the unique climate of Amarillo.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  In the heart of the Texas Panhandle, a region famous for its vast energy resources, solar power is a natural choice for homeowners. Amarillo boasts some of the highest solar irradiance in the state, meaning your panels will be incredibly productive. This guide is for Amarillo residents looking to make a smart investment in a durable solar system tailored for the Panhandle climate.
                </p>

                <h2 className="mt-12">The Panhandle Advantage: Sun & Wind</h2>
                <p>
                  Amarillo is at the crossroads of Texas's renewable energy boom. The same wide-open spaces that are perfect for wind turbines also provide unobstructed, intense sunlight, making it a hotspot for solar energy generation.
                </p>

                {/* Amarillo-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Amarillo Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Peak Sun Hours</td>
                        <td className="py-3">An excellent <strong>~5.6 hours/day</strong></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💨 Weather Ready</td>
                        <td className="py-3">Systems designed to withstand Panhandle wind and weather</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ Xcel Energy Program</td>
                        <td className="py-3">Net metering available to credit you for excess power</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">30% of your total system cost back in your pocket via the federal tax credit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Working with Xcel Energy in Amarillo</h2>
                <p>
                  Your local utility in Amarillo is <strong>Xcel Energy</strong>. They offer a net metering program that allows you to send the solar power you don't use back to the grid in exchange for credits on your bill. An experienced, NABCEP certified installer will handle the entire interconnection application with Xcel Energy, ensuring your system is approved and activated correctly.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-yellow-800">
                    💡 <strong>System Sizing is Key:</strong> With so much sun, it's possible to design a system that covers 100% of your electricity needs. A qualified installer will analyze your past Xcel Energy bills to recommend the perfect system size for your goals.
                  </p>
                </div>

                <h2 className="mt-12">Finding an Installer Who Knows the Panhandle</h2>
                <p>
                  The climate in Amarillo presents unique challenges, from high winds to wide temperature swings. It's crucial to select a NABCEP certified professional who has experience building systems in the Panhandle. They will use robust mounting hardware and recommend durable panels that are proven to perform in this environment for decades to come.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Amarillo's Top-Rated Installers
                    </Button>
                </div>

                <h2 className="mt-12">Solar Panel Costs in Amarillo</h2>
                <p>
                  Solar installation costs in Amarillo are very competitive, typically ranging from $2.60 to $3.20 per watt. Thanks to the high solar productivity in the region, the return on investment is often faster than in less sunny parts of the state.
                </p>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="amarillo-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Panhandle Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get a free, data-driven estimate of your potential savings with an Amarillo solar system.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Go Solar in the Texas Panhandle</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from NABCEP certified installers who specialize in building durable, high-production solar systems for the Amarillo area.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Amarillo Solar Quotes
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
            "name": "Best Solar Installers in Amarillo, TX",
            "description": "Find top NABCEP certified installers in Amarillo. Learn about building a durable solar system for the Panhandle climate and maximizing savings with Xcel Energy.",
            "url": "https://solarinstallerstx.com/amarillo-solar-installers"
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
              "name": "Amarillo"
            },
            "description": "Professional residential and commercial solar panel installation in Amarillo, TX, engineered for the high winds and sun of the Texas Panhandle.",
            "name": "Amarillo Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default AmarilloSolarPage;
