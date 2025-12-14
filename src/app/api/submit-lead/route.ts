import { createServerClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, zipCode, monthlyBill, estimate, firstName, lastName, phone } = body

        // 1. Validate data
        if (!email || !zipCode || !monthlyBill) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Use service role client to bypass RLS for inserting leads
        const supabase = createServerClient()

        // 2. Save lead to Supabase 'quote_requests' table
        // We map the incoming data to the existing schema
        const { error: dbError } = await supabase
            .from('quote_requests')
            .insert({
                first_name: firstName || 'Guest',
                last_name: lastName || 'User',
                email: email,
                phone: phone || '000-000-0000', // Placeholder as it's required in schema
                zip_code: zipCode,
                monthly_bill: parseFloat(monthlyBill.toString()),
                estimated_monthly_savings: estimate?.monthlySavings || 0,
                source: 'give-first-calculator',
                status: 'new'
            })

        if (dbError) {
            console.error('Error saving lead to DB:', dbError)
            // We don't fail the request here, we still want to try sending email
        }

        // 3. Send Notification Email (Mock for now)
        // TODO: Install Resend or SendGrid to make this real
        console.log('------------------------------------------------')
        console.log('🚀 NEW LEAD RECEIVED!')
        console.log(`Email: ${email}`)
        console.log(`Name: ${firstName || 'Guest'} ${lastName || 'User'}`)
        console.log(`Phone: ${phone || 'N/A'}`)
        console.log(`Zip: ${zipCode}`)
        console.log(`Bill: $${monthlyBill}`)
        console.log(`Est. Savings: $${estimate?.monthlySavings}/mo`)
        console.log('------------------------------------------------')

        /*
        // Example Resend implementation:
        import { Resend } from 'resend';
        const resend = new Resend(process.env.RESEND_API_KEY);
    
        await resend.emails.send({
          from: 'Solar Installers TX <leads@solarinstallerstx.com>',
          to: ['your-email@example.com'],
          subject: `New Solar Lead: ${firstName} ${lastName}`,
          html: `<p>New lead received!</p>...`
        });
        */

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error processing lead:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
