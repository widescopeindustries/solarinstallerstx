import { createServerClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

interface LeadData {
    email: string
    zipCode: string
    monthlyBill: number
    estimate?: {
        monthlySavings?: number
        annualSavings?: number
        systemSize?: number
        costBeforeTaxCredit?: number
        costAfterTaxCredit?: number
        paybackPeriod?: number
    }
    firstName?: string
    lastName?: string
    phone?: string
    tcpaConsent?: boolean
}

function generateLeadNotificationEmail(lead: LeadData & { firstName: string; lastName: string; phone: string }) {
    const monthlySavings = lead.estimate?.monthlySavings || 0
    const annualSavings = lead.estimate?.annualSavings || monthlySavings * 12
    const systemSize = lead.estimate?.systemSize || 'N/A'
    const costAfterCredit = lead.estimate?.costAfterTaxCredit || 'N/A'
    const paybackPeriod = lead.estimate?.paybackPeriod || 'N/A'

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1f2937; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
        .content { background-color: #f9fafb; padding: 30px 20px; border-radius: 0 0 8px 8px; }
        .lead-info { background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #f97316; }
        .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .info-row:last-child { border-bottom: none; }
        .info-label { font-weight: 600; color: #666; }
        .info-value { color: #1f2937; }
        .estimate-box { background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; }
        .estimate-title { font-weight: 700; font-size: 18px; margin-bottom: 15px; color: #1f2937; }
        .estimate-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .estimate-item { padding: 10px; background: #f3f4f6; border-radius: 4px; }
        .estimate-item-label { font-size: 12px; color: #6b7280; font-weight: 500; margin-bottom: 3px; }
        .estimate-item-value { font-size: 20px; font-weight: 700; color: #10b981; }
        .cta { text-align: center; margin-top: 20px; }
        .cta-button { display: inline-block; background-color: #f97316; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; }
        .footer { text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Solar Lead!</h1>
            <p>A homeowner is ready for their solar consultation</p>
        </div>

        <div class="content">
            <div class="lead-info">
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${lead.firstName} ${lead.lastName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value"><a href="mailto:${lead.email}">${lead.email}</a></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value"><a href="tel:${lead.phone}">${lead.phone}</a></span>
                </div>
                <div class="info-row">
                    <span class="info-label">ZIP Code:</span>
                    <span class="info-value">${lead.zipCode}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Monthly Bill:</span>
                    <span class="info-value">$${lead.monthlyBill.toFixed(2)}</span>
                </div>
            </div>

            <div class="estimate-box">
                <div class="estimate-title">📊 Solar Estimate</div>
                <div class="estimate-grid">
                    <div class="estimate-item">
                        <div class="estimate-item-label">Monthly Savings</div>
                        <div class="estimate-item-value">$${monthlySavings.toFixed(0)}</div>
                    </div>
                    <div class="estimate-item">
                        <div class="estimate-item-label">Annual Savings</div>
                        <div class="estimate-item-value">$${annualSavings.toFixed(0)}</div>
                    </div>
                    <div class="estimate-item">
                        <div class="estimate-item-label">System Size</div>
                        <div class="estimate-item-value">${typeof systemSize === 'number' ? `${systemSize.toFixed(1)} kW` : systemSize}</div>
                    </div>
                    <div class="estimate-item">
                        <div class="estimate-item-label">Cost (After 30% ITC)</div>
                        <div class="estimate-item-value">${typeof costAfterCredit === 'number' ? `$${costAfterCredit.toFixed(0)}` : costAfterCredit}</div>
                    </div>
                    <div class="estimate-item">
                        <div class="estimate-item-label">Payback Period</div>
                        <div class="estimate-item-value">${typeof paybackPeriod === 'number' ? `${paybackPeriod.toFixed(1)} yrs` : paybackPeriod}</div>
                    </div>
                </div>
            </div>

            <div class="cta">
                <a href="https://solarinstallerstx.com/admin" class="cta-button">View Lead in Admin Dashboard</a>
            </div>

            <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 15px; margin-top: 20px; font-size: 14px;">
                <strong>⚡ Next Steps:</strong> Review the lead, verify solar potential, and reach out to ${lead.firstName} to schedule a consultation.
            </div>
        </div>

        <div class="footer">
            <p>Solar Installers TX • Automated Lead Notification</p>
            <p>This is an automated email. Do not reply to this address.</p>
        </div>
    </div>
</body>
</html>
    `.trim()

    return html
}

function generateCustomerConfirmationEmail(lead: LeadData & { firstName: string }) {
    const monthlySavings = lead.estimate?.monthlySavings || 0
    const annualSavings = lead.estimate?.annualSavings || monthlySavings * 12

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; border-radius: 8px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background-color: #f9fafb; padding: 30px 20px; border-radius: 0 0 8px 8px; }
        .welcome { background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; }
        .highlight-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .highlight-box .amount { font-size: 32px; font-weight: 700; color: #10b981; margin: 10px 0; }
        .footer { text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>☀️ Thank You, ${lead.firstName}!</h1>
            <p>Your solar quote is ready</p>
        </div>

        <div class="content">
            <div class="welcome">
                <p>Thank you for using Solar Installers TX to get your personalized solar quote! We've analyzed your home's solar potential.</p>

                <div class="highlight-box">
                    <strong>Your Estimated Annual Savings:</strong>
                    <div class="amount">$${annualSavings.toFixed(0)}/year</div>
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">That's $${monthlySavings.toFixed(0)} every month for the next 25 years!</p>
                </div>

                <p><strong>What happens next?</strong></p>
                <p>One of our verified solar installers will contact you shortly to discuss your options and answer any questions about:</p>
                <ul>
                    <li>Customized system design for your roof</li>
                    <li>Federal tax credit (30% ITC) and Texas incentives</li>
                    <li>Financing options (cash, loan, lease, PPA)</li>
                    <li>Timeline and installation process</li>
                </ul>

                <p><strong>Why Solar Installers TX?</strong></p>
                <p>We only connect you with <strong>Safety Score verified installers</strong> — each one is vetted across 16 different criteria including licensing, insurance, warranties, and customer satisfaction.</p>

                <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0; font-size: 14px;">
                    <strong>Questions?</strong> Reply to this email or visit <a href="https://solarinstallerstx.com">solarinstallerstx.com</a> to learn more about how we score installers.
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Solar Installers TX • Your Trusted Texas Solar Directory</p>
            <p>This is an automated email. Do not reply to this address. For support, visit solarinstallerstx.com/contact</p>
        </div>
    </div>
</body>
</html>
    `.trim()

    return html
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, zipCode, monthlyBill, estimate, firstName, lastName, phone } = body as LeadData

        // 1. Validate required data
        if (!email || !zipCode || !monthlyBill) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const cleanFirstName = (firstName || 'Guest').trim()
        const cleanLastName = (lastName || 'User').trim()
        const cleanPhone = (phone || '000-000-0000').trim()

        // Use service role client to bypass RLS for inserting leads
        const supabase = createServerClient()

        // 2. Save lead to Supabase 'quote_requests' table
        const { error: dbError, data: leadData } = await supabase
            .from('quote_requests')
            .insert({
                first_name: cleanFirstName,
                last_name: cleanLastName,
                email: email,
                phone: cleanPhone,
                zip_code: zipCode,
                monthly_bill: parseFloat(monthlyBill.toString()),
                estimated_monthly_savings: estimate?.monthlySavings || 0,
                source: 'give-first-calculator',
                status: 'new'
            })
            .select()

        if (dbError) {
            console.error('Error saving lead to DB:', dbError)
            // Continue anyway - we still want to send emails
        }

        // Log to console for development
        console.log('🚀 NEW LEAD RECEIVED!')
        console.log(`Email: ${email}`)
        console.log(`Name: ${cleanFirstName} ${cleanLastName}`)
        console.log(`Phone: ${cleanPhone}`)
        console.log(`Zip: ${zipCode}`)
        console.log(`Bill: $${monthlyBill}`)
        console.log(`Est. Monthly Savings: $${estimate?.monthlySavings || 0}`)

        // 3. Send Emails
        const senderEmail = process.env.LEAD_NOTIFICATION_EMAIL || 'leads@solarinstallerstx.com'
        const recipientEmail = process.env.LEAD_NOTIFICATION_RECIPIENT || 'leads@solarinstallerstx.com'

        const leadWithName = { ...body as LeadData, firstName: cleanFirstName, lastName: cleanLastName, phone: cleanPhone }

        // Send notification email to sales team
        if (process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: senderEmail,
                    to: recipientEmail,
                    subject: `🚀 New Solar Lead: ${cleanFirstName} ${cleanLastName}`,
                    html: generateLeadNotificationEmail(leadWithName),
                    replyTo: email
                })
                console.log(`✅ Notification email sent to ${recipientEmail}`)
            } catch (emailError) {
                console.error('Error sending notification email:', emailError)
            }

            // Send confirmation email to customer
            try {
                await resend.emails.send({
                    from: senderEmail,
                    to: email,
                    subject: 'Your Solar Estimate is Ready ☀️',
                    html: generateCustomerConfirmationEmail(leadWithName)
                })
                console.log(`✅ Confirmation email sent to ${email}`)
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError)
            }
        } else {
            console.warn('⚠️ RESEND_API_KEY not configured - email notifications are disabled')
        }

        return NextResponse.json({ success: true, leadId: leadData?.[0]?.id })
    } catch (error) {
        console.error('Error processing lead:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
