# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# Solar Installers TX - Claude Code Documentation

This document provides comprehensive guidance for Claude Code instances working on the solarinstallerstx.com codebase.

## Project Overview

**Solar Installers TX** is a Texas-based solar installer directory and comparison platform built with modern web technologies. The site features a sophisticated **100-point Safety Scoring System** that automatically evaluates and ranks solar installers across 16 data points in 4 categories.

### Technology Stack

- **Frontend**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **UI Components**: shadcn/ui component library (Radix UI based)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS 3.4
- **State Management**: React Query (TanStack Query 5.8)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Maps**: Mapbox GL with react-map-gl
- **Payments**: Stripe (live mode - real payments active)
- **Deployment**: Vercel (serverless functions)

---

## Quick Start Commands

### Development

```bash
# Install dependencies
npm install

# Start development server (typically runs on http://localhost:5174)
npm run dev

# Run linting
npm lint

# Run tests
npm test              # Watch mode
npm run test:run      # Single run
npm run test:ui       # Vitest UI interface
npm run test:coverage # Generate coverage report
```

### Production

```bash
# Build for production
npm run build

# Preview production build locally
npm preview
```

### Database & Migrations

```bash
# List all migrations
npx supabase migration list

# Push pending migrations to database
npx supabase db push

# Regenerate TypeScript types from database schema
npx supabase gen types typescript --project-id ryinjghimmyisvttfibi > src/integrations/supabase/types.ts
```

### Scripts

```bash
# Generate sitemap and installer routes (run before build)
npm run generate-sitemap
npm run generate-installer-routes

# Optimize images and performance (run before build)
npm run optimize-images
npm run optimize-performance

# Run TypeScript scripts
npx tsx scripts/[script-name].ts
```

---

## Architecture Overview

### Frontend Structure

```
src/
├── components/          # React components
│   ├── SafetyScoreManager.tsx    # Admin UI for managing safety scores
│   ├── InstallerCard.tsx          # Card component for installer display
│   ├── InstallerListCard.tsx      # List view variant
│   ├── FilterBar.tsx              # Safety tier filtering
│   ├── Header.tsx                 # Navigation
│   ├── Footer.tsx                 # Footer
│   └── ui/                        # shadcn/ui components
├── pages/               # Route pages
│   ├── Index.tsx                  # Home page
│   ├── Installers.tsx             # Installer directory page
│   ├── InstallerDetail.tsx        # Individual installer profile
│   ├── Admin.tsx                  # Admin dashboard
│   ├── SafetyScoreExplained.tsx   # Safety score explanation page
│   └── ...
├── integrations/        # External service integrations
│   └── supabase/
│       ├── client.ts              # Supabase client configuration
│       └── types.ts               # Auto-generated TypeScript types
├── contexts/            # React context providers
│   └── AuthContext.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── data/                # Static data files
├── assets/              # Images and other assets
└── App.tsx              # Main app component with routing
```

### Routing Structure

The app uses React Router v6 with **lazy-loaded pages for code splitting**. Critical pages (Index, NotFound) are loaded immediately, all others are lazy-loaded with React.lazy() and Suspense.

**Core Routes:**
- `/` - Home page (eagerly loaded)
- `/installers` - Installer directory with tier filtering
- `/installer/:slug` - Individual installer profile
- `/admin` - Admin panel (SafetyScoreManager)
- `/upgrade-to-premium` - **Live Stripe checkout page** (real payments)
- `/premium` - Old pricing page (not used - redirect to /upgrade-to-premium)
- `/quote` - Quote request form / list your business
- `/safety-score-explained` - Educational page about scoring

**City Pages:** `/cities/:city` - 45+ Texas city-specific pages
**Guide Pages:** `/guides/:slug` - SEO content pages
**Blog:** `/blog`, `/blog/:slug` - Blog posts

**Lazy Loading Pattern:**
```typescript
// Critical pages loaded immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// All others lazy-loaded
const Installers = lazy(() => import("./pages/Installers"));
const InstallerDetail = lazy(() => import("./pages/InstallerDetail"));
```

### API Routes (Vercel Serverless Functions)

Located in `api/` directory (Vercel convention):

