import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const GarlandSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Garland, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Garland, TX. Learn about the benefits of Garland Power & Light (GP&L) solar programs for your home or business."
        canonicalUrl="https://solarinstallerstx.com/garland-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <OptimizedImage
              src="/assets/garland-skyline-solar.webp"
              alt="Garland, TX skyline with solar panel overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Garland, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Powering Garland's future with clean energy. Discover the unique advantages of going solar with your community-owned utility, GP&L.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  As a vital hub in Dallas County, Garland offers a unique and stable environment for homeowners investing in solar energy. With its own municipal utility, Garland Power & Light (GP&L), residents can benefit from straightforward solar programs and the satisfaction of contributing to the community's energy independence. This guide is for Garland residents who want to make a smart, secure investment in solar power.
                </p>

                <h2 className="mt-12">The GP&L Advantage: Your Community Utility</h2>
                <p>
                  Unlike much of the DFW metroplex, Garland is served by its own not-for-profit, community-owned utility. This creates a more stable and often more customer-focused experience when going solar.
                </p>

                {/* Garland-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Garland Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ Garland Power & Light</td>
                        <td className="py-3">Clear net metering policies from a local, trusted utility</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Great Sun Exposure</td>
                        <td className="py-3">Take advantage of over 230 sunny days per year for high energy production</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">Benefit from the 30% federal tax credit to significantly lower your costs</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">🏠 Solid Investment</td>
                        <td className="py-3">Increase your home's value in a thriving suburban market</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Working with Garland Power & Light (GP&L)</h2>
                <p>
                  GP&L offers a solar buyback program that credits you for the excess energy your system sends back to the grid. The process is clear and well-defined. A NABCEP certified installer with experience in Garland will handle the entire interconnection agreement with GP&L, ensuring your system meets all safety standards and is activated promptly.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-emerald-800">
                    💡 <strong>Simplicity and Stability:</strong> Working with a single, municipal utility like GP&L often simplifies the solar process compared to navigating the deregulated market. Your installer will be your single point of contact for the entire technical setup.
                  </p>
                </div>

                <h2 className="mt-12">Finding an Installer Who Knows Garland</h2>
                <p>
                  A qualified NABCEP professional in Garland will be an expert in more than just solar panels. They'll know the specific permitting requirements for the City of Garland, understand GP&L's interconnection standards, and recommend durable equipment that can handle the North Texas weather, including hail-rated panels.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Garland's Top-Rated Installers
                    </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="garland-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Garland Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get a free, instant savings estimate based on your Garland home and GP&L rates.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Solar Project in Garland</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from NABCEP certified installers with proven experience working with Garland Power & Light.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Garland Solar Quotes
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
            "name": "Best Solar Installers in Garland, TX",
            "description": "Find top NABCEP certified installers in Garland, TX, and learn about the benefits of going solar with your community-owned utility, Garland Power & Light (GP&L).",
            "url": "https://solarinstallerstx.com/garland-solar-installers"
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
              "name": "Garland"
            },
            "description": "Professional residential solar panel installation in Garland, TX. Connect with NABCEP certified installers experienced with Garland Power & Light (GP&L) interconnection.",
            "name": "Garland Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default GarlandSolarPage;
