import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  Supabase environment variables are not set.');
  console.warn('⚠️  Skipping installer routes regeneration - using existing files.');
  console.warn('⚠️  To regenerate routes, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
  process.exit(0); // Exit successfully to allow build to continue
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
  const idToPath: Record<string, string> = {};

  // track duplicates per base path (city/name)
  const pathCounts = new Map<string, number>();

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

      // Disambiguate duplicates by appending -2, -3, ... to the name slug within the same city
      const baseKey = `${citySlug}/${nameSlug}`;
      const count = (pathCounts.get(baseKey) || 0) + 1;
      pathCounts.set(baseKey, count);

      const uniqueNameSlug = count > 1 ? `${nameSlug}-${count}` : nameSlug;
      const newPath = `/installers/${citySlug}/${uniqueNameSlug}`;

      installerRoutes.push(newPath);
      redirects.push(`${oldPath} ${newPath} 301`);
      idToPath[installer.id] = newPath;
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

    // Write id -> path map for use in app and sitemap
    const assetsDir = path.join(process.cwd(), 'src', 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    const mapPath = path.join(assetsDir, 'installer-paths.json');
    fs.writeFileSync(mapPath, JSON.stringify(idToPath, null, 2), 'utf-8');
    console.log(`✅ Generated installer path map (${Object.keys(idToPath).length} entries)`);
    console.log(`📍 Map file: ${mapPath}`);
    
    return installerRoutes;
  } catch (error) {
    console.error('Error generating installer routes:', error);
    process.exit(1);
  }
}

generateInstallerRoutes().catch(console.error);
