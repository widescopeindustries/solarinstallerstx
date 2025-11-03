/**
 * BBB (Better Business Bureau) Data Integration
 *
 * Fetches business ratings, accreditation status, and complaint data from BBB API
 *
 * Setup:
 * 1. Sign up for BBB API access: https://www.bbb.org/api
 * 2. Set BBB_API_KEY environment variable
 * 3. Run: npx ts-node scripts/data-enrichment/bbb-integration.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const bbbApiKey = process.env.BBB_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

interface BBBProfile {
  businessId: string;
  businessName: string;
  rating: string;
  accredited: boolean;
  complaintCount: number;
  closedComplaints: number;
  city: string;
  state: string;
}

/**
 * Search BBB for a business by name and location
 */
async function searchBBB(businessName: string, city: string, state: string): Promise<BBBProfile | null> {
  if (!bbbApiKey) {
    console.warn('BBB_API_KEY not set. Skipping BBB lookup.');
    return null;
  }

  try {
    // BBB API endpoint (example - actual API may differ)
    const searchUrl = `https://api.bbb.org/api/orgs/search?term=${encodeURIComponent(businessName)}&location=${city},${state}`;

    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${bbbApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`BBB API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    // Parse response (structure depends on actual BBB API)
    if (data.searchResults && data.searchResults.length > 0) {
      const business = data.searchResults[0];

      return {
        businessId: business.id,
        businessName: business.businessName,
        rating: business.rating || 'NR',
        accredited: business.accredited || false,
        complaintCount: business.complaintCount || 0,
        closedComplaints: business.closedComplaints || 0,
        city: business.location?.city || city,
        state: business.location?.state || state
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching BBB data:', error);
    return null;
  }
}

/**
 * Update installer with BBB data
 */
async function updateInstallerWithBBB(installerId: string, bbbData: BBBProfile) {
  const resolvedCount = bbbData.closedComplaints;
  const totalCount = bbbData.complaintCount;
  const resolutionRate = totalCount > 0 ? (resolvedCount / totalCount) * 100 : 0;

  const { error } = await supabase
    .from('installers')
    .update({
      bbb_rating: bbbData.rating,
      bbb_accredited: bbbData.accredited,
      complaint_count: totalCount,
      resolved_complaint_count: resolvedCount,
      complaint_resolution_rate: resolutionRate,
      protection_data_updated_at: new Date().toISOString()
    })
    .eq('id', installerId);

  if (error) {
    console.error(`Error updating installer ${installerId}:`, error);
    return false;
  }

  console.log(`✓ Updated ${bbbData.businessName} with BBB data (Rating: ${bbbData.rating}, Complaints: ${totalCount})`);
  return true;
}

/**
 * Process all installers
 */
async function processAllInstallers() {
  console.log('Starting BBB data collection...\n');

  // Fetch all installers
  const { data: installers, error } = await supabase
    .from('installers')
    .select('id, company_name, name, location_city, location_state')
    .order('company_name');

  if (error) {
    console.error('Error fetching installers:', error);
    return;
  }

  console.log(`Found ${installers?.length || 0} installers to process\n`);

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;

  for (const installer of installers || []) {
    const businessName = installer.company_name || installer.name;
    const city = installer.location_city;
    const state = installer.location_state;

    console.log(`Processing: ${businessName}...`);

    // Check if data is fresh (less than 90 days old)
    // In production, add a check here to skip recently updated records

    const bbbData = await searchBBB(businessName, city, state);

    if (bbbData) {
      const success = await updateInstallerWithBBB(installer.id, bbbData);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    } else {
      console.log(`  ⚠ No BBB data found for ${businessName}`);
      skipCount++;
    }

    // Rate limiting - wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n=== BBB Data Collection Complete ===');
  console.log(`✓ Successfully updated: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`⚠ Skipped (no data): ${skipCount}`);
}

/**
 * Process single installer (for testing)
 */
async function processSingleInstaller(companyName: string) {
  const { data: installer, error } = await supabase
    .from('installers')
    .select('id, company_name, name, location_city, location_state')
    .ilike('company_name', `%${companyName}%`)
    .single();

  if (error || !installer) {
    console.error('Installer not found:', companyName);
    return;
  }

  const businessName = installer.company_name || installer.name;
  const bbbData = await searchBBB(businessName, installer.location_city, installer.location_state);

  if (bbbData) {
    await updateInstallerWithBBB(installer.id, bbbData);
  } else {
    console.log('No BBB data found');
  }
}

// Run script
const args = process.argv.slice(2);
if (args.length > 0 && args[0] === '--single') {
  const companyName = args[1];
  if (!companyName) {
    console.error('Usage: npx ts-node bbb-integration.ts --single "Company Name"');
    process.exit(1);
  }
  processSingleInstaller(companyName);
} else {
  processAllInstallers();
}

export { searchBBB, updateInstallerWithBBB };
