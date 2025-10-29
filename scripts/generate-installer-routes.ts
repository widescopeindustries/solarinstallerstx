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
): string => {
  const displayName = companyName || name;
  
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};

const generateCitySlug = (city: string): string => {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
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

    const installerRoutes: string[] = [];
    const redirects: string[] = [];

    installers?.forEach(installer => {
      const oldSlug = `${(installer.company_name || installer.name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-')}-${installer.location_city
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')}-${installer.location_state
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')}-${installer.id}`;
      
      const oldPath = `/installer/${oldSlug}`;

      const nameSlug = generateInstallerSlug(installer.company_name, installer.name);
      const citySlug = generateCitySlug(installer.location_city);
      
      const newPath = `/installers/${citySlug}/${nameSlug}`;
      
      installerRoutes.push(newPath);
      redirects.push(`${oldPath} ${newPath} 301`);
    });

    // Write routes to a JSON file for the prerender plugin to consume
    const routesPath = path.join(process.cwd(), 'installer-routes.json');
    fs.writeFileSync(routesPath, JSON.stringify(installerRoutes, null, 2), 'utf-8');
    console.log(`✅ Generated ${installerRoutes.length} installer routes`);
    console.log(`📍 Routes file: ${routesPath}`);

    // Write redirects to a _redirects file for Netlify
    const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
    fs.writeFileSync(redirectsPath, redirects.join('\n'), 'utf-8');
    console.log(`✅ Generated ${redirects.length} redirects`);
    console.log(`📍 Redirects file: ${redirectsPath}`);
    
    return installerRoutes;
  } catch (error) {
    console.error('Error generating installer routes:', error);
    process.exit(1);
  }
}

generateInstallerRoutes().catch(console.error);
