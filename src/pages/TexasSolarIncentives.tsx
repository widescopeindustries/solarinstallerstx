import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { SolarCalculator } from "@/components/SolarCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const TexasSolarIncentivesPage = () => {
  return (
    <>
      <SEOHead
        title="Texas Solar Incentives & Rebates Guide"
        description="Complete guide to Texas solar incentives, federal tax credits, and utility rebates to maximize savings."
        canonicalUrl="https://solarinstallerstx.com/texas-solar-incentives"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <article className="max-w-4xl mx-auto prose prose-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Ultimate Guide to Texas Solar Incentives & Rebates (2025)
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Texas is one of the best states for solar energy, not just because of abundant sunshine, but also thanks to a variety of powerful financial incentives. This guide breaks down every federal, state, and local utility rebate available to help you maximize your return on investment and significantly reduce the cost of your solar panel installation.
            </p>

            {/* Federal Incentive Section */}
            <section className="mt-12">
              <h2 className="text-3xl font-bold">Federal Solar Tax Credit (ITC)</h2>
              <p>
                The most significant incentive available to all Texas residents is the federal Residential Clean Energy Credit, commonly known as the Solar Investment Tax Credit (ITC).
              </p>
              <Card className="my-6 bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <p className="text-6xl font-bold text-primary text-center mb-2">30%</p>
                  <p className="text-center font-semibold text-xl">
                    Of Total System Cost Deducted from Your Federal Taxes
                  </p>
                </CardContent>
              </Card>
              <h3 className="text-2xl font-semibold mt-6">How the ITC Works:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Credit, Not a Deduction:</strong> The ITC is a dollar-for-dollar reduction of the income tax you owe. If your credit is $6,000, you owe $6,000 less in taxes.</li>
                <li><strong>What's Covered:</strong> The credit applies to the total cost of your system, including panels, inverters, wiring, mounting hardware, battery storage (if installed with the system), and labor costs.</li>
                <li><strong>Rollover:</strong> If your tax liability is less than the credit amount in one year, you can roll the remaining credit over to the next tax year.</li>
                <li><strong>Eligibility:</strong> You must own your solar energy system (cash or loan purchase). Leased systems are not eligible. The system must be placed in service during the tax year.</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                  <p className="font-medium text-blue-800">
                    <strong>Example:</strong> On a $25,000 solar system, the 30% ITC provides a $7,500 credit, reducing your net cost to just $17,500.
                  </p>
              </div>
            </section>

            {/* Local Utility Rebates Section */}
            <section className="mt-12">
              <h2 className="text-3xl font-bold">Local Utility & Co-op Rebates</h2>
              <p>
                While Texas doesn't have a statewide solar rebate program, many local utility companies and electric cooperatives offer their own powerful incentives. These are geographically specific, so your eligibility depends on your electricity provider.
              </p>
              <div className="space-y-8 mt-6">
                {/* Austin Energy */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">Austin Energy Solar Rebate</h3>
                    <p className="font-bold text-primary text-lg mb-2">Up to $2,500 Upfront Rebate</p>
                    <p>Austin Energy customers are eligible for a one-time rebate that is paid directly to your installer, reducing your out-of-pocket cost. Additionally, they offer a Value of Solar (VoS) tariff, which credits you for all the energy your panels produce.</p>
                    <Button asChild variant="link" className="px-0">
                      <a href="https://austinenergy.com/green-power/solar/for-your-home" target="_blank" rel="noopener noreferrer">Learn More <ExternalLink className="h-4 w-4 ml-2" /></a>
                    </Button>
                  </CardContent>
                </Card>
                {/* Oncor (Dallas/Fort Worth) */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">Oncor (DFW Area) Incentives</h3>
                    <p>Oncor's solar program varies year to year based on funding. While not a direct cash rebate, their programs often provide incentives to solar installers for installing high-efficiency systems, and those savings are typically passed on to the customer. Check with your installer for current Oncor incentives.</p>
                     <Button asChild variant="link" className="px-0">
                      <a href="https://www.oncor.com/content/oncorwww/us/en/home/your-home/save-energy/solar-energy-incentives.html" target="_blank" rel="noopener noreferrer">Check Program Status <ExternalLink className="h-4 w-4 ml-2" /></a>
                    </Button>
                  </CardContent>
                </Card>
                {/* Other Utilities */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">Other Texas Utilities (CPS Energy, GVEC, etc.)</h3>
                    <p>Many other utilities, like CPS Energy in San Antonio and Guadalupe Valley Electric Cooperative (GVEC), offer rebates or incentives. These programs change frequently, so it's crucial to check with your specific provider or a local installer for the most up-to-date information.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Other Incentives Section */}
            <section className="mt-12">
                <h2 className="text-3xl font-bold">Other Key Texas Solar Benefits</h2>
                <h3 className="text-2xl font-semibold mt-6">Property Tax Exemption</h3>
                <p>Texas law exempts the value added by a solar panel system from your property taxes. This means your home's value increases, but your property tax bill does not. This is a 100% exemption and a significant financial benefit.</p>

                <h3 className="text-2xl font-semibold mt-6">Net Metering / Solar Buyback Plans</h3>
                <p>In Texas's deregulated energy market, many Retail Electric Providers (REPs) offer "solar buyback" plans. This is effectively net metering, where they credit you for excess electricity your panels send to the grid, further reducing your monthly bills.</p>
            </section>

            {/* NABCEP Certification Section */}
            <section className="mt-12">
                <h2 className="text-3xl font-bold">The Importance of NABCEP Certification</h2>
                <p>
                  Many Texas utility rebates require your system to be installed by a professional with a certification from the <a href="https://www.nabcep.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">North American Board of Certified Energy Practitioners (NABCEP)</a>. This is the gold standard for solar installers and ensures your project is handled by a qualified, knowledgeable, and safe professional. Always verify your installer's credentials.
                </p>
            </section>

             {/* Solar Calculator Section */}
            <section id="incentives-solar-calculator" className="py-16 my-12 bg-muted/30 rounded-lg">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Calculate Your Savings with Texas Incentives
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Enter your address and average monthly bill to get a personalized estimate of your potential savings, factoring in the federal tax credit and local benefits.
                        </p>
                    </div>
                    <SolarCalculator />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Incentives FAQ</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg">Do I get the federal tax credit back as a refund?</h3>
                    <p className="text-muted-foreground">Not necessarily. It's a non-refundable credit, meaning it can reduce your tax liability to zero, but you won't get any remaining amount back as a cash refund. However, you can carry forward unused credit to the next year.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg">Can I get a rebate if I lease my solar panels?</h3>
                    <p className="text-muted-foreground">Generally, no. Most federal and local incentives require you to own the system. The leasing company, as the system owner, typically claims the incentives themselves.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg">How do I claim the 30% federal tax credit?</h3>
                    <p className="text-muted-foreground">You claim the Residential Clean Energy Credit by filing IRS Form 5695 with your annual federal tax return.</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TexasSolarIncentivesPage;
