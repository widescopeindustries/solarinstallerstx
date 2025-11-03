# Safety Score Data Collection Guide

This document outlines how to collect real-world data for the Safety Score System.

## Overview

The Safety Score System requires data from 4 categories:
1. **Financial Stability** (30 points)
2. **Professional Credentials** (25 points)
3. **Customer Protection** (25 points)
4. **Track Record** (20 points)

## 1. Financial Stability Data (30 points max)

### Years in Business
**Data Source:** Texas Secretary of State Business Records
- **URL:** https://mycpa.cpa.state.tx.us/coa/
- **Method:**
  - Search by company name
  - Look for "File Number" and "File Date"
  - Calculate years from file date to present
- **API Available:** Yes (Bulk data available)
- **Automation:** Medium difficulty
- **Update Frequency:** Annual

### Insurance Verification
**Data Source:** Direct company contact or certificate requests
- **Method:**
  - Call company and request Certificate of Insurance (COI)
  - Verify with insurance company directly
  - Check for General Liability, Workers Comp, and Professional Liability
- **Required Info:**
  - Insurance company name
  - Policy number
  - Coverage amount ($1M minimum recommended)
  - Expiration date
- **API Available:** No (manual verification required)
- **Automation:** Low (requires manual follow-up)
- **Update Frequency:** Annual or when policy renews

**Alternative Sources:**
- Insurance company verification portals (Progressive, Nationwide, etc.)
- Texas Department of Insurance License Search: https://www.tdi.texas.gov/

### Bonding Verification
**Data Source:** Surety company or contractor
- **Method:**
  - Request bond certificate from contractor
  - Verify with surety company
- **Required Info:**
  - Surety company name
  - Bond amount
  - Bond type (license bond, performance bond)
- **API Available:** No
- **Automation:** Low
- **Update Frequency:** Annual

### Business Registration
**Data Source:** Texas Secretary of State + Texas Comptroller
- **URL:** https://mycpa.cpa.state.tx.us/coa/
- **URL:** https://comptroller.texas.gov/taxes/
- **Method:**
  - Verify business is registered and in good standing
  - Check for active sales tax permit
  - Verify registered agent and business address
- **API Available:** Limited
- **Automation:** Medium
- **Update Frequency:** Quarterly

### Bankruptcy Check
**Data Source:** PACER (Public Access to Court Electronic Records)
- **URL:** https://pacer.uscourts.gov/
- **Method:**
  - Search federal bankruptcy court records
  - Search by company name and principals
  - Look for Chapter 7, 11, or 13 filings
- **Cost:** $0.10 per page (capped at $3 per document)
- **API Available:** Yes (PACER API)
- **Automation:** High
- **Update Frequency:** Quarterly

**Alternative Sources:**
- State court records (Texas District Courts)
- Credit bureaus (Dun & Bradstreet, Experian Business)
- Google News alerts for bankruptcy announcements

---

## 2. Professional Credentials Data (25 points max)

### NABCEP Certification
**Data Source:** NABCEP Public Directory
- **URL:** https://www.nabcep.org/certification/certified-installer-locator/
- **Method:**
  - Search by name or certification number
  - Verify certification type (PV Installation Professional, etc.)
  - Check expiration date
- **API Available:** No (but directory is scrapeable)
- **Automation:** Medium (web scraping)
- **Update Frequency:** Quarterly
- **Already Collected:** YES (existing certification_type field)

### State Licensing (Texas)
**Data Source:** Texas Department of Licensing and Regulation (TDLR)
- **URL:** https://www.tdlr.texas.gov/LicenseSearch/
- **License Types Needed:**
  - Electrical Contractor License
  - Master Electrician License
  - Journeyman Electrician License
- **Method:**
  - Search by company name or individual name
  - Verify license status is "Active"
  - Record license number and expiration
- **API Available:** Limited
- **Automation:** Medium
- **Update Frequency:** Quarterly

### Master Electrician Verification
**Data Source:** TDLR + Company website/contact
- **Method:**
  - Check TDLR for Master Electrician licenses associated with company
  - Verify individual is employed by company (call or website)
- **API Available:** No
- **Automation:** Low
- **Update Frequency:** Annual

---

## 3. Customer Protection Data (25 points max)

