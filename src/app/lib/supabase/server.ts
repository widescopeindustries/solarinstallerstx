// Server-side Supabase clients for Next.js
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Server-side Supabase client (use service role for admin operations)
// IMPORTANT: Only use this for operations that require elevated permissions
// Import like: import { createServerClient } from '@/app/lib/supabase/server'
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-only, NOT NEXT_PUBLIC_

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase service role key. Please check your .env.local file and ensure SUPABASE_SERVICE_ROLE_KEY is set.'
    )
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // No session on server
    },
  })
}

// For read-only operations, use anon key
// Import like: import { createServerClientAnon } from '@/app/lib/supabase/server'
export function createServerClientAnon() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })
}
