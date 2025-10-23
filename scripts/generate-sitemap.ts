import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file (handled by node -r dotenv/config)
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Error: Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY) are not set.');
  console.error('Make sure your .env file contains these variables.');
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

async function generateSitemap() {
  const baseUrl = 'https://solarinstallerstx.com';
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/contact', changefreq: 'monthly', priority: '0.8' },
    { url: '/texas-guide', changefreq: 'monthly', priority: '0.9' },
    { url: '/faq', changefreq: 'monthly', priority: '0.9' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.5' },
    { url: '/terms', changefreq: 'yearly', priority: '0.5' },
    { url: '/refund', changefreq: 'yearly', priority: '0.5' },
    { url: '/badge', changefreq: 'yearly', priority: '0.5' },
    { url: '/texas-solar-incentives-2025', changefreq: 'yearly', priority: '1.0' },
  ];

  // City-specific landing pages (from keyword strategy)
  const cityPages = [
    { url: '/austin', changefreq: 'monthly', priority: '0.9' },
    { url: '/houston', changefreq: 'monthly', priority: '0.9' },
    { url: '/dallas', changefreq: 'monthly', priority: '0.9' },
    { url: '/san-antonio-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/fort-worth-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/el-paso-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/corpus-christi-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/lubbock-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/amarillo-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/plano-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/arlington-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/garland-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/irving-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/mesquite-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/pasadena-solar-installers', changefreq: 'monthly', priority: '0.9' },
    { url: '/laredo-solar-installers', changefreq: 'monthly', priority: '0.9' },
  ];

  // Fetch all installers
  const { data: installers, error } = await supabase
    .from('installers')
    .select('id, name, company_name, location_city, location_state, updated_at')
    .order('name');

  if (error) {
    console.error('Error fetching installers:', error);
    process.exit(1);
  }

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Add city pages
  cityPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Add installer pages
  installers?.forEach(installer => {
    const slug = generateInstallerSlug(
      installer.company_name,
      installer.name,
      installer.location_city,
      installer.location_state,
      installer.id
    );
    
    const lastmod = installer.updated_at 
      ? new Date(installer.updated_at).toISOString().split('T')[0]
      : today;

    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/installer/${slug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  // Write to public/sitemap.xml
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');

  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📄 Total URLs: ${staticPages.length + cityPages.length + (installers?.length || 0)}`);
  console.log(`   - Static pages: ${staticPages.length}`);
  console.log(`   - City pages: ${cityPages.length}`);
  console.log(`   - Installer pages: ${installers?.length || 0}`);
  console.log(`📍 Location: ${sitemapPath}`);
}

generateSitemap().catch(console.error);