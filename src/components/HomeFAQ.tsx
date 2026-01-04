import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How much does solar cost in Texas?",
        answer: "The average cost of a residential solar system in Texas ranges from $15,000 to $25,000 before incentives. After applying the 30% federal tax credit, most homeowners pay $10,500 to $17,500. Actual costs depend on system size, equipment quality, roof complexity, and your location."
    },
    {
        question: "Is solar worth it in Texas?",
        answer: "Yes, solar is highly worth it in Texas due to abundant sunshine (averaging 5+ peak sun hours daily), high electricity rates, and excellent incentives. Most Texas homeowners see a 6-8 year payback period with 25+ years of energy savings. The 30% federal tax credit, property tax exemption, and net metering make solar one of the best investments for Texas homeowners."
    },
    {
        question: "How do I choose a solar installer in Texas?",
        answer: "Choose a solar installer with NABCEP certification, active Texas licensing, strong financial stability, comprehensive insurance and bonding, and verified customer reviews. Our Solar Safety Score System rates installers on 16 data points including financial stability, credentials, and customer protection to help you choose confidently."
    },
    {
        question: "What solar incentives are available in Texas?",
        answer: "Texas offers several solar incentives: 30% Federal Solar Tax Credit (ITC) through 2032, 100% property tax exemption on solar equipment value, sales tax exemption on solar purchases, net metering programs with most utilities, and utility-specific rebates from providers like CPS Energy, Oncor, and CenterPoint."
    },
    {
        question: "What is the Solar Safety Score System?",
        answer: "Our Solar Safety Score System is a 100-point rating that evaluates solar installers on financial stability (30 points), professional credentials (25 points), customer protection (25 points), and track record (20 points). We verify financial health, insurance coverage, bonding status, certifications, and warranties to protect homeowner investments."
    },
    {
        question: "How long does solar installation take in Texas?",
        answer: "Physical solar installation in Texas takes 1-3 days for most residential systems. The complete process from contract signing to system activation typically takes 4-8 weeks, including site assessment, permit approval (2-4 weeks), installation, inspection, and utility interconnection."
    }
]

export function HomeFAQ() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-semibold">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700 text-base leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </div>
        </section>
    )
}
