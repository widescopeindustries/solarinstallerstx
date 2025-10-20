import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const CorpusChristiSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Corpus Christi, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top-rated NABCEP certified solar installers in Corpus Christi, TX. Get quotes on corrosion-resistant, hurricane-rated solar systems for the Coastal Bend."
        canonicalUrl="https://solarinstallerstx.com/corpus-christi-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
            <OptimizedImage
              src="/assets/corpus-christi-skyline-solar.webp"
              alt="Corpus Christi bayfront with solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Corpus Christi, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Build a resilient, coastal-proof solar system. Discover installers who specialize in durable, salt-mist resistant technology for your home in the Coastal Bend.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  For homeowners in Corpus Christi and the surrounding Coastal Bend, solar energy is about more than just savings—it's about resilience. A properly designed solar and battery storage system can provide crucial backup power during hurricane season, all while lowering your monthly electricity bills from AEP Texas. This guide focuses on the unique considerations for installing a durable, long-lasting solar system in a coastal environment.
                </p>

                <h2 className="mt-12">Coastal Climate & Solar: Built to Last</h2>
                <p>
                  The salty air and risk of high winds in Corpus Christi mean that not all solar equipment is created equal. It's vital to choose components and an installer who understands how to build a system that can withstand the harsh coastal elements.
                </p>

                {/* Corpus Christi-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Coastal Bend Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">🌪️ Hurricane Resilience</td>
                        <td className="py-3">Pair with a battery for backup power during grid outages</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">🌊 Salt-Mist Resistance</td>
                        <td className="py-3">Installers use corrosion-resistant racking and components</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ AEP Texas Net Metering</td>
                        <td className="py-3">Get credited for the excess solar power you generate</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">A 30% tax credit significantly reduces the upfront cost of your system</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">☀️ Strong Sun Exposure</td>
                        <td className="py-3">~5.3 hours/day of peak sunlight for high energy production</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Why Material Choice Matters on the Coast</h2>
                <p>
                  Salt spray from the Gulf is highly corrosive. An experienced Corpus Christi installer will use specialized materials to protect your investment, such as <strong>anodized aluminum or stainless steel racking</strong> and sealed electrical components with high IP ratings. This prevents rust and degradation, ensuring your system performs optimally for its full 25+ year lifespan.
                </p>
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-cyan-800">
                    💡 <strong>Ask Your Installer:</strong> Before signing a contract, ask potential installers specifically about the corrosion-resistant hardware and techniques they use for coastal installations. This is a key indicator of a knowledgeable local professional.
                  </p>
                </div>

                <h2 className="mt-12">Finding an Installer Who Knows the Coastal Bend</h2>
                <p>
                  A qualified NABCEP certified installer in Corpus Christi will have a deep understanding of local building codes, which often have stricter requirements for wind load and mounting to protect against hurricanes. They will also be experts in navigating the interconnection process with <strong>AEP Texas</strong>, ensuring your project is approved and activated without delay.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Vetted Corpus Christi Installers
                    </Button>
                </div>

                <h2 className="mt-12">Cost of a Coastal-Ready Solar System</h2>
                <p>
                  The cost of solar in Corpus Christi is competitive, ranging from $2.70 to $3.40 per watt. The price may be slightly higher than inland cities due to the need for more robust, corrosion-resistant hardware, but the long-term reliability is well worth the investment.
                </p>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="corpus-christi-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Corpus Christi Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See your potential savings with our free, instant solar calculator.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Go Solar on the Sparkling City by the Sea</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from NABCEP certified solar installers who specialize in building resilient, coastal-proof systems. Protect your home and your wallet.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Coastal Bend Solar Quotes
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
            "name": "Best Solar Installers in Corpus Christi, TX",
            "description": "Find top NABCEP certified solar installers in Corpus Christi specializing in corrosion-resistant, hurricane-rated solar systems for the Coastal Bend. Get free quotes.",
            "url": "https://solarinstallerstx.com/corpus-christi-solar-installers"
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
              "name": "Corpus Christi"
            },
            "description": "Professional residential and commercial solar panel installation in Corpus Christi, TX, featuring corrosion-resistant materials for coastal environments.",
            "name": "Corpus Christi Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default CorpusChristiSolarPage;
