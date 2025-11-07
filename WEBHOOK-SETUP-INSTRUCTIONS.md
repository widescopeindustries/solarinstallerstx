# Stripe Webhook Setup - Next Steps

## Status: Ready to Configure

✅ **Completed:**
- React 19 upgrade
- Stripe webhook serverless function created (`api/stripe-webhook.ts`)
- Supabase migration applied (subscription fields added)
- All changes committed to `upgrade-dependencies-2025` branch

## ⚠️ **Manual Steps Required:**

### Step 1: Create Stripe Webhook Endpoint

1. **Go to Stripe Dashboard:**
   - Production: https://dashboard.stripe.com/webhooks
   - Test mode: https://dashboard.stripe.com/test/webhooks

2. **Click "Add endpoint"**

3. **Enter endpoint URL:**
   ```
   https://solarinstallerstx.com/api/stripe-webhook
   ```

4. **Select these events:**
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.paid`
   - ✅ `invoice.payment_failed`

5. **Click "Add endpoint"**

6. **Copy the "Signing secret"** (starts with `whsec_...`)

---

### Step 2: Add Secret to Vercel (Option A - Web Dashboard)

1. **Go to Vercel Environment Variables:**
   https://vercel.com/widescopeindustries/solarinstallerstx/settings/environment-variables

2. **Click "Add New"**

3. **Enter:**
   - **Key:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_xxxxxxxxxxxxx` (paste from Step 1)
   - **Environment:** ✅ Production (and optionally Preview)

4. **Click "Save"**

---

### Step 2: Add Secret to Vercel (Option B - CLI)

After getting the signing secret from Step 1, run:

```bash
cd /c/Users/molyndon/Documents/solarinstallerstx
npx vercel env add STRIPE_WEBHOOK_SECRET production
# Paste the whsec_... value when prompted
```

---

### Step 3: Deploy to Production

**Option A - Push to GitHub (Automatic Deploy):**
```bash
git push origin upgrade-dependencies-2025
# Then merge via GitHub PR
```

**Option B - Direct Vercel Deploy:**
```bash
npx vercel --prod
```

---

### Step 4: Verify Webhook is Working

1. **Test the webhook in Stripe Dashboard:**
   - Go to: https://dashboard.stripe.com/webhooks
   - Click on your webhook endpoint
   - Click "Send test webhook"
   - Select `checkout.session.completed`
   - Check the response (should be 200 OK)

2. **Check Vercel function logs:**
   https://vercel.com/widescopeindustries/solarinstallerstx/logs

3. **Do a real test:**
   - Go to: https://solarinstallerstx.com/upgrade-to-premium
   - Complete a test checkout using Stripe test card: `4242 4242 4242 4242`
   - Check if installer record is updated in Supabase

---

## Testing Locally (Optional)

To test the webhook locally before deploying:

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward Stripe webhooks to localhost
stripe listen --forward-to localhost:5173/api/stripe-webhook

# Terminal 3: Trigger test events
stripe trigger checkout.session.completed
```

---

## What the Webhook Does

- **Activates subscriptions** immediately after payment
- **Updates subscription status** (active, past_due, canceled)
- **Tracks payment dates** for recurring billing
- **Matches installers** by email to Stripe customers
- **Updates subscription tiers** (basic, premium, enterprise)

---

## Troubleshooting

### Webhook Returns 401/403
- Check that `STRIPE_WEBHOOK_SECRET` is set in Vercel
- Verify the secret matches what's in Stripe dashboard
- Redeploy after adding environment variable

### Installer Not Updated
- Check that installer email matches Stripe customer email
- Verify Supabase `SERVICE_ROLE_KEY` is set in Vercel
- Check Vercel function logs for errors

### Webhook Times Out
- Check Supabase connection (may need to whitelist Vercel IPs)
- Verify `VITE_SUPABASE_URL` and related env vars are set

---

## Reference Files

- **Webhook function:** `api/stripe-webhook.ts`
- **Database migration:** `supabase/migrations/20251104000001_add_stripe_subscription_fields.sql`
- **Detailed setup guide:** `STRIPE-WEBHOOK-SETUP.md`
- **Package upgrades:** `UPGRADE-SUMMARY.md`

---

## Quick Command Reference

```bash
# Check environment variables
npx vercel env ls

# Add environment variable
npx vercel env add STRIPE_WEBHOOK_SECRET production

# Deploy to production
npx vercel --prod

# View logs
npx vercel logs

# Test Stripe webhook locally
stripe listen --forward-to localhost:5173/api/stripe-webhook
```

---

**Once you complete Steps 1-3, the webhook will be fully operational! 🎉**
