import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryinjghimmyisvttfibi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aW5qZ2hpbW15aXN2dHRmaWJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjIxODU1MiwiZXhwIjoyMDc3Nzk0NTUyfQ.g8djIaMwzPA7BchXT04mBIGpMsqPu-GPH61GaftrCgs';

const supabase = createClient(supabaseUrl, supabaseKey);

// Known test data identifiers
const TEST_COMPANIES = ['Elite Solar Solutions', 'Green Energy Texas', 'Texas Solar Pros', 'Sunshine Solar Services', 'Lone Star Solar'];
const TEST_DOMAINS = ['.example.com'];
const TEST_PHONE_PREFIXES = ['555']; // Fake phone number standard

interface TestInstaller {
  id: string;
  company_name: string;
  company_website?: string;
  phone?: string;
  name: string;
  reason: string;
}

async function findTestData(): Promise<TestInstaller[]> {
  console.log('🔍 Scanning for test data...\n');

  const testInstallers: TestInstaller[] = [];

  // Fetch all installers
  const { data: allInstallers, error } = await supabase
    .from('installers')
    .select('id, company_name, company_website, phone, name');

  if (error) {
    console.error('❌ Error fetching installers:', error.message);
    return [];
  }

  if (!allInstallers || allInstallers.length === 0) {
    console.log('✅ No installers found in database');
    return [];
  }

  // Check for test data
  for (const installer of allInstallers) {
    let reason = '';

    // Check company name
    if (TEST_COMPANIES.includes(installer.company_name)) {
      reason = `Test company name: "${installer.company_name}"`;
    }

    // Check for .example.com domains
    if (installer.company_website && TEST_DOMAINS.some(domain => installer.company_website.includes(domain))) {
      reason = `Test domain: ${installer.company_website}`;
    }

    // Check for 555 phone numbers
    if (installer.phone && TEST_PHONE_PREFIXES.some(prefix => installer.phone.includes(prefix))) {
      reason = `Fake phone number: ${installer.phone}`;
    }

    if (reason) {
      testInstallers.push({
        id: installer.id,
        company_name: installer.company_name,
        company_website: installer.company_website,
        phone: installer.phone,
        name: installer.name,
        reason
      });
    }
  }

  return testInstallers;
}

async function displayTestData(testInstallers: TestInstaller[]): Promise<void> {
  if (testInstallers.length === 0) {
    console.log('✅ No test data found!\n');
    return;
  }

  console.log(`⚠️  Found ${testInstallers.length} test installer(s):\n`);
  testInstallers.forEach((installer, i) => {
    console.log(`${i + 1}. ${installer.company_name}`);
    console.log(`   ID: ${installer.id}`);
    console.log(`   Contact: ${installer.name} (${installer.phone || 'No phone'})`);
    console.log(`   Website: ${installer.company_website || 'Not set'}`);
    console.log(`   Reason: ${installer.reason}\n`);
  });
}

async function deleteTestData(testInstallers: TestInstaller[]): Promise<void> {
  if (testInstallers.length === 0) {
    return;
  }

  console.log('🗑️  Deleting test data...\n');

  for (const installer of testInstallers) {
    const { error } = await supabase
      .from('installers')
      .delete()
      .eq('id', installer.id);

    if (error) {
      console.error(`❌ Error deleting ${installer.company_name}:`, error.message);
    } else {
      console.log(`✅ Deleted: ${installer.company_name} (${installer.reason})`);
    }
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║  Test Data Cleanup Script                          ║');
  console.log('║  Removes dummy test installers from database       ║');
  console.log('╚════════════════════════════════════════════════════╝\n');

  // Find test data
  const testInstallers = await findTestData();

  // Display what we found
  await displayTestData(testInstallers);

  if (testInstallers.length === 0) {
    console.log('Database is clean! No test data found.');
    console.log('\nTest data patterns checked:');
    console.log('- Company names: Elite Solar Solutions, Green Energy Texas, Texas Solar Pros, etc.');
    console.log('- Domains ending with: .example.com');
    console.log('- Phone numbers containing: 555 prefix');
    process.exit(0);
  }

  // Ask for confirmation
  console.log('═════════════════════════════════════════════════════');
  console.log('\n⚠️  DELETE OPERATION');
  console.log(`You are about to DELETE ${testInstallers.length} test installer(s).`);
  console.log('This action CANNOT be undone!\n');

  // For automated deletion, uncomment the line below
  // await deleteTestData(testInstallers);

  console.log('🔒 SAFE MODE: No data was deleted (manual confirmation required)');
  console.log('\nTo delete test data, modify the script and uncomment this line:');
  console.log("  await deleteTestData(testInstallers);");
  console.log('\nThen run: npx tsx scripts/cleanup-test-data.ts\n');

  // Show SQL alternative
  console.log('═════════════════════════════════════════════════════');
  console.log('\n📋 ALTERNATIVE: Manual SQL Deletion\n');
  console.log('Run these commands in Supabase SQL Editor:\n');

  testInstallers.forEach((installer) => {
    console.log(`DELETE FROM installers WHERE id = '${installer.id}';`);
  });

  console.log('\n═════════════════════════════════════════════════════');
  console.log('\n✅ Cleanup scan complete!\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
