import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const FAQ = () => {
  const faqs = [
    {
      question: "How much does solar installation cost in Texas?",
      answer: "Solar installation costs in Texas typically range from $2.50-$3.50 per watt, with average residential systems costing $15,000-$25,000 before incentives. The federal tax credit reduces this by 26%, and many Texas utilities offer additional rebates."
    },
    {
      question: "How long does solar installation take?",
      answer: "Most residential solar installations are completed in 1-3 days, but the entire process from contract to activation typically takes 4-8 weeks due to permitting, utility approvals, and inspections."
    },
    {
      question: "Do I need NABCEP certification to install solar?",
      answer: "While not legally required in Texas, NABCEP certification demonstrates installer expertise and is often required for utility rebates and financing programs. It's the industry standard for quality assurance."
    },
    {
      question: "What warranties do solar systems come with?",
      answer: "Quality solar systems include 25-year panel warranties, 10-25 year inverter warranties, and 10-year workmanship warranties. NABCEP certified installers typically offer comprehensive warranty coverage."
    },
    {
      question: "Will solar panels work during Texas storms?",
      answer: "Modern solar panels are designed to withstand Texas weather including hail, high winds, and storms. Most panels carry hail impact ratings and wind resistance up to 140 mph."
    },
    {
      question: "How much can I save with solar in Texas?",
      answer: "Texas homeowners typically save 70-90% on electricity bills with solar. With Texas's high electricity rates and abundant sunshine, most systems pay for themselves within 6-8 years."
    }
  ];

  return (
    <>
      <SEOHead
        title="Solar Installation FAQ | Texas Solar Questions Answered"
        description="Get answers to common solar installation questions in Texas. Learn about costs, warranties, installation process, and more from our experts."
        canonicalUrl="https://solarinstallerstx.com/faq"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-3">{faq.question}</h2>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