- `/api/create-checkout-session` - Creates Stripe checkout sessions for subscriptions
  - **IMPORTANT**: Uses `process.env.STRIPE_SECRET_KEY.trim()` to handle potential trailing newlines
  - Supports 3 tiers: Basic ($99), Premium ($199), Enterprise ($399)
  - Returns checkout session ID for client-side redirect

---

## Safety Score System (CRITICAL)

The Safety Scoring System is the core differentiator of this platform. It automatically calculates and updates scores whenever installer data changes.

### Scoring Methodology

**Total: 100 points** divided into 4 categories:

#### 1. Financial Stability (30 points)

- Insurance Coverage (10 pts): Active general liability insurance
- Bonding Status (10 pts): Bonded business license
- Bankruptcy History (10 pts): No bankruptcy records

#### 2. Professional Credentials (25 points)

- NABCEP Certification (15 pts): North American Board of Certified Energy Practitioners
- State License (5 pts): Valid solar/electrical license in Texas
- Master Electrician (5 pts): Additional master electrician qualification

#### 3. Customer Protection (25 points)

- Warranty Details (10 pts): Equipment and workmanship warranties in place
- BBB Rating (10 pts): A+ (10 pts), A (8 pts), B (5 pts)
- Complaint History (5 pts): No unresolved complaints

#### 4. Track Record (20 points)

- Years in Business (10 pts): 10+ years (10 pts), 5-10 years (5 pts)
- Installations Completed (5 pts): 1000+ installations
- Customer Ratings (5 pts): Average rating 4.5+ stars

### Automatic Tier Calculation

Tiers are automatically calculated based on total safety score:

- **Gold Tier**: 85-100 points - Premium, highly qualified installers
- **Silver Tier**: 70-84 points - Well-qualified with strong credentials
- **Bronze Tier**: 60-69 points - Adequate credentials and experience
- **Unranked**: <60 points - Insufficient data or new installers

### How It Works

The scoring is **automatically calculated** via a PostgreSQL database trigger:

1. When an installer record is inserted or updated
2. The `calculate_safety_score()` trigger function runs
3. All 16 data points are evaluated
4. `total_safety_score` and `tier` columns are updated
5. Results display immediately on all UI components

### Key Database Columns

```sql
total_safety_score INT          -- Calculated score (0-100)
tier TEXT                       -- Tier badge (Gold/Silver/Bronze/Unranked)
verification_status TEXT        -- verified/unverified
insurance_coverage JSONB        -- {provider, general_liability, workers_comp}
bonding_status TEXT             -- bonded/not_bonded
bankruptcy_history JSONB        -- {has_bankruptcy, dates, details}
nabcep_certified BOOLEAN        -- NABCEP certification flag
state_licensed BOOLEAN          -- State license flag
master_electrician BOOLEAN      -- Master electrician flag
warranty_details JSONB          -- {equipment, workmanship, performance}
bbb_rating TEXT                 -- A+/A/B/C
complaint_history JSONB         -- {count, details, status}
years_in_business INT           -- Years operating
installations_completed INT     -- Number of completed projects
customer_ratings JSONB          -- {average_rating, total_reviews}
red_flags TEXT[]                -- Array of flags/concerns
```

### Display Components

- **SafetyScoreManager.tsx** - Admin interface to manage scores
  - Search and select installers
  - Edit all 16 data points
  - Scores update automatically on save

- **InstallerCard.tsx** - Card display with tier badge
  - Shows company name, location, contact
  - Displays tier badge (Gold/Silver/Bronze)
  - Shows total score

- **InstallerListCard.tsx** - List view variant
  - More compact display
  - Tier badge prominent

- **FilterBar.tsx** - Tier filtering on /installers page
  - Filter by Gold/Silver/Bronze/Unranked tiers
  - Real-time filtering of results

---

## Database Schema & Migrations

### Migration Files

All migrations are versioned with timestamps and stored in `supabase/migrations/`:

| File | Purpose |
|------|---------|
| `20251103000001_fix_safety_scoring_system.sql` | Adds all safety score columns and trigger function |
| `20251103000002_add_safety_score_indexes.sql` | Performance indexes on safety columns |
| `20251102000000_create_quote_requests.sql` | Quote request form storage |
| `20251102000001_create_tcpa_consent_logs.sql` | TCPA compliance logging |
| Earlier migrations | Installer table, NABCEP data, etc. |

