import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PopularPosts } from "@/components/PopularPosts"
import { RelatedGuides } from "@/components/RelatedGuides"
import { QuoteFormSection } from "@/components/QuoteFormSection"
import { HeroSection } from "@/components/HeroSection"
import {
  Shield,
  DollarSign,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: 'Solar Installers Texas | Certified Companies & Free Quotes',
  description: 'Find certified solar installers in Texas. Get free quotes from NABCEP-certified companies. Save 26% on electricity bills with professional solar installation.',
  keywords: ['solar installers texas', 'solar panels texas', 'texas solar companies', 'solar installation', 'NABCEP certified'],
  openGraph: {
    title: 'Solar Installers TX - Find Verified Solar Companies',
    description: 'Compare top-rated solar installers in Texas with our 100-point safety scoring system',
    url: 'https://solarinstallerstx.com',
    siteName: 'Solar Installers TX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Installers TX - Find Verified Solar Companies',
    description: 'Compare top-rated solar installers with 100-point safety scores',
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com',
  },
}

const valueProps = [
  {
    icon: Shield,
    title: "NABCEP Certified",
    description: "All installers are certified by the North American Board of Certified Energy Practitioners"
  },
  {
    icon: DollarSign,
    title: "Save 26%",
    description: "Average monthly savings for Texas homeowners who switch to solar"
  },
  {
    icon: Zap,
    title: "Fast Install",
    description: "Most installations completed in 1-3 days with minimal disruption"
  }
]

// FAQ data for schema markup
const faqData = [
  {
    question: "How much does solar cost in Texas?",
    answer: "The average cost of a residential solar system in Texas ranges from $15,000 to $25,000 before incentives. After applying the 30% federal tax credit, most homeowners pay $10,500 to $17,500. Actual costs depend on system size, equipment quality, roof complexity, and your location. Get free quotes from NABCEP-certified installers to compare pricing for your specific home."
  },
  {
    question: "Is solar worth it in Texas?",
    answer: "Yes, solar is highly worth it in Texas due to abundant sunshine (averaging 5+ peak sun hours daily), high electricity rates, and excellent incentives. Most Texas homeowners see a 6-8 year payback period with 25+ years of energy savings. The 30% federal tax credit, property tax exemption, and net metering make solar one of the best investments for Texas homeowners."
  },
  {
    question: "How do I choose a solar installer in Texas?",
    answer: "Choose a solar installer with NABCEP certification, active Texas licensing, strong financial stability, comprehensive insurance and bonding, and verified customer reviews. After 100+ solar bankruptcies in 2024-2025 including Sunnova and Titan Solar, it's critical to verify installer financial health. Our Solar Safety Score System rates installers on 16 data points including financial stability, credentials, and customer protection to help you choose confidently."
  },
  {
    question: "What solar incentives are available in Texas?",
    answer: "Texas offers several solar incentives: 30% Federal Solar Tax Credit (ITC) through 2032, 100% property tax exemption on solar equipment value, sales tax exemption on solar purchases, net metering programs with most utilities, and utility-specific rebates from providers like CPS Energy, Oncor, and CenterPoint. Combined, these incentives can reduce your total solar investment by 40-50%."
  },
  {
    question: "What is the Solar Safety Score System?",
    answer: "Our Solar Safety Score System is a 100-point rating that evaluates solar installers on financial stability (30 points), professional credentials (25 points), customer protection (25 points), and track record (20 points). After major bankruptcies like Sunnova in 2025, we verify installer financial health, insurance coverage, bonding status, certifications, warranties, and complaint history to protect Texas homeowners from choosing unstable companies."
  },
  {
    question: "How long does solar installation take in Texas?",
    answer: "Physical solar installation in Texas takes 1-3 days for most residential systems. The complete process from contract signing to system activation typically takes 4-8 weeks, including site assessment (1 week), permit approval (2-4 weeks), installation (1-3 days), inspection (1 week), and utility interconnection (1-2 weeks). Timeline varies by city permitting office, installer workload, and utility company schedules."
  }
]

// Generate FAQ schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

// WebSite schema for search functionality
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SolarInstallersTX",
  "description": "Find certified solar installers in Texas",
  "url": "https://solarinstallerstx.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://solarinstallerstx.com/installers?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export default function HomePage() {
  return (
    <>
      {/* Structured Data - Injected here to ensure it appears once and correctly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-grow">
          <HeroSection />

          {/* Value Props Section */}
          <section className="py-12 bg-card border-y border-border/50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {valueProps.map((prop, idx) => {
                  const Icon = prop.icon
                  return (
                    <div key={idx} className="flex flex-col items-center text-center p-6 rounded-lg bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
                      <p className="text-muted-foreground">{prop.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Quote Form Section */}
          <div id="solar-calculator">
            <QuoteFormSection />
          </div>

          <section className="py-16 container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <h2 className="text-3xl font-bold">Latest Solar Guides</h2>
                <RelatedGuides limit={6} />
              </div>
              <div className="space-y-8">
                <PopularPosts />
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  )
}
