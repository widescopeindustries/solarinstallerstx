import { permanentRedirect } from 'next/navigation'
import { createServerClientAnon } from "@/app/lib/supabase/server"
import { buildInstallerPath } from "@/lib/slugify"

// Use default nodejs runtime to avoid Edge bundle size limits (1MB) on Hobby plan

interface Props {
    params: Promise<{ id: string }>
}

export default async function RepRedirectPage({ params }: Props) {
    const { id } = await params

    // Safety check for UUID format to avoid database errors
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
        // If not a UUID, it might be a username or verified slug feature in the future
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

    // Generate canonical path
    const path = buildInstallerPath({
        id: installer.id,
        name: installer.name,
        company_name: installer.company_name,
        location_city: installer.location_city,
    })

    // Permanent redirect (301) to canonical URL
    permanentRedirect(path)
}
