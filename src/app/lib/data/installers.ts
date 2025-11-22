import { createServerClientAnon } from '@/app/lib/supabase/server'
import { unstable_cache } from 'next/cache'
import type { Database } from '@/app/lib/supabase/types'

type Installer = Database['public']['Tables']['installers']['Row']

/**
 * Server-side installer data fetching utilities
 * All functions use Next.js unstable_cache for optimal performance
 * Revalidation times are configured per function based on data freshness needs
 */

// Cached installer fetching (revalidates every hour)
export const getAllInstallers = unstable_cache(
  async () => {
    const supabase = createServerClientAnon()
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .order('total_safety_score', { ascending: false })

    if (error) {
      console.error('Error fetching installers:', error)
      return []
    }

    return data as Installer[]
  },
  ['all-installers'],
  { revalidate: 3600, tags: ['installers'] }
)

// Get installers by city (cached per city)
export const getInstallersByCity = unstable_cache(
  async (city: string) => {
    const supabase = createServerClientAnon()
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .ilike('location_city', city.replace(/-/g, ' '))
      .order('total_safety_score', { ascending: false })

    if (error) {
      console.error('Error fetching installers by city:', error)
      return []
    }

    return data as Installer[]
  },
  ['installers-by-city'],
  { revalidate: 3600, tags: ['installers'] }
)

// Get single installer by slug
export const getInstallerBySlug = unstable_cache(
  async (slug: string) => {
    const supabase = createServerClientAnon()
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching installer by slug:', error)
      throw error
    }

    return data as Installer
  },
  ['installer-by-slug'],
  { revalidate: 3600, tags: ['installers'] }
)

// Get top installers (Gold tier)
export const getTopInstallers = unstable_cache(
  async (limit = 10) => {
    const supabase = createServerClientAnon()
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .eq('tier', 'Gold')
      .order('total_safety_score', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching top installers:', error)
      return []
    }

    return data as Installer[]
  },
  ['top-installers'],
  { revalidate: 7200, tags: ['installers'] }
)

// Get NABCEP certified installers
export const getNABCEPInstallers = unstable_cache(
  async () => {
    const supabase = createServerClientAnon()
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .eq('nabcep_certified', true)
      .order('total_safety_score', { ascending: false })

    if (error) {
      console.error('Error fetching NABCEP installers:', error)
      return []
    }

    return data as Installer[]
  },
  ['nabcep-installers'],
  { revalidate: 86400, tags: ['installers'] }
)

// Get installers by tier
export const getInstallersByTier = unstable_cache(
  async (tier: 'Gold' | 'Silver' | 'Bronze' | 'Unranked') => {
    const supabase = createServerClientAnon()
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .eq('tier', tier)
      .order('total_safety_score', { ascending: false })

    if (error) {
      console.error('Error fetching installers by tier:', error)
      return []
    }

    return data as Installer[]
  },
  ['installers-by-tier'],
  { revalidate: 3600, tags: ['installers'] }
)

// Get premium/verified installers
export const getPremiumInstallers = unstable_cache(
  async () => {
    const supabase = createServerClientAnon()
    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .eq('verification_status', 'verified')
      .order('total_safety_score', { ascending: false })

    if (error) {
      console.error('Error fetching premium installers:', error)
      return []
    }

    return data as Installer[]
  },
  ['premium-installers'],
  { revalidate: 3600, tags: ['installers'] }
)

// Get installer count (total)
export const getInstallerCount = unstable_cache(
  async () => {
    const supabase = createServerClientAnon()
    const { count, error } = await supabase
      .from('installers')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error fetching installer count:', error)
      return 0
    }

    return count || 0
  },
  ['installer-count'],
  { revalidate: 7200, tags: ['installers'] }
)

// Get installers by multiple cities (for regional pages)
export const getInstallersByRegion = unstable_cache(
  async (cities: string[]) => {
    const supabase = createServerClientAnon()

    // Build OR query for multiple cities
    const cityConditions = cities.map(city => `location_city.ilike.${city.replace(/-/g, ' ')}`)

    const { data, error } = await supabase
      .from('installers')
      .select('*')
      .or(cityConditions.join(','))
      .order('total_safety_score', { ascending: false })

    if (error) {
      console.error('Error fetching installers by region:', error)
      return []
    }

    return data as Installer[]
  },
  ['installers-by-region'],
  { revalidate: 3600, tags: ['installers'] }
)

// Search installers by name or company
export const searchInstallers = async (query: string): Promise<Installer[]> => {
  const supabase = createServerClientAnon()

  const { data, error } = await supabase
    .from('installers')
    .select('*')
    .or(`company_name.ilike.%${query}%,name.ilike.%${query}%`)
    .order('total_safety_score', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error searching installers:', error)
    return []
  }

  return data as Installer[]
}
