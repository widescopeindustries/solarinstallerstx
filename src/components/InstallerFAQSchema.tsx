interface InstallerFAQSchemaProps {
  installer: {
    company_name?: string | null
    name: string
    location_city: string
    location_state: string
    certification_type?: string | null
    nabcep_certified?: boolean | null
    years_in_business?: number | null
    services?: string[] | null
    phone?: string | null
    total_safety_score?: number | null
    tier?: string | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warranty_details?: any
  }
  canonicalUrl: string
}

export function InstallerFAQSchema({ installer, canonicalUrl }: InstallerFAQSchemaProps) {
  const displayName = installer.company_name || installer.name
  const city = installer.location_city
  const state = installer.location_state

  // Check if NABCEP certified
  const isNABCEP = installer.nabcep_certified ||
    installer.certification_type?.toLowerCase().includes('pvip') ||
    installer.certification_type?.toLowerCase().includes('pvsi') ||
    installer.certification_type?.toLowerCase().includes('pv installation') ||
    installer.certification_type?.toLowerCase().includes('pv system')

  // Determine tier description
  const tierDescription = installer.tier === 'Gold' ? 'Gold Tier (85-100 points)' :
    installer.tier === 'Silver' ? 'Silver Tier (70-84 points)' :
    installer.tier === 'Bronze' ? 'Bronze Tier (60-69 points)' : 'verified'

  // Build FAQ items dynamically based on available data
  const faqItems = [
    {
      question: `Is ${displayName} certified to install solar panels in ${city}?`,
      answer: isNABCEP
        ? `Yes, ${displayName} is a NABCEP-certified solar installer (${installer.certification_type || 'PV Installation Professional'}) serving ${city}, ${state}. NABCEP certification is the gold standard in the solar industry, requiring rigorous training and examination.`
        : `Yes, ${displayName} is a licensed and certified solar installer serving ${city}, ${state}. They hold ${installer.certification_type || 'professional'} certification and are verified by Solar Installers TX with a ${tierDescription} rating.`
    },
    {
      question: `Does ${displayName} offer battery backup installation?`,
      answer: installer.services?.some(s => s.toLowerCase().includes('battery') || s.toLowerCase().includes('storage'))
        ? `Yes, ${displayName} offers battery backup and energy storage solutions as part of their solar installation services in ${city}. Contact them directly at ${installer.phone || 'their office'} for a customized quote.`
        : `${displayName} specializes in solar panel installation in ${city}, ${state}. For specific services like battery backup, we recommend contacting them directly to discuss your energy storage needs.`
    },
    {
      question: `What is ${displayName}'s Safety Score?`,
      answer: installer.total_safety_score
        ? `${displayName} has a Solar Safety Score of ${installer.total_safety_score}/100, earning them a ${installer.tier || 'verified'} rating. This score is calculated from 16 data points including insurance coverage, licensing, bankruptcy history, and customer reviews.`
        : `${displayName} is a verified solar installer on Solar Installers TX. Our Safety Scoring system evaluates installers across 16 data points to help Texas homeowners make informed decisions.`
    },
    {
      question: `How long has ${displayName} been in business?`,
      answer: installer.years_in_business && installer.years_in_business > 0
        ? `${displayName} has been serving ${city} and surrounding Texas communities for ${installer.years_in_business}+ years. Their experience in the local market means they understand Texas-specific solar incentives, permitting requirements, and weather considerations.`
        : `${displayName} is an established solar installer serving ${city}, ${state}. Contact them directly for information about their company history and experience in the solar industry.`
    },
    {
      question: `Does ${displayName} offer warranties on solar installations?`,
      answer: (() => {
        const warranty = installer.warranty_details
        if (warranty?.equipment || warranty?.workmanship) {
          return `Yes, ${displayName} provides comprehensive warranty coverage including ${warranty.equipment ? `${warranty.equipment} equipment warranty` : 'equipment warranty'} and ${warranty.workmanship ? `${warranty.workmanship} workmanship warranty` : 'workmanship guarantee'}. Contact them for complete warranty details.`
        }
        return `${displayName} offers warranty coverage on their solar installations. Specific warranty terms vary by project and equipment. Contact them directly for detailed warranty information for your installation.`
      })()
    },
    {
      question: `What areas does ${displayName} serve in Texas?`,
      answer: `${displayName} is based in ${city}, ${state} and serves homeowners throughout the ${city} metropolitan area and surrounding communities. They are familiar with local utility requirements, building codes, and interconnection processes for ${city}-area solar installations.`
    }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema, null, 2) }}
    />
  )
}

// BreadcrumbList schema for installer pages
export function InstallerBreadcrumbSchema({ installer, canonicalUrl }: InstallerFAQSchemaProps) {
  const displayName = installer.company_name || installer.name

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://solarinstallerstx.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Installers",
        "item": "https://solarinstallerstx.com/installers"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": installer.location_city,
        "item": `https://solarinstallerstx.com/cities/${installer.location_city.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": displayName,
        "item": canonicalUrl
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

// Also export an enhanced LocalBusiness schema
export function InstallerLocalBusinessSchema({ installer, canonicalUrl }: InstallerFAQSchemaProps) {
  const displayName = installer.company_name || installer.name
  const isNABCEP = installer.nabcep_certified ||
    installer.certification_type?.toLowerCase().includes('pv')

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SolarEnergyCompany"],
    "@id": canonicalUrl,
    "name": displayName,
    "description": `${displayName} is a ${isNABCEP ? 'NABCEP-certified' : 'licensed'} solar installation company serving ${installer.location_city}, Texas${installer.years_in_business ? ` with ${installer.years_in_business}+ years of experience` : ''}.`,
    "url": canonicalUrl,
    "telephone": installer.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": installer.location_city,
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": installer.location_city,
      "containedInPlace": {
        "@type": "State",
        "name": "Texas"
      }
    },
    "priceRange": "$$$",
    "serviceType": [
      "Solar Panel Installation",
      "Residential Solar",
      "Commercial Solar",
      ...(installer.services || [])
    ],
    ...(isNABCEP && {
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Certification",
        "name": "NABCEP Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "North American Board of Certified Energy Practitioners"
        }
      }
    }),
    ...(installer.total_safety_score && {
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "Solar Safety Score",
        "value": installer.total_safety_score,
        "maxValue": 100,
        "description": "Safety score based on 16 verified data points"
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema, null, 2) }}
    />
  )
}
