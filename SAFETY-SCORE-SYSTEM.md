# Safety Score System - Complete Solution

## Executive Summary

**Problem:** The website was making unverified claims about vetting installers and assigning safety rankings without any actual data or scoring system to back it up.

**Solution:** Built a complete, production-ready Safety Score System with:
- ✅ Comprehensive database schema (30+ new fields)
- ✅ 100-point scoring algorithm based on 4 categories
- ✅ Admin dashboard for data entry and management
- ✅ Automated data collection scripts
- ✅ Updated UI components to display scores
- ✅ Full documentation and implementation guide

---

## What You're Claiming on the Website

From `SafetyScoreExplained.tsx`:

### The 100-Point Safety Score System
1. **Financial Stability (30 pts)**
   - Years in business (10 pts)
   - Insurance verified (5 pts)
   - Bonding verified (5 pts)
   - Business registration (5 pts)
   - No bankruptcy filings (10 pts)

2. **Professional Credentials (25 pts)**
   - NABCEP certified (15 pts)
   - State licensed (5 pts)
   - Master electrician (5 pts)

3. **Customer Protection (25 pts)**
   - Warranty length (10 pts)
   - Response time (5 pts)
   - Complaint history (5 pts)
   - Insurance coverage (5 pts)

4. **Track Record (20 pts)**
   - Completed installations (10 pts)
   - Customer ratings (5 pts)
   - Completion rate (3 pts)
   - Timeline accuracy (2 pts)

### Tier System
- **Gold (85-100):** NABCEP + High Safety Score
- **Silver (70-84):** Verified + Stable
- **Bronze (60-69):** Basic Verified
- **Below 60:** Not Listed

---

## What Has Been Built

### 1. Database Schema
**File:** `supabase/migrations/20251103000000_add_safety_scoring_system.sql`

Added all fields needed for the scoring system:
- Financial data (insurance, bonding, bankruptcy)
- Credential tracking (licensing, certifications)
- Customer protection metrics (warranties, complaints, BBB)
- Track record data (installations, ratings, completion rates)
- Score fields (category scores + total)
- Tier assignment (auto-calculated via trigger)
- Red flags tracking
- Verification status and timestamps

### 2. Scoring Algorithm
**File:** `src/lib/safetyScoring.ts`

TypeScript functions that calculate scores exactly as described:
```typescript
calculateSafetyScore(installerData) => {
  total_safety_score: 0-100
  tier: 'Gold' | 'Silver' | 'Bronze' | null
  financial_stability_score: 0-30
  professional_credentials_score: 0-25
  customer_protection_score: 0-25
  track_record_score: 0-20
  red_flags: string[]
  breakdown: detailed point breakdown
}
```

### 3. Admin Dashboard
**File:** `src/pages/admin/SafetyScoreManagement.tsx`
**URL:** `/admin/safety-scores`

Features:
- Search and filter installers
- View by tier (Gold/Silver/Bronze)
- View by verification status
- Edit all scoring data via tabbed interface
- Real-time score recalculation
- Save changes to database
- Statistics overview

### 4. Data Collection Scripts
**Location:** `scripts/data-enrichment/`

**Automated Scripts:**
- `google-reviews.ts` - Fetch ratings from Google Places API
- `bbb-integration.ts` - Fetch BBB ratings and complaints
- `recalculate-all-scores.ts` - Batch score calculation

**Semi-Automated:**
- TDLR license lookup (documented process)
- PACER bankruptcy checks (documented process)
- Texas SOS business verification (documented process)

**Manual (via Admin Dashboard):**
- Insurance verification (call companies)
- Bonding verification
- Warranty information collection
- Installation count verification

### 5. Updated UI Components
**File:** `src/components/InstallerCard.tsx`

Now displays:
- Tier badge (🏆 Gold, 🥈 Silver, 🥉 Bronze)
- Safety score (0-100)
- Red flag warnings
- Color-coded tier indicators

### 6. Documentation
**Files:**
- `docs/SAFETY-SCORE-IMPLEMENTATION.md` - Complete setup guide
- `docs/data-collection-guide.md` - Data sources and methods
- `SAFETY-SCORE-SYSTEM.md` - This document

---

## Implementation Checklist

### Immediate (Before Launch)
- [ ] Run database migration
- [ ] Set up Google Places API key
- [ ] Collect minimum data for top 50 installers:
  - [ ] Run Google reviews script
  - [ ] Run PACER bankruptcy checks
  - [ ] Verify NABCEP status (already have)
  - [ ] Verify years in business (already have)
- [ ] Calculate safety scores
- [ ] Test admin dashboard
- [ ] Update homepage stats with real counts
- [ ] Deploy

### Within First Week
- [ ] Expand data collection to all premium installers
- [ ] Set up BBB API (optional)
- [ ] Begin state licensing verification
- [ ] Begin insurance verification process

### Within First Month
- [ ] All installers have minimum data (Tier 1)
- [ ] Establish quarterly verification schedule
- [ ] Train team on admin dashboard
- [ ] Set up automated reminders for verification

