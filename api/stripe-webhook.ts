import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!.trim(), {
  
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
);

// Disable body parsing, need raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return res.status(400).json({ error: 'Missing signature or webhook secret' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing checkout.session.completed:', session.id);

  const customerEmail = session.customer_email || session.customer_details?.email;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const tierName = session.metadata?.tierName || 'unknown';

  if (!customerEmail) {
    console.error('No customer email found in checkout session');
    return;
  }

  // Find installer by email
  const { data: installer, error: findError } = await supabase
    .from('installers')
    .select('id, name, email')
    .eq('email', customerEmail)
    .single();

  if (findError || !installer) {
    console.error('Installer not found for email:', customerEmail);
    // TODO: Send notification email to admin about orphaned payment
    return;
  }

  // Update installer record with subscription details
  const { error: updateError } = await supabase
    .from('installers')
    .update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      subscription_tier: tierName,
      subscription_status: 'active',
      subscription_start_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', installer.id);

  if (updateError) {
    console.error('Error updating installer subscription:', updateError);
    throw updateError;
  }

  console.log(`✅ Subscription activated for installer: ${installer.name} (${tierName})`);

  // TODO: Send welcome email with subscription details
  // TODO: Log event to analytics
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Processing customer.subscription.created:', subscription.id);

  const customerId = subscription.customer as string;

  // Get subscription price to determine tier
  const priceId = subscription.items.data[0]?.price.id;
  let tierName = 'unknown';

  // Map price IDs to tier names (you'll need to update these based on your actual price IDs)
  if (priceId === process.env.VITE_STRIPE_PRICE_BASIC) {
    tierName = 'basic';
  } else if (priceId === process.env.VITE_STRIPE_PRICE_PREMIUM) {
    tierName = 'premium';
  } else if (priceId === process.env.VITE_STRIPE_PRICE_ENTERPRISE) {
    tierName = 'enterprise';
  }

  // Update installer by Stripe customer ID
  const { error } = await supabase
    .from('installers')
    .update({
      stripe_subscription_id: subscription.id,
      subscription_tier: tierName,
      subscription_status: subscription.status,
      subscription_start_date: new Date((subscription.current_period_start || 0) * 1000).toISOString(),
      subscription_end_date: new Date((subscription.current_period_end || 0) * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Error updating installer subscription:', error);
    throw error;
  }

  console.log(`✅ Subscription created for customer: ${customerId} (${tierName})`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Processing customer.subscription.updated:', subscription.id);

  const customerId = subscription.customer as string;

  // Get new price to determine tier change
  const priceId = subscription.items.data[0]?.price.id;
  let tierName = 'unknown';

  if (priceId === process.env.VITE_STRIPE_PRICE_BASIC) {
    tierName = 'basic';
  } else if (priceId === process.env.VITE_STRIPE_PRICE_PREMIUM) {
    tierName = 'premium';
  } else if (priceId === process.env.VITE_STRIPE_PRICE_ENTERPRISE) {
    tierName = 'enterprise';
  }

  // Update subscription status and tier
  const { error } = await supabase
    .from('installers')
    .update({
      subscription_tier: tierName,
      subscription_status: subscription.status,
      subscription_end_date: new Date((subscription.current_period_end || 0) * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Error updating installer subscription:', error);
    throw error;
  }

  console.log(`✅ Subscription updated for customer: ${customerId} (${tierName}, ${subscription.status})`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Processing customer.subscription.deleted:', subscription.id);

  const customerId = subscription.customer as string;

  // Mark subscription as canceled
  const { error } = await supabase
    .from('installers')
    .update({
      subscription_status: 'canceled',
      subscription_end_date: new Date(subscription.ended_at ? subscription.ended_at * 1000 : Date.now()).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Error canceling installer subscription:', error);
    throw error;
  }

  console.log(`✅ Subscription canceled for customer: ${customerId}`);

  // TODO: Send cancellation confirmation email
  // TODO: Log churn event to analytics
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('Processing invoice.paid:', invoice.id);

  const customerId = invoice.customer as string;
  const subscriptionId = (invoice.subscription || "") as string;

  // Update last payment date
  const { error } = await supabase
    .from('installers')
    .update({
      last_payment_date: new Date((invoice.created || 0) * 1000).toISOString(),
      subscription_status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Error updating installer payment:', error);
    throw error;
  }

  console.log(`✅ Payment processed for customer: ${customerId}`);

  // TODO: Send receipt email
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Processing invoice.payment_failed:', invoice.id);

  const customerId = invoice.customer as string;

  // Mark subscription as past_due
  const { error } = await supabase
    .from('installers')
    .update({
      subscription_status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Error updating installer payment failure:', error);
    throw error;
  }

  console.log(`⚠️ Payment failed for customer: ${customerId}`);

  // TODO: Send payment failed notification email
  // TODO: Log failed payment to analytics
}
