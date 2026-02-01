/**
 * Batch index all solar pages via Google Indexing API
 * 
 * Usage: node scripts/batch-index-all.js
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Path to service account credentials
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '..', 'gsc-service-account.json');

// Base URL for the site
const BASE_URL = 'https://solarinstallerstx.com';

// Important pages
const OTHER_PAGES = [
  '',           // Homepage
  '/about',
  '/contact',
  '/partner',
  '/blog',
];

async function batchIndex() {
  try {
    // 1. Load city slugs (from a simplified list or file)
    const citySlugs = [
      'houston', 'san-antonio', 'dallas', 'austin', 'fort-worth', 'el-paso',
      'arlington', 'corpus-christi', 'plano', 'lubbock', 'laredo', 'frisco',
      'mckinney', 'killeen', 'irving', 'garland', 'grand-prairie', 'amarillo',
      'waco', 'brownsville', 'mcallen', 'mesquite', 'denton', 'round-rock',
      'carrollton', 'pearland', 'sugar-land', 'pasadena', 'richardson', 'midland',
      'odessa', 'abilene', 'tyler', 'league-city', 'college-station', 'wichita-falls',
      'allen', 'san-marcos', 'beaumont', 'longview', 'temple', 'new-braunfels',
      'flower-mound', 'conroe', 'cedar-park', 'georgetown', 'cibolo', 'schertz',
      'seguin', 'gonzales', 'cuero', 'la-vernia'
    ];

    // 2. Load installer routes from file
    let installerRoutes = [];
    try {
      const routesData = fs.readFileSync(path.join(__dirname, '..', 'installer-routes.json'), 'utf8');
      installerRoutes = JSON.parse(routesData);
    } catch (e) {
      console.warn('⚠️ Could not read installer-routes.json, skipping installers.');
    }

    // 3. Build list of all URLs
    const urls = [
      ...OTHER_PAGES.map(page => `${BASE_URL}${page}`),
      ...citySlugs.map(slug => `${BASE_URL}/city/${slug}`),
      ...installerRoutes.map(route => `${BASE_URL}${route}`),
    ];

    // Load service account credentials
    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: client });

    console.log(`\n📋 Total URLs to index: ${urls.length}`);
    console.log(`📊 Daily quota: 200 requests`);
    console.log(`⏱️  Starting batch indexing...\n`);

    let successCount = 0;
    let errorCount = 0;

    // We only process up to 200 to avoid hitting the quota immediately
    const limit = Math.min(urls.length, 200);

    for (let i = 0; i < limit; i++) {
      const url = urls[i];
      
      try {
        console.log(`[${i + 1}/${limit}] Indexing: ${url}`);
        
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });

        successCount++;
        console.log(`   ✅ Success`);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        errorCount++;
        if (error.code === 429) {
          console.error(`   ❌ QUOTA EXCEEDED`);
          break;
        } else {
          console.error(`   ❌ Error: ${error.message}`);
        }
      }
    }

    console.log(`\n========================================`);
    console.log(`📊 BATCH INDEXING STATUS`);
    console.log(`========================================`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📋 Total attempted: ${successCount + errorCount}`);
    console.log(`\nCheck GSC in 24-48 hours. Run again tomorrow for remaining URLs.`);

  } catch (error) {
    console.error('❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

batchIndex();
