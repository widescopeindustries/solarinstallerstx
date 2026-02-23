import { NextRequest, NextResponse } from 'next/server'
import { createServerClientAnon } from '@/app/lib/supabase/server'
import { buildInstallerPath } from '@/lib/slugify'

export const runtime = 'nodejs'
export const revalidate = 3600

interface Props {
  params: Promise<{ id: string }>
}

function buildSVG(name: string, city: string, url: string): string {
  // Truncate name if too long
  const displayName = name.length > 22 ? name.slice(0, 21) + '…' : name
  const displayCity = city ? `${city}, TX` : 'Texas'

  return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80" viewBox="0 0 240 80" role="img" aria-label="Verified Texas Solar Installer: ${name} — SolarInstallersTX.com">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background + border -->
  <rect width="240" height="80" rx="10" fill="url(#bg)"/>
  <rect width="238" height="78" x="1" y="1" rx="9" fill="none" stroke="#f97316" stroke-width="1.5" stroke-opacity="0.7"/>

  <!-- Sun icon -->
  <g transform="translate(13, 16)">
    <circle cx="20" cy="20" r="20" fill="#f97316" opacity="0.12"/>
    <circle cx="20" cy="20" r="12" fill="#f97316"/>
    <circle cx="20" cy="20" r="8" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.5"/>
    <line x1="20" y1="2" x2="20" y2="6" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="20" y1="34" x2="20" y2="38" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="2" y1="20" x2="6" y2="20" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="34" y1="20" x2="38" y2="20" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="6.9" y1="6.9" x2="9.8" y2="9.8" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
    <line x1="30.2" y1="30.2" x2="33.1" y2="33.1" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
    <line x1="33.1" y1="6.9" x2="30.2" y2="9.8" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
    <line x1="9.8" y1="30.2" x2="6.9" y2="33.1" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- Green shield checkmark -->
  <g transform="translate(59, 22)">
    <path d="M10 0 L20 3.5 L20 11.5 C20 17 14.5 21.5 10 23 C5.5 21.5 0 17 0 11.5 L0 3.5 Z" fill="#22c55e" opacity="0.18"/>
    <path d="M10 1.5 L18.5 4.5 L18.5 11.5 C18.5 16.5 13.5 20.5 10 22 C6.5 20.5 1.5 16.5 1.5 11.5 L1.5 4.5 Z" fill="none" stroke="#22c55e" stroke-width="1.5"/>
    <polyline points="5,11.5 8.5,15.5 15,8" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Company name -->
  <text x="86" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">${displayName}</text>

  <!-- City -->
  <text x="86" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" font-size="10" font-weight="400" fill="#94a3b8">${displayCity}</text>

  <!-- Divider -->
  <line x1="86" y1="44" x2="232" y2="44" stroke="#f97316" stroke-width="0.75" opacity="0.4"/>

  <!-- VERIFIED INSTALLER label -->
  <text x="86" y="57" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" font-size="9.5" font-weight="700" fill="#22c55e" letter-spacing="0.8">✓ VERIFIED INSTALLER</text>

  <!-- Brand -->
  <text x="86" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" font-size="9" font-weight="600" fill="#f97316">SolarInstallers</text>
  <text x="172" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" font-size="9" font-weight="800" fill="#dc2626">TX</text>
  <text x="184" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" font-size="9" font-weight="400" fill="#64748b">.com</text>
</svg>`
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params

  // Fetch installer from Supabase
  const supabase = createServerClientAnon()
  const { data: installer, error } = await supabase
    .from('installers')
    .select('id, company_name, name, location_city, location_state')
    .eq('id', id)
    .single()

  let svg: string

  if (error || !installer) {
    // Return a generic "not found" badge
    svg = buildSVG('Solar Installer', 'Texas', 'https://solarinstallerstx.com')
  } else {
    const displayName = installer.company_name || installer.name
    const city = installer.location_city || ''
    const path = buildInstallerPath(installer as any)
    const url = `https://solarinstallerstx.com${path}`
    svg = buildSVG(displayName, city, url)
  }

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*', // Allow any installer website to embed it
    },
  })
}
