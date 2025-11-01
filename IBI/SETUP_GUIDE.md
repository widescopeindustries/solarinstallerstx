# RepDirectory Setup Guide

This guide will walk you through setting up the RepDirectory application from scratch.

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name:** RepDirectory (or your preferred name)
   - **Database Password:** Create a strong password
   - **Region:** Choose closest to your users
4. Wait for the project to be created

### 1.2 Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL editor
5. Click **Run** to execute the schema

This will create:
- All necessary tables (companies, profiles, rep_companies, reviews)
- Row Level Security (RLS) policies
- Database functions and triggers
- Seed data with 10 sample companies

### 1.3 Get Your Supabase Credentials

1. Go to **Settings > API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
3. Go to **Settings > API > Service Role**
4. Copy the **service_role key** (⚠️ Keep this secret!)

### 1.4 Configure Authentication

1. Go to **Authentication > Providers** in Supabase
2. Enable **Email** provider (should be enabled by default)
3. Under **Email Templates**, you can customize:
   - Confirm signup email
   - Magic link email
   - etc.

## Step 2: Stripe Setup

### 2.1 Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete your account setup

### 2.2 Create a Product and Price

1. In Stripe Dashboard, go to **Products**
2. Click **Add product**
3. Fill in:
   - **Name:** RepDirectory PRO Subscription
   - **Description:** Monthly subscription for enhanced visibility
   - **Pricing:** Recurring
   - **Price:** $19.99 USD
   - **Billing period:** Monthly
4. Click **Save product**
5. Copy the **Price ID** (starts with `price_...`)

### 2.3 Get Your Stripe API Keys

1. Go to **Developers > API keys**
2. Copy your **Publishable key** (starts with `pk_test_...` or `pk_live_...`)
3. Copy your **Secret key** (starts with `sk_test_...` or `sk_live_...`)
   - ⚠️ Keep the secret key private!

### 2.4 Set Up Webhook (After Deployment)

You'll configure this after deploying your app. For now, note that you'll need:
- Webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
- Events to listen for:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

## Step 3: Environment Variables

1. In the project root (`IBI` folder), copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your actual values:

   ```env
   # Supabase (from Step 1.3)
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

   # Stripe (from Step 2.3)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx...
   STRIPE_SECRET_KEY=sk_test_xxx...
   STRIPE_WEBHOOK_SECRET=whsec_xxx... (you'll get this after setting up webhook)
   STRIPE_PRICE_ID=price_xxx... (from Step 2.2)

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change when deploying
   ```

## Step 4: Run Locally

1. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Step 5: Test the Application

### 5.1 Create a Representative Account

1. Click **Join as Rep** in the navigation
2. Fill in the signup form:
   - First Name: Jane
   - Last Name: Doe
   - Email: your-email@example.com
   - Password: (at least 6 characters)
3. Click **Create Account**
4. Check your email for a confirmation link
5. Click the confirmation link

### 5.2 Complete Your Profile

1. After confirming, you'll be redirected to the dashboard
2. Fill in your profile:
   - About Me (bio)
   - City, State, ZIP
   - Your Sales Website URL
   - Select companies you represent
3. Click **Save Changes**

### 5.3 Test Search

1. Go to the homepage
2. Search for a company (e.g., "Mary Kay")
3. You should see your profile in the results

### 5.4 Test Stripe Integration (Optional)

⚠️ **Important:** For local testing, use Stripe test mode and test card numbers.

1. In your dashboard, click **Subscribe Now**
2. You'll be redirected to Stripe Checkout
3. Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
4. Complete the checkout
5. You should be redirected back with PRO status

## Step 6: Deploy to Vercel

### 6.1 Push to GitHub

1. Create a new GitHub repository
2. Initialize git in your project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/rep-directory.git
   git push -u origin main
   ```

### 6.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (or `IBI` if nested)
5. Add all environment variables from `.env.local`
6. Click **Deploy**

### 6.3 Configure Stripe Webhook (Production)

1. Get your production URL from Vercel (e.g., `https://your-app.vercel.app`)
2. In Stripe Dashboard, go to **Developers > Webhooks**
3. Click **Add endpoint**
4. Enter webhook URL: `https://your-app.vercel.app/api/stripe/webhook`
5. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Click **Add endpoint**
7. Copy the **Signing secret** (starts with `whsec_...`)
8. Add it to your Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
9. Redeploy your app in Vercel

### 6.4 Update Production Environment Variables

In Vercel, update:
```env
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Troubleshooting

### Database Issues

**Problem:** "relation 'profiles' does not exist"
- **Solution:** Run the SQL schema in Supabase SQL Editor

**Problem:** Can't insert into profiles table
- **Solution:** Check that RLS policies are enabled and configured correctly

### Authentication Issues

**Problem:** Email confirmation not working
- **Solution:** Check Supabase email settings, ensure email provider is configured

**Problem:** Redirects not working after login
- **Solution:** Check that `NEXT_PUBLIC_APP_URL` is set correctly

### Stripe Issues

**Problem:** Stripe checkout not working
- **Solution:** Verify all Stripe environment variables are correct
- **Solution:** Check browser console for errors

**Problem:** Webhook not receiving events
- **Solution:** Ensure webhook URL is correct and accessible
- **Solution:** Verify webhook signing secret matches

## Next Steps

1. **Add Companies:** Add more companies to the `companies` table via Supabase
2. **Customize Branding:** Update colors in `tailwind.config.ts`
3. **Add Image Upload:** Implement profile picture upload using Supabase Storage
4. **Configure Email:** Set up custom email templates in Supabase
5. **Monitor:** Set up error tracking (e.g., Sentry)

## Support

If you run into issues:
1. Check the browser console for errors
2. Check Supabase logs in the dashboard
3. Check Stripe logs for webhook events
4. Review the README.md for additional documentation

## Security Checklist

Before going live:

- [ ] All environment variables are set in production
- [ ] Service role key is never exposed to the client
- [ ] RLS policies are enabled on all tables
- [ ] Stripe webhook secret is configured
- [ ] Email confirmation is required for new accounts
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented (consider Vercel Pro)
