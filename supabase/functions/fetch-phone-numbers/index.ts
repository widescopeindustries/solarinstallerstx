import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function fetchWithRetries(url: string, options: RequestInit = {}, retries = 2, backoffMs = 300) {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      if (i < retries) await new Promise((r) => setTimeout(r, backoffMs * (i + 1)));
    }
  }
  throw lastErr;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const googleApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
    if (!googleApiKey) return new Response(JSON.stringify({ error: 'Google API key not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    if (!supabaseUrl || !supabaseKey) return new Response(JSON.stringify({ error: 'Supabase env vars missing' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Missing Authorization header' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userErr } = await supabaseClient.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const user = userData.user;

    // Ensure RPC returns a boolean true-ish value for is_admin
    const { data: rpcData, error: rpcErr } = await supabaseClient.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (rpcErr) {
      console.error('RPC error', rpcErr);
      return new Response(JSON.stringify({ error: 'Could not verify user role' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // rpcData may be an array or object depending on Postgres function; normalize
    let isAdmin = false;
    if (Array.isArray(rpcData)) {
      isAdmin = rpcData.length > 0 && (rpcData[0] === true || rpcData[0]?.is_role === true || rpcData[0]?.has_role === true);
    } else if (rpcData && typeof rpcData === 'object') {
      isAdmin = rpcData === true || (rpcData as any).is_role === true || (rpcData as any).has_role === true;
    } else {
      isAdmin = Boolean(rpcData);
    }

    if (!isAdmin) return new Response(JSON.stringify({ error: 'Access denied. Admin role required.' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const body = await req.json();
    const { installerId, companyName, city, state } = body || {};
    if (!installerId || !companyName) return new Response(JSON.stringify({ error: 'installerId and companyName required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const searchQuery = `${companyName} ${city ?? ''} ${state ?? ''}`.trim();
    const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${googleApiKey}`;

    const searchData = await fetchWithRetries(textSearchUrl, {}, 2, 300);

    if (!searchData || searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
      console.log(`No results for ${searchQuery}`, searchData?.status);
      return new Response(JSON.stringify({ success: false, message: 'No matching business found', installerId }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const placeId = searchData.results[0].place_id;
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,international_phone_number&key=${googleApiKey}`;

    const detailsData = await fetchWithRetries(detailsUrl, {}, 2, 300);
    if (!detailsData || detailsData.status !== 'OK' || !detailsData.result) {
      console.log('Details fetch failed', detailsData?.status);
      return new Response(JSON.stringify({ success: false, message: 'Could not fetch place details', installerId }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const phoneNumber = detailsData.result.international_phone_number || detailsData.result.formatted_phone_number;
    if (!phoneNumber) return new Response(JSON.stringify({ success: false, message: 'No phone number available', installerId }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const { error: updateError } = await supabaseClient.from('installers').update({ phone: phoneNumber }).eq('id', installerId);
    if (updateError) {
      console.error('Update error', updateError);
      return new Response(JSON.stringify({ error: 'Failed to update installer phone' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, phone: phoneNumber, installerId, companyName }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    console.error('Unexpected error in function', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
