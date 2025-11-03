/**
 * Recalculate Safety Scores for All Installers
 *
 * Runs the safety score calculation algorithm on all installers
 * and updates their scores in the database
 *
 * Run: npx ts-node scripts/data-enrichment/recalculate-all-scores.ts
 */

import { createClient } from '@supabase/supabase-js';
import { calculateSafetyScore } from '../../src/lib/safetyScoring';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function recalculateAllScores() {
  console.log('Starting safety score recalculation for all installers...\n');

  // Fetch all installers
  const { data: installers, error } = await supabase
    .from('installers')
    .select('*')
    .order('company_name');

  if (error) {
    console.error('Error fetching installers:', error);
    return;
  }

  console.log(`Found ${installers?.length || 0} installers to process\n`);

  let successCount = 0;
  let failCount = 0;
  let tierCounts: { [key: string]: number } = {
    Gold: 0,
    Silver: 0,
    Bronze: 0,
    BelowThreshold: 0
  };

  for (const installer of installers || []) {
    const businessName = installer.company_name || installer.name;

    try {
      // Calculate safety score
      const scoreResult = calculateSafetyScore(installer);

      // Update installer
      const { error: updateError } = await supabase
        .from('installers')
        .update({
          total_safety_score: scoreResult.total_safety_score,
          tier: scoreResult.tier,
          financial_stability_score: scoreResult.financial_stability_score,
          professional_credentials_score: scoreResult.professional_credentials_score,
          customer_protection_score: scoreResult.customer_protection_score,
          track_record_score: scoreResult.track_record_score,
          red_flags: scoreResult.red_flags,
          red_flags_count: scoreResult.red_flags.length,
          updated_at: new Date().toISOString()
        })
        .eq('id', installer.id);

      if (updateError) {
        console.error(`✗ Error updating ${businessName}:`, updateError);
        failCount++;
        continue;
      }

      // Track tier distribution
      if (scoreResult.tier) {
        tierCounts[scoreResult.tier]++;
      } else {
        tierCounts.BelowThreshold++;
      }

      const tierBadge = scoreResult.tier ? `${scoreResult.tier}` : 'Below Threshold';
      const redFlagWarning = scoreResult.red_flags.length > 0 ? ` ⚠ ${scoreResult.red_flags.length} red flags` : '';

      console.log(`✓ ${businessName}: ${scoreResult.total_safety_score}/100 (${tierBadge})${redFlagWarning}`);
      successCount++;

    } catch (error) {
      console.error(`✗ Error processing ${businessName}:`, error);
      failCount++;
    }
  }

  console.log('\n=== Safety Score Recalculation Complete ===');
  console.log(`✓ Successfully updated: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log('\nTier Distribution:');
  console.log(`  🏆 Gold: ${tierCounts.Gold}`);
  console.log(`  🥈 Silver: ${tierCounts.Silver}`);
  console.log(`  🥉 Bronze: ${tierCounts.Bronze}`);
  console.log(`  ❌ Below Threshold: ${tierCounts.BelowThreshold}`);

  // Calculate average score
  const avgScore = installers && installers.length > 0
    ? installers.reduce((sum, i) => {
        const result = calculateSafetyScore(i);
        return sum + result.total_safety_score;
      }, 0) / installers.length
    : 0;

  console.log(`\nAverage Safety Score: ${avgScore.toFixed(1)}/100`);
}

/**
 * Recalculate score for single installer (for testing)
 */
async function recalculateSingleInstaller(companyName: string) {
  const { data: installer, error } = await supabase
    .from('installers')
    .select('*')
    .ilike('company_name', `%${companyName}%`)
    .single();

  if (error || !installer) {
    console.error('Installer not found:', companyName);
    return;
  }

  const businessName = installer.company_name || installer.name;
  const scoreResult = calculateSafetyScore(installer);

  console.log('\n=== Safety Score Breakdown ===');
  console.log(`Business: ${businessName}`);
  console.log(`\nCategory Scores:`);
  console.log(`  Financial Stability: ${scoreResult.financial_stability_score}/30`);
  console.log(`  Professional Credentials: ${scoreResult.professional_credentials_score}/25`);
  console.log(`  Customer Protection: ${scoreResult.customer_protection_score}/25`);
  console.log(`  Track Record: ${scoreResult.track_record_score}/20`);
  console.log(`\nTotal Safety Score: ${scoreResult.total_safety_score}/100`);
  console.log(`Tier: ${scoreResult.tier || 'Below Threshold (<60)'}`);

  if (scoreResult.red_flags.length > 0) {
    console.log(`\n⚠ Red Flags (${scoreResult.red_flags.length}):`);
    scoreResult.red_flags.forEach(flag => console.log(`  - ${flag}`));
  }

  console.log('\nDetailed Breakdown:');
  console.log('\nFinancial Stability:');
  Object.entries(scoreResult.breakdown.financial_stability).forEach(([key, value]) => {
    console.log(`  ${key}: ${value} pts`);
  });

  console.log('\nProfessional Credentials:');
  Object.entries(scoreResult.breakdown.professional_credentials).forEach(([key, value]) => {
    console.log(`  ${key}: ${value} pts`);
  });

  console.log('\nCustomer Protection:');
  Object.entries(scoreResult.breakdown.customer_protection).forEach(([key, value]) => {
    console.log(`  ${key}: ${value} pts`);
  });

  console.log('\nTrack Record:');
  Object.entries(scoreResult.breakdown.track_record).forEach(([key, value]) => {
    console.log(`  ${key}: ${value} pts`);
  });

  // Ask if user wants to save
  console.log('\n\nWould you like to save this score to the database? (Run with --save flag)');

  if (process.argv.includes('--save')) {
    const { error: updateError } = await supabase
      .from('installers')
      .update({
        total_safety_score: scoreResult.total_safety_score,
        tier: scoreResult.tier,
        financial_stability_score: scoreResult.financial_stability_score,
        professional_credentials_score: scoreResult.professional_credentials_score,
        customer_protection_score: scoreResult.customer_protection_score,
        track_record_score: scoreResult.track_record_score,
        red_flags: scoreResult.red_flags,
        red_flags_count: scoreResult.red_flags.length,
        updated_at: new Date().toISOString()
      })
      .eq('id', installer.id);

    if (updateError) {
      console.error('Error saving:', updateError);
    } else {
      console.log('\n✓ Score saved successfully!');
    }
  }
}

// Run script
const args = process.argv.slice(2);
if (args.length > 0 && args[0] === '--single') {
  const companyName = args[1];
  if (!companyName) {
    console.error('Usage: npx ts-node recalculate-all-scores.ts --single "Company Name" [--save]');
    process.exit(1);
  }
  recalculateSingleInstaller(companyName);
} else {
  recalculateAllScores();
}

export { recalculateAllScores, recalculateSingleInstaller };
