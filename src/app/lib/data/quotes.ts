import { createServerClientAnon } from '@/app/lib/supabase/server'
import { TablesInsert } from '@/app/lib/supabase/types'
import { headers } from 'next/headers'

interface CreateQuoteRequestInput {
  zipCode: string
  monthlyBill: number
  firstName: string
  lastName: string
  email: string
  phone: string
  source?: string
  roofType?: string
  shading?: string
  homeSize?: string
  roofAge?: string
  budget?: string
  timeline?: string
  financing?: string
  batteryStorage?: boolean
  monitoring?: boolean
  additionalInfo?: string
}

interface LogTCPAConsentInput {
  name: string
  phone: string
  email: string
  consentVersion: string
  consentText: string
  leadSource?: string
  quoteRequestId?: string
}

export async function createQuoteRequest(input: CreateQuoteRequestInput) {
  const supabase = createServerClientAnon()
  const headersList = await headers()

  // Get user agent and IP for tracking
  const userAgent = headersList.get('user-agent') || undefined
  const forwarded = headersList.get('x-forwarded-for')
  const ipAddress = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip')

  // Calculate estimated savings (simple formula)
  const estimatedMonthlySavings = Math.round(input.monthlyBill * 0.7) // ~70% savings
  const estimatedAnnualSavings = estimatedMonthlySavings * 12
  const estimatedSystemCost = Math.round(input.monthlyBill * 100) // Rough estimate
  const estimatedPaybackPeriod = Math.round(estimatedSystemCost / estimatedAnnualSavings)

  const quoteData: TablesInsert<'quote_requests'> = {
    zip_code: input.zipCode,
    monthly_bill: input.monthlyBill,
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phone,
    source: input.source || 'homepage_progressive_form',
    roof_type: input.roofType,
    shading: input.shading,
    home_size: input.homeSize,
    roof_age: input.roofAge,
    budget: input.budget,
    timeline: input.timeline,
    financing: input.financing,
    battery_storage: input.batteryStorage,
    monitoring: input.monitoring,
    additional_info: input.additionalInfo,
    estimated_monthly_savings: estimatedMonthlySavings,
    estimated_annual_savings: estimatedAnnualSavings,
    estimated_system_cost: estimatedSystemCost,
    estimated_payback_period: estimatedPaybackPeriod,
    user_agent: userAgent,
    ip_address: ipAddress,
    status: 'new',
  }

  const { data, error } = await supabase
    .from('quote_requests')
    .insert(quoteData)
    .select()
    .single()

  if (error) {
    console.error('Error creating quote request:', error)
    throw new Error('Failed to create quote request')
  }

  return data
}

export async function logTCPAConsent(input: LogTCPAConsentInput) {
  const supabase = createServerClientAnon()
  const headersList = await headers()

  // Get user agent, IP, referrer, and page URL for audit trail
  const userAgent = headersList.get('user-agent') || undefined
  const forwarded = headersList.get('x-forwarded-for')
  const ipAddress = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip')
  const referrer = headersList.get('referer') || undefined
  const pageUrl = headersList.get('referer') || undefined

  const consentData: TablesInsert<'tcpa_consent_logs'> = {
    name: input.name,
    phone: input.phone,
    email: input.email,
    consent_version: input.consentVersion,
    consent_text: input.consentText,
    consent_granted: true,
    consent_type: 'opt-in',
    lead_source: input.leadSource || 'quote_form',
    quote_request_id: input.quoteRequestId,
    user_agent: userAgent,
    ip_address: ipAddress,
    referrer: referrer,
    page_url: pageUrl,
  }

  const { data, error } = await supabase
    .from('tcpa_consent_logs')
    .insert(consentData)
    .select()
    .single()

  if (error) {
    console.error('Error logging TCPA consent:', error)
    throw new Error('Failed to log TCPA consent')
  }

  return data
}

export async function getQuoteRequestById(id: string) {
  const supabase = createServerClientAnon()

  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching quote request:', error)
    return null
  }

  return data
}
