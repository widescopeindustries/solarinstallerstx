/**
 * Post-build script to inject FAQPage schema into homepage
 * Ensures Google crawlers see structured data in static HTML
 */

import * as fs from 'fs';
import * as path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does solar cost in Texas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average cost of a residential solar system in Texas ranges from $15,000 to $25,000 before incentives. After applying the 30% federal tax credit, most homeowners pay $10,500 to $17,500. Actual costs depend on system size, equipment quality, roof complexity, and your location. Get free quotes from NABCEP-certified installers to compare pricing for your specific home."
      }
    },
    {
      "@type": "Question",
      "name": "Is solar worth it in Texas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, solar is highly worth it in Texas due to abundant sunshine (averaging 5+ peak sun hours daily), high electricity rates, and excellent incentives. Most Texas homeowners see a 6-8 year payback period with 25+ years of energy savings. The 30% federal tax credit, property tax exemption, and net metering make solar one of the best investments for Texas homeowners."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose a solar installer in Texas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose a solar installer with NABCEP certification, active Texas licensing, strong financial stability, comprehensive insurance and bonding, and verified customer reviews. After 100+ solar bankruptcies in 2024-2025 including Sunnova and Titan Solar, it's critical to verify installer financial health. Our Solar Safety Score System rates installers on 16 data points including financial stability, credentials, and customer protection to help you choose confidently."
      }
    },
    {
      "@type": "Question",
      "name": "What solar incentives are available in Texas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Texas offers several solar incentives: 30% Federal Solar Tax Credit (ITC) through 2032, 100% property tax exemption on solar equipment value, sales tax exemption on solar purchases, net metering programs with most utilities, and utility-specific rebates from providers like CPS Energy, Oncor, and CenterPoint. Combined, these incentives can reduce your total solar investment by 40-50%."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Solar Safety Score System?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Solar Safety Score System is a 100-point rating that evaluates solar installers on financial stability (30 points), professional credentials (25 points), customer protection (25 points), and track record (20 points). After major bankruptcies like Sunnova in 2025, we verify installer financial health, insurance coverage, bonding status, certifications, warranties, and complaint history to protect Texas homeowners from choosing unstable companies."
      }
    },
    {
      "@type": "Question",
      "name": "How long does solar installation take in Texas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Physical solar installation in Texas takes 1-3 days for most residential systems. The complete process from contract signing to system activation typically takes 4-8 weeks, including site assessment (1 week), permit approval (2-4 weeks), installation (1-3 days), inspection (1 week), and utility interconnection (1-2 weeks). Timeline varies by city permitting office, installer workload, and utility company schedules."
      }
    }
  ]
};

try {
  // Read index.html
  let html = fs.readFileSync(indexPath, 'utf-8');

  // Create schema script tag
  const schemaScript = `
    <script type="application/ld+json">
${JSON.stringify(faqPageSchema, null, 2)}
    </script>
    <!-- FAQPage schema injected by post-build script -->`;

  // Inject before </head>
  html = html.replace('</head>', `${schemaScript}\n  </head>`);

  // Write back
  fs.writeFileSync(indexPath, html, 'utf-8');

  console.log('✅ FAQPage schema injected into homepage');
  console.log(`📍 Location: ${indexPath}`);
} catch (error) {
  console.error('❌ Error injecting homepage schema:', error);
  process.exit(1);
}
