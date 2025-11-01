# RepDirectory - Direct Sales Representative Directory

A modern B2C platform connecting customers with direct sales representatives from companies like Mary Kay, Pampered Chef, Avon, and more.

## Features

### For Customers
- 🔍 Search for sales reps by company, location, or name
- 📍 Find reps near you by city, state, or ZIP code
- ⭐ Read reviews from other customers
- 💼 Browse representatives by company
- 📝 Submit reviews for representatives

### For Representatives
- 👤 Create and manage your public profile
- 🏢 Link to multiple companies you represent
- 💳 Upgrade to PRO for enhanced visibility
- 📊 Get featured on the homepage (PRO members)
- 🎯 Priority placement in search results (PRO members)
- 💰 Manage subscriptions via Stripe

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- A Stripe account

### 1. Clone and Install

```bash
cd IBI
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the schema from `supabase/schema.sql`
4. Get your project URL and anon key from Settings > API

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product with a recurring monthly price
3. Get your API keys from the Stripe dashboard
4. Set up a webhook endpoint pointing to `https://yourdomain.com/api/stripe/webhook`
5. Copy the webhook signing secret

### 4. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=your_stripe_price_id_for_pro_subscription

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

### Tables

#### `companies`
Stores all network marketing companies.

#### `profiles`
Public profiles for each representative. Linked to `auth.users`.

#### `rep_companies`
Join table linking representatives to companies (many-to-many).

#### `reviews`
Customer-submitted reviews for representatives.

See `supabase/schema.sql` for the complete schema with constraints and indexes.

## Key Routes

### Public Routes
- `/` - Homepage with search and featured content
- `/search` - Search results with filters
- `/rep/[profileId]` - Representative profile page
- `/companies` - Browse all companies
- `/companies/[slug]` - Company profile page with reps

### Authentication Routes
- `/auth/login` - Sign in for representatives
- `/auth/signup` - Create new rep account
- `/auth/callback` - OAuth callback handler

### Protected Routes
- `/dashboard` - Rep dashboard for profile management

### API Routes
- `/api/stripe/create-checkout-session` - Create Stripe checkout
- `/api/stripe/create-portal-session` - Create Stripe customer portal
- `/api/stripe/webhook` - Handle Stripe webhooks

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy

### Configure Stripe Webhook

After deployment, update your Stripe webhook endpoint to:
```
https://yourdomain.com/api/stripe/webhook
```

Select the following events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## Project Structure

```
IBI/
├── app/
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── companies/         # Company pages
│   ├── dashboard/         # Rep dashboard
│   ├── rep/               # Rep profile pages
│   ├── search/            # Search results
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/
│   ├── supabase/          # Supabase clients
│   └── types/             # TypeScript types
├── supabase/
│   └── schema.sql         # Database schema
└── middleware.ts          # Auth middleware
```

## Features to Add

### Short Term
- [ ] Image upload for profile pictures
- [ ] Email notifications
- [ ] Advanced search filters (radius search)
- [ ] Rep analytics dashboard

### Long Term
- [ ] Review moderation admin panel
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Chat/messaging between customers and reps

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT License - feel free to use this project for your own purposes.