### Key Tables

**installers**
- Core installer information (name, company, location, contact)
- NABCEP certification details
- Safety score data (16 fields)
- Tier designation
- Premium/verified flags

**quote_requests**
- Lead management for quote requests
- GDPR/TCPA compliance tracking

**tcpa_consent_logs**
- TCPA compliance logging for phone contact

### Running Migrations

```bash
# Check status
npx supabase migration list

# Apply pending migrations
npx supabase db push

# After changes to schema, regenerate types
npx supabase gen types typescript --project-id ryinjghimmyisvttfibi > src/integrations/supabase/types.ts
```

---

## Environment Variables

### Required Variables (in .env)

```
# Supabase
VITE_SUPABASE_URL=https://ryinjghimmyisvttfibi.supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
VITE_SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# Mapbox
VITE_MAPBOX_TOKEN=[your-mapbox-token]

# Stripe (LIVE MODE - Real payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PRICE_BASIC=price_...  # $99/month
VITE_STRIPE_PRICE_PREMIUM=price_... # $199/month
VITE_STRIPE_PRICE_ENTERPRISE=price_... # $399/month
```

### Important Notes

- **VITE_ prefix is REQUIRED** for browser-accessible variables - This tells Vite to expose variables to the browser
- Use `import.meta.env.VITE_SUPABASE_URL` (Vite syntax), NOT `process.env` (Node.js syntax)
- **Server-only vars** (no VITE_ prefix): STRIPE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY - only accessible in API routes/scripts
- Public keys are safe to expose in browser (VITE_STRIPE_PUBLISHABLE_KEY, VITE_SUPABASE_ANON_KEY)
- **CRITICAL**: Stripe is in LIVE MODE - real payments are being processed
- Never commit .env to version control
- When adding env vars to Vercel, use PowerShell with `-NoNewline` to avoid trailing newlines:
  ```powershell
  Set-Content -Path temp.txt -Value 'your-key-here' -NoNewline
  cat temp.txt | vercel env add VAR_NAME production
  ```

### Vite Environment Access

```typescript
// Correct - Vite syntax
const url = import.meta.env.VITE_SUPABASE_URL;

// Incorrect - Node.js syntax (won't work in Vite)
const url = process.env.VITE_SUPABASE_URL;  // undefined
```

---

## Scripts

All scripts are TypeScript and located in `scripts/` directory. Run with `npx tsx`:

### Data Management Scripts

**create-test-installers.ts**
```bash
npx tsx scripts/create-test-installers.ts
```
Creates 20 test installers with realistic safety scores for development/testing.

**import-installers-csv.ts**
```bash
npx tsx scripts/import-installers-csv.ts
```
Import installer data from CSV file:
- Expects columns: name, company_name, phone, location_city, location_state, etc.
- Creates records in installers table
- Optional safety score population

**populate-safety-scores.ts**
```bash
npx tsx scripts/populate-safety-scores.ts
```
Add reasonable default safety scores to existing installers:
- NABCEP certified → higher defaults (~85-90 points)
- Non-NABCEP → modest defaults (~60-70 points)
- Useful when importing installers without initial scores

**check-installer-count.ts**
```bash
npx tsx scripts/check-installer-count.ts
```
Quick verification of installer counts and score distribution.

**check-safety-columns.ts**
```bash
npx tsx scripts/check-safety-columns.ts
```
Verify all safety score columns exist in database.

### Build & Generation Scripts

**generate-sitemap.ts**
```bash
npm run generate-sitemap
```
Creates sitemap.xml for SEO. Automatically runs in npm run build prebuild phase.

**generate-installer-routes.ts**
```bash
npm run generate-installer-routes
```
Generates installer-routes.json with all installer slugs for pre-rendering. Runs in prebuild.

**optimize-images.js** & **optimize-performance.js**
```bash
npm run optimize-images
npm run optimize-performance
```
Image optimization and performance improvements. Run before production build.

---

## Common Development Tasks

### Adding a New Installer

1. **Via Admin UI** (easiest):
   - Navigate to `/admin`
   - Use SafetyScoreManager to add installer
   - Fill in all fields including safety data points
   - Save - scores auto-calculate

