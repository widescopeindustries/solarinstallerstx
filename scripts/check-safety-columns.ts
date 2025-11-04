import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  const { data, error } = await supabase
    .from('installers')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching installer:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('Existing columns in installers table:');
    console.log(Object.keys(data[0]).sort());
  }
}

checkColumns();
