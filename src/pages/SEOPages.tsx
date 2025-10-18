import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export const FAQPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I choose the best solar installer in Texas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose a NABCEP certified solar installer with proper TDLR licensing, liability insurance, and positive customer reviews. Verify their experience with residential or commercial installations and request multiple quotes to compare pricing and services."
        }
      },
      {
        "@type": "Question",
        "name": "What certifications should Texas solar installers have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Top solar installers in Texas should have NABCEP certification (PVIP, PVSI, or ESIP), TDLR electrical contractor license, liability and workers' compensation insurance, and BBB accreditation. These credentials ensure quality and safety."
        }
      },
      {
        "@type": "Question",
        "name": "How much do solar panels cost in Texas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Residential solar panel installation in Texas typically costs $15,000-$25,000 before incentives. With the 30% federal tax credit and local rebates, costs can drop to $10,000-$17,500. Commercial systems vary based on size and energy needs."
        }
      },
      {
        "@type": "Question",
        "name": "Are there solar incentives in Texas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Texas offers a 30% federal solar tax credit, property tax exemption for solar installations, net metering in some areas, and utility rebates from companies like CPS Energy and Austin Energy. Incentives vary by location."
        }
      },
      {
        "@type": "Question",
        "name": "How long does solar installation take in Texas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most residential solar installations in Texas take 1-3 days for physical installation. The full process from contract to activation averages 4-8 weeks, including permits, inspections, and utility interconnection approvals."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="Solar Installation FAQ Texas | Top Questions About Solar Panels"
        description="Get answers to common questions about solar installation in Texas. Learn about costs, incentives, NABCEP certification, installation timelines, and choosing the best solar installer."
        canonicalUrl="https://solarinstallerstx.com/faq"
        schema={faqSchema}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions About Solar Installation in Texas</h1>
          
          <div className="space-y-8 max-w-4xl">
            <div>
              <h2 className="text-2xl font-semibold mb-3">How do I choose the best solar installer in Texas?</h2>
              <p className="text-muted-foreground">
                Choose a NABCEP certified solar installer with proper TDLR licensing, liability insurance, and positive customer reviews. 
                Verify their experience with residential or commercial installations and request multiple quotes to compare pricing and services. 
                Check their portfolio, warranties offered, and customer references.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">What certifications should Texas solar installers have?</h2>
              <p className="text-muted-foreground">
                Top solar installers in Texas should have NABCEP certification (PVIP, PVSI, or ESIP), TDLR electrical contractor license, 
                liability and workers' compensation insurance, and BBB accreditation. NABCEP certification demonstrates technical expertise 
                and commitment to industry standards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">How much do solar panels cost in Texas?</h2>
              <p className="text-muted-foreground">
                Residential solar panel installation in Texas typically costs $15,000-$25,000 before incentives. With the 30% federal tax credit 
                and local rebates, costs can drop to $10,000-$17,500. Commercial systems vary based on size and energy needs. Get free quotes 
                from multiple installers to find competitive pricing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Are there solar incentives in Texas?</h2>
              <p className="text-muted-foreground">
                Yes! Texas offers a 30% federal solar tax credit, property tax exemption for solar installations, net metering in some areas, 
                and utility rebates from companies like CPS Energy and Austin Energy. Some municipalities offer additional local incentives. 
                Incentives vary by location and utility provider.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">How long does solar installation take in Texas?</h2>
              <p className="text-muted-foreground">
                Most residential solar installations in Texas take 1-3 days for physical installation. The full process from contract to 
                activation averages 4-8 weeks, including permits, inspections, and utility interconnection approvals. Timeline varies based 
                on system size and local regulations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Do I need permits for solar installation in Texas?</h2>
              <p className="text-muted-foreground">
                Yes, solar installations in Texas require building permits and electrical permits from your local jurisdiction. Your solar 
                installer typically handles the permitting process. You'll also need approval from your utility company for grid interconnection.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">What's the difference between PVIP, PVSI, and ESIP certifications?</h2>
              <p className="text-muted-foreground">
                PVIP (PV Installation Professional) is for general solar installation, PVSI (PV System Inspector) is for solar system inspection 
                and quality assurance, and ESIP (Energy Storage Installation Professional) is for battery storage systems. All are NABCEP 
                certifications demonstrating specialized expertise.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Will solar panels work during Texas power outages?</h2>
              <p className="text-muted-foreground">
                Standard grid-tied solar systems automatically shut off during outages for safety. To maintain power during outages, you need 
                a battery storage system (like Tesla Powerwall). Many Texas homeowners add battery backup after experiencing grid instability.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
