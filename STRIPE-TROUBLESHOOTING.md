# Stripe Troubleshooting Guide

## Quick Diagnostic Steps

### 1. Check if Environment Variables are Loaded

Open browser console on https://solarinstallerstx.com/upgrade-to-premium and run:

```javascript
console.log('Stripe Key exists:', !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log('Stripe Key starts with pk_test:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test'));
```

**Expected:** Both should be `true`

### 2. Check API Endpoint

Open browser console and run:

```javascript
fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_1SPgKyF5wYDLl4DVwe16qGj2',
    tierName: 'Premium'
  })
})
.then(r => r.json())
.then(data => console.log('API Response:', data))
.catch(err => console.error('API Error:', err));
```

**Expected:** Should return `{ id: "cs_test_..." }` with a session ID

### 3. Check Vercel Function Logs

Go to: https://vercel.com/lyndon-bedford-s-projects/solarinstallerstx/logs

- Filter by: `/api/create-checkout-session`
- Look for errors or missing environment variables

### 4. Common Issues & Solutions

#### Issue: "Missing price ID" or "price_undefined"
**Solution:** Environment variables not loaded in production
```bash
cd /c/Users/molyndon/Documents/solarinstallerstx
npx vercel env pull .env.production
# Check if VITE_STRIPE_PRICE_BASIC, PREMIUM, ENTERPRISE are set
npx vercel env ls
```

#### Issue: "Stripe failed to load"
**Solution:** Publishable key not set
- Check: https://vercel.com/lyndon-bedford-s-projects/solarinstallerstx/settings/environment-variables
- Verify `VITE_STRIPE_PUBLISHABLE_KEY` is set for Production
- Must start with `pk_test_` or `pk_live_`

#### Issue: "Server error: 500"
**Solution:** Backend Stripe key issue
- Check Vercel logs for actual error
- Verify `STRIPE_SECRET_KEY` is set in Vercel (starts with `sk_test_` or `sk_live_`)
- Check if STRIPE_SECRET_KEY has spaces/newlines: `STRIPE_SECRET_KEY=sk_test_xxx` (no spaces)

#### Issue: Button clicks but nothing happens
**Solution:** Check browser console for JavaScript errors
- Open DevTools (F12)
- Go to Console tab
- Try clicking button again
- Look for red error messages

#### Issue: "Invalid API Key"
**Solution:** Stripe keys don't match (test vs live)
- All keys must be either ALL test mode OR ALL live mode
- Test keys: `pk_test_...`, `sk_test_...`, `price_test_...`
- Live keys: `pk_live_...`, `sk_live_...`, `price_...` (no test prefix)

### 5. Test with Stripe CLI (Local Testing)

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:5173/api/stripe-webhook

# In another terminal
cd /c/Users/molyndon/Documents/solarinstallerstx
npm run dev

# Test checkout in browser at http://localhost:5173/upgrade-to-premium
```

### 6. Verify Stripe Dashboard Setup

1. **Go to:** https://dashboard.stripe.com/test/products
2. **Check:** Do you see 3 products (Basic, Premium, Enterprise)?
3. **Check:** Each product should have a price with recurring billing
4. **Get Price IDs:** Click each product → Copy the price ID (starts with `price_`)
5. **Verify:** Price IDs in Vercel match Price IDs in Stripe Dashboard

### 7. Force Redeploy

Sometimes environment variables don't take effect immediately:

```bash
cd /c/Users/molyndon/Documents/solarinstallerstx
npx vercel --prod
```

### 8. Check Network Tab

1. Open DevTools (F12) → Network tab
2. Click "Upgrade to Premium" button
3. Look for request to `/api/create-checkout-session`
4. Check request payload and response

**Expected Request:**
```json
{
  "priceId": "price_1SPgKyF5wYDLl4DVwe16qGj2",
  "tierName": "Premium"
}
```

**Expected Response:**
```json
{
  "id": "cs_test_xxxxxxxxxxxxx"
}
```

## Current Configuration

**Environment Variables in Vercel:**
- ✅ VITE_STRIPE_PUBLISHABLE_KEY (Production)
- ✅ STRIPE_SECRET_KEY (Production)
- ✅ VITE_STRIPE_PRICE_BASIC (Production)
- ✅ VITE_STRIPE_PRICE_PREMIUM (Production)
- ✅ VITE_STRIPE_PRICE_ENTERPRISE (Production)
- ✅ STRIPE_WEBHOOK_SECRET (Production)

**Stripe Price IDs:**
- Basic: `price_1SPgKAF5wYDLl4DVwh8Ig1yi` ($99/mo)
- Premium: `price_1SPgKyF5wYDLl4DVwe16qGj2` ($199/mo)
- Enterprise: `price_1SPgLaF5wYDLl4DVzpfn5l6a` ($399/mo)

**API Endpoints:**
- Checkout: `https://solarinstallerstx.com/api/create-checkout-session` ✅ Deployed
- Webhook: `https://solarinstallerstx.com/api/stripe-webhook` ✅ Deployed

## Still Not Working?

### Manual Test Checkout

```bash
# Test API directly with curl
curl -X POST https://solarinstallerstx.com/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "priceId": "price_1SPgKyF5wYDLl4DVwe16qGj2",
    "tierName": "Premium"
  }'
```

**Expected:** JSON response with session ID

### Get Detailed Logs

```bash
cd /c/Users/molyndon/Documents/solarinstallerstx
npx vercel logs https://solarinstallerstx.com
```

Filter for errors and share the output.

## Quick Fix Checklist

- [ ] All environment variables set in Vercel Production
- [ ] Price IDs match Stripe Dashboard
- [ ] Publishable key starts with `pk_test_` or `pk_live_`
- [ ] Secret key starts with `sk_test_` or `sk_live_`
- [ ] Keys are test OR live (not mixed)
- [ ] No extra spaces/newlines in keys
- [ ] API endpoints return 405 for GET (correct behavior)
- [ ] Redeployed after adding environment variables
- [ ] Browser console shows no errors
- [ ] Network tab shows successful API call

## Contact Support

If still not working, provide:
1. Browser console screenshot
2. Network tab screenshot (showing API call)
3. Exact error message
4. Vercel function logs

This helps diagnose the specific issue quickly.
