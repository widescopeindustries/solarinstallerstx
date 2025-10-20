import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const PasadenaSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Pasadena, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Pasadena, TX. Get quotes on resilient solar systems designed to lower your A/C costs and protect against grid outages."
        canonicalUrl="https://solarinstallerstx.com/pasadena-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-blue-700 to-cyan-500 text-white">
            <OptimizedImage
              src="/assets/pasadena-skyline-solar.webp"
              alt="Pasadena, TX industrial skyline with solar panel overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Pasadena, TX
            </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Secure your home's power and slash your cooling costs. Find expert installers in Pasadena who build for resilience and savings.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  For homeowners in Pasadena, Deer Park, and La Porte, energy is a part of daily life. An investment in solar power offers a unique opportunity to gain control over high electricity bills and ensure your family has power when the grid is down. This guide focuses on the practical benefits of going solar in a key part of the Houston metro area.
                </p>

                <h2 className="mt-12">Beat the Heat and Build for Resilience</h2>
                <p>
                  The Gulf Coast climate means high A/C usage for a large portion of the year. Solar panels generate the most power during the sunniest, hottest parts of the day—exactly when you need it most. Paired with a battery, a solar system can provide critical backup power during outages caused by hurricanes or other severe weather.
                </p>

                {/* Pasadena-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Pasadena Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">🌬️ Energy Security</td>
                        <td className="py-3">Battery storage provides backup power during storm outages</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">❄️ Lower A/C Bills</td>
                        <td className="py-3">Offset high summer electricity costs with your own solar power</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">A 30% federal tax credit makes the entire system more affordable</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">💰 Solar Buyback Plans</td>
                        <td className="py-3">Choose an REP that pays you for your excess solar energy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Working with CenterPoint and Your REP</h2>
                <p>
                  Like the rest of Harris County, your home in Pasadena is served by <strong>CenterPoint Energy</strong> for grid infrastructure. A professional, NABCEP certified installer will handle the entire interconnection process with them. Your financial savings will be determined by the solar buyback plan you choose from a Retail Electric Provider (REP). An experienced local installer can be a valuable resource in helping you find the REP with the best rates.
                </p>
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-cyan-800">
                    💡 <strong>Focus on Resilience:</strong> When getting quotes, discuss battery storage options with your installer. The peace of mind that comes with having backup power during a hurricane is a major benefit for Pasadena families.
                  </p>
                </div>

                <h2 className="mt-12">Finding an Installer Who Knows Harris County</h2>
                <p>
                  A top-tier solar professional in Pasadena will have extensive experience with the permitting process in the city and with CenterPoint's technical requirements. Prioritizing a NABCEP certified installer ensures you're working with a vetted expert who will build a safe, reliable, and high-performance system designed to withstand the Gulf Coast climate for decades.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Pasadena's Top-Rated Installers
                    </Button>
                </div>
              </div>
              </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="pasadena-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Pasadena Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get a free, no-hassle estimate of your potential solar savings.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Invest in Your Home's Energy Future</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from NABCEP certified installers who specialize in building resilient solar systems for the Pasadena area.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Pasadena Solar Quotes
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
            "name": "Best Solar Installers in Pasadena, TX",
            "description": "Find top NABCEP certified solar installers in Pasadena, TX, who specialize in resilient systems that lower A/C costs and protect against grid outages.",
            "url": "https://solarinstallerstx.com/pasadena-solar-installers"
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
              "name": "Pasadena"
            },
            "description": "Professional residential solar panel installation in Pasadena, TX. Connect with NABCEP certified installers for resilient systems and battery backup solutions.",
            "name": "Pasadena Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default PasadenaSolarPage;
