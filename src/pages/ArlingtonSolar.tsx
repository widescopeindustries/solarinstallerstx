import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { SolarCalculator } from "@/components/SolarCalculator";

const ArlingtonSolarPage = () => {
  return (
    <>
      <SEOHead
        title="Best Solar Installers Arlington, TX | NABCEP Certified | SolarInstallersTX"
        description="Find top NABCEP certified solar installers in Arlington, TX. Get free quotes on high-efficiency solar systems perfect for the DFW metroplex."
        canonicalUrl="https://solarinstallerstx.com/arlington-solar-installers"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative h-[400px] bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
            <OptimizedImage
              src="/assets/arlington-skyline-solar.webp"
              alt="Arlington's entertainment district with solar panels"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              width={1920}
              height={400}
              sizes="100vw"
              fetchPriority="high"
            />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Solar Installers in Arlington, TX
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Power your home in the heart of the Metroplex. Discover Arlington's best solar installers and make a smart investment in your energy future.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  Located right between Dallas and Fort Worth, Arlington is a prime location for homeowners to capitalize on the benefits of solar energy. With access to the same competitive, deregulated energy market and abundant sunshine, an investment in solar can significantly reduce or even eliminate your monthly electricity bill. This guide is for Arlington residents who want to make a smart, informed decision about going solar.
                </p>

                <h2 className="mt-12">The Smart Choice for Suburban Savings</h2>
                <p>
                  For families in Arlington, Grand Prairie, and Mansfield, managing household expenses is key. Solar offers a unique opportunity to lock in your energy costs for decades, protecting you from the volatile price swings of the traditional electricity market.
                </p>

                {/* Arlington-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Arlington Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Maximum ROI</td>
                        <td className="py-3">Choose from many REPs to find the best solar buyback rate</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">🏠 HOA Expertise</td>
                        <td className="py-3">Experienced installers know how to navigate HOA approvals</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">The 30% federal tax credit makes your investment even more affordable</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">☀️ Abundant Sun</td>
                        <td className="py-3">Take advantage of over 230 sunny days per year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2>Navigating HOAs and the Oncor Grid</h2>
                <p>
                  A common concern for homeowners in Arlington's many planned communities is getting approval from their Homeowner's Association (HOA). The right installer makes this a non-issue. Experienced, local NABCEP certified installers have a proven process for submitting the necessary design documents to HOAs for a smooth, quick approval. They will also manage the entire interconnection process with Oncor, making your transition to solar power completely turnkey.
                </p>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-indigo-800">
                    💡 <strong>Peace of Mind:</strong> Don't let HOA paperwork deter you. A professional installer handles this for you. Your main job is simply to choose the best Retail Electric Provider (REP) to maximize the credit you get for your excess solar energy.
                  </p>
                </div>

                <h2 className="mt-12">Finding an Installer Who Knows the Metroplex</h2>
                <p>
                  Choosing an installer with a strong reputation in the DFW area is crucial. A NABCEP certified professional will not only ensure a high-quality installation but will also recommend the right equipment—like durable, hail-rated panels—to withstand the unpredictable North Texas weather, protecting your investment for the long haul.
                </p>

                {/* CTA */}
                <div className="text-center my-12">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Compare Arlington's Most Trusted Installers
                    </Button>
                </div>

                <h2 className="mt-12">What to Expect for Solar Costs in Arlington</h2>
                <p>
                  The cost of solar in Arlington is very competitive, averaging between $2.70 and $3.35 per watt. For a typical family home, a 7kW system is a common choice, with a gross cost around $21,000 before the 30% federal tax credit is applied.
                </p>
              </div>
            </div>
          </section>

          {/* Solar Calculator Section */}
          <section id="arlington-solar-calculator" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Calculate Your Arlington Solar Savings
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get a free, personalized estimate of your potential solar savings.
                </p>
              </div>
              <SolarCalculator />
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Solar Project in Arlington</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Get free quotes from NABCEP certified solar installers who have deep experience working in Arlington and the greater DFW area.
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get My Free Arlington Solar Quotes
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
            "name": "Best Solar Installers in Arlington, TX",
            "description": "Find top NABCEP certified installers in Arlington, TX. Learn about HOA approvals, Oncor interconnection, and solar buyback plans in the DFW Metroplex.",
            "url": "https://solarinstallerstx.com/arlington-solar-installers"
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
              "name": "Arlington"
            },
            "description": "Professional residential solar panel installation in Arlington, TX. Connect with NABCEP certified installers experienced with HOA approvals and the Oncor grid.",
            "name": "Arlington Solar Panel Installation"
          }
        `}
      </script>
    </>
  );
};

export default ArlingtonSolarPage;
