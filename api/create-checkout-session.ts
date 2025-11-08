import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Validate required environment variable
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

const stripe = new Stripe(stripeSecretKey.trim(), {
  apiVersion: '2024-11-20.acacia',
});

interface StripeError extends Error {
  message: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, tierName } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin || 'https://solarinstallerstx.com'}/upgrade-to-premium?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://solarinstallerstx.com'}/upgrade-to-premium?canceled=true`,
      metadata: {
        tierName,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_email: undefined, // Let them enter email in checkout
    });

    return res.status(200).json({ id: session.id });
  } catch (error: unknown) {
    const stripeError = error as StripeError;
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: stripeError.message || 'Failed to create checkout session' });
  }
}
