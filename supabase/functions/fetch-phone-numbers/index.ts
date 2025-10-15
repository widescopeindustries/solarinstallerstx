import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const googleApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!googleApiKey) {
      throw new Error('Google Places API key not configured');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { installerId, companyName, city, state } = await req.json();

    console.log(`Fetching phone for: ${companyName} in ${city}, ${state}`);

    // Use Google Places Text Search to find the business
    const searchQuery = `${companyName} ${city} ${state}`;
    const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${googleApiKey}`;

    const searchResponse = await fetch(textSearchUrl);
    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
      console.log(`No results found for ${companyName}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No matching business found',
          installerId 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the first result's place_id
    const placeId = searchData.results[0].place_id;
    
    // Fetch place details to get phone number
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,international_phone_number&key=${googleApiKey}`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (detailsData.status !== 'OK' || !detailsData.result) {
      console.log(`Could not fetch details for place_id: ${placeId}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Could not fetch place details',
          installerId 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const phoneNumber = detailsData.result.international_phone_number || detailsData.result.formatted_phone_number;

    if (!phoneNumber) {
      console.log(`No phone number available for ${companyName}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No phone number available',
          installerId 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found phone number: ${phoneNumber}`);

    // Update the installer record with the phone number
    const { error: updateError } = await supabaseClient
      .from('installers')
      .update({ phone: phoneNumber })
      .eq('id', installerId);

    if (updateError) {
      console.error('Error updating installer:', updateError);
      throw updateError;
    }

    console.log(`Successfully updated installer ${installerId} with phone: ${phoneNumber}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        phone: phoneNumber,
        installerId,
        companyName 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-phone-numbers function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
