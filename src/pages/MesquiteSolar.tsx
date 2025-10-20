import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const MesquiteSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Mesquite, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Mesquite, TX. Take control of your energy costs with a durable solar system designed for the DFW metroplex."
        canonicalUrl="https://solarinstallerstx.com/mesquite-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-orange-700 to-amber-600 text-white">
            <OptimizedImage
              src="/assets/mesquite-skyline-solar.webp"
              alt="Mesquite, TX rodeo arena with solar panel overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Mesquite, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                In the Rodeo Capital of Texas, take the reins of your own power. Discover how Mesquite homeowners are making a smart play with solar energy.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  In Mesquite, a city that celebrates Texas tradition, making a practical, long-term investment for your family is always in style. Solar energy is a powerful way for homeowners to take control of rising electricity costs, providing predictable bills and energy security for years to come. This guide is for Mesquite residents ready to make a smart investment in their home's future.
                </p>

                <h2 className="mt-12">A Practical Investment for Mesquite Families</h2>
                <p>
                  Going solar in Mesquite is a straightforward financial decision. You're pre-paying for decades of electricity at a fixed cost, protecting your family's budget from unpredictable rate hikes from Retail Electric Providers.
                </p>

                {/* Mesquite-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Mesquite Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Budget Certainty</td>
                        <td className="py-3">Lock in your electricity costs and avoid surprise bills</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ Power of Choice</td>
                        <td className="py-3">Find a great solar buyback plan in the deregulated DFW market</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">The 30% federal tax credit makes the system affordable upfront</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">💪 Durable & Tough</td>
                        <td className="py-3">Systems are built to handle the hail and high winds of North Texas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Navigating the Oncor System in Mesquite</h2>
                <p>
                  As part of the Oncor service area, your home is connected to a reliable grid. When you go solar, a NABCEP certified installer will handle the entire interconnection process with Oncor. Your main role will be to choose a Retail Electric Provider (REP) that offers the most favorable rate for the excess solar energy your system produces, which is the key to a fast return on investment.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-amber-800">
                    💡 <strong>Shop Around for Savings:</strong> A good installer will not only build your system but will also provide guidance on which REPs are offering the best solar buyback plans at the time of your installation.
                  </p>
                </div>

                <h2 className="mt-12">Finding an Installer as Tough as Texas</h2>
                <p>
                  You need a solar installer who understands how to build for the DFW climate. That means prioritizing NABCEP certified professionals who use high-quality, hail-rated solar panels and robust mounting systems. A true professional will ensure your system is permitted correctly with the City of Mesquite and built to last for over 25 years.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Mesquite's Top-Rated Installers
                    </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="mesquite-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Mesquite Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get a free, instant savings estimate for your Mesquite home.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Take the Reins of Your Energy Bill</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from trusted, NABCEP certified solar installers who serve the Mesquite community.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Mesquite Solar Quotes
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
            "name": "Best Solar Installers in Mesquite, TX",
            "description": "Find top NABCEP certified installers in Mesquite, TX. Learn how to take control of your energy costs with a durable solar system designed for the DFW area.",
            "url": "https://solarinstallerstx.com/mesquite-solar-installers"
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
              "name": "Mesquite"
            },
            "description": "Professional residential solar panel installation in Mesquite, TX. Connect with NABCEP certified installers to find the best solar buyback plans in the Oncor service area.",
            "name": "Mesquite Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default MesquiteSolarPage;
