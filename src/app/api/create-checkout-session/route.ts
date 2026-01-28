import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
    try {
        // Initialize Stripe only when the route is called (not at build time)
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

        if (!stripeSecretKey) {
            return NextResponse.json(
                { error: 'Stripe is not configured. Please contact support.' },
                { status: 500 }
            );
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2025-11-17.clover',
        });

        const formData = await request.formData();
        const priceId = formData.get('priceId') as string;

        if (!priceId) {
            return NextResponse.json(
                { error: 'Price ID is required' },
                { status: 400 }
            );
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://solarinstallerstx.com'}/upgrade-to-premium?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://solarinstallerstx.com'}/upgrade-to-premium?canceled=true`,
            billing_address_collection: 'required',
            allow_promotion_codes: true,
            ...(formData.get('email') ? { customer_email: formData.get('email') as string } : {}),
        });

        // Redirect to Stripe Checkout
        if (!session.url) {
            return NextResponse.json(
                { error: 'Failed to create checkout URL' },
                { status: 500 }
            );
        }

        return NextResponse.redirect(session.url, 303);
    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
