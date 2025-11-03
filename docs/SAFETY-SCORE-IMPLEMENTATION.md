# Safety Score System - Implementation Guide

## Overview

This document outlines the complete implementation of the Safety Score System that backs up the claims made on the website. This system transforms the site from making unverified claims to providing actual, data-backed safety ratings for solar installers.

---

## What Has Been Built

### 1. Database Schema ✅
**File:** `supabase/migrations/20251103000000_add_safety_scoring_system.sql`

Added comprehensive fields for all 4 scoring categories:
- **Financial Stability (30 pts):** Insurance, bonding, bankruptcy checks, business registration
- **Professional Credentials (25 pts):** NABCEP, state licensing, master electrician
- **Customer Protection (25 pts):** Warranties, response time, complaints, BBB rating
- **Track Record (20 pts):** Installation count, ratings, completion rate, timeline accuracy

**Features:**
- Automatic tier calculation (Gold/Silver/Bronze)
- Red flag tracking
- Verification status and timestamps
- Database triggers for auto-updates
- Indexed for performance

### 2. Scoring Algorithm ✅
**File:** `src/lib/safetyScoring.ts`

TypeScript functions that calculate the 100-point safety score:
- `calculateFinancialStabilityScore()` - Max 30 points
- `calculateProfessionalCredentialsScore()` - Max 25 points
- `calculateCustomerProtectionScore()` - Max 25 points
- `calculateTrackRecordScore()` - Max 20 points
- `calculateSafetyScore()` - Overall score + tier assignment

**Returns:**
- Total score (0-100)
- Tier assignment (Gold/Silver/Bronze/null)
- Individual category scores
- Detailed breakdown by factor
- Red flags array

### 3. Admin Dashboard ✅
**File:** `src/pages/admin/SafetyScoreManagement.tsx`

Full-featured admin interface for data entry and management:
- Installer list with filtering and search
- Tabbed editor for all scoring categories
- Real-time score calculation
- Save functionality
- Statistics overview
- Red flag warnings

**Access:** `/admin/safety-scores` (requires authentication in production)

### 4. Data Collection Scripts ✅
**Directory:** `scripts/data-enrichment/`

Automated scripts for gathering real-world data:

**`bbb-integration.ts`**
- Fetches BBB ratings and complaint data
- Updates customer protection scores
- Rate-limited API calls

**`google-reviews.ts`**
- Pulls ratings from Google Places API
- Updates review counts and scores
- Enriches contact info (phone, website)

**`recalculate-all-scores.ts`**
- Batch recalculates all installer scores
- Shows detailed breakdown for single installer
- Updates database with new scores

### 5. Documentation ✅
**File:** `docs/data-collection-guide.md`

Comprehensive guide covering:
- All data sources (free and paid)
- API setup instructions
- Manual verification processes
- Cost estimates
- Legal compliance notes
- Implementation timeline

---

## Implementation Steps

### Phase 1: Database Setup (1 hour)

1. **Run the migration:**
   ```bash
   # Connect to your Supabase project
   supabase db push

   # Or manually run the SQL migration
   # Copy contents of supabase/migrations/20251103000000_add_safety_scoring_system.sql
   # Run in Supabase SQL Editor
   ```

2. **Verify migration:**
   - Check that new columns exist in `installers` table
   - Verify triggers and functions are created
   - Test view `installers_with_safety_scores`

3. **Update TypeScript types:**
   ```bash
   # Regenerate Supabase types
   supabase gen types typescript --local > src/integrations/supabase/types.ts
   ```

### Phase 2: Set Up Data Collection (2-4 hours)

#### A. Required API Keys

1. **Google Places API** (Free tier available)
   - Go to: https://console.cloud.google.com/
   - Enable "Places API"
   - Create API key
   - Set in `.env.local`:
     ```
     GOOGLE_PLACES_API_KEY=your_key_here
     ```

2. **BBB API** (Optional - paid service)
   - Contact BBB for API access
   - Set in `.env.local`:
     ```
     BBB_API_KEY=your_key_here
     ```

3. **PACER** (Optional - pay per use)
   - Register at: https://pacer.uscourts.gov/
   - $0.10/page bankruptcy searches

