/**
 * Script to update Sundown Solar LLC installations_completed to 100
 * 
 * Usage: npm exec tsx -- scripts/update-sundown-solar-installs.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryinjghimmyisvttfibi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aW5qZ2hpbW15aXN2dHRmaWJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjIxODU1MiwiZXhwIjoyMDc3Nzk0NTUyfQ.g8djIaMwzPA7BchXT04mBIGpMsqPu-GPH61GaftrCgs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSundownSolarInstalls() {
    console.log('Updating Sundown Solar LLC installations count...\n');

    // Find Sundown Solar LLC
    const { data: installer, error: findError } = await supabase
        .from('installers')
        .select('id, company_name, name, installations_completed')
        .eq('company_name', 'Sundown Solar LLC')
        .single();

    if (findError) {
        console.error('Error finding Sundown Solar LLC:', findError.message);

        // Try finding by partial match
        console.log('\nTrying partial name match...');
        const { data: partialMatch, error: partialError } = await supabase
            .from('installers')
            .select('id, company_name, name, installations_completed')
            .ilike('company_name', '%sundown%solar%');

        if (partialError || !partialMatch?.length) {
            console.error('Could not find Sundown Solar in database');
            process.exit(1);
        }

        console.log('Found matches:', partialMatch);

        // Update the first match
        if (partialMatch.length > 0) {
            const match = partialMatch[0];
            console.log(`\nUpdating: ${match.company_name} (ID: ${match.id})`);

            const { error: updateError } = await supabase
                .from('installers')
                .update({ installations_completed: 100 })
                .eq('id', match.id);

            if (updateError) {
                console.error('Error updating:', updateError.message);
                process.exit(1);
            }

            console.log('✅ Successfully updated!');
        }
        return;
    }

    console.log('Found installer:');
    console.log(`  Company: ${installer.company_name}`);
    console.log(`  Name: ${installer.name}`);
    console.log(`  Current installations_completed: ${installer.installations_completed}`);
    console.log('');

    // Update to 100 installations
    const { error: updateError } = await supabase
        .from('installers')
        .update({ installations_completed: 100 })
        .eq('id', installer.id);

    if (updateError) {
        console.error('Error updating:', updateError.message);
        process.exit(1);
    }

    // Verify the update
    const { data: updated, error: verifyError } = await supabase
        .from('installers')
        .select('id, company_name, installations_completed')
        .eq('id', installer.id)
        .single();

    if (verifyError) {
        console.error('Error verifying update:', verifyError.message);
        process.exit(1);
    }

    console.log('✅ Successfully updated Sundown Solar LLC!');
    console.log(`  New installations_completed: ${updated.installations_completed}+`);
    console.log('\nThe installer profile page will now show "100+" for estimated installations.');
}

updateSundownSolarInstalls().catch(console.error);