2. **Via Database**:
   - Insert into installers table
   - Include core fields: name, company_name, location_city, location_state, phone, country
   - Fill in safety data columns
   - Trigger automatically calculates score and tier

### Updating Safety Scores

1. Go to `/admin`
2. Search for installer by name
3. Edit the 16 data points:
   - Checkboxes: nabcep_certified, state_licensed, master_electrician
   - Dropdowns: bonding_status, bbb_rating, verification_status
   - Text fields: insurance_coverage, warranty_details, complaint_history, bankruptcy_history, customer_ratings, red_flags, years_in_business, installations_completed
4. Save - scores update automatically
5. Refresh to see new tier badge

### Filtering by Safety Tier

On `/installers` page:
- Click tier filter buttons: Gold, Silver, Bronze, Unranked
- Displays only installers in selected tier(s)
- Counts update in real-time

### Creating a New Database Migration

1. Create new SQL file in `supabase/migrations/`
2. Filename format: `YYYYMMDDHHMMSS_description.sql`
3. Example: `20251104120000_add_new_feature.sql`
4. Write migration SQL with `IF NOT EXISTS` checks to prevent errors
5. Test locally: `npx supabase db push`
6. Regenerate types after structural changes

Example migration structure:
```sql
-- Add new column with safety check
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='installers' AND column_name='new_field') THEN
    ALTER TABLE installers ADD COLUMN new_field TYPE;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_installers_new_field ON installers(new_field);
```

### Regenerating TypeScript Types

After modifying database schema:

```bash
npx supabase gen types typescript --project-id ryinjghimmyisvttfibi > src/integrations/supabase/types.ts
```

This auto-generates `src/integrations/supabase/types.ts` with full TypeScript support for all tables and columns.

### Testing Safety Scoring

1. Create test installers: `npx tsx scripts/create-test-installers.ts`
2. View on `/installers` page - should see Gold/Silver/Bronze tiers
3. Use admin UI to edit scores - tiers should update automatically
4. Check database: `SELECT id, company_name, total_safety_score, tier FROM installers LIMIT 10;`

---

## File Organization & Key Components

### Components Directory (`src/components/`)

**Safety & Scoring**
- `SafetyScoreManager.tsx` - Admin UI for managing safety scores
- `InstallerCard.tsx` - Card display with tier badge
- `InstallerListCard.tsx` - List variant
- `FilterBar.tsx` - Tier filtering

**Installer Display**
- `InstallerProfile.tsx` - Full installer details page
- `InstallerDashboard.tsx` - Installer dashboard view
- `InstallerSchema.tsx` - JSON-LD schema for SEO
- `NABCEPInstallers.tsx` - NABCEP certified only view
- `TopInstallers.tsx` - Featured/top installers
- `FeaturedInstallerCard.tsx` - Featured display

**Core Layout**
- `Header.tsx` - Navigation
- `Footer.tsx` - Footer
- `SEOHead.tsx` - Meta tags management
- `ErrorBoundary.tsx` - Error handling

**Utilities & Features**
- `SolarCalculator.tsx` - ROI calculator
- `ServiceAreaMap.tsx` - Map display
- `TrustSignals.tsx` - Trust badges/signals
- `NewsletterSignup.tsx` - Email signup
- `CookieConsent.tsx` - GDPR compliance

### Pages Directory (`src/pages/`)

**Core Pages**
- `Index.tsx` - Home page
- `Installers.tsx` - Directory listing (with tier filtering)
- `InstallerDetail.tsx` - Individual installer profile

**Admin & Management**
- `Admin.tsx` - Admin dashboard

**Education & Content**
- `SafetyScoreExplained.tsx` - How scoring works
- `Learn.tsx` - Learning resources
- `FAQ.tsx` - Frequently asked questions
- `Blog.tsx`, `BlogPost.tsx` - Blog functionality
- `TexasGuide.tsx`, `TexasSolarIncentives.tsx`, etc. - Informational content

**Legal & Auth**
- `Privacy.tsx` - Privacy policy
- `Terms.tsx` - Terms of service
- `Refund.tsx` - Refund policy
- `Auth.tsx` - Authentication pages

