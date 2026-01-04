import { createClient } from '@supabase/supabase-js';
import { generateInstallerSlug, generateCitySlug } from '../src/lib/slugify';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config(); // Fallback to .env if needed

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkInstaller() {
    const { data, error } = await supabase
        .from('installers')
        .select('*')
        .ilike('company_name', '%Earth Smart Solar%');

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Found:', data?.length, 'results');
    data?.forEach(inst => {
        const nameSlug = generateInstallerSlug(inst.company_name, inst.name);
        const citySlug = generateCitySlug(inst.location_city);
        console.log(`Company: ${inst.company_name}`);
        console.log(`Calculated City Slug: ${citySlug}`);
        console.log(`Calculated Name Slug: ${nameSlug}`);
        console.log(`Full Path: /installers/${citySlug}/${nameSlug}`);
    });
}

checkInstaller();
