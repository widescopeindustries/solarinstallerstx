import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Error: Supabase environment variables are not set.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const generateInstallerSlug = (
  companyName: string | null,
  name: string,
  city: string,
  state: string,
  id: string
): string => {
  const displayName = companyName || name;
  
  const baseSlug = `${displayName}-${city}-${state}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
  
  return `${baseSlug}-${id}`;
};

async function generateInstallerRoutes() {
  try {
    // Fetch all installers
    const { data: installers, error } = await supabase
      .from('installers')
      .select('id, name, company_name, location_city, location_state')
      .order('name');

    if (error) {
      console.error('Error fetching installers:', error);
      process.exit(1);
    }

    // Generate installer routes
    const installerRoutes = installers?.map(installer => {
      const slug = generateInstallerSlug(
        installer.company_name,
        installer.name,
        installer.location_city,
        installer.location_state,
        installer.id
      );
      return `/installer/${slug}`;
    }) || [];

    // Write routes to a JSON file for the prerender plugin to consume
    const routesPath = path.join(process.cwd(), 'installer-routes.json');
    fs.writeFileSync(routesPath, JSON.stringify(installerRoutes, null, 2), 'utf-8');

    console.log(`✅ Generated ${installerRoutes.length} installer routes`);
    console.log(`📍 Routes file: ${routesPath}`);
    
    return installerRoutes;
  } catch (error) {
    console.error('Error generating installer routes:', error);
    process.exit(1);
  }
}

generateInstallerRoutes().catch(console.error);
