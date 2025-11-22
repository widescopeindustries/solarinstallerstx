import { revalidateTag, revalidatePath } from 'next/cache'

/**
 * Cache revalidation utilities
 * Use these functions to invalidate Next.js cache when data changes
 */

// Revalidate all installer data
export function revalidateInstallers() {
  revalidateTag('installers')
  console.log('Revalidated all installer cache')
}

// Revalidate specific city page
export function revalidateCityPage(citySlug: string) {
  revalidatePath(`/cities/${citySlug}`)
  revalidateTag('installers') // City pages show installer data
  console.log(`Revalidated city page: ${citySlug}`)
}

// Revalidate specific installer page
export function revalidateInstallerPage(slug: string) {
  revalidatePath(`/installer/${slug}`)
  revalidateTag('installers')
  console.log(`Revalidated installer page: ${slug}`)
}

// Revalidate all city pages
export function revalidateAllCityPages() {
  revalidatePath('/cities/[city]')
  revalidateTag('installers')
  console.log('Revalidated all city pages')
}

// Revalidate installer directory
export function revalidateInstallerDirectory() {
  revalidatePath('/installers')
  revalidateTag('installers')
  console.log('Revalidated installer directory')
}

// Revalidate home page
export function revalidateHomePage() {
  revalidatePath('/')
  revalidateTag('installers')
  console.log('Revalidated home page')
}

// Revalidate blog posts
export function revalidateBlogPosts() {
  revalidatePath('/blog')
  revalidatePath('/blog/[slug]')
  console.log('Revalidated blog posts')
}

// Revalidate entire site (use sparingly)
export function revalidateEntireSite() {
  revalidatePath('/', 'layout') // Revalidate all pages
  console.log('Revalidated entire site')
}

// Revalidate after installer update
export function revalidateAfterInstallerUpdate(installer: {
  slug: string
  location_city?: string | null
}) {
  // Revalidate installer page
  revalidatePath(`/installer/${installer.slug}`)

  // Revalidate city page if city is set
  if (installer.location_city) {
    const citySlug = installer.location_city.toLowerCase().replace(/\s+/g, '-')
    revalidatePath(`/cities/${citySlug}`)
  }

  // Revalidate directory and home
  revalidatePath('/installers')
  revalidatePath('/')

  // Revalidate installer tag
  revalidateTag('installers')

  console.log(`Revalidated after installer update: ${installer.slug}`)
}

// Revalidate after new installer creation
export function revalidateAfterInstallerCreation(installer: {
  slug: string
  location_city?: string | null
}) {
  revalidateAfterInstallerUpdate(installer)
  console.log(`Revalidated after installer creation: ${installer.slug}`)
}

// Revalidate after installer deletion
export function revalidateAfterInstallerDeletion(installer: {
  slug: string
  location_city?: string | null
}) {
  revalidateAfterInstallerUpdate(installer)
  console.log(`Revalidated after installer deletion: ${installer.slug}`)
}
