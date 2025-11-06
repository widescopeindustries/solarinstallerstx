# City Page Optimization Plan
## Based on External Audit - Nov 6, 2025

### Current GSC Performance (Oct 16 - Nov 4, 2025)
| City | Impressions | Avg Position | Status | Priority |
|------|-------------|--------------|--------|----------|
| **Houston** | 41 | 3.95 | ✅ Page 1 Top 5 | 🔥 CONVERT |
| **San Antonio** | 61 | 13.36 | ⚠️ Page 2 | 🔥🔥 RANK |
| **Arlington** | 47 | 13.09 | ⚠️ Page 2 | 🔥 RANK |
| **Austin** | 42 | 9.64 | ⚠️ Bottom Page 1 | 🔥 PUSH TOP 5 |
| **Dallas** | 30 | 14.03 | ⚠️ Page 2 | 🔥 RANK |

### Optimization Strategy

#### Phase 1: Title & Meta Description Optimization (Immediate)
**Goal:** Convert existing impressions to clicks

**Houston** (Position 3.95 - Already Ranking!)
- Current: Generic title
- New: "Best Solar Installers Houston TX 2025 | 17+ NABCEP Certified | $16,900 Avg"
- Meta: "Compare Houston's top-rated solar installers. CenterPoint Energy rebates + 30% tax credit. Free quotes from 17 NABCEP certified companies. Average cost: $16,900."

**San Antonio** (61 Impressions - Highest Volume!)
- Current: Generic title
- New: "Solar Installers San Antonio TX | 50+ Verified Companies | CPS Energy Rebates"
- Meta: "San Antonio leads TX in solar adoption. Compare 50+ NABCEP certified installers. CPS Energy rebates + Goal Zero Program. Average cost: $16,200. Free quotes."

**Austin** (Position 9.64 - Push to Top 5)
- Current: Generic title
- New: "Austin Solar Companies 2025 | 50+ NABCEP Certified | Solar Value Bank Rebates"
- Meta: "Find Austin's best solar installers. Austin Energy Solar Value Bank + 30% federal credit. 50+ certified companies. Average cost: $18,500. Capital of renewable energy."

**Dallas** (Page 2 - Need Content)
- Current: Generic title
- New: "Best Solar Companies Dallas TX | Good Faith Energy & 40+ Installers | Free Quotes"
- Meta: "Compare Dallas solar installers including Good Faith Energy, Texas Solar Professional. Oncor rebates + net metering. 41+ NABCEP certified companies. $17,800 avg cost."

#### Phase 2: Unique Local Content (This Week)
**Houston Page Enhancements:**
- Add section: "Houston's Solar Leaders" - mention specific high-rated installers
- Local proof: "CenterPoint Energy serves 2.5M Houston customers - solar compatible"
- Hurricane resilience angle: "Solar + battery backup for Houston's storm season"
- Case study: "The Woodlands neighborhood: 40% solar adoption"

**San Antonio Page Enhancements:**
- CPS Energy specific: "San Antonio's Goal Zero commitment: 100% clean energy by 2040"
- Local data: "1.5M residents, #1 in TX for solar growth 2024-2025"
- Military angle: "Joint Base San Antonio - solar friendly for military families"
- Mention: "50+ installers serve Bexar County's 1.9M residents"

**Dallas Page Enhancements:**
- Featured installers: "Good Faith Energy - Highest rated DFW installer"
- Local stat: "DFW metroplex: 7.6M residents, 200+ solar companies"
- Oncor territory: "Serving Dallas County's 2.6M residents with net metering"
- Neighborhood data: "Preston Hollow, Highland Park lead in luxury solar installations"

**Austin Page Enhancements:**
- Capital angle: "Texas Capitol leads by example with solar installations"
- Austin Energy data: "Solar Value Bank: Premium payouts for Austin solar adopters"
- Tech hub angle: "Tesla Solar Roof, tech workers drive Austin solar boom"
- Local proof: "Travis County: 50+ NABCEP installers compete for your business"

#### Phase 3: LocalBusiness Schema with Veteran Status (Today)
Add to all city pages:
```json
{
  "@type": "LocalBusiness",
  "@id": "https://solarinstallerstx.com/#organization",
  "name": "Solar Installers Texas",
  "image": "https://solarinstallerstx.com/opengraph-image.svg",
  "url": "https://solarinstallerstx.com",
  "telephone": "(682) 999-0953",
  "priceRange": "$15,000 - $25,000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Texas",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Houston"
    },
    {
      "@type": "City",
      "name": "Dallas"
    },
    {
      "@type": "City",
      "name": "Austin"
    },
    {
      "@type": "City",
      "name": "San Antonio"
    }
  ],
  "description": "SBA Certified Service-Disabled Veteran-Owned solar installer directory serving Texas. NABCEP certified companies with Financial Stability Verification.",
  "additionalType": "https://schema.org/VeteranOwnedBusiness",
  "slogan": "Financial Stability Verified Solar Installers",
  "knowsAbout": [
    "NABCEP Certification Tracking",
    "Financial Stability Verification",
    "Solar Safety Score System"
  ]
}
```