#### B. Install Dependencies

```bash
npm install @supabase/supabase-js dotenv
```

#### C. Run Initial Data Collection

```bash
# Test on single installer first
npx tsx scripts/data-enrichment/google-reviews.ts --single "Company Name"

# Run for all installers (takes time with rate limiting)
npx tsx scripts/data-enrichment/google-reviews.ts

# Optionally run BBB collection (if you have API key)
npx tsx scripts/data-enrichment/bbb-integration.ts
```

### Phase 3: Manual Data Entry (Ongoing)

For data that can't be automated, use the admin dashboard:

1. **Access the dashboard:**
   ```
   http://localhost:5173/admin/safety-scores
   ```

2. **For each installer, enter:**

   **Financial Stability Tab:**
   - Years in business (if not already set)
   - Insurance verification (call company, request COI)
   - Bonding verification
   - Business registration (check Texas SOS)
   - Bankruptcy check (PACER search)

   **Professional Credentials Tab:**
   - State licensing (search TDLR)
   - Master electrician on staff

   **Customer Protection Tab:**
   - Warranty information (from website/contract)
   - Response time commitments
   - Insurance coverage amount

   **Track Record Tab:**
   - Completed installations (ask company)
   - Project completion rate
   - Timeline accuracy

3. **Click "Recalculate"** to see updated score
4. **Click "Save"** to persist changes

### Phase 4: Calculate Safety Scores (30 minutes)

```bash
# Calculate scores for all installers
npx tsx scripts/data-enrichment/recalculate-all-scores.ts

# View detailed breakdown for one installer
npx tsx scripts/data-enrichment/recalculate-all-scores.ts --single "Company Name"

# Save after reviewing
npx tsx scripts/data-enrichment/recalculate-all-scores.ts --single "Company Name" --save
```

### Phase 5: Update UI Components (2 hours)

Update these components to display safety scores:

1. **InstallerCard.tsx** - Show tier badge and score
2. **InstallerListCard.tsx** - Same as above
3. **InstallerProfile.tsx** - Detailed score breakdown
4. **TopInstallers.tsx** - Filter by tier
5. **Index.tsx** - Update stats with actual counts

Example updates:
```tsx
// Show tier badge
{installer.tier && (
  <Badge className={`bg-${getTierColor(installer.tier)}`}>
    {getTierBadge(installer.tier)} {installer.tier}
  </Badge>
)}

// Show safety score
<div className="flex items-center gap-2">
  <Shield className="h-4 w-4" />
  <span>Safety Score: {installer.total_safety_score}/100</span>
</div>
```

### Phase 6: Testing (1 hour)

1. **Test scoring algorithm:**
   - Create test installers with known data
   - Verify score calculations are correct
   - Check tier assignments

2. **Test admin dashboard:**
   - Enter data for sample installer
   - Verify recalculation works
   - Confirm saves persist to database

3. **Test UI display:**
   - Browse installers list
   - Check badges display correctly
   - Verify filtering by tier works

### Phase 7: Go Live (30 minutes)

1. **Run final score calculation:**
   ```bash
   npx tsx scripts/data-enrichment/recalculate-all-scores.ts
   ```

2. **Update homepage stats:**
   - Replace hardcoded numbers with database queries
   - Show Gold/Silver/Bronze counts

3. **Deploy:**
   ```bash
   npm run build
   # Deploy to your hosting platform
   ```

---

## Maintenance Schedule

### Daily
- Monitor for new installer submissions
- Check red flag alerts

### Weekly
- Review and respond to verification requests from installers
- Update any expired certifications/licenses

### Monthly
- Run automated data collection scripts
- Recalculate all safety scores
- Review and update manual entries

### Quarterly (Every 90 days)
- Full re-verification of all installers
- Update next_verification_due dates
- Comprehensive bankruptcy checks
- Review and update data sources

---

## Data Quality Standards

### Minimum Viable Launch

To launch with integrity, each installer should have:

**Tier 1 (Required):**
- ✅ NABCEP certification status (already have)
- ✅ Years in business (already have)
- ✅ Google reviews (can automate)
- ❌ Bankruptcy check (PACER - 1 hour for all)

