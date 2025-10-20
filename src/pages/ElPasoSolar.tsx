import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const ElPasoSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers El Paso, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top-rated NABCEP certified solar installers in El Paso, TX. Maximize your energy production in one of America's sunniest cities with El Paso Electric's net metering."
        canonicalUrl="https://solarinstallerstx.com/el-paso-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <OptimizedImage
              src="/assets/el-paso-skyline-solar.webp"
              alt="El Paso skyline with Franklin Mountains and solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in El Paso, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Capitalize on the endless sunshine of West Texas. Discover how El Paso's unique climate makes it one of the most productive places on earth for solar energy.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  Welcome to the Sun City, where solar power isn't just a good idea—it's an incredible investment. With more than 300 days of sunshine a year, El Paso offers an unparalleled opportunity for homeowners to generate their own clean energy, drastically cut electricity costs, and gain independence from the grid. This guide is designed for El Paso residents, focusing on maximizing energy production in our unique desert climate.
                </p>

                <h2 className="mt-12">El Paso: America's Solar Powerhouse</h2>
                <p>
                  Very few places in the country can match El Paso's solar potential. The sheer intensity and duration of sunlight mean that solar panels here are more productive, leading to a faster return on investment and greater long-term savings.
                </p>

                {/* El Paso-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The El Paso Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">☀️ Peak Sun Hours</td>
                        <td className="py-3">An incredible <strong>~5.8 hours/day</strong> (302+ sunny days/year)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">⚡ El Paso Electric</td>
                        <td className="py-3">Offers a reliable net metering program for residential solar</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">30% of your total system cost returned to you as a tax credit</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">🏜️ Desert Performance</td>
                        <td className="py-3">Modern panels excel in high-temperature, high-irradiance environments</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Working with El Paso Electric's Net Metering Program</h2>
                <p>
                  El Paso Electric provides a net metering program that allows you to get credit for the excess electricity your system generates. Your NABCEP certified installer will handle the entire interconnection process, ensuring your system is properly connected to the grid and that you're set up to receive credits on your monthly bill.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-orange-800">
                    💡 <strong>Maximize Your Production:</strong> Given the intense sun, a slightly larger system in El Paso can often zero out your electricity bill entirely. Discuss your energy goals with your installer to design a system that takes full advantage of the desert climate.
                  </p>
                </div>

                <h2 className="mt-12">Choosing an Installer for the Desert Climate</h2>
                <p>
                  Installing solar in El Paso requires expertise in handling high temperatures and intense UV exposure. A qualified NABCEP certified installer will recommend high-performance monocrystalline panels with excellent temperature coefficients, ensuring your system produces efficiently even on the hottest summer days. They will also use durable, UV-resistant wiring and components to guarantee a 25+ year lifespan for your system.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare El Paso's Top Solar Experts
                    </Button>
                </div>

                <h2 className="mt-12">The Cost of Solar in the Sun City</h2>
                <p>
                  The average cost for a solar installation in El Paso is competitive, ranging from $2.50 to $3.10 per watt. Thanks to the high energy production, the payback period in El Paso is often shorter than in other parts of the state.
                </p>

                {/* Cost Breakdown Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">Sample 7kW Solar System Cost in El Paso</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Gross System Cost</td>
                        <td className="py-2 text-right">$19,600</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">(-) 30% Federal Tax Credit</td>
                        <td className="py-2 text-right">-$5,880</td>
                      </tr>
                      <tr className="bg-green-50 border-green-200">
                        <td className="py-3 font-bold text-lg">Net Cost After Incentives</td>
                        <td className="py-3 text-right font-bold text-lg text-green-600">$13,720</td>
                      </tr>
                    </tbody>
                  </table>
                   <p className="text-sm text-muted-foreground mt-4">
                    *This is an estimate. Your final cost will depend on your home's energy needs and the equipment you choose.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="el-paso-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your El Paso Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  With over 300 days of sun, the savings are significant. Get a personalized estimate for your home now.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Harness the Power of the Sun City</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from El Paso's most experienced NABCEP certified solar installers and start generating your own clean, affordable energy.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free El Paso Solar Quotes
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
            "name": "Best Solar Installers in El Paso, TX",
            "description": "Find top-rated NABCEP certified solar installers in El Paso. Maximize your solar production in one of America's sunniest cities and learn about El Paso Electric's net metering program.",
            "url": "https://solarinstallerstx.com/el-paso-solar-installers"
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
              "name": "El Paso"
            },
            "description": "Professional residential and commercial solar panel installation in El Paso, TX, optimized for the desert climate. Connect with NABCEP certified installers.",
            "name": "El Paso Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default ElPasoSolarPage;