#### Phase 4: Internal Linking Strategy
**Create Hub-Spoke Model:**
- Homepage → City Pages (already exists)
- City Pages → Installer Detail Pages (optimize anchor text)
- Add "Related Cities" section:
  - Houston page → links to Pearland, Sugar Land, The Woodlands
  - Dallas page → links to Plano, Frisco, Irving, Arlington
  - Austin page → links to Round Rock, Georgetown, Cedar Park

#### Phase 5: Image Optimization
**Add Local Visuals:**
- Houston: Skyline with solar panels, CenterPoint territory map
- San Antonio: River Walk area with solar installations
- Dallas: Reunion Tower with solar installations visible
- Austin: Capitol building with rooftop solar

### Success Metrics (Track in GSC)
**Week 1-2:**
- Houston: Maintain top 5, increase CTR from 1.3% to 3%+
- San Antonio: Move from position 13 to position 8-10
- Austin: Move from position 9.6 to position 5-7

**Week 3-4:**
- San Antonio: Reach page 1 (position 1-10)
- Dallas: Move from position 14 to position 10-12
- Arlington: Move from position 13 to position 10-12

**Month 2:**
- Houston: Position 1-3 (target #1)
- San Antonio: Top 5
- Austin: Top 5
- Dallas: Page 1
- Arlington: Page 1

### Content Quality Checklist
For each city page, ensure:
- [ ] Unique 300+ word city-specific content (not templated)
- [ ] 3+ local installer mentions by name
- [ ] Local utility company mentioned (CenterPoint, CPS Energy, Austin Energy, Oncor)
- [ ] City-specific incentive details
- [ ] Local statistics (population, adoption rate, avg cost)
- [ ] Geographic context (county, region, nearby cities)
- [ ] Local landmarks or neighborhoods mentioned
- [ ] Embedded Google Map of service area
- [ ] 2-3 local customer testimonials/reviews
- [ ] LocalBusiness schema with veteran status
- [ ] Mobile-optimized images with local alt text

### Competitor Analysis Notes
**What we're up against:**
- Sunrun: DR 51-56, 12,100 referring domains, 258K monthly traffic
- Freedom Solar Power: 15+ year brand in TX, Tesla Premier
- Good Faith Energy: DFW elite local reputation

**Our Advantage:**
- Veteran-owned (unique angle for link building)
- Hyper-local focus (we can win city-by-city)
- Financial Stability Verification (proprietary UVP)
- Solar Safety Score System (trust differentiator)

### Link Building Targets (Post-Content Optimization)
1. Texas veteran business directories
2. SBA.gov veteran business listings
3. Local chambers: Houston, Dallas, Austin, San Antonio
4. Partner with Gold Tier installers (badge backlinks)
5. Local news: "2026 Texas Solar Financial Stability Report" outreach
6. Texas solar associations
7. University sustainability programs (UT Austin, Texas A&M)

### Technical Requirements
- [ ] Implement lazy loading for city page images
- [ ] Ensure mobile CTAs are thumb-friendly (48px+ tap targets)
- [ ] Add FAQ schema to each city page (6 questions minimum)
- [ ] Implement breadcrumb schema
- [ ] Add "Last Updated" date to build trust
- [ ] Ensure all forms have TCPA compliance text

---

## Implementation Priority Queue

**TODAY (High Impact, Quick Wins):**
1. ✅ Fix Stripe checkout (COMPLETED)
2. ⏳ Optimize Houston page title & meta (Position 3.95!)
3. ⏳ Optimize San Antonio page title & meta (61 impressions!)
4. ⏳ Add LocalBusiness schema with veteran status

**THIS WEEK (Medium Impact):**
5. ⏳ Add unique content to Dallas page (Good Faith Energy mention)
6. ⏳ Add unique content to Austin page (Solar Value Bank details)
7. ⏳ Execute PageSpeed mobile optimizations (87 → 90+)
8. ⏳ Create "Related Cities" internal linking

**NEXT WEEK (Strategic Assets):**
9. ⏳ Write "2026 Texas Solar Financial Stability Report"
10. ⏳ Submit to veteran business directories (SBA.gov, etc.)
11. ⏳ Reach out to Gold Tier installers for backlinks
12. ⏳ Local chamber membership applications

---

## Revenue Activation Timeline
**Month 3-4:** Houston + San Antonio pages ranking consistently
- Proof of traffic: Show installers GSC data
- Pitch: "Your company qualifies for Gold Tier placement on our ranking Houston page"

**Month 4-6:** Scale to Dallas, Austin, Fort Worth
- B2B sales: $200-500/month per city for Gold Tier placement
- Target: 5-10 Gold Tier partners by Month 6

**Month 6-12:** Full Texas rollout
- 20+ cities with page 1 rankings
- 30-50 B2B clients paying for premium placement
- Revenue target: $10K-20K/month recurring

---

*This plan is based on the Nov 6, 2025 external audit findings and current GSC performance data.*
