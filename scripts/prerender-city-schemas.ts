/**
 * Post-build script to inject schema.org structured data into city pages
 * This creates static HTML files with schemas embedded for Google crawlers
 *
 * IMPORTANT: This script removes any existing FAQPage schemas from the template
 * before injecting city-specific ones to prevent Google Search Console errors
 * about duplicate FAQPage schema markup.
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import { texasCities, getAllCitySlugs } from '../src/data/texasCities.js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const distDir = path.resolve(process.cwd(), 'dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials not set. Skipping city schema prerendering.');
  console.warn('⚠️  To enable city schema generation, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
  process.exit(0); // Exit successfully to allow build to continue
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Create cities directory if it doesn't exist
const citiesDir = path.join(distDir, 'cities');
if (!fs.existsSync(citiesDir)) {
  fs.mkdirSync(citiesDir, { recursive: true });
}

// Helper function to build installer slug/path
function buildInstallerPath(installer: any) {
  const slug = (installer.company_name || installer.name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/installer/${slug}-${installer.id}`;
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

function generateItemListSchema(cityName: string, citySlug: string, installers: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Solar Installers in ${cityName}, Texas`,
    "description": `Top-rated solar panel installers serving ${cityName}, Texas. Compare certified solar companies with verified credentials, customer reviews, and competitive quotes.`,
    "url": `https://solarinstallerstx.com/cities/${citySlug}`,
    "numberOfItems": installers.length,
    "itemListElement": installers.map((installer, index) => {
      const installerPath = buildInstallerPath(installer);
      const installerUrl = `https://solarinstallerstx.com${installerPath}`;

      const isNABCEP = installer.certification_type?.toLowerCase().includes('pvip') ||
                       installer.certification_type?.toLowerCase().includes('pvsi') ||
                       installer.certification_type?.toLowerCase().includes('pv installation') ||
                       installer.certification_type?.toLowerCase().includes('pv system');

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SolarEnergyCompany",
          "@id": installerUrl,
          "name": installer.company_name || installer.name,
          "url": installerUrl,
          "description": `${installer.certification_type || 'Professional'} solar installer serving ${cityName}, Texas`,
          ...(installer.phone && { "telephone": installer.phone }),
          "address": {
            "@type": "PostalAddress",
            "addressLocality": installer.location_city,
            "addressRegion": installer.location_state,
            "addressCountry": "US"
          },
          "areaServed": {
            "@type": "Place",
            "name": `${cityName}, TX`
          },
          ...(isNABCEP && { "award": "NABCEP Certified Installer" }),
          "provider": {
            "@type": "Organization",
            "name": "Solar Installers TX",
            "url": "https://solarinstallerstx.com"
          }
        }
      };
    })
  };
}

// Generate HTML for each city (async function)
async function generateCityPages() {
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

    // Fetch installers for this city from Supabase
    const cityName = city.name.toLowerCase();
    const { data: installers, error } = await supabase
      .from('installers')
      .select('*')
      .ilike('location_city', `%${cityName}%`)
      .order('is_premium', { ascending: false })
      .order('is_verified', { ascending: false })
      .limit(50);

    if (error) {
      console.warn(`⚠️  Could not fetch installers for ${city.name}:`, error.message);
    }

    const cityInstallers = installers || [];

    // Generate schemas with real data
    const faqSchema = generateFAQPageSchema(city.name, slug, city.avgSolarCost);
    const itemListSchema = generateItemListSchema(city.name, slug, cityInstallers);

    let cityHtml = indexHtml;

    // CRITICAL FIX: Remove any existing FAQPage schemas from the template
    // This prevents duplicates if index.html was modified by other scripts
    cityHtml = cityHtml.replace(
      /<script type="application\/ld\+json">\s*\{[^}]*"@type"\s*:\s*"FAQPage"[\s\S]*?<\/script>\s*/gi,
      ''
    );

    // Inject schemas into <head>
    const schemasScript = `
    <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(itemListSchema, null, 2)}
    </script>
  `;

    cityHtml = cityHtml.replace('</head>', `${schemasScript}</head>`);

    // Update meta tags for the city
    cityHtml = cityHtml.replace(
      /<title>.*?<\/title>/,
      `<title>Solar Installers in ${city.name}, TX | Compare Top Companies 2025</title>`
    );

    cityHtml = cityHtml.replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="Find the best solar installers in ${city.name}, Texas. Compare ${cityInstallers.length}+ certified solar companies, read reviews, and get competitive quotes. ${city.description}">`
    );

    // Write to file
    const outputPath = path.join(cityDir, 'index.html');
    fs.writeFileSync(outputPath, cityHtml, 'utf-8');

    successCount++;
    console.log(`✅ Generated: /cities/${slug}/index.html (${cityInstallers.length} installers)`);
  }

  console.log(`\n🎉 Successfully generated ${successCount} city pages!`);
  console.log(`📊 Each page includes:`);
  console.log(`   - Optimized title tags and meta descriptions for SEO`);
  console.log(`   - FAQPage schema with 6 city-specific questions (duplicates removed)`);
  console.log(`   - ItemList schema with real installer data from Supabase`);
  console.log(`   - Static HTML for Google crawlers\n`);
}

// Run the generator
generateCityPages().catch(error => {
  console.error('❌ Error generating city pages:', error);
  process.exit(1);
});
