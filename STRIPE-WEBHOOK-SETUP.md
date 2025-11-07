# Stripe Webhook Setup Guide

## Overview
This guide covers the setup and configuration of Stripe webhooks for automatic subscription fulfillment on solarinstallerstx.com.

## What the Webhook Does

The webhook automatically handles subscription lifecycle events:

1. **Payment Completion** - Activates installer subscriptions immediately after successful payment
2. **Subscription Updates** - Tracks plan changes (upgrades/downgrades)
3. **Payment Failures** - Marks accounts as past_due when payments fail
4. **Cancellations** - Handles subscription cancellations gracefully
5. **Recurring Payments** - Updates payment dates for ongoing subscriptions

## Setup Instructions

### 1. Deploy the Webhook Endpoint

The webhook endpoint is already deployed at:
```
https://solarinstallerstx.com/api/stripe-webhook
```

This is automatically deployed via Vercel when you push to GitHub.

### 2. Configure Stripe Webhook

#### For Production (Live Mode):

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://solarinstallerstx.com/api/stripe-webhook`
4. Click "Select events"
5. Add these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
6. Click "Add endpoint"
7. Copy the "Signing secret" (starts with `whsec_`)
8. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

#### For Development/Testing (Test Mode):

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Follow same steps as above
3. Use the test mode signing secret in your local `.env` file

### 3. Add Environment Variable to Vercel

1. Go to: https://vercel.com/widescopeindustries/solarinstallerstx/settings/environment-variables
2. Add new variable:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_xxxxxxxxxxxxx` (from Stripe dashboard)
   - **Environment:** Production (and Preview if needed)
3. Click "Save"
4. Redeploy the site for changes to take effect

### 4. Verify Webhook is Working

#### Test with Stripe CLI (Local Development):
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/stripe-webhook
stripe trigger checkout.session.completed
```

#### Test in Production:
1. Create a test subscription using Stripe test cards
2. Use card number: `4242 4242 4242 4242`
3. Any future expiry date, any CVC
4. Check Stripe dashboard webhook logs for successful delivery
5. Verify installer record updated in Supabase

### 5. Apply Database Migration

The webhook requires new columns in the `installers` table:

```bash
# From project root
cd supabase
npx supabase db push

# Or apply manually in Supabase dashboard
```

Migration file: `supabase/migrations/20251104000001_add_stripe_subscription_fields.sql`

New columns added:
- `stripe_customer_id` - Links installer to Stripe customer
- `stripe_subscription_id` - Active subscription ID
- `subscription_tier` - Plan: basic, premium, enterprise
- `subscription_status` - Status: active, past_due, canceled
- `subscription_start_date` - When subscription started
- `subscription_end_date` - Current period end date
- `last_payment_date` - Most recent payment
- `email` - For customer matching

## How It Works

### Flow Diagram

```
Customer Checkout
      ↓
Stripe Payment
      ↓
checkout.session.completed event
      ↓
Webhook receives event
      ↓
Finds installer by email
      ↓
Updates installer record
      ↓
Subscription activated ✅
```

### Event Handlers

#### `checkout.session.completed`
- Triggered when customer completes payment
- Finds installer by email from checkout
- Updates installer with Stripe customer ID and subscription ID
- Sets subscription status to "active"
- Sets tier based on selected plan

#### `customer.subscription.created`
- Triggered when subscription is created
- Confirms subscription activation
- Updates subscription start/end dates

#### `customer.subscription.updated`
- Triggered when subscription changes (plan upgrade/downgrade)
- Updates tier and status
- Handles plan switches

#### `customer.subscription.deleted`
- Triggered when subscription is canceled
- Sets status to "canceled"
- Records cancellation date

#### `invoice.paid`
- Triggered on recurring payment success
- Updates last_payment_date
- Confirms subscription remains active

#### `invoice.payment_failed`
- Triggered when payment fails
- Sets status to "past_due"
- (Future: Send payment reminder email)

## Monitoring

### Stripe Dashboard
View webhook logs at:
- Production: https://dashboard.stripe.com/webhooks
- Test: https://dashboard.stripe.com/test/webhooks

### Vercel Logs
View serverless function logs at:
https://vercel.com/widescopeindustries/solarinstallerstx/logs

### Supabase
Query subscription statuses:
```sql
SELECT
  name,
  email,
  subscription_tier,
  subscription_status,
  subscription_start_date,
  subscription_end_date
FROM installers
WHERE subscription_status IS NOT NULL
ORDER BY subscription_start_date DESC;
```

## Troubleshooting

### Webhook Failing

1. **Check webhook secret is set in Vercel**
   - Go to Vercel environment variables
   - Verify `STRIPE_WEBHOOK_SECRET` exists

2. **Check Stripe dashboard webhook logs**
   - Look for error messages
   - Verify endpoint URL is correct

3. **Check Vercel function logs**
   - Look for runtime errors
   - Verify Supabase connection working

### Installer Not Updated

1. **Check email matching**
   - Installer email must match Stripe customer email
   - Verify installer has email in database

2. **Check database columns exist**
   - Run migration if not applied
   - Verify columns in Supabase table editor

3. **Check Supabase permissions**
   - Verify SERVICE_ROLE_KEY is set in Vercel
   - Check RLS policies allow updates

### Testing Webhook Locally

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward Stripe events
stripe listen --forward-to localhost:5173/api/stripe-webhook

# Terminal 3: Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_failed
```

## Security

✅ **Webhook signature verification** - Prevents fake requests
✅ **Environment variable protection** - Secrets not in code
✅ **Service role key** - Required for database updates
✅ **HTTPS only** - All webhook traffic encrypted
✅ **Row Level Security** - Database policies enforce access control

## Future Enhancements

- [ ] Email notifications (welcome, payment failed, cancellation)
- [ ] Analytics tracking for subscription events
- [ ] Slack notifications for high-value subscriptions
- [ ] Automatic retry logic for failed database updates
- [ ] Admin dashboard for subscription management
- [ ] Proration handling for plan changes
- [ ] Trial period support
- [ ] Coupon/discount code tracking

## Support

For issues or questions:
1. Check Stripe webhook logs first
2. Check Vercel function logs second
3. Review this documentation
4. Contact: [your-email@example.com]

## Related Documentation

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