**Tier 2 (Important):**
- State licensing verification (TDLR - 30 min per installer)
- Insurance verification (call each - 15 min per installer)
- BBB rating (API or manual lookup - 5 min per installer)

**Tier 3 (Nice to Have):**
- Warranty information
- Bonding verification
- Installation counts
- Response time commitments

### Recommended Launch Strategy

**Week 1:** Focus on top 50 installers
- Run automated scripts (Google, BBB)
- Manual bankruptcy checks
- State licensing verification
- Insurance verification

**Week 2-3:** Expand to all premium/verified installers
- Complete Tier 1 + Tier 2 data
- Begin Tier 3 data collection

**Week 4:** Full launch
- All installers have minimum data
- Continue ongoing enrichment

---

## Legal & Compliance

### Data Accuracy
- All scores must be recalculated when underlying data changes
- Implement dispute process for installers to challenge ratings
- Document data sources for transparency
- Update "Data last verified" timestamps

### FCRA Compliance
If using scores for credit decisions, FCRA applies. For informational/directory purposes, it's less restrictive but still:
- Allow installers to dispute inaccurate information
- Maintain reasonable procedures to ensure accuracy
- Provide mechanism for correction

### Privacy
- Only collect publicly available or company-provided data
- Don't store personal information without consent
- Comply with TCPA for phone/email contact

---

## Troubleshooting

### "Tier is always NULL"
- Check that NABCEP certification is properly detected
- For Gold tier, certification_type must include "NABCEP"
- Verify score is >= 60 (minimum threshold)

### "Scores not updating"
- Check database triggers are active
- Verify function `update_tier_on_score_change()` exists
- Manually run: `SELECT * FROM installers WHERE tier IS NULL AND total_safety_score >= 60;`

### "Red flags not counting"
- Ensure red_flags is JSONB array format
- Check trigger on red_flags column
- Manually update: `UPDATE installers SET red_flags = '[]'::jsonb WHERE red_flags IS NULL;`

### "API rate limits exceeded"
- Google Places: 5k requests/month free, then $0.017/request
- Add delays between requests (already implemented)
- Consider caching results

---

## Cost Analysis

### Automated Data Collection (Monthly)
- Google Places API: $0-40 (free tier covers most)
- BBB API: $0-200 (optional)
- PACER: ~$3-10 per installer (quarterly)

### Manual Labor
- Part-time verifier (20 hrs/week): ~$800-1200/month
- Tasks: Phone verification, COI requests, manual lookups

### Total Monthly Cost
- **Minimum:** $50-100 (APIs only, you do manual work)
- **Recommended:** $1000-1500 (APIs + part-time verifier)
- **Per Installer:** ~$2-3/month with 500 installers

---

## Next Steps

1. **Immediate (Today):**
   - [ ] Run database migration
   - [ ] Test admin dashboard locally
   - [ ] Run automated scripts on test installer

2. **This Week:**
   - [ ] Set up Google Places API
   - [ ] Collect data for top 20 installers manually
   - [ ] Calculate and review scores

3. **Next 2 Weeks:**
   - [ ] Expand to all premium installers
   - [ ] Update UI components
   - [ ] Test end-to-end

4. **Month 1:**
   - [ ] Full launch with all installers scored
   - [ ] Establish verification schedule
   - [ ] Train team on admin dashboard

---

## Support & Questions

For implementation questions:
1. Review `docs/data-collection-guide.md` for data sources
2. Check `src/lib/safetyScoring.ts` for algorithm logic
3. See inline comments in admin dashboard code
4. Test scripts with `--single "Company"` flag first

---

## Success Metrics

Track these to measure impact:

1. **Data Coverage:**
   - % of installers with Tier 1 data complete
   - % of installers with safety scores > 0
   - Average data freshness (days since update)

2. **Score Distribution:**
   - Count by tier (Gold/Silver/Bronze)
   - Average safety score
   - % below threshold

3. **User Trust:**
   - Bounce rate on installer pages
   - Time on site
   - Quote request conversion rate

4. **Business Impact:**
   - Installer inquiries for premium listings
   - User feedback on score accuracy
   - Competitor differentiation

---

**This is a living document. Update as you learn and improve the system.**