### Integrations (`src/integrations/supabase/`)

**client.ts**
- Initializes Supabase client
- Validates environment variables
- Exports singleton `supabase` instance

**types.ts** (auto-generated)
- TypeScript definitions for all tables
- Updated with: `npx supabase gen types typescript --project-id ryinjghimmyisvttfibi > src/integrations/supabase/types.ts`
- Use these types for `Database['public']['Tables']['installers']['Row']` etc.

---

## Styling & Theme

### Tailwind CSS

- Configuration: `tailwind.config.ts`
- All components use Tailwind utility classes
- Custom colors defined in config
- Responsive design with `sm:`, `md:`, `lg:`, `xl:` prefixes

### shadcn/ui Components

All UI components from shadcn/ui in `src/components/ui/` (40+ components):

**Form Components:**
- Button, Input, Select, Textarea
- Form, Checkbox, Radio, Switch
- Label, Slider, Toggle

**Layout Components:**
- Card, Dialog, Sheet, Drawer
- Tabs, Accordion, Collapsible
- Separator, ScrollArea

**Feedback Components:**
- Badge, Alert, Skeleton
- Toast, Progress, Spinner

**Navigation:**
- DropdownMenu, NavigationMenu, Breadcrumb

These are customizable Radix UI primitives with Tailwind styling. They provide accessibility out of the box (ARIA labels, keyboard navigation, focus management).

**Usage Pattern:**
```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>
    <Button variant="default">Click Me</Button>
  </CardContent>
</Card>
```

### Theme Colors

- Primary: Blue tones for main CTA
- Secondary: Neutral grays
- Success: Green (for Gold tier)
- Warning: Amber (for Bronze tier)
- Destructive: Red (for errors/red flags)

**Tailwind Configuration:**
- Dark mode: Disabled (saves 15-20KB in bundle size)
- HSL color system for easy theming
- Safelist for dynamically generated classes
- Custom animations (accordion-down, accordion-up)

---

## State Management Architecture

### Modern Server-First Pattern

This project uses a **modern state management approach** that separates server state from client state:

**1. Server State (TanStack Query / React Query)**
- Used for: Installer data, quotes, database queries
- Benefits: Automatic caching, background refetching, optimistic updates
- No need for Redux/Zustand for server data

```typescript
// Example: Fetching installers with automatic caching
const { data: installers, isLoading } = useQuery({
  queryKey: ['installers'],
  queryFn: async () => {
    const { data } = await supabase.from('installers').select('*');
    return data;
  }
});
```

**2. Client State (React Local State & Context)**
- Used for: UI state (modals, forms, filters)
- Auth state in AuthContext
- No global store needed for most UI state

**3. URL State (React Router)**
- Used for: Search filters, pagination, sorting
- Enables shareable URLs and browser history

**When to Use What:**
- Database data → React Query
- Auth → Context API
- Forms → Local state + React Hook Form
- UI toggles → Local state
- URL params → React Router's useSearchParams

---

## Performance Optimizations

### Code Splitting

- Pages are lazy-loaded with `lazy()` and `Suspense`
- Only critical pages loaded immediately (Index, NotFound)
- Reduces initial bundle size

### Build Optimization

Vite configuration in `vite.config.ts` includes sophisticated manual chunk splitting:

**Manual Chunk Strategy:**
- `react-core`: React, ReactDOM, React Router (~150KB)
- `ui-radix`: All Radix UI components (~100KB)
- `icons`: Lucide icons (~50KB)
- `data`: Supabase + TanStack Query (~80KB)
- `ui-utils`: Tailwind merge, class utilities (~20KB)

**Additional Optimizations:**
- CSS code splitting per page (reduces initial CSS load)
- Terser minification with `drop_console: true` (removes console logs in production)
- Asset fingerprinting with content hashing
- Module deduplication for React packages
- Tree-shaking for unused code elimination

### Image Optimization

- `OptimizedImage.tsx` component for lazy loading
- `npm run optimize-images` pre-build step
- Responsive images with srcset

### Database Optimization

- Indexes on frequently queried columns (safety_score, tier, location)
- Migration `20251103000002_add_safety_score_indexes.sql` adds these

---

## Testing & Debugging

### Testing Framework (Vitest)

