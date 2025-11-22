import { createServerClientAnon } from '@/app/lib/supabase/server'
import { unstable_cache } from 'next/cache'
import { texasCities, getCityBySlug as getStaticCityBySlug, getAllCitySlugs as getStaticCitySlugs } from '@/data/texasCities'
import type { CityData } from '@/data/texasCities'

/**
 * Server-side city data utilities
 * Combines static city data with dynamic installer counts from database
 */

// Re-export static city utilities
export { texasCities, getCityBySlug, getAllCitySlugs } from '@/data/texasCities'
export type { CityData } from '@/data/texasCities'

// Get installer count per city (dynamic data with caching)
export const getInstallerCountByCity = unstable_cache(
  async (citySlug: string) => {
    const supabase = createServerClientAnon()
    const cityData = getStaticCityBySlug(citySlug)

    if (!cityData) {
      return 0
    }

    const { count, error } = await supabase
      .from('installers')
      .select('*', { count: 'exact', head: true })
      .ilike('location_city', cityData.name)

    if (error) {
      console.error('Error fetching installer count by city:', error)
      return 0
    }

    return count || 0
  },
  ['installer-count-by-city'],
  { revalidate: 7200, tags: ['installers'] }
)

// Get all cities with installer counts
export const getAllCitiesWithCounts = unstable_cache(
  async () => {
    const citySlugs = getStaticCitySlugs()
    const citiesWithCounts = await Promise.all(
      citySlugs.map(async (slug) => {
        const cityData = getStaticCityBySlug(slug)
        const count = await getInstallerCountByCity(slug)

        return {
          ...cityData!,
          installerCount: count,
        }
      })
    )

    return citiesWithCounts.sort((a, b) => b.installerCount - a.installerCount)
  },
  ['all-cities-with-counts'],
  { revalidate: 7200, tags: ['installers'] }
)

// Get top cities by installer count
export const getTopCitiesByInstallerCount = unstable_cache(
  async (limit = 10) => {
    const allCities = await getAllCitiesWithCounts()
    return allCities.slice(0, limit)
  },
  ['top-cities-by-installer-count'],
  { revalidate: 7200, tags: ['installers'] }
)

// Get cities by region
export const getCitiesByRegion = (region: string): CityData[] => {
  return Object.values(texasCities).filter(city => city.region === region)
}

// Get all regions
export const getAllRegions = (): string[] => {
  const regions = new Set<string>()
  Object.values(texasCities).forEach(city => {
    if (city.region) {
      regions.add(city.region)
    }
  })
  return Array.from(regions).sort()
}

// Get cities by population (sorted descending)
export const getCitiesByPopulation = (): CityData[] => {
  return Object.values(texasCities).sort((a, b) => {
    const popA = parseInt(a.population.replace(/,/g, ''))
    const popB = parseInt(b.population.replace(/,/g, ''))
    return popB - popA
  })
}

// Search cities by name
export const searchCities = (query: string): CityData[] => {
  const lowerQuery = query.toLowerCase()
  return Object.values(texasCities).filter(city =>
    city.name.toLowerCase().includes(lowerQuery) ||
    city.slug.toLowerCase().includes(lowerQuery) ||
    city.county?.toLowerCase().includes(lowerQuery)
  )
}

// Get major cities (population > 500k)
export const getMajorCities = (): CityData[] => {
  return Object.values(texasCities).filter(city => {
    const population = parseInt(city.population.replace(/,/g, ''))
    return population >= 500000
  })
}

// Get nearby cities (same region)
export const getNearbyCities = (citySlug: string): CityData[] => {
  const city = getStaticCityBySlug(citySlug)
  if (!city || !city.region) {
    return []
  }

  return Object.values(texasCities)
    .filter(c => c.region === city.region && c.slug !== citySlug)
    .slice(0, 5)
}