### Warranty Information
**Data Source:** Company website, direct contact, or contract review
- **Method:**
  - Check company website for warranty terms
  - Request sample contract
  - Call and ask about warranty offerings
- **Required Info:**
  - Workmanship warranty (years)
  - Equipment warranty (years)
  - Performance guarantee details
  - Warranty transferability
- **API Available:** No
- **Automation:** Low (manual review)
- **Update Frequency:** Annual

### Response Time Commitments
**Data Source:** Company website or direct contact
- **Method:**
  - Check website for service response times
  - Ask customer service about typical response windows
  - Look for emergency service availability
- **API Available:** No
- **Automation:** Low
- **Update Frequency:** Annual

### BBB Rating
**Data Source:** Better Business Bureau
- **URL:** https://www.bbb.org/search
- **Method:**
  - Search by company name and location
  - Record BBB rating (A+ to F)
  - Record accreditation status
  - Count complaints and resolutions
- **API Available:** Yes (BBB API - requires business account)
- **Automation:** High
- **Update Frequency:** Quarterly

**BBB API Info:**
- Endpoint: https://api.bbb.org/api/
- Requires: Business API key
- Cost: Paid service

### Complaint History
**Data Sources:**
1. **Better Business Bureau** (primary)
   - URL: https://www.bbb.org/
   - Free complaint data

2. **Consumer Affairs**
   - URL: https://www.consumeraffairs.com/
   - Public complaint database

3. **Yelp / Google Reviews**
   - Look for complaint patterns
   - Track negative review response rate

4. **State Attorney General**
   - URL: https://www.texasattorneygeneral.gov/
   - Consumer protection complaints

- **API Available:** Varies by source
- **Automation:** Medium to High
- **Update Frequency:** Quarterly

### Insurance Coverage Amount
**Data Source:** Certificate of Insurance (COI)
- **Method:**
  - Request COI from company
  - Look for General Liability coverage amount
  - $1M minimum, $2M recommended
- **API Available:** No
- **Automation:** Low
- **Update Frequency:** Annual (when insurance renews)

---

## 4. Track Record Data (20 points max)

### Completed Installations
**Data Sources:**
1. **Company website** (often lists project count)
2. **Direct inquiry** (ask for portfolio)
3. **Permits database** (city/county building permits)
   - Example: Austin: https://abc.austintexas.gov/web/permit/public-search-other
4. **Solar incentive databases** (some track installations)

- **Method:**
  - Call and ask for total installations completed
  - Cross-reference with permits if available
  - Check company marketing materials
- **API Available:** Varies by municipality
- **Automation:** Low to Medium
- **Update Frequency:** Quarterly

### Customer Ratings
**Data Sources:**
1. **Google Business Profile**
   - URL: https://www.google.com/maps
   - API: Google Places API
   - Free tier available

2. **Yelp**
   - URL: https://www.yelp.com/
   - API: Yelp Fusion API
   - Free tier available

3. **Solar Reviews**
   - URL: https://www.solarreviews.com/
   - No API (scraping required)

4. **EnergySage**
   - URL: https://www.energysage.com/
   - No API (scraping required)

- **Method:**
  - Pull ratings from multiple sources
  - Calculate weighted average
  - Count total reviews
- **API Available:** Yes (Google, Yelp)
- **Automation:** High
- **Update Frequency:** Monthly

### Project Completion Rate
**Data Source:** Direct inquiry or permit/complaint correlation
- **Method:**
  - Ask company for completion rate
  - Cross-reference BBB complaints for "project not completed"
  - Check for patterns in negative reviews
- **API Available:** No
- **Automation:** Low
- **Update Frequency:** Quarterly

### Timeline Accuracy
**Data Source:** Review analysis or direct inquiry
- **Method:**
  - Analyze reviews for mentions of timeline issues
  - Ask company for average project duration vs. estimated
  - Calculate percentage of on-time completions
- **API Available:** No (sentiment analysis of reviews)
- **Automation:** Medium (NLP sentiment analysis)
- **Update Frequency:** Quarterly

---

## Data Collection Workflow

