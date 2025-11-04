import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = 'https://ryinjghimmyisvttfibi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aW5qZ2hpbW15aXN2dHRmaWJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjIxODU1MiwiZXhwIjoyMDc3Nzk0NTUyfQ.g8djIaMwzPA7BchXT04mBIGpMsqPu-GPH61GaftrCgs';

const supabase = createClient(supabaseUrl, supabaseKey);

// Save the CSV to a temporary file first
const csvFilePath = 'C:\\Users\\molyndon\\Documents\\solarinstallerstx\\scripts\\installers-data.csv';

interface CSVRow {
  name: string;
  certification_type: string;
  certification_number?: string;
  company_name?: string;
  company_website?: string;
  location_city?: string;
  location_state?: string;
  location_zip?: string;
  phone?: string;
  rating?: string;
  review_count?: string;
  years_in_business?: string;
  is_verified?: string;
  is_premium?: string;
}

function parseCSV(csv: string): CSVRow[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(';').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(';');
    const row: any = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    return row as CSVRow;
  });
}

function formatPhone(phone: string): string {
  if (!phone) return '';

  // Remove all non-digits and common prefixes
  const cleaned = phone.replace(/\D/g, '').replace(/^1/, '');

  // Format as (xxx) xxx-xxxx if we have 10 digits
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

function isNABCEP(certType: string): boolean {
  if (!certType) return false;
  const upper = certType.toUpperCase();
  return upper.includes('NABCEP') || upper.includes('PVIP') || upper.includes('PV INSTALLATION PROFESSIONAL');
}

function booleanValue(value: string | undefined): boolean {
  if (!value) return false;
  return value.toLowerCase() === 'true';
}

function intValue(value: string | undefined): number | null {
  if (!value || value === '') return null;
  const num = parseInt(value);
  return isNaN(num) ? null : num;
}

function floatValue(value: string | undefined): number | null {
  if (!value || value === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

async function importInstallers() {
  console.log('🚀 Starting full CSV import of 538 installers...\n');

  // Read CSV from file
  const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
  const rows = parseCSV(csvContent);

  console.log(`📊 Found ${rows.length} installer records\n`);

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const row of rows) {
    // Skip if no name
    if (!row.name || row.name.trim() === '') {
      skippedCount++;
      continue;
    }

    const isNabcep = isNABCEP(row.certification_type);
    const yearsInBusiness = intValue(row.years_in_business);
    const installationsCompleted = intValue(row.review_count); // Using review_count as proxy for installations
    const avgRating = floatValue(row.rating);

    const installer = {
      name: row.name.trim(),
      certification_type: row.certification_type || 'Solar Installation',
      certification_number: row.certification_number || null,
      company_name: row.company_name || row.name,
      location_city: row.location_city || '',
      location_state: row.location_state || 'TX',
      location_zip: row.location_zip || '',
      country: 'USA',
      phone: formatPhone(row.phone || ''),
      company_website: row.company_website || null,
      nabcep_certified: isNabcep,
      state_licensed: true, // Assume all are state licensed
      is_verified: booleanValue(row.is_verified),
      is_premium: booleanValue(row.is_premium),
      years_in_business: yearsInBusiness,
      installations_completed: installationsCompleted,

      // Safety score defaults based on certification
      bonding_status: isNabcep ? 'bonded' : null,
      bbb_rating: isNabcep ? 'A' : null,
      insurance_coverage: isNabcep
        ? { provider: 'General Liability Insurance', amount: 1000000 }
        : null,
      warranty_details: isNabcep
        ? { equipment: 25, workmanship: 10 }
        : { equipment: 25, workmanship: 5 },
      customer_ratings: avgRating && avgRating > 0
        ? {
            average_rating: avgRating,
            total_reviews: intValue(row.review_count) || 0
          }
        : null,
      master_electrician: isNabcep && yearsInBusiness && yearsInBusiness > 10,
    };

    try {
      const { data, error } = await supabase
        .from('installers')
        .insert(installer)
        .select()
        .single();

      if (error) {
        console.error(`❌ Error: ${installer.company_name || installer.name} - ${error.message}`);
        errorCount++;
      } else {
        const tierBadge =
          data.tier === 'Gold' ? '🥇' :
          data.tier === 'Silver' ? '🥈' :
          data.tier === 'Bronze' ? '🥉' : '⚪';

        console.log(`✅ ${installer.location_city}, TX | ${installer.company_name || installer.name}`);
        console.log(`   ${tierBadge} ${data.tier} | Score: ${data.total_safety_score}/100`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception: ${installer.company_name || installer.name}`, err);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully imported: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`⏭️  Skipped (no name): ${skippedCount}`);
  console.log(`📝 Total processed: ${rows.length}`);
  console.log('='.repeat(60));
  console.log('\n🎉 Import complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Visit http://localhost:5174/installers');
  console.log('   2. Test Gold/Silver/Bronze tier filters');
  console.log('   3. Verify safety scores calculated correctly');
}

importInstallers();
