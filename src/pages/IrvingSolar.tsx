import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const IrvingSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Irving, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Irving, TX. Get free quotes for aesthetically pleasing, high-performance solar systems in Las Colinas and Valley Ranch."
        canonicalUrl="https://solarinstallerstx.com/irving-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-teal-600 to-sky-600 text-white">
            <OptimizedImage
              src="/assets/irving-skyline-solar.webp"
              alt="Las Colinas, Irving skyline with solar panel overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Irving, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                A smart investment for the corporate heart of Dallas County. Discover how a modern solar system can complement your Irving home.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  For the discerning homeowners of Irving, Las Colinas, and Valley Ranch, an investment in solar energy is both a financially savvy and aesthetically smart decision. Modern solar technology offers sleek, low-profile designs that integrate beautifully with upscale architecture, all while providing significant savings and energy independence in the competitive DFW energy market.
                </p>

                <h2 className="mt-12">Aesthetic and Financial Excellence</h2>
                <p>
                  In a city known for its Fortune 500 companies and pristine communities, your home's appearance matters. Top-tier solar installers in Irving specialize in designing systems that are not only powerful but also visually appealing, preserving your home's curb appeal.
                </p>

                {/* Irving-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Irving Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💎 Sleek Aesthetics</td>
                        <td className="py-3">Low-profile panels and hidden hardware to match your home's design</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Maximum ROI</td>
                        <td className="py-3">Leverage the deregulated market to find the best solar buyback plan</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">A 30% reduction in your total system cost via the federal tax credit</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">🏠 Increased Home Value</td>
                        <td className="py-3">Solar is a highly desirable feature for homebuyers in North Texas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Choosing a Premier Installer for Your Irving Home</h2>
                <p>
                  Your home is a significant investment, and your solar installer should be chosen with the same level of care. A NABCEP certified professional with experience in Irving will understand the importance of a clean, meticulous installation. They will handle the Oncor interconnection and city permitting with professionalism and efficiency, and they will have experience navigating the specific requirements of communities like Las Colinas.
                </p>
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-sky-800">
                    💡 <strong>Design is Paramount:</strong> When getting quotes, ask installers to provide a visual rendering of what the solar array will look like on your home. A top professional will prioritize a design that is both powerful and discreet.
                  </p>
                </div>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Irving's Premier Solar Installers
                    </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="irving-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Irving Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get a free, no-obligation estimate of your potential solar savings.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Make a Smart Investment in Your Irving Home</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from NABCEP certified installers who specialize in high-performance, aesthetically pleasing solar systems.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Irving Solar Quotes
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
            "name": "Best Solar Installers in Irving, TX",
            "description": "Find top NABCEP certified installers in Irving, TX, specializing in aesthetically pleasing, high-performance solar systems for communities like Las Colinas and Valley Ranch.",
            "url": "https://solarinstallerstx.com/irving-solar-installers"
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
              "name": "Irving"
            },
            "description": "Professional residential solar panel installation in Irving, TX, with a focus on aesthetic design and maximizing ROI in the deregulated energy market.",
            "name": "Irving Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default IrvingSolarPage;