---

## Data Quality Levels

### Tier 1: Minimum Viable (Required for Launch)
Each installer must have:
- ✅ NABCEP status (already have)
- ✅ Years in business (already have)
- ✅ Google ratings (automated script)
- ❌ Bankruptcy check (PACER - 1 hour for all)

**Time to complete:** 2-3 hours for 50 installers

### Tier 2: Strong Foundation (Target: Week 2)
Add to above:
- State licensing verification (TDLR)
- Basic insurance check (yes/no)
- BBB rating (automated or manual)

**Time to complete:** 10-15 hours for 50 installers

### Tier 3: Full Implementation (Target: Month 1)
Add to above:
- Detailed insurance info (COI, coverage amounts)
- Bonding verification
- Warranty details
- Installation counts

**Time to complete:** 20-30 hours for 50 installers

---

## Quick Start (Get Running Today)

### 1. Set Up Database (10 minutes)
```bash
cd /home/user/solarinstallerstx
supabase db push
# or run SQL migration manually in Supabase dashboard
```

### 2. Set Up Google Places API (15 minutes)
1. Go to Google Cloud Console
2. Enable Places API
3. Create API key
4. Add to `.env.local`:
   ```
   GOOGLE_PLACES_API_KEY=your_key_here
   ```

### 3. Collect Initial Data (1 hour)
```bash
# Test on one installer first
npx tsx scripts/data-enrichment/google-reviews.ts --single "Company Name"

# Run for all (takes time with rate limiting)
npx tsx scripts/data-enrichment/google-reviews.ts
```

### 4. Calculate Scores (5 minutes)
```bash
# Calculate all scores
npx tsx scripts/data-enrichment/recalculate-all-scores.ts

# Review one in detail
npx tsx scripts/data-enrichment/recalculate-all-scores.ts --single "Company Name"
```

### 5. Test Admin Dashboard (10 minutes)
```bash
npm run dev
# Navigate to http://localhost:5173/admin/safety-scores
# Try editing an installer
# Click "Recalculate" and "Save"
```

### 6. Deploy
```bash
npm run build
# Deploy to your hosting platform
```

---

## Costs

### Setup (One-Time)
- $0 - All tools are free or open-source

### Monthly Operations
- Google Places API: $0-40 (free tier covers most usage)
- BBB API: $0-200 (optional, can do manual lookups)
- PACER: ~$50-150/quarter for bankruptcy checks
- Labor: 20-40 hours/month for manual verification

**Total:** $50-250/month without dedicated staff
**With Part-Time Verifier:** $1000-1500/month

---

## Success Metrics

**Day 1:**
- 50+ installers with safety scores > 0
- Top 3 tiers properly distributed
- Admin dashboard functional

**Week 1:**
- 100+ installers scored
- Average data freshness < 30 days
- Zero false NABCEP claims

**Month 1:**
- All premium installers scored
- Quarterly verification schedule established
- User feedback collected
- Conversion rate impact measured

---

## What This Solves

### Before
❌ Making claims without data
❌ Risk of false advertising
❌ No differentiation from competitors
❌ Can't justify premium pricing
❌ Vulnerability to complaints

### After
✅ Every claim backed by data
✅ Transparent methodology
✅ Real competitive advantage
✅ Justifies premium installer model
✅ Builds user trust
✅ Defensible against disputes

---

## Next Actions

**You (Business Owner):**
1. Decide: Full launch or phased rollout?
2. Allocate: Budget for data collection
3. Assign: Who will run verification process?
4. Timeline: When do you want to go live?

**Developer (Next Steps):**
1. Run database migration
2. Set up API keys
3. Test on sample installers
4. Train on admin dashboard
5. Schedule weekly data updates

---

## Support

**Questions about:**
- Implementation → See `docs/SAFETY-SCORE-IMPLEMENTATION.md`
- Data sources → See `docs/data-collection-guide.md`
- Scoring logic → See `src/lib/safetyScoring.ts` comments
- Admin usage → See inline help in dashboard

**Need help?** Review the documentation first, then reach out with specific questions.

---

## Files Changed/Created

### New Files (Core System)
- `supabase/migrations/20251103000000_add_safety_scoring_system.sql`
- `src/lib/safetyScoring.ts`
- `src/pages/admin/SafetyScoreManagement.tsx`
- `scripts/data-enrichment/bbb-integration.ts`
- `scripts/data-enrichment/google-reviews.ts`
- `scripts/data-enrichment/recalculate-all-scores.ts`

### Documentation
- `docs/SAFETY-SCORE-IMPLEMENTATION.md`
- `docs/data-collection-guide.md`
- `SAFETY-SCORE-SYSTEM.md` (this file)

### Modified Files
- `src/App.tsx` - Added admin route
- `src/components/InstallerCard.tsx` - Display scores

---

**Status:** ✅ Complete and ready for implementation

**Next Step:** Run database migration and begin data collection
