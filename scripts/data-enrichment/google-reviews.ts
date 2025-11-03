/**
 * Google Places API Integration
 *
 * Fetches business ratings and reviews from Google Places API
 *
 * Setup:
 * 1. Enable Google Places API in Google Cloud Console
 * 2. Set GOOGLE_PLACES_API_KEY environment variable
 * 3. Run: npx ts-node scripts/data-enrichment/google-reviews.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

interface GooglePlacesResult {
  placeId: string;
  name: string;
  rating: number;
  userRatingsTotal: number;
  address: string;
  phone: string;
  website: string;
}

/**
 * Search Google Places for a business
 */
async function searchGooglePlaces(
  businessName: string,
  city: string,
  state: string
): Promise<GooglePlacesResult | null> {
  if (!googleApiKey) {
    console.warn('GOOGLE_PLACES_API_KEY not set. Skipping Google Places lookup.');
    return null;
  }

  try {
    // Step 1: Text search to find the place
    const searchQuery = `${businessName} solar ${city} ${state}`;
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${googleApiKey}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
      return null;
    }

    const place = searchData.results[0];

    // Step 2: Get place details for more info
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,user_ratings_total,formatted_address,formatted_phone_number,website&key=${googleApiKey}`;

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status !== 'OK' || !detailsData.result) {
      return null;
    }

    const details = detailsData.result;

    return {
      placeId: place.place_id,
      name: details.name,
      rating: details.rating || 0,
      userRatingsTotal: details.user_ratings_total || 0,
      address: details.formatted_address || '',
      phone: details.formatted_phone_number || '',
      website: details.website || ''
    };
  } catch (error) {
    console.error('Error fetching Google Places data:', error);
    return null;
  }
}

/**
 * Update installer with Google Places data
 */
async function updateInstallerWithGoogle(installerId: string, googleData: GooglePlacesResult) {
  // Only update if we have meaningful review data (at least 5 reviews)
  const updates: any = {};

  if (googleData.userRatingsTotal >= 5) {
    updates.rating = googleData.rating;
    updates.review_count = googleData.userRatingsTotal;
  }

  // Update phone if not set
  if (googleData.phone) {
    const { data: currentData } = await supabase
      .from('installers')
      .select('phone')
      .eq('id', installerId)
      .single();

    if (!currentData?.phone) {
      updates.phone = googleData.phone;
    }
  }

  // Update website if not set
  if (googleData.website) {
    const { data: currentData } = await supabase
      .from('installers')
      .select('company_website')
      .eq('id', installerId)
      .single();

    if (!currentData?.company_website) {
      updates.company_website = googleData.website;
    }
  }

  if (Object.keys(updates).length === 0) {
    console.log(`  ℹ No updates needed for ${googleData.name}`);
    return true;
  }

  updates.track_record_updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('installers')
    .update(updates)
    .eq('id', installerId);

  if (error) {
    console.error(`Error updating installer ${installerId}:`, error);
    return false;
  }

  console.log(`✓ Updated ${googleData.name} (Rating: ${googleData.rating}/5, Reviews: ${googleData.userRatingsTotal})`);
  return true;
}

/**
 * Process all installers
 */
async function processAllInstallers() {
  console.log('Starting Google Places data collection...\n');

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
    console.log(`Processing: ${businessName}...`);

    const googleData = await searchGooglePlaces(
      businessName,
      installer.location_city,
      installer.location_state
    );

    if (googleData) {
      const success = await updateInstallerWithGoogle(installer.id, googleData);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    } else {
      console.log(`  ⚠ No Google Places data found for ${businessName}`);
      skipCount++;
    }

    // Rate limiting - Google has quota limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n=== Google Places Data Collection Complete ===');
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
  const googleData = await searchGooglePlaces(
    businessName,
    installer.location_city,
    installer.location_state
  );

  if (googleData) {
    await updateInstallerWithGoogle(installer.id, googleData);
  } else {
    console.log('No Google Places data found');
  }
}

// Run script
const args = process.argv.slice(2);
if (args.length > 0 && args[0] === '--single') {
  const companyName = args[1];
  if (!companyName) {
    console.error('Usage: npx ts-node google-reviews.ts --single "Company Name"');
    process.exit(1);
  }
  processSingleInstaller(companyName);
} else {
  processAllInstallers();
}

export { searchGooglePlaces, updateInstallerWithGoogle };
