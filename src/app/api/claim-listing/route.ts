import { createServerClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('installers')
    .select('id, company_name, location_city, location_state, tier, is_verified, subscription_status')
    .ilike('company_name', `%${query}%`)
    .limit(8)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ results: data || [] })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { installerId, email, firstName, lastName, phone } = body

    if (!installerId || !email || !firstName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Fetch current installer
    const { data: installer, error: fetchError } = await supabase
      .from('installers')
      .select('id, company_name')
      .eq('id', installerId)
      .single()

    if (fetchError || !installer) {
      return NextResponse.json({ error: 'Installer not found' }, { status: 404 })
    }

    // Update installer record
    const updateData: Record<string, unknown> = {
      email: email.toLowerCase(),
      name: `${firstName} ${lastName || ''}`.trim(),
    }

    const { error: updateError } = await supabase
      .from('installers')
      .update(updateData)
      .eq('id', installerId)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: 'Failed to save claim' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      installer: {
        id: installer.id,
        company_name: installer.company_name,
        profile_url: `https://solarinstallerstx.com/installer/${installer.id}`,
        badge_url: 'https://solarinstallerstx.com/badges/badge-verified.png',
      }
    })
  } catch (error) {
    console.error('Claim error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
