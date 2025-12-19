import { permanentRedirect } from 'next/navigation'
import { createServerClientAnon } from "@/app/lib/supabase/server"
import { buildInstallerPath } from "@/lib/slugify"

export const runtime = 'edge' // Use edge runtime for fast redirects

interface Props {
  params: Promise<{ slug: string }>
}

/**
 * Legacy Installer URL Redirect Handler
 * 
 * This page handles old URLs in the format:
 *   /installer/company-name-uuid-uuid-uuid-uuid-uuid
 * 
 * It 301 redirects to the new clean URL format:
 *   /installers/[city]/[company-name]
 * 
 * This preserves SEO value from indexed pages while migrating to cleaner URLs.
 */
export default async function LegacyInstallerRedirect({ params }: Props) {
  const { slug } = await params

  // Extract UUID from slug (last 5 parts separated by -)
  // Example: "acme-solar-123e4567-e89b-12d3-a456-426614174000"
  // UUID parts: 123e4567-e89b-12d3-a456-426614174000
  const parts = slug.split('-')
  const id = parts.slice(-5).join('-')

  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) {
    // If not a valid UUID, redirect to main installers list
    permanentRedirect('/installers')
  }

  const supabase = createServerClientAnon()

  // Fetch installer by ID
  const { data: installer } = await supabase
    .from('installers')
    .select('id, name, company_name, location_city')
    .eq('id', id)
    .single()

  if (!installer) {
    // If ID not found, redirect to main installers list
    permanentRedirect('/installers')
  }

  // Generate canonical path using the clean URL format
  const path = buildInstallerPath({
    id: installer.id,
    name: installer.name,
    company_name: installer.company_name,
    location_city: installer.location_city,
  })

  // 301 Permanent redirect to new clean URL
  permanentRedirect(path)
}
