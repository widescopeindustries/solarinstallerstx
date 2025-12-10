// Client-side Supabase client for Next.js
'use client'

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
const isBuildTime = typeof window === 'undefined' && (!SUPABASE_URL || !SUPABASE_ANON_KEY);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Using dummy client for build.')
}

// Client-side Supabase client (for use in Client Components)
// Import like: import { supabase } from '@/app/lib/supabase/client'
export const supabase = (isBuildTime || !SUPABASE_URL || !SUPABASE_ANON_KEY)
  ? {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      getSession: () => Promise.resolve({ data: { session: null } }),
      signInWithPassword: () => Promise.resolve({ error: null }),
      signOut: () => Promise.resolve({}),
      signUp: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      insert: () => Promise.resolve({ error: null }),
      update: () => ({ eq: () => Promise.resolve({ error: null }) }),
    }),
    rpc: () => Promise.resolve({ data: null, error: null }),
  } as unknown as SupabaseClient<Database>
  : createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  })
