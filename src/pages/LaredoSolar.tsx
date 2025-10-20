import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const LaredoSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Laredo, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Laredo, TX. Harness the intense South Texas sun and save with AEP Texas's net metering program."
        canonicalUrl="https://solarinstallerstx.com/laredo-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
            <OptimizedImage
              src="/assets/laredo-skyline-solar.webp"
              alt="Laredo, Texas skyline with solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Laredo, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Turn the powerful South Texas sun into incredible energy savings. Discover Laredo's premier solar professionals.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  In Laredo, one of Texas's sunniest cities, solar panels aren't just an option—they're a powerhouse investment. The intense, year-round sunshine provides an exceptional opportunity for homeowners to generate significant amounts of clean energy, leading to dramatic savings on electricity bills and a rapid return on investment. This guide is tailored for Laredo residents who want to make the most of their unique solar advantage.
                </p>

                <h2 className="mt-12">Unmatched Solar Production in South Texas</h2>
                <p>
                  Laredo's geographical location blesses it with some of the highest solar irradiance levels in the country. This means that a solar panel system in Laredo will generate more electricity than an identical system in almost any other part of the state, making your investment work harder for you.
                </p>

                {/* Laredo-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Laredo Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Peak Sun Hours</td>
                        <td className="py-3">A remarkable <strong>~5.7 hours/day</strong></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ AEP Texas Program</td>
                        <td className="py-3">Reliable net metering to credit you for surplus energy</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">The 30% federal tax credit makes the upfront cost highly affordable</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">🌡️ Heat Performance</td>
                        <td className="py-3">Modern panels are designed to perform efficiently in Laredo's hot climate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Partnering with AEP Texas for Solar Savings</h2>
                <p>
                  Your local utility, <strong>AEP Texas</strong>, provides a net metering program that is crucial for maximizing your solar investment. This program ensures you get fair credit for all the excess electricity you send to the grid. An experienced NABCEP certified installer will manage the entire interconnection process with AEP Texas, from application to activation, making the process simple and straightforward for you.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-yellow-800">
                    💡 <strong>Smart System Design:</strong> In Laredo's sunny climate, it's often cost-effective to design a system that meets or exceeds 100% of your annual electricity usage. A qualified installer can model your potential production and savings to help you find the perfect system size.
                  </p>
                </div>

                <h2 className="mt-12">Finding an Installer Who Knows the South Texas Climate</h2>
                <p>
                  Installing solar in Laredo requires equipment that can handle intense, prolonged sun exposure and high temperatures. A top-tier NABCEP certified professional will recommend high-efficiency monocrystalline solar panels with a low temperature coefficient, ensuring your system maintains peak performance even during the hottest parts of the year. They will ensure all components are rated for the demanding South Texas climate.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Laredo's Top-Rated Solar Installers
                    </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="laredo-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Laredo Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See just how much you can save in one of Texas's sunniest cities. Get your free estimate now.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Go Solar on the Border</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from NABCEP certified installers who specialize in building high-production solar systems for the Laredo area.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Laredo Solar Quotes
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
            "name": "Best Solar Installers in Laredo, TX",
            "description": "Find top NABCEP certified solar installers in Laredo, TX. Learn how to maximize your solar production with AEP Texas in the high-sunshine climate of South Texas.",
            "url": "https://solarinstallerstx.com/laredo-solar-installers"
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
              "name": "Laredo"
            },
            "description": "Professional residential and commercial solar panel installation in Laredo, TX, designed for the high-temperature and high-sunlight conditions of South Texas.",
            "name": "Laredo Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default LaredoSolarPage;
