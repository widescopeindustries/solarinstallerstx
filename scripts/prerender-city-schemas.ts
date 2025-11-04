/**
 * Post-build script to inject schema.org structured data into city pages
 * This creates static HTML files with schemas embedded for Google crawlers
 */

import * as fs from 'fs';
import * as path from 'path';
import { texasCities, getAllCitySlugs } from '../src/data/texasCities.js';

const distDir = path.resolve(process.cwd(), 'dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Create cities directory if it doesn't exist
const citiesDir = path.join(distDir, 'cities');
if (!fs.existsSync(citiesDir)) {
  fs.mkdirSync(citiesDir, { recursive: true });
}

function generateCityFAQs(cityName: string, avgSolarCost: string) {
  return [
    {
      question: "Is solar worth it in Texas?",
      answer: `Absolutely! Texas has abundant sunshine, high electricity rates, and strong incentives that make solar an excellent investment. ${cityName} homeowners typically see a return on investment within 6-8 years, with 25+ years of energy savings ahead. Federal tax credits cover 30% of installation costs, and Texas offers property tax exemptions on solar equipment value.`
    },
    {
      question: `How much do solar installers charge in ${cityName}?`,
      answer: `Solar installers in ${cityName} typically charge ${avgSolarCost} for a complete 10kW residential system (average 3-bedroom home). This includes panels, inverters, mounting equipment, permits, and installation. Prices vary based on system size, equipment quality, roof complexity, and installer. We recommend getting quotes from at least 3 certified installers to compare pricing and warranties.`
    },
    {
      question: `How do I choose a solar installer in ${cityName}?`,
      answer: `Look for NABCEP-certified installers with strong safety scores on our platform. Check their insurance coverage, bonding status, years in business, and customer reviews. Verify they're licensed in Texas and have experience with ${cityName} building permits. Compare warranties (equipment and workmanship), financing options, and post-installation support. Our Safety Score System evaluates installers on 16 data points to help you choose confidently.`
    },
    {
      question: `What solar incentives are available in ${cityName}?`,
      answer: `${cityName} residents qualify for the 30% Federal Solar Tax Credit (ITC), which reduces installation costs by thousands. Texas offers property tax exemptions on solar equipment value and sales tax exemptions on solar purchases. Many utility companies provide net metering, crediting excess solar production. Some ${cityName} installers offer additional local rebates or financing programs. Combined, these incentives can reduce total solar costs by 40-50%.`
    },
    {
      question: `How long does solar installation take in ${cityName}?`,
      answer: `Physical installation typically takes 1-3 days for residential systems in ${cityName}. However, the full process from contract signing to system activation takes 4-8 weeks. This includes site assessment (1 week), permit approval (2-4 weeks), installation (1-3 days), inspection (1 week), and utility interconnection (1-2 weeks). Timeline varies based on installer workload, permitting office speed, and utility company processes. Our vetted installers help expedite this process.`
    },
    {
      question: `Will solar panels work during ${cityName} weather conditions?`,
      answer: `Yes! Solar panels work efficiently in ${cityName}'s climate. They generate power from sunlight (not heat), so hot Texas summers don't reduce performance. Modern panels withstand hail, high winds, and extreme temperatures common in Texas. During cloudy days, panels still produce 10-25% of normal output. Most systems include net metering, storing excess production credits for nighttime use. Battery backup options provide power during outages, giving ${cityName} homeowners energy independence.`
    }
  ];
}

function generateFAQPageSchema(cityName: string, citySlug: string, avgSolarCost: string) {
  const faqs = generateCityFAQs(cityName, avgSolarCost);

  return {
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
  };
}

function generateItemListSchema(cityName: string, citySlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Solar Installers in ${cityName}, Texas`,
    "description": `Top-rated solar panel installers serving ${cityName}, Texas. Compare certified solar companies with verified credentials, customer reviews, and competitive quotes.`,
    "url": `https://solarinstallerstx.com/cities/${citySlug}`,
    "numberOfItems": 10,
    "itemListElement": [] // Will be populated by React client-side
  };
}

// Generate HTML for each city
const citySlugs = getAllCitySlugs();
let successCount = 0;

console.log(`\n🚀 Generating prerendered city pages with schemas...`);
console.log(`📁 Output directory: ${citiesDir}\n`);

for (const slug of citySlugs) {
  const city = texasCities[slug];
  if (!city) continue;

  // Create city directory
  const cityDir = path.join(citiesDir, slug);
  if (!fs.existsSync(cityDir)) {
    fs.mkdirSync(cityDir, { recursive: true });
  }

  // NOTE: Schema injection removed to prevent duplication
  // Schemas are now exclusively handled by the CityPage.tsx component via SEOHead
  // This ensures Google Search Console doesn't detect duplicate FAQPage schemas

  let cityHtml = indexHtml;

  // Update meta tags for the city
  cityHtml = cityHtml.replace(
    /<title>.*?<\/title>/,
    `<title>Solar Installers in ${city.name}, TX | Compare Top Companies 2025</title>`
  );

  cityHtml = cityHtml.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="Find the best solar installers in ${city.name}, Texas. Compare certified solar companies, read reviews, and get competitive quotes. ${city.description}">`
  );

  // Write to file
  const outputPath = path.join(cityDir, 'index.html');
  fs.writeFileSync(outputPath, cityHtml, 'utf-8');

  successCount++;
  console.log(`✅ Generated: /cities/${slug}/index.html`);
}

console.log(`\n🎉 Successfully generated ${successCount} city pages!`);
console.log(`📊 Each page includes:`);
console.log(`   - Optimized title tags for SEO`);
console.log(`   - City-specific meta descriptions`);
console.log(`\n📝 Note: Schemas are handled by React components to prevent duplication\n`);