### Phase 1: Automated Data Collection (High Priority)
1. **NABCEP Directory Scraping** - Already have certification data
2. **BBB API Integration** - Ratings, complaints, accreditation
3. **Google Places API** - Reviews and ratings
4. **Yelp Fusion API** - Reviews and ratings
5. **PACER API** - Bankruptcy checks
6. **Texas SOS API** - Business registration verification

### Phase 2: Semi-Automated Collection
1. **TDLR License Lookup** - State licensing verification
2. **County Permits** - Installation counts (varies by jurisdiction)
3. **Review Sentiment Analysis** - Timeline and completion insights

### Phase 3: Manual Verification (Requires Staff)
1. **Insurance Verification** - Call companies, request COIs
2. **Bonding Verification** - Request certificates
3. **Warranty Information** - Review contracts and websites
4. **Response Time** - Direct inquiry
5. **Installation Counts** - Direct inquiry and verification

---

## Recommended Tools & Services

### Free/Open Source
- **Python + BeautifulSoup** - Web scraping
- **Puppeteer/Playwright** - Dynamic website scraping
- **OpenAI API** - Review sentiment analysis
- **PostgreSQL** - Data storage (already using Supabase)

### Paid Services (Optional)
- **Dun & Bradstreet** - Business credit and stability data
  - Cost: ~$50-100/report or subscription

- **Experian Business** - Credit reports
  - Cost: ~$40-60/report

- **ClearBit** - Company data enrichment
  - Cost: $99+/month

- **ZoomInfo** - B2B contact and company data
  - Cost: $250+/month

- **Hunter.io** - Email verification and company data
  - Cost: $49+/month

---

## Data Quality Standards

### Verification Levels
1. **Verified** - Data collected from authoritative source (government, certification body)
2. **Self-Reported** - Data provided by company but not verified
3. **Estimated** - Data inferred from indirect sources
4. **Unknown** - No data available

### Data Freshness Requirements
- **Financial Data:** Update quarterly (90 days)
- **Credentials:** Update quarterly or when expiration approaches
- **Customer Protection:** Update annually or when complaints filed
- **Track Record:** Update quarterly

### Red Flag Triggers (Immediate Re-verification)
1. Bankruptcy filing detected
2. License expiration within 30 days
3. New BBB complaints filed (5+)
4. Significant negative review increase
5. Business address change
6. Ownership change detected

---

## Implementation Priority

### Week 1: Quick Wins (Automated)
- [ ] BBB API integration
- [ ] Google Places API integration
- [ ] Yelp API integration
- [ ] PACER bankruptcy checks

### Week 2-3: Semi-Automated
- [ ] TDLR license verification script
- [ ] Texas SOS business lookup automation
- [ ] NABCEP directory refresh

### Week 4+: Manual Processes
- [ ] Insurance COI request template
- [ ] Warranty info collection process
- [ ] Installation count verification
- [ ] Build admin interface for data entry

---

## Cost Estimate

### One-Time Setup
- PACER account: $0 (pay per use)
- API integrations: $0 (developer time only)

### Monthly Recurring
- BBB API: $0-200/month (depending on volume)
- Google Places API: $0-40/month (free tier: 5k requests)
- Yelp Fusion API: Free
- OpenAI API (sentiment): ~$20-50/month

### Per-Installer Manual Verification
- PACER bankruptcy search: ~$3-10
- Phone verification time: ~30 min
- COI request/verification: ~15 min

**Estimated Cost:** $200-500/month for 500+ installers with quarterly updates

---

## Legal & Compliance Notes

### Fair Credit Reporting Act (FCRA)
- If using this data for credit decisions, FCRA compliance required
- For informational/directory purposes, less restrictive

### Data Privacy
- All data collected from public sources or with consent
- No personal identifying information stored without consent
- Comply with TCPA for phone/email outreach

### Accuracy Requirements
- Implement data dispute process
- Allow installers to submit corrections
- Re-verify disputed data within 30 days
- Document data sources for transparency

---

## Next Steps

1. **Set up APIs:** BBB, Google Places, Yelp
2. **Build scraping scripts:** NABCEP, TDLR, PACER
3. **Create admin interface:** For manual data entry
4. **Hire/train verifier:** Part-time role for manual verification
5. **Establish update schedule:** Automated quarterly updates
6. **Create installer portal:** Let installers submit/update data
