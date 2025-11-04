import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
serve(async (req)=>{
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const sql = await Deno.readTextFile('../migrations/20251103000000_add_safety_scoring_system.sql');
    const { error } = await supabase.rpc('exec', {
      sql
    });
    if (error) {
      throw error;
    }
    return new Response(JSON.stringify({
      message: 'Migration completed successfully!'
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
});
