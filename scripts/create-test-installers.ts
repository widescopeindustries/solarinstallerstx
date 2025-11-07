import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryinjghimmyisvttfibi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aW5qZ2hpbW15aXN2dHRmaWJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjIxODU1MiwiZXhwIjoyMDc3Nzk0NTUyfQ.g8djIaMwzPA7BchXT04mBIGpMsqPu-GPH61GaftrCgs';

const supabase = createClient(supabaseUrl, supabaseKey);

const testInstallers = [
  {
    name: 'John Smith',
    company_name: 'Elite Solar Solutions',
    certification_type: 'NABCEP PV Installation Professional (PVIP)',
    certification_number: '123456-001',
    location_city: 'Austin',
    location_state: 'TX',
    location_zip: '78701',
    country: 'USA',
    phone: '5125551234',
    company_website: 'elitesolar.example.com',
    is_verified: true,
    is_premium: true,
    nabcep_certified: true,
    state_licensed: true,
    master_electrician: true,
    bonding_status: 'bonded',
    bbb_rating: 'A+',
    years_in_business: 12,
    installations_completed: 1500,
    insurance_coverage: { provider: 'ABC Insurance', amount: 2000000 },
    warranty_details: { equipment: 25, workmanship: 10, performance: 25 },
    customer_ratings: { average_rating: 4.8, total_reviews: 156 }
  },
  {
    name: 'Maria Garcia',
    company_name: 'Green Energy Texas',
    certification_type: 'NABCEP PV Installation Professional (PVIP)',
    certification_number: '123456-002',
    location_city: 'Houston',
    location_state: 'TX',
    location_zip: '77001',
    country: 'USA',
    phone: '7135551234',
    company_website: 'greenenergytx.example.com',
    is_verified: true,
    is_premium: false,
    nabcep_certified: true,
    state_licensed: true,
    bonding_status: 'bonded',
    bbb_rating: 'A',
    years_in_business: 8,
    installations_completed: 750,
    insurance_coverage: { provider: 'XYZ Insurance', amount: 1000000 },
    warranty_details: { equipment: 25, workmanship: 10 },
    customer_ratings: { average_rating: 4.6, total_reviews: 89 }
  },
  {
    name: 'David Johnson',
    company_name: 'Texas Solar Pros',
    certification_type: 'NABCEP PV Installation Professional (PVIP)',
    certification_number: '123456-003',
    location_city: 'Dallas',
    location_state: 'TX',
    location_zip: '75201',
    country: 'USA',
    phone: '2145551234',
    is_verified: true,
    nabcep_certified: true,
    state_licensed: true,
    bonding_status: 'bonded',
    bbb_rating: 'B',
    years_in_business: 6,
    installations_completed: 450,
    insurance_coverage: { provider: 'DEF Insurance', amount: 1000000 },
    warranty_details: { equipment: 25, workmanship: 5 },
    customer_ratings: { average_rating: 4.3, total_reviews: 45 }
  },
  {
    name: 'Sarah Williams',
    company_name: 'Sunshine Solar Services',
    certification_type: 'State Licensed Solar Contractor',
    certification_number: 'TX-789-456',
    location_city: 'San Antonio',
    location_state: 'TX',
    location_zip: '78205',
    country: 'USA',
    phone: '2105551234',
    is_verified: false,
    nabcep_certified: false,
    state_licensed: true,
    bonding_status: 'bonded',
    years_in_business: 4,
    installations_completed: 200,
    insurance_coverage: { provider: 'GHI Insurance', amount: 500000 },
    warranty_details: { equipment: 25, workmanship: 5 },
    customer_ratings: { average_rating: 4.1, total_reviews: 28 }
  },
  {
    name: 'Michael Brown',
    company_name: 'Lone Star Solar',
    certification_type: 'NABCEP PV Installation Professional (PVIP)',
    certification_number: '123456-004',
    location_city: 'Fort Worth',
    location_state: 'TX',
    location_zip: '76102',
    country: 'USA',
    phone: '8175551234',
    company_website: 'lonestarsolar.example.com',
    is_verified: true,
    is_premium: true,
    nabcep_certified: true,
    state_licensed: true,
    master_electrician: true,
    bonding_status: 'bonded',
    bbb_rating: 'A+',
    years_in_business: 15,
    installations_completed: 2000,
    insurance_coverage: { provider: 'JKL Insurance', amount: 2000000 },
    warranty_details: { equipment: 25, workmanship: 15, performance: 25 },
    customer_ratings: { average_rating: 4.9, total_reviews: 203 }
  }
];

async function createTestInstallers() {
  // Safety check: Prevent accidental test data creation in production
  const envVars = process.env;
  const isProduction =
    envVars.NODE_ENV === 'production' ||
    envVars.VERCEL_ENV === 'production' ||
    (envVars.VITE_SUPABASE_URL && envVars.VITE_SUPABASE_URL.includes('solarinstallerstx'));

  if (isProduction) {
    console.error('❌ SAFETY CHECK FAILED');
    console.error('');
    console.error('This script creates TEST DATA (fake installers) and should NOT be run in production!');
    console.error('');
    console.error('If you need to create test data in a development environment:');
    console.error('  1. Ensure NODE_ENV is NOT set to "production"');
    console.error('  2. Ensure VERCEL_ENV is NOT set to "production"');
    console.error('');
    console.error('If you accidentally ran this in production, please:');
    console.error('  1. Run: npx tsx scripts/cleanup-test-data.ts');
    console.error('  2. Review the database for test data (companies like "Elite Solar Solutions")');
    console.error('');
    process.exit(1);
  }

  console.log('Creating test installers with safety scores...\n');

  for (const installer of testInstallers) {
    const { data, error } = await supabase
      .from('installers')
      .insert(installer)
      .select()
      .single();

    if (error) {
      console.error(`❌ Error creating ${installer.company_name}:`, error.message);
    } else {
      console.log(`✅ Created: ${installer.company_name}`);
      console.log(`   - Safety Score: ${data.total_safety_score}/100`);
      console.log(`   - Tier: ${data.tier}\n`);
    }
  }

  console.log('\n🎉 Done! Visit http://localhost:5174/installers to see your installers!');
  console.log('You can also filter by tier: Gold, Silver, or Bronze');
}

createTestInstallers();
