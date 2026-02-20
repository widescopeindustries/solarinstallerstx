import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How much does solar cost in Texas?",
        answer: "The average cost of a residential solar system in Texas ranges from $15,000 to $25,000. With Texas's 100% property tax exemption, sales tax exemption on solar equipment, and available utility rebates, you can meaningfully reduce your net cost. Note: The federal residential solar tax credit (Section 25D) was eliminated for direct-purchase systems in 2026 under the One Big Beautiful Bill Act — verify your specific incentive eligibility with your installer before signing."
    },
    {
        question: "Is solar worth it in Texas?",
        answer: "Yes, solar is highly worth it in Texas due to abundant sunshine (averaging 5+ peak sun hours daily), high electricity rates, and strong state incentives. Texas homeowners benefit from a 100% property tax exemption on solar equipment, sales tax exemption, and utility buyback programs. Most Texas homeowners see a 7-10 year payback period with 20+ years of energy savings. Just be sure to verify current federal incentive status with your installer, as the rules changed in 2026."
    },
    {
        question: "How do I choose a solar installer in Texas?",
        answer: "Choose a solar installer with NABCEP certification, active Texas licensing, strong financial stability, comprehensive insurance and bonding, and verified customer reviews. Our Solar Safety Score System rates installers on 16 data points including financial stability, credentials, and customer protection to help you choose confidently."
    },
    {
        question: "What solar incentives are available in Texas in 2026?",
        answer: "Texas still offers strong solar incentives in 2026: a 100% property tax exemption on solar equipment value (your home value goes up, taxes don't), sales tax exemption on solar purchases, net metering and solar buyback programs with most utilities, and utility-specific rebates from providers like CPS Energy, Oncor, and CenterPoint. Important update: the federal residential solar tax credit (Section 25D) was eliminated in 2026 for homeowners who purchase systems directly. If you're considering a lease or PPA, the installer may still access commercial tax credits — ask your installer to walk through current incentive eligibility for your situation."
    },
    {
        question: "What is the Solar Safety Score System?",
        answer: "Our Solar Safety Score System is a 100-point rating that evaluates solar installers on financial stability (30 points), professional credentials (25 points), customer protection (25 points), and track record (20 points). We verify financial health, insurance coverage, bonding status, certifications, and warranties to protect homeowner investments."
    },
    {
        question: "How long does solar installation take in Texas?",
        answer: "Physical solar installation in Texas takes 1-3 days for most residential systems. The complete process from contract signing to system activation typically takes 4-8 weeks, including site assessment, permit approval (2-4 weeks), installation, inspection, and utility interconnection."
    },
    {
        question: "Do I still pay an electric bill with solar in Texas?",
        answer: "Yes, you will likely still receive a monthly bill from your utility company. Even if your solar system offsets 100% of your usage, most Transmission and Distribution Utilities (TDUs) like Oncor and CenterPoint charge a fixed monthly connection fee (usually $10-$20). However, your energy generation charges can be eliminated or credited."
    },
    {
        question: "What happens during a power outage in Texas?",
        answer: "Standard grid-tied solar systems will shut down during a power outage to protect utility workers fixing the lines. To keep your lights on during a blackout (like the 2021 winter storm), you MUST have a solar battery backup system. We recommend verifying installers who specialize in battery integration."
    },
    {
        question: "Can my HOA stop me from installing solar panels?",
        answer: "No. Under Texas law (H.B. 362), Homeowners Associations (HOAs) cannot ban solar panels or prohibit you from installing them. They can enforce reasonable restrictions on placement (e.g., usually requiring them to be on the back or side if it doesn't reduce efficiency by more than 10%), but they cannot outright deny your right to go solar."
    },
    {
        question: "Does solar increase my home value in Texas?",
        answer: "Yes. Studies, including those by Zillow and Berkeley Lab, show that homes with solar panels sell for approximately 4.1% more than comparable homes without them. In Texas, this added value is 100% exempt from property taxes, meaning your home is worth more, but your tax bill doesn't go up."
    },
    {
        question: "Are there $0 down financing options available?",
        answer: "Yes, many Texas solar installers offer $0 down financing options, including solar loans and leases/PPAs. With a solar loan, you own the system outright (verify current federal incentive eligibility with your installer — rules changed in 2026). With a lease/PPA, the company owns the system and you pay for power — the installer may pass savings from commercial tax credits to you in the form of lower monthly payments. Compare APRs and dealer fees carefully, as some 'low interest' loans carry high upfront fees."
    },
    {
        question: "What is the best direction for solar panels in Texas?",
        answer: "South-facing roofs are ideal for maximum annual production in Texas. However, west-facing panels are increasingly valuable because they produce power late in the afternoon (4 PM - 7 PM) when electricity rates are often highest due to ERCOT demand charges. A customized design can optimize for your specific Time-of-Use plan."
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
