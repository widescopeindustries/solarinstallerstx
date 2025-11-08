/**
 * Export installer contact information for backlink outreach campaign
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function exportInstallers() {
  console.log('🚀 Fetching installers from Supabase...\n');

  const { data, error } = await supabase
    .from('installers')
    .select('*')
    .order('is_premium', { ascending: false });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`Found ${data.length} total installers`);

  // Filter for those with company_website OR phone
  const contactable = data.filter(i => i.company_website || i.phone);
  console.log(`${contactable.length} have website or phone number\n`);

  // Stats
  const withWebsite = contactable.filter(i => i.company_website).length;
  const withPhone = contactable.filter(i => i.phone).length;
  const withBoth = contactable.filter(i => i.company_website && i.phone).length;

  console.log('📊 Contact Information Stats:');
  console.log(`   With website: ${withWebsite}`);
  console.log(`   With phone: ${withPhone}`);
  console.log(`   With both: ${withBoth}\n`);

  // Determine priority tiers
  const tier1 = contactable.filter(i =>
    i.is_premium || (i.total_safety_score && i.total_safety_score >= 80)
  );
  const tier2 = contactable.filter(i =>
    !tier1.includes(i) && i.total_safety_score && i.total_safety_score >= 60
  );
  const tier3 = contactable.filter(i =>
    !tier1.includes(i) && !tier2.includes(i)
  );

  console.log('🎯 Priority Tiers:');
  console.log(`   Tier 1 (Premium/High Score): ${tier1.length} - CALL FIRST`);
  console.log(`   Tier 2 (Medium Score): ${tier2.length} - Call or contact form`);
  console.log(`   Tier 3 (Others): ${tier3.length} - Contact form\n`);

  // Create CSV
  const csv = [
    'Company Name,Website,Phone,City,State,ID,Premium,Safety Score,Rating,Profile URL,Priority Tier,Outreach Method'
  ];

  contactable.forEach((installer) => {
    // Determine tier
    let tier = 3;
    let outreachMethod = 'Contact Form';

    if (tier1.includes(installer)) {
      tier = 1;
      outreachMethod = installer.phone ? 'Phone Call' : 'Contact Form';
    } else if (tier2.includes(installer)) {
      tier = 2;
      outreachMethod = installer.phone ? 'Phone Call' : 'Contact Form';
    }

    const profileUrl = `https://solarinstallerstx.com/installers/${installer.slug}`;

    csv.push([
      `"${installer.company_name?.replace(/"/g, '""') || ''}"`,
      installer.company_website || '',
      installer.phone || '',
      installer.location_city || '',
      installer.location_state || 'TX',
      installer.id || '',
      installer.is_premium ? 'Yes' : 'No',
      installer.total_safety_score || '',
      installer.rating || '',
      profileUrl,
      tier,
      outreachMethod
    ].join(','));
  });

  // Save CSV
  const outputPath = path.join(process.cwd(), 'installer-outreach-list.csv');
  fs.writeFileSync(outputPath, csv.join('\n'));
  console.log('✅ Exported to: installer-outreach-list.csv');

  // Create phone-only list for quick calling
  const callList = contactable
    .filter(i => i.phone && (tier1.includes(i) || tier2.includes(i)))
    .sort((a, b) => {
      if (tier1.includes(a) && !tier1.includes(b)) return -1;
      if (!tier1.includes(a) && tier1.includes(b)) return 1;
      return 0;
    });

  const callCsv = [
    'Company Name,Phone,City,Profile URL,Notes'
  ];

  callList.forEach(installer => {
    callCsv.push([
      `"${installer.company_name?.replace(/"/g, '""') || ''}"`,
      installer.phone || '',
      installer.location_city || '',
      `https://solarinstallerstx.com/installers/${installer.id}`,
      installer.is_premium ? 'PREMIUM' : ''
    ].join(','));
  });

  const callListPath = path.join(process.cwd(), 'phone-call-list.csv');
  fs.writeFileSync(callListPath, callCsv.join('\n'));
  console.log('✅ Exported to: phone-call-list.csv');
  console.log(`   ${callList.length} installers ready for phone outreach\n`);

  // City breakdown for top markets
  const cityBreakdown: Record<string, number> = {};
  contactable.forEach(i => {
    const city = i.location_city || 'Unknown';
    cityBreakdown[city] = (cityBreakdown[city] || 0) + 1;
  });

  const topCities = Object.entries(cityBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log('🏙️  Top 10 Cities:');
  topCities.forEach(([city, count]) => {
    console.log(`   ${city}: ${count} installers`);
  });

  console.log('\n📈 Expected Results:');
  console.log(`   If 30% phone conversion: ${Math.round(callList.length * 0.3)} backlinks from calls`);
  console.log(`   If 15% form conversion: ${Math.round((contactable.length - callList.length) * 0.15)} backlinks from forms`);
  console.log(`   Total expected: ${Math.round(callList.length * 0.3 + (contactable.length - callList.length) * 0.15)} backlinks`);

  console.log('\n🎯 Next Steps:');
  console.log('   1. Open phone-call-list.csv and start calling Tier 1');
  console.log('   2. Use installer-outreach-list.csv for complete tracking');
  console.log('   3. Create badge images and /badges/installer-guide page');
  console.log('   4. Start calling 20 per day = done in 1 week!');
}

exportInstallers().catch(console.error);
