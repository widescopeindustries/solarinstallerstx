/**
 * Inspect database schema to find correct column names
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

async function inspectSchema() {
  console.log('🔍 Inspecting installers table schema...\n');

  const { data, error } = await supabase
    .from('installers')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('📋 Available columns in installers table:\n');
    const columns = Object.keys(data[0]).sort();
    columns.forEach(col => {
      const value = data[0][col];
      const type = typeof value;
      const sample = value ? String(value).substring(0, 50) : '(null)';
      console.log(`   ${col}: ${type} - "${sample}"`);
    });
    console.log(`\n✅ Total columns: ${columns.length}`);
  } else {
    console.log('⚠️  No data found in installers table');
  }
}

inspectSchema().catch(console.error);
