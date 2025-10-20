import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const PlanoSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Plano, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Plano, TX. Get quotes for premium, aesthetically pleasing solar systems perfect for your Collin County home."
        canonicalUrl="https://solarinstallerstx.com/plano-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <OptimizedImage
              src="/assets/plano-skyline-solar.webp"
              alt="Plano, TX corporate headquarters with solar panel overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Plano, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                A premier investment for a premier Texas city. Discover how a custom solar solution can enhance your Plano home's value and efficiency.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  In Plano, a city consistently ranked among the best and safest places to live in America, homeowners expect excellence. An investment in solar energy is a perfect fit, offering a sophisticated way to increase your property value, reduce monthly expenses, and secure your family's energy future. This guide is for Plano, Frisco, and Allen residents who demand the highest quality for their homes.
                </p>

                <h2 className="mt-12">An Investment in Excellence and Aesthetics</h2>
                <p>
                  For homes in Collin County, curb appeal is paramount. The best solar installations are not only powerful but also beautifully integrated into the home's design. This requires a professional installer who prioritizes both performance and aesthetics.
                </p>

                {/* Plano-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Plano Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">🏠 Enhanced Home Value</td>
                        <td className="py-3">Solar is a premium feature that makes your home stand out</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💎 Superior Aesthetics</td>
                        <td className="py-3">Top installers use sleek, low-profile panels and conceal hardware</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Excellent ROI</td>
                        <td className="py-3">Choose from competitive solar buyback plans to maximize your return</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">The 30% federal tax credit provides a significant financial advantage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Navigating HOA and City Requirements in Plano</h2>
                <p>
                  Many of Plano's premier neighborhoods have active Homeowner's Associations (HOAs) with specific guidelines for solar installations. A top-tier, NABCEP certified installer will have a dedicated team or process for managing HOA approvals, submitting professional design plans that meet all requirements for a swift and easy approval. They will also handle all permitting with the City of Plano and the interconnection with Oncor.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-blue-800">
                    💡 <strong>Demand a Professional Process:</strong> A sign of a great installer is their ability to handle all the paperwork seamlessly. Your primary focus should be on the design and financial aspects, not bureaucracy.
                  </p>
                </div>

                <h2 className="mt-12">Choosing a Solar Installer for Collin County</h2>
                <p>
                  A NABCEP certified professional serving the Plano area will understand the expectations of homeowners in communities like Frisco, Allen, and McKinney. They will recommend high-efficiency solar panels from reputable brands and ensure every aspect of the installation, from the mounting to the wiring, is performed meticulously and cleanly.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Plano's Premier Solar Professionals
                    </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="plano-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Plano Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get a free, instant savings projection for your Plano home.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Upgrade Your Plano Home with Solar</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from elite, NABCEP certified solar installers who meet the highest standards of quality and service.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Plano Solar Quotes
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
            "name": "Best Solar Installers in Plano, TX",
            "description": "Find top NABCEP certified installers in Plano, TX, who specialize in high-end, aesthetically pleasing solar systems and seamless HOA approvals.",
            "url": "https://solarinstallerstx.com/plano-solar-installers"
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
              "name": "Plano"
            },
            "description": "Professional residential solar panel installation in Plano, TX, with a focus on aesthetic design, HOA approvals, and maximizing home value.",
            "name": "Plano Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default PlanoSolarPage;
