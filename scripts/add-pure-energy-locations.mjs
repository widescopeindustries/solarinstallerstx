import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ryinjghimmyisvttfibi.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aW5qZ2hpbW15aXN2dHRmaWJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjIxODU1MiwiZXhwIjoyMDc3Nzk0NTUyfQ.g8djIaMwzPA7BchXT04mBIGpMsqPu-GPH61GaftrCgs';
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// The 8 real Pure Energy (pureenergylubbock.com) phones
const PURE_ENERGY_PHONES = ['(806) 454-7873', '(833) 937-7873'];
const PURE_ENERGY_CITIES = ['Lubbock', 'Amarillo', 'Waco', 'Dallas', 'Houston', 'San Antonio', 'Austin', 'McAllen'];

const CITY_ADDRESSES = {
    'Lubbock': '5714 40th St, Lubbock, TX 79407',
    'Amarillo': '6321 South Western Street, Amarillo, TX 79110',
    'Waco': '5900 Franklin Ave, Suite 29, Waco, TX 76710',
    'Dallas': '15400 Knoll Trail Dr, Suite 105, Dallas, TX 75248',
    'Houston': '10901 Ranch Stone Drive, Suite 304, Houston, TX 77064',
    'San Antonio': '231 E Rhapsody Dr, San Antonio, TX 78216',
    'Austin': 'Office & Warehouse - Austin, TX',
    'McAllen': 'Office & Warehouse - McAllen, TX',
};

async function main() {
    console.log('\n=== Pure Energy Verified Badge Update ===\n');

    // Fetch all Pure Energy-named records from the 8 target cities
    const { data: allRecords, error } = await sb
        .from('installers')
        .select('id, company_name, name, location_city, phone, is_verified, company_website')
        .in('location_city', PURE_ENERGY_CITIES)
        .ilike('company_name', '%pure energy%');

    if (error) {
        console.error('DB ERROR:', error.message);
        process.exit(1);
    }

    // Filter to only those matching the real Pure Energy phone
    const realPureEnergy = allRecords.filter(r =>
        PURE_ENERGY_PHONES.includes(r.phone)
    );

    console.log(`Found ${realPureEnergy.length} Pure Energy (pureenergylubbock.com) record(s):`);
    realPureEnergy.forEach(r => {
        console.log(`  [${r.id}] "${r.company_name}" | ${r.location_city} | ${r.phone} | verified=${r.is_verified}`);
    });

    if (realPureEnergy.length === 0) {
        console.log('\nNo matching records. Check company names or phones.');
        return;
    }

    console.log('\nUpdating to VERIFIED...\n');

    let updated = 0;
    for (const r of realPureEnergy) {
        const addr = CITY_ADDRESSES[r.location_city] || 'Texas';
        const { error: upErr } = await sb
            .from('installers')
            .update({
                company_name: 'Pure Energy',
                name: 'Pure Energy',
                is_verified: true,
                company_website: 'https://pureenergylubbock.com',
                email: 'info@pureenergytx.com',
                outreach_status: 'got_verified',
                outreach_notes: `VERIFIED BADGE - Secured by Elise 2/26/2026. Pure Energy Office & Warehouse: ${addr}. All 8 TX locations verified. Website: https://pureenergylubbock.com/#locations`,
                updated_at: new Date().toISOString(),
            })
            .eq('id', r.id);

        if (upErr) {
            console.error(`  FAILED ${r.location_city}: ${upErr.message}`);
        } else {
            const slug = r.location_city.toLowerCase().replace(/ /g, '-');
            console.log(`  OK: Pure Energy - ${r.location_city}`);
            console.log(`      -> https://solarinstallerstx.com/installers/${slug}/pure-energy`);
            updated++;
        }
    }

    // Now check which of the 8 cities are MISSING entirely and need a new record
    const coveredCities = realPureEnergy.map(r => r.location_city);
    const missingCities = PURE_ENERGY_CITIES.filter(c => !coveredCities.includes(c));

    if (missingCities.length > 0) {
        console.log(`\nINSERTING ${missingCities.length} missing cities...`);
        for (const city of missingCities) {
            const addr = CITY_ADDRESSES[city];
            const phone = city === 'San Antonio' ? '(833) 937-7873' : '(806) 454-7873';
            const { data: newRec, error: insErr } = await sb
                .from('installers')
                .insert({
                    company_name: 'Pure Energy',
                    name: 'Pure Energy',
                    location_city: city,
                    phone,
                    email: 'info@pureenergytx.com',
                    company_website: 'https://pureenergylubbock.com',
                    is_verified: true,
                    outreach_status: 'got_verified',
                    outreach_notes: `VERIFIED BADGE - Secured by Elise 2/26/2026. Pure Energy Office & Warehouse: ${addr}. Website: https://pureenergylubbock.com/#locations`,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .select('id, location_city')
                .single();

            if (insErr) {
                console.error(`  INSERT FAILED ${city}: ${insErr.message}`);
            } else {
                const slug = city.toLowerCase().replace(/ /g, '-');
                console.log(`  INSERTED: Pure Energy - ${newRec.location_city} (${newRec.id})`);
                console.log(`      -> https://solarinstallerstx.com/installers/${slug}/pure-energy`);
                updated++;
            }
        }
    }

    console.log(`\n=== COMPLETE: ${updated} record(s) updated/inserted ===`);
    console.log('\nAll 8 Pure Energy pages on solarinstallerstx.com:');
    PURE_ENERGY_CITIES.forEach(city => {
        const slug = city.toLowerCase().replace(/ /g, '-');
        console.log(`  https://solarinstallerstx.com/installers/${slug}/pure-energy`);
    });
}

main().catch(console.error);
