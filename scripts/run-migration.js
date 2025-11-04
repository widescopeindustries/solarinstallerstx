import fs from 'fs';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '../.env' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function runMigration() {
  try {
    const sql = fs.readFileSync('../supabase/migrations/20251103000000_add_safety_scoring_system.sql', 'utf8');
    const { error } = await supabase.rpc('exec', { sql });

    if (error) {
      console.error('Error running migration:', error);
    } else {
      console.log('Migration completed successfully!');
    }
  } catch (err) {
    console.error('Failed to run migration:', err);
  }
}

runMigration();