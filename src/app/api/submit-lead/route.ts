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

        // 2. Save lead to Supabase
        // Note: You need a 'leads' table in Supabase. If you don't have one, this will fail silently or log error.
        // For now, we'll try to insert if the table exists, or just log it.

        // We'll assume a 'leads' table with JSONB 'data' column or specific columns
        const { error: dbError } = await supabase
            .from('leads')
            .insert({
                email,
                phone,
                first_name: firstName,
                last_name: lastName,
                zip_code: zipCode,
                monthly_bill: monthlyBill,
                estimated_savings: estimate,
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
        console.log(`Phone: ${phone}`)
        console.log(`Name: ${firstName} ${lastName}`)
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
