'use server'

import { z } from 'zod'
import { createQuoteRequest, logTCPAConsent } from '@/app/lib/data/quotes'
import { revalidatePath } from 'next/cache'
import {
  sanitizePhone,
  sanitizeTextInput,
  sanitizeNumericInput,
  isValidEmail,
  isValidZipCode,
  isTexasZipCode
} from '@/app/lib/security'

// Zod validation schemas for progressive form steps
const quoteSchemaStep1 = z.object({
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP code'),
})

const quoteSchemaStep2 = z.object({
  monthlyBill: z.number().min(0).max(10000),
  roofType: z.enum(['asphalt', 'metal', 'tile', 'flat', 'other']).optional(),
  shading: z.enum(['none', 'partial', 'significant']).optional(),
})

const quoteSchemaStep3 = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\d{10}$/, 'Valid 10-digit phone required'),
  tcpaConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted'
  }),
})

// Combined schema for final submission
const quoteSchemaFull = z.object({
  zipCode: z.string().regex(/^\d{5}$/),
  monthlyBill: z.number().min(0),
  roofType: z.string().optional(),
  shading: z.string().optional(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  tcpaConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to be contacted'
  }),
})

interface QuoteSubmissionResult {
  success: boolean
  message: string
  quoteId?: string
  errors?: Array<{ field: string; message: string }>
}

/**
 * Server Action: Submit full quote request
 * Called from the progressive form after all steps are completed
 */
export async function submitQuote(formData: FormData): Promise<QuoteSubmissionResult> {
  try {
    // Extract and validate data
    const rawData = {
      zipCode: formData.get('zipCode') as string,
      monthlyBill: Number(formData.get('monthlyBill')),
      roofType: formData.get('roofType') as string,
      shading: formData.get('shading') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      tcpaConsent: formData.get('tcpaConsent') === 'true',
    }

    // Validate with Zod
    const validatedData = quoteSchemaFull.parse(rawData)

    // SECURITY: Sanitize all inputs
    const sanitizedPhone = sanitizePhone(validatedData.phone)
    const sanitizedFirstName = sanitizeTextInput(validatedData.firstName, 50)
    const sanitizedLastName = sanitizeTextInput(validatedData.lastName, 50)
    const sanitizedEmail = validatedData.email.trim().toLowerCase()
    const sanitizedZipCode = validatedData.zipCode.trim()
    const sanitizedMonthlyBill = sanitizeNumericInput(validatedData.monthlyBill, 0, 10000)

    // Additional email validation
    if (!isValidEmail(sanitizedEmail)) {
      return {
        success: false,
        message: 'Invalid email address',
        errors: [{ field: 'email', message: 'Please provide a valid email address' }]
      }
    }

    // Create quote request in database
    const quote = await createQuoteRequest({
      zipCode: sanitizedZipCode,
      monthlyBill: sanitizedMonthlyBill,
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      roofType: validatedData.roofType,
      shading: validatedData.shading,
      source: 'homepage_progressive_form',
    })

    // TCPA Compliance: Log consent with full audit trail
    const tcpaConsentText = `By providing my phone number and submitting this form, I consent to receive calls, text messages, and prerecorded messages from SolarInstallersTX.com and its partner solar installers at the number provided (${sanitizedPhone}), even if my number is on a Do Not Call list. I understand that consent is not a condition of purchase and I may revoke consent at any time by emailing privacy@solarinstallerstx.com. Message and data rates may apply. Privacy Policy: https://solarinstallerstx.com/privacy`

    await logTCPAConsent({
      name: `${sanitizedFirstName} ${sanitizedLastName}`,
      phone: sanitizedPhone,
      email: sanitizedEmail,
      consentVersion: '2.0',
      consentText: tcpaConsentText,
      leadSource: 'homepage_progressive_form',
      quoteRequestId: quote.id,
    })

    // Revalidate relevant paths
    revalidatePath('/quote')
    revalidatePath('/admin')

    return {
      success: true,
      message: 'Quote request submitted successfully!',
      quoteId: quote.id,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      }
    }

    console.error('Quote submission error:', error)
    return {
      success: false,
      message: 'Failed to submit quote. Please try again or call us at (888) 555-SOLAR.',
    }
  }
}

/**
 * Server Action: Validate ZIP code (Step 1 validation)
 * Checks if ZIP is valid and provides feedback about Texas service area
 */
export async function validateZipCode(zipCode: string): Promise<{
  valid: boolean
  isTexas?: boolean
  message: string
}> {
  try {
    // Validate format
    quoteSchemaStep1.parse({ zipCode })

    // Check if it's a Texas ZIP code
    const isTexas = isTexasZipCode(zipCode)

    return {
      valid: true,
      isTexas,
      message: isTexas
        ? 'Great! We serve your area.'
        : 'We primarily serve Texas, but submit your request and we\'ll do our best to help!',
    }
  } catch {
    return {
      valid: false,
      message: 'Please enter a valid 5-digit ZIP code',
    }
  }
}

/**
 * Server Action: Calculate estimated savings (Step 2)
 * Provides quick estimate based on monthly bill
 */
export async function calculateSavings(monthlyBill: number): Promise<{
  success: boolean
  estimatedMonthlySavings?: number
  estimatedAnnualSavings?: number
  estimatedSystemCost?: number
  estimatedPaybackPeriod?: number
  message?: string
}> {
  try {
    // Validate monthly bill
    quoteSchemaStep2.parse({ monthlyBill })

    const sanitizedBill = sanitizeNumericInput(monthlyBill, 0, 10000)

    // Simple savings calculations
    const estimatedMonthlySavings = Math.round(sanitizedBill * 0.7) // ~70% savings
    const estimatedAnnualSavings = estimatedMonthlySavings * 12
    const estimatedSystemCost = Math.round(sanitizedBill * 100) // Rough estimate
    const estimatedPaybackPeriod = Math.round(estimatedSystemCost / estimatedAnnualSavings)

    return {
      success: true,
      estimatedMonthlySavings,
      estimatedAnnualSavings,
      estimatedSystemCost,
      estimatedPaybackPeriod,
    }
  } catch (error) {
    console.error('Savings calculation error:', error)
    return {
      success: false,
      message: 'Invalid monthly bill amount',
    }
  }
}
