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
        title="Arlington TX NABCEP-Certified Solar Installers (2025 Guide)"
        description="Find top NABCEP certified solar installers in Arlington, TX for 2025. Explore Oncor rebates, financing, and get free quotes for your DFW home."
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
                Arlington TX NABCEP-Certified Solar Installers (2025 Guide)
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl">
                Slash your Texas energy bills by 70%—start today! Connect with Arlington's best solar installers.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <article className="max-w-4xl mx-auto prose prose-lg">
                <p className="text-xl leading-relaxed">
                  Located right between Dallas and Fort Worth, Arlington is a prime location for homeowners to capitalize on the benefits of solar energy. With access to the same competitive, deregulated energy market and abundant sunshine, an investment in solar can significantly reduce or even eliminate your monthly electricity bill. This guide covers <strong>Arlington solar incentives 2025</strong>, local Oncor rebates, and helps you find the <strong>best solar installers in Arlington TX with financing</strong> options.
                </p>

                <h2 className="mt-12">Why Arlington Homeowners Choose Solar in 2025</h2>
                <p>
                  For families in Arlington, Grand Prairie, and Mansfield, managing household expenses is key. Solar offers a unique opportunity to lock in your energy costs for decades, protecting you from the volatile price swings of the traditional electricity market. By going solar, you achieve energy independence and contribute to a cleaner Texas grid.
                </p>

                {/* Arlington-Specific Benefits Table */}
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-2xl font-semibold mb-4">The Arlington Solar Advantage</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">💰 Maximum ROI</td>
                        <td className="py-3">Choose from many REPs to find the best solar buyback rate. Payback periods are as low as 6-8 years.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">🏠 HOA Expertise</td>
                        <td className="py-3">Experienced local installers know how to navigate HOA approvals in communities like Viridian and Dalworthington Gardens.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold"> federal Tax Credit</td>
                        <td className="py-3">The 26% federal tax credit makes your investment even more affordable, reducing costs by thousands.</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">☀️ Abundant Sun</td>
                        <td className="py-3">Take advantage of over 230 sunny days per year to maximize your energy production.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 className="mt-12">26% Federal Tax Credit & Local Oncor Rebates</h2>
                <p>
                    The Federal Solar Tax Credit allows you to deduct 26% of the cost of installing a solar energy system from your federal taxes. On top of that, as an Oncor service area resident, you may be eligible for performance-based incentives that pay you for the solar energy you produce. A qualified NABCEP installer can help you navigate these programs to maximize your savings.
                </p>

                <h2 className="mt-12">Best Solar Installers in Arlington TX – Curated List</h2>
                <ol>
                    <li><strong>Freedom Solar Power:</strong> Known for high-quality SunPower panels and excellent customer service in the DFW area.</li>
                    <li><strong>Good Faith Energy:</strong> A local favorite with strong expertise in both residential and commercial solar installations.</li>
                    <li><strong>Longhorn Solar:</strong> An Austin-based company that has expanded to serve the DFW market with competitive pricing.</li>
                </ol>

                <div className="text-center my-12">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <a href="/contact">Get Free Quotes from Arlington Installers</a>
                    </Button>
                </div>

                <h2 className="mt-12">FAQ: Cost, Financing, Net-Metering in Arlington</h2>
                <details>
                    <summary>How much do solar panels cost in Arlington?</summary>
                    <p>The average cost is between $2.70 and $3.35 per watt. A typical 7kW system costs around $21,000 before the 26% federal tax credit.</p>
                </details>
                <details>
                    <summary>What financing options are available?</summary>
                    <p>Most installers offer $0-down solar loans with low-interest rates. You can also consider a cash purchase for the best ROI or a solar lease.</p>
                </details>
                <details>
                    <summary>How does net metering work with Oncor?</summary>
                    <p>You'll choose a Retail Electric Provider (REP) with a solar buyback plan. They will credit your bill for the excess electricity your panels send to the grid.</p>
                </details>

                <h2 className="mt-12">Arlington Solar Panel Installation Map</h2>
                <iframe
                    title="Google Business Profile Map for Arlington Solar Installers"
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d214882.3508731382!2d-97.2849629168434!3d32.6983696808728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssolar%20installers%20in%20Arlington%2C%20TX!5e0!3m2!1sen!2sus!4v1672522000000!5m2!1sen!2sus"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

              </article>
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
            "name": "Arlington TX NABCEP-Certified Solar Installers (2025 Guide)",
            "description": "Find top NABCEP certified installers in Arlington, TX for 2025. Learn about Oncor rebates, HOA approvals, and solar buyback plans in the DFW Metroplex.",
            "url": "https://solarinstallerstx.com/arlington-solar-installers"
          }
        `}
      </script>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much do solar panels cost in Arlington?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average cost is between $2.70 and $3.35 per watt. A typical 7kW system costs around $21,000 before the 26% federal tax credit."
                }
              },
              {
                "@type": "Question",
                "name": "What financing options are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most installers offer $0-down solar loans with low-interest rates. You can also consider a cash purchase for the best ROI or a solar lease."
                }
              }
            ]
          }
        `}
      </script>
    </>
  );
};

export default ArlingtonSolarPage;