The project uses **Vitest** for unit and integration testing:

```bash
npm test              # Watch mode - reruns on file changes
npm run test:run      # Single run - CI/CD mode
npm run test:ui       # Browser UI for interactive testing
npm run test:coverage # Generate HTML coverage report
```

**Configuration** (vitest.config.ts):
- Environment: jsdom (simulates browser DOM)
- Globals enabled (no need to import describe/test/expect)
- Setup file: `src/test/setup.ts`
- Coverage provider: v8

**Coverage Exclusions:**
- `node_modules/`
- `src/test/`
- Config files (*.config.ts)
- Type definition files (*.d.ts)

### Development Server

```bash
npm run dev
```

- Runs on `http://localhost:5174` (typically)
- Hot module replacement (HMR) enabled
- Full source maps for debugging
- Fast refresh for React components

### Type Checking

TypeScript is strict - types must match or TypeScript compilation fails.

```typescript
// Type-safe Supabase query
const { data, error } = await supabase
  .from('installers')
  .select('*')
  .eq('tier', 'Gold');

// data has type: Database['public']['Tables']['installers']['Row'][] | null
```

**TypeScript Configuration:**
- Composite config with `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Path aliases: `@/*` maps to `./src/*`
- Skip lib check enabled for faster builds
- Strict mode enabled

**Using Auto-Generated Types:**
```typescript
import { Database } from '@/integrations/supabase/types';

type Installer = Database['public']['Tables']['installers']['Row'];
type InstallerInsert = Database['public']['Tables']['installers']['Insert'];
type InstallerUpdate = Database['public']['Tables']['installers']['Update'];
```

**Path Aliases:**
```typescript
// Use @/ instead of relative paths
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { slugify } from '@/lib/slugify';

// Avoid relative paths like
import { Button } from '../../../components/ui/button'; // ❌
```

### Database Debugging

```bash
# Check migration status
npx supabase migration list

# View table structure
npx supabase inspect

# Query data (via Supabase dashboard or CLI)
```

### Console Errors

- Check browser DevTools console
- Check terminal where `npm run dev` is running
- ESLint errors: `npm lint`

### Linting (ESLint 9 with Flat Config)

The project uses **ESLint 9** with the modern flat config format:

**Configuration** (eslint.config.js):
- TypeScript recommended rules
- React Hooks linting (enforces rules of hooks)
- React Refresh validation (ensures HMR compatibility)
- Unused vars: warn only (not errors)
- `any` type: allowed (flexible for rapid development)
- Empty object types: allowed

**Running ESLint:**
```bash
npm lint              # Check for errors
npm run lint:fix      # Auto-fix issues (if script exists)
```

**Common Patterns to Follow:**
- Use `const` for most variables
- Use `let` only when reassignment needed
- Avoid `var` entirely
- Prefer arrow functions for callbacks
- Use template literals over string concatenation

---

## Deployment & Production

### Pre-Build Checklist

1. All TypeScript compiles without errors
2. Tests pass (if tests exist)
3. ESLint shows no critical errors: `npm lint`
4. Environment variables are set correctly
5. Database migrations are applied: `npx supabase db push`

### Build Command

```bash
npm run build
```

This runs:
1. `generate-installer-routes` - Pre-render all installer paths
2. `generate-sitemap` - Create sitemap.xml
3. `optimize-images` - Compress images
4. `optimize-performance` - Final optimizations
5. `vite build` - Actual Vite build

### Production Build Output

- `dist/` directory with optimized HTML, CSS, JS
- Static files in `dist/assets/`
- Sourcemaps disabled for security

### Deployment via Vercel

The project is deployed on Vercel (production) and connected to Lovable (development):

**Production Deployment (Vercel)**:
1. Push changes to GitHub main branch
2. Vercel automatically detects and deploys
3. Deployment completes in ~1 minute
4. Live at https://solarinstallerstx.com

**Development (Lovable)**:
1. Go to Lovable project dashboard: https://lovable.dev/projects/ba36412b-c60a-471c-92e8-8f2206683673
2. Make changes via Lovable prompting
3. Changes are committed to Git automatically
4. Can also clone repo and push changes from local IDE

---

## Stripe Payment Integration (LIVE MODE)

### Overview

**CRITICAL**: The site is processing **REAL payments** via Stripe. Test mode keys have been replaced with live production keys.

### Pricing Tiers

- **Basic**: $99/month - Enhanced listing with verified badge
- **Premium**: $199/month - Featured placement + top search results (Most Popular)
- **Enterprise**: $399/month - Homepage feature + #1 priority placement

### Stripe Checkout Flow

1. User visits `/upgrade-to-premium`
2. Clicks upgrade button (Basic/Premium/Enterprise)
3. Frontend calls `/api/create-checkout-session` with price ID
4. API creates Stripe checkout session using live secret key
5. User redirected to Stripe-hosted checkout page
6. After payment, user redirected back with `?success=true&session_id={ID}`

### Key Files

**Frontend**: `src/pages/UpgradeToPremium.tsx`
- Loads Stripe.js with publishable key
- Three pricing cards with feature lists
- Handles checkout initiation and loading states
- Uses React hooks for state management

**Backend**: `api/create-checkout-session.ts`
- Vercel serverless function (not Supabase Edge Function)
- Creates subscription checkout sessions
- **IMPORTANT**: Uses `.trim()` on secret key to handle trailing newlines from Vercel env vars
- Success/cancel URLs redirect to `/upgrade-to-premium`
- Includes metadata (tierName) for webhook processing

**Header Navigation**: `src/components/Header.tsx`
- Premium button links to `/upgrade-to-premium` (NOT `/premium`)
- List Your Business button navigates to `/quote`
- Both desktop and mobile versions updated

### Stripe Dashboard

- Live dashboard: https://dashboard.stripe.com (make sure NOT in test mode)
- View real subscriptions, payments, customers
- Products configured with monthly recurring pricing
- Price IDs stored in environment variables

### Webhook Integration (TODO)

**Currently missing** - Manual fulfillment required:
- No webhook endpoint configured yet
- After payment, installers must be manually upgraded in database
- Need to create `/api/stripe-webhook` endpoint
- Should update installer `verification_status` and `tier` after successful payment

### Testing in Production

**WARNING**: Do NOT test with real credit cards unless you intend to process a real payment!
- For testing, use a real card and immediately refund in Stripe dashboard
- Or use Stripe's test mode (requires swapping all keys back to test keys)

### Security Considerations

- Secret key never exposed to browser (server-only environment variable)
- Checkout happens on Stripe-hosted page (PCI compliant)
- Session IDs are one-time use
- All environment variables use `.trim()` to avoid whitespace issues

---

## Deployment (Vercel)

### Current Setup

- Deployed on **Vercel** (NOT Lovable/Replit for production)
- Custom domain: https://solarinstallerstx.com
- Auto-deployment on git push to main branch
- Serverless functions in `api/` directory

### Environment Variables

All Stripe env vars configured in Vercel dashboard for three environments:
- Production (live keys)
- Preview (can use test keys)
- Development (can use test keys)

**To add/update Vercel env vars**:
```bash
# Link project (first time only)
vercel link

# Remove old variable
echo y | vercel env rm VAR_NAME production

# Add new variable (use PowerShell on Windows to avoid newlines)
Set-Content -Path temp.txt -Value 'your-value' -NoNewline
cat temp.txt | vercel env add VAR_NAME production
del temp.txt
```

### Deployment Commands

```bash
# Deploy to production
vercel --prod

# Check deployments
vercel ls --yes

# View deployment logs
vercel logs
```

### Build Process

Vercel runs the standard build:
1. `npm run build` (includes prebuild steps)
2. Generates static files in `dist/`
3. API routes become serverless functions
4. Typically completes in 40-60 seconds

### SEO & Pre-rendering

The build process includes several SEO optimizations:

**1. Sitemap Generation** (`generate-sitemap.ts`)
- Creates `sitemap.xml` with all pages
- Includes installer profiles, city pages, blog posts
- Sets proper priorities and change frequencies

**2. Installer Route Pre-generation** (`generate-installer-routes.ts`)
- Creates `installer-routes.json` with all installer slugs
- Enables pre-rendering of installer detail pages
- Improves initial page load for SEO

**3. JSON-LD Schema Injection** (postbuild)
- Injects structured data for rich snippets
- LocalBusiness, FAQPage, BreadcrumbList schemas
- Happens after Vite build completes

**4. Meta Tags & SEO Components**
- `SEOHead.tsx` component for meta tags
- City-specific titles and descriptions
- OpenGraph and Twitter Card tags

**Vercel Configuration** (vercel.json):
- Static asset caching (1 year)
- SPA fallback routing
- URL redirects for legacy paths

---

## Important Notes & Best Practices

### Safety Score System

- **CRITICAL**: The database trigger automatically calculates scores - don't manually set total_safety_score
- Tier badges display immediately after any data change
- All 16 fields affect the score - incomplete data = lower scores
- Use SafetyScoreManager UI for manual updates
- Use scripts for bulk imports and population

**Why Database Triggers?**
- Data consistency: Scores can't get out of sync with source data
- Performance: Calculation happens once at write time, not on every read
- Single source of truth: No duplicate logic across frontend/backend
- Automatic: Developers can't forget to recalculate scores

### Environment Variables

- Always use `VITE_` prefix for frontend env vars
- Use `import.meta.env` in browser code, not `process.env`
- Service role key should NEVER be exposed to browser
- Keep `.env` out of git (already in .gitignore)

### Database

- All changes to schema require migrations
- Never modify database directly without a migration file
- Always include safety checks (IF NOT EXISTS) in migrations
- Regenerate types after schema changes

### Performance

- Lazy-load pages, not all at once
- Optimize images before committing
- Keep bundle size under 1000KB for initial load
- Use React Query for server state caching

### Code Quality

- Follow existing code style (TypeScript, Tailwind classes)
- Use shadcn/ui components, not custom HTML
- Type everything - don't use `any` unless absolutely necessary
- Run `npm lint` before committing
- Write tests for new utilities and hooks
- Use React Query for server state, not Redux/Zustand

### Git & Version Control

- Main branch is production
- Feature branches for new work
- Migrations are committed alongside code changes
- Don't commit .env or credentials

---

## Helpful Resources

### Internal Documentation

- `SAFETY_SCORE_IMPLEMENTATION_STATUS.md` - Detailed implementation notes
- `IMPLEMENTATION_COMPLETE.md` - Feature completion status
- `LEGAL-COMPLIANCE-COMPLETE.md` - Legal/compliance requirements
- `QUICK-START-GUIDE.md` - Original quick start

### External Documentation

- [Supabase Docs](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/docs)
- [React Query](https://tanstack.com/query/latest)

---

## Troubleshooting

### "VITE_SUPABASE_URL is undefined"

- Check `.env` file exists in project root
- Check variables have `VITE_` prefix
- Check you're using `import.meta.env`, not `process.env`
- Restart dev server after changing .env

### "Table installers not found"

- Run: `npx supabase db push`
- Verify database connection: check VITE_SUPABASE_URL
- Check Supabase dashboard for table existence

### Safety scores not updating

- Check database trigger exists: `SELECT * FROM pg_proc WHERE proname = 'calculate_safety_score';`
- Verify migration 20251103000001 was applied
- Save installer record to trigger recalculation
- Check `total_safety_score` column exists

### Build fails with TypeScript errors

- Run: `npx supabase gen types typescript --project-id ryinjghimmyisvttfibi > src/integrations/supabase/types.ts`
- Delete `node_modules` and `npm install` fresh
- Check all imports use correct paths (@/ alias)

### Dev server not starting

- Kill any existing processes on port 5174: `netstat -ano | findstr :5174`
- Delete `.vite` cache: `rm -rf .vite node_modules && npm install`
- Check Node.js version: `node --version` (should be 16+)

---

## Final Notes

This project is a sophisticated installer directory with advanced safety scoring. The automated scoring system via database triggers is the key differentiator. Always remember:

1. **Safety scores are automatic** - Don't manually update them; update the source data
2. **Tiers matter** - Gold/Silver/Bronze filtering is prominent on the UI
3. **VITE_ is required** - Environment variables must have this prefix
4. **Migrations track schema** - Never modify database without a migration
5. **Types are auto-generated** - Regenerate after schema changes

For questions or clarifications, refer to the existing code in the repository - it's well-structured and follows consistent patterns throughout.
