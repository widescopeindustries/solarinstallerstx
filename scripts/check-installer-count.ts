import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryinjghimmyisvttfibi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aW5qZ2hpbW15aXN2dHRmaWJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjIxODU1MiwiZXhwIjoyMDc3Nzk0NTUyfQ.g8djIaMwzPA7BchXT04mBIGpMsqPu-GPH61GaftrCgs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkInstallers() {
  console.log('Checking installers table...\n');

  const { data, error, count } = await supabase
    .from('installers')
    .select('id, company_name, name, tier, total_safety_score', { count: 'exact' })
    .limit(5);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`✅ Total installers in database: ${count}`);

  if (data && data.length > 0) {
    console.log('\nFirst 5 installers:');
    data.forEach((installer, i) => {
      console.log(`${i + 1}. ${installer.company_name || installer.name}`);
      console.log(`   - Tier: ${installer.tier || 'Not set'}`);
      console.log(`   - Score: ${installer.total_safety_score || 'Not set'}\n`);
    });
  } else {
    console.log('\n⚠️  No installers found in database!');
    console.log('\nYou need to import installer data. Options:');
    console.log('1. Use the admin interface at /admin to import data');
    console.log('2. Check if you have a data import script');
    console.log('3. Manually add installers through the admin panel');
  }
}

checkInstallers();
