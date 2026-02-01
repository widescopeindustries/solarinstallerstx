/**
 * Request indexing for a single URL via Google Indexing API
 * 
 * Usage: node scripts/request-indexing.js <url>
 * Example: node scripts/request-indexing.js https://solarinstallerstx.com/city/houston
 */

const { google } = require('googleapis');
const path = require('path');

// Path to service account credentials
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '..', 'gsc-service-account.json');

async function requestIndexing(url) {
  try {
    // Load service account credentials
    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const client = await auth.getClient();
    
    // Create indexing client
    const indexing = google.indexing({
      version: 'v3',
      auth: client,
    });

    // Request indexing
    console.log(`Requesting indexing for: ${url}`);
    
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    console.log('✅ Indexing requested successfully!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    if (error.code === 403) {
      console.error('❌ Permission denied. Make sure:');
      console.error('   1. Service account is added to GSC with Owner permission');
      console.error('   2. Indexing API is enabled in Google Cloud Console');
    } else if (error.code === 429) {
      console.error('❌ Quota exceeded. Daily limit is 200 requests.');
    } else {
      console.error('❌ Error requesting indexing:', error.message);
    }
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  const url = process.argv[2];
  
  if (!url) {
    console.log('Usage: node scripts/request-indexing.js <url>');
    console.log('Example: node scripts/request-indexing.js https://solarinstallerstx.com/city/houston');
    process.exit(1);
  }

  requestIndexing(url)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { requestIndexing };
