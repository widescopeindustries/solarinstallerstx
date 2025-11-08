import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, CheckCircle, FileText, Shield } from "lucide-react";

const TexasGuide = () => {
  return (
    <>
      <SEOHead
        title="Texas Solar Consumer Guide 2025"
        description="Guide to going solar in Texas. Learn about incentives, regulations, and choosing installers."
        canonicalUrl="https://solarinstallerstx.com/texas-guide"
      />
      <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Texas Solar Consumer Guide</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about going solar in Texas, including new 2025 regulations
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Regulatory Alert */}
        <div className="bg-primary/10 border-l-4 border-primary p-6 mb-8 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold text-lg mb-2">New Texas Regulations (2025)</h2>
              <p className="text-muted-foreground">
                Recent changes to Texas solar regulations require enhanced disclosure, licensing verification, and consumer 
                protections. Make sure any installer you work with complies with updated TDLR requirements.
              </p>
            </div>
          </div>
        </div>

        {/* How We Vet Installers */}
        <section className="mb-12 bg-card border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">How We Vet Installers</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Every installer on SolarInstallersTX undergoes a rigorous verification process to protect Texas consumers:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">NABCEP Certification</h3>
                <p className="text-sm text-muted-foreground">We verify current NABCEP professional credentials</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">State Licensing</h3>
                <p className="text-sm text-muted-foreground">Confirm TDLR electrical contractor licenses</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Insurance Coverage</h3>
                <p className="text-sm text-muted-foreground">Verify liability and workers' comp insurance</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold">Business Verification</h3>
                <p className="text-sm text-muted-foreground">Check BBB ratings and business registration</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top 5 Questions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Top 5 Questions to Ask Any Solar Installer in Texas</h2>
          <div className="space-y-4">
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">1. What is your NABCEP certification number and when does it expire?</h3>
              <p className="text-muted-foreground">
                NABCEP certification is the gold standard for solar professionals. Verify the installer's credentials at nabcep.org.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">2. What warranties cover the panels, inverters, and installation work?</h3>
              <p className="text-muted-foreground">
                Look for 25-year panel warranties, 10+ year inverter warranties, and minimum 10-year workmanship guarantees.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">3. Will you handle all permits, inspections, and utility interconnection?</h3>
              <p className="text-muted-foreground">
                A full-service installer should manage all permitting, city inspections, and coordination with your utility company.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">4. What happens if I sell my home before the system is paid off?</h3>
              <p className="text-muted-foreground">
                Understand loan transfer options, lease assumptions, or early buyout terms if you finance your system.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">5. Can you provide references from recent Texas installations?</h3>
              <p className="text-muted-foreground">
                Request contact information for 3-5 recent customers in your area and verify their satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What are the new 2025 Texas solar regulations?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                As of 2025, Texas requires enhanced consumer disclosures, stricter licensing requirements for solar contractors, 
                mandatory warranty documentation, and clearer financing terms. Installers must provide standardized disclosure 
                forms before contract signing, and all work must be performed by TDLR-licensed electricians.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Are there tax credits or incentives for solar in Texas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! The federal Investment Tax Credit (ITC) provides a 30% tax credit for solar installations through 2032. 
                Texas also offers property tax exemptions for solar equipment value and sales tax exemptions on solar equipment 
                purchases. Some utilities offer net metering or buyback programs for excess energy production.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                How do I verify an installer's credentials?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc ml-5 space-y-2">
                  <li>Check NABCEP certification at <a href="https://www.nabcep.org/certification/certified-installers-map/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nabcep.org</a></li>
                  <li>Verify electrical contractor license with Texas Department of Licensing and Regulation (TDLR)</li>
                  <li>Confirm insurance coverage by requesting current certificates</li>
                  <li>Check BBB rating and complaint history</li>
                  <li>Review business registration with Texas Secretary of State</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                Should I lease or buy my solar system?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Buying (cash or loan) typically provides better long-term value and allows you to claim the 30% federal tax credit. 
                Leases require no upfront cost but result in lower overall savings. Consider your financial situation, tax liability, 
                and long-term home ownership plans. Most Texas homeowners benefit more from purchase options.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                How long does installation take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Physical installation typically takes 1-3 days for residential systems. However, the full process from contract 
                to activation takes 6-12 weeks on average, including permit approval (2-4 weeks), installation (1-3 days), 
                utility inspection and approval (2-6 weeks), and final interconnection.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What happens during a power outage?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Standard grid-tied solar systems automatically shut down during outages for safety. To maintain power during 
                outages, you need a battery backup system (like Tesla Powerwall, LG Chem, or Enphase). Battery systems add 
                $10,000-$15,000 to installation costs but provide energy independence and backup power.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                How do I know if my roof is suitable for solar?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Ideal roofs face south, have minimal shading, and are in good condition with at least 15 years of remaining life. 
                Most Texas roofs are suitable due to our abundant sunshine. Professional installers provide free site assessments 
                using satellite imagery and in-person inspections to determine feasibility and optimal panel placement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                What maintenance do solar panels require?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Solar panels require minimal maintenance. In most Texas regions, rain provides adequate cleaning. Annual 
                inspections are recommended to check connections, inverters, and panel condition. Keep trees trimmed to 
                prevent shading. Most systems include monitoring apps to track performance and identify issues.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Additional Resources */}
        <section className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>
              <a href="https://www.dsireusa.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                DSIRE - Database of State Incentives for Renewables & Efficiency
              </a>
            </li>
            <li>
              <a href="https://www.tdlr.texas.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Texas Department of Licensing and Regulation (TDLR)
              </a>
            </li>
            <li>
              <a href="https://www.nabcep.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                NABCEP - North American Board of Certified Energy Practitioners
              </a>
            </li>
            <li>
              <a href="https://www.energy.gov/eere/solar/homeowners-guide-going-solar" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                U.S. Department of Energy - Homeowner's Guide to Going Solar
              </a>
            </li>
          </ul>
        </section>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-primary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-3">Ready to Find Your Verified Installer?</h2>
          <p className="text-muted-foreground mb-6">
            Browse our directory of verified, NABCEP-certified solar installers across Texas
          </p>
          <a 
            href="/" 
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Find Installers Near You
          </a>
        </div>
      </main>
      </div>
    </>
  );
};

export default TexasGuide;
