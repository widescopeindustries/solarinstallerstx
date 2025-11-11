# Technical SEO Fixes & Requirements

**Created**: 2025-11-11
**Purpose**: Document all technical SEO fixes, requirements for external resources, and implementation status

---

## 1. ANALYTICS & TRACKING SETUP

### Current Status
- ✅ **Google Analytics 4**: Properly configured (G-3RWQE8Q06E)
- ✅ **Vercel Analytics**: Integrated in main.tsx
- ⚠️ **Google Tag Manager**: Placeholders present but NOT configured

### GTM Configuration Required

**Files with GTM placeholders:**
- `/index.html` line 196
- `/src/main.tsx` lines 20, 28

**Current placeholder**: `GTM-XXXXXXX`

**Options:**
1. **Option A - Keep GA4 only** (Recommended for simplicity)
   - Remove GTM code from main.tsx (lines 14-30)
   - Remove GTM noscript from index.html (lines 195-198)
   - GA4 is already working and sufficient for most needs

2. **Option B - Set up GTM** (Better for advanced tracking)
   - Create GTM container at tagmanager.google.com
   - Get container ID (format: GTM-XXXXXXX)
   - Replace all instances of `GTM-XXXXXXX` with real ID
   - Migrate GA4 tracking to GTM for centralized management

**Recommendation**: Option A (remove GTM code) unless you need advanced event tracking, custom triggers, or multiple marketing pixels.

---

## 2. IMAGE ASSETS REQUIRED

### A. Open Graph Images (CRITICAL - High Priority)

**Current**: Using generic Lovable placeholder
**Required**: Custom branded OG images

**Specifications:**
- **Size**: 1200x630px (Facebook/LinkedIn optimal)
- **Format**: PNG or WebP
- **File size**: <200KB optimized
- **Location**: `/home/user/solarinstallerstx/public/og-default.png`

**Required Images:**

1. **Default OG Image** (`og-default.png`)
   - Branding: "SolarInstallersTX.com" logo prominently
   - Tagline: "Texas's #1 Bankruptcy-Proof Solar Directory"
   - Background: Texas flag colors (blue, white, red) or solar panels
   - Include: Safety Score badge/icon
   - Text: Large, readable on mobile (minimum 40px font)

2. **Homepage OG Image** (`og-home.png`)
   - Headline: "500+ Texas Solar Companies Rated & Reviewed"
   - Subheadline: "Avoid 100+ Bankruptcies - Choose Safely"
   - Visual: Solar panels + Texas map

3. **City Page Template** (`og-city-template.png`)
   - Dynamic text overlay capability
   - Template text: "[City] Solar Companies 2025"
   - Space for city name insertion

4. **Blog Post Template** (`og-blog-template.png`)
   - Space for article title
   - Author/date area
   - SolarInstallersTX branding

**Implementation After Creation:**
```typescript
// Update src/components/SEOHead.tsx line 18
ogImage = "https://solarinstallerstx.com/og-default.png"

// For specific pages, pass custom ogImage:
<SEOHead
  title="..."
  description="..."
  ogImage="https://solarinstallerstx.com/og-home.png"
/>
```

### B. Logo (CRITICAL - High Priority)

**Current**: Referenced in schema but file missing
**Required**: Company logo for schema markup and branding

**Specifications:**
- **Size**: Minimum 800x800px (square), ideally 1200x1200px
- **Format**: PNG with transparent background
- **Aspect ratio**: 1:1 (square) or 4:1 (wide) - square preferred for schema
- **Location**: `/home/user/solarinstallerstx/public/logo.png`
- **File size**: <100KB optimized

**Design Requirements:**
- Clear, simple design that scales well
- Include company name "SolarInstallersTX" or "Solar Installers TX"
- Texas element (star, state outline, flag colors)
- Professional, trustworthy appearance
- Readable at 60x60px (favicon size)

**Used In:**
- Schema.org Organization markup (index.html line 99)
- Header navigation
- Footer
- Social media profiles
- Email signatures

### C. Apple Touch Icons (Medium Priority)

**Current**: Missing - will show generic icon on iOS
**Required**: Full set of iOS touch icons

**Required Sizes:**
- `apple-touch-icon.png` - 180x180px (iPhone, iPad)
- `apple-touch-icon-167x167.png` - 167x167px (iPad Pro)
- `apple-touch-icon-152x152.png` - 152x152px (iPad)
- `apple-touch-icon-120x120.png` - 120x120px (iPhone Retina)

**Location**: `/home/user/solarinstallerstx/public/`

**Design**: Use company logo, ensure adequate padding (10% margin), solid background color

**Implementation:**
```html
<!-- Add to index.html after favicon links -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
```

### D. Favicon Set (Current Status: ✅ Partially Complete)

**Exists**: favicon.ico
**Missing**: Modern formats and full size range

**Recommended Additions:**
- `favicon-32x32.png` - Standard desktop
- `favicon-16x16.png` - Browser tabs
- `favicon.svg` - Vector format for modern browsers

---

## 3. SCHEMA MARKUP IMPROVEMENTS

### A. Breadcrumb Schema (High Priority)

**Status**: ❌ Not implemented
**Impact**: Enhanced search result display with breadcrumb trail

**Required On:**
- City pages: Home > Cities > [City]
- Installer detail pages: Home > Cities > [City] > [Installer]
- Learn section: Home > Learn > [Topic]
- Blog posts: Home > Blog > [Post]
- Guide pages: Home > Guides > [Guide]

**Implementation Example:**
```typescript
// Add to CityPage.tsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://solarinstallerstx.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Texas Cities",
      "item": "https://solarinstallerstx.com/cities"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": cityName,
      "item": `https://solarinstallerstx.com/cities/${citySlug}`
    }
  ]
};

// Pass to SEOHead component
<SEOHead schema={[existingSchema, breadcrumbSchema]} />
```

### B. FAQ Schema (High Priority)

**Status**: ❌ Not implemented
**Impact**: FAQ rich snippets in search results (high CTR boost)

**Required On:**
- `/faq` page (main priority)
- City pages (local FAQ sections)
- Guide pages (topic-specific FAQs)

**Implementation:**
```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
```

### C. Aggregate Rating Fix (High Priority)

**Status**: ⚠️ Hardcoded to "1" review
**File**: `/src/components/InstallerSchema.tsx` line 51
**Issue**: Schema shows reviewCount: 1 for all installers (red flag to Google)

**Required Fix:**
```typescript
// Current (WRONG):
"reviewCount": "1"

// Should be (query real data from Supabase):
"reviewCount": installer.total_reviews || undefined

// Only include aggregateRating if reviews exist:
...(installer.total_reviews > 0 && installer.average_rating ? {
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": installer.average_rating,
    "reviewCount": installer.total_reviews
  }
} : {})
```

### D. HowTo Schema (Medium Priority)

**Status**: ❌ Not implemented
**Impact**: Step-by-step rich results

**Required On:**
- `/learn` guide pages
- Installation process pages
- "How to choose" pages

**Implementation**: See Google HowTo schema documentation

---

## 4. PERFORMANCE OPTIMIZATIONS

### A. Image Lazy Loading (High Priority)

**Status**: ⚠️ Partially implemented
**Required**: Add `loading="lazy"` to all below-the-fold images

**Files to Update:**
- Installer card images
- City page installer listings
- Blog post images
- Guide page images

**Implementation:**
```tsx
// Hero images (above fold) - load immediately
<img src="..." loading="eager" alt="..." />

// Below fold images - lazy load
<img src="..." loading="lazy" alt="..." />

// Best practice: Use picture element with WebP
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" loading="lazy" alt="..." />
</picture>
```

### B. Font Loading Optimization (Medium Priority)

**Current**: Loading Inter font from Google Fonts
**Issue**: External font loading blocks render

**Options:**

1. **Self-host fonts** (Recommended):
   - Download Inter font files
   - Place in `/public/fonts/`
   - Add preload directive in index.html
   - Update CSS to use local fonts

2. **Optimize Google Fonts**:
   - Add `&display=swap` to font URL
   - Preconnect to fonts.gstatic.com (already done)

**Implementation (Self-hosted):**
```html
<!-- index.html -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- CSS -->
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap;
}
```

### C. Preconnect Directives (Low Priority)

**Current**: Has preconnect for Google, Mapbox, Supabase
**Missing**: Stripe, Vercel Analytics, Ahrefs

**Add to index.html:**
```html
<link rel="preconnect" href="https://js.stripe.com" crossorigin>
<link rel="preconnect" href="https://va.vercel-scripts.com" crossorigin>
<link rel="dns-prefetch" href="//script.ahrefs.com">
```

---

## 5. SITEMAP IMPROVEMENTS

### Current Status
- ✅ Sitemap exists at `/public/sitemap.xml`
- ✅ Auto-generation script: `npm run generate-sitemap`
- ⚠️ Single large sitemap (618 URLs)

### Required: Split into Sitemap Index (Medium Priority)

**Why**: Google recommends max 50,000 URLs per sitemap, but smaller sitemaps crawl faster

**Implementation Plan:**

1. Create `sitemap_index.xml` (root):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://solarinstallerstx.com/sitemap_pages.xml</loc>
    <lastmod>2025-11-11</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://solarinstallerstx.com/sitemap_cities.xml</loc>
    <lastmod>2025-11-11</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://solarinstallerstx.com/sitemap_installers.xml</loc>
    <lastmod>2025-11-11</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://solarinstallerstx.com/sitemap_blog.xml</loc>
    <lastmod>2025-11-11</lastmod>
  </sitemap>
</sitemapindex>
```

2. Update `scripts/generate-sitemap.ts` to create 4 separate files:
   - `sitemap_pages.xml` - Core pages (about, contact, learn, etc.)
   - `sitemap_cities.xml` - All city pages
   - `sitemap_installers.xml` - All installer profile pages
   - `sitemap_blog.xml` - All blog posts

3. Update `robots.txt` to point to sitemap_index.xml

**Current Sitemap Issues:**
- ✅ No issues found in current sitemap
- ⚠️ Need to verify all URLs return 200 status
- ⚠️ Need to add new content pages when created

---

## 6. CONSOLE STATEMENT REMOVAL

**Status**: ✅ Should be working via Terser config
**Verification Needed**: Build and check dist/

**Current Config** (vite.config.ts line 75):
```typescript
terserOptions: {
  compress: {
    drop_console: true  // Removes console.log in production
  }
}
```

**Verification Steps:**
```bash
npm run build
grep -r "console\.log" dist/
# Should return no results
```

**If console statements remain:**
```typescript
// Update terser config
terserOptions: {
  compress: {
    drop_console: true,
    pure_funcs: ['console.log', 'console.info', 'console.debug']
  }
}
```

---

## 7. SERVICE WORKER ENHANCEMENTS (Low Priority)

**Current**: Basic service worker with 7 precached URLs
**Recommended**: Expand precache to include top pages

**Update `/public/sw.js` PRECACHE_URLS:**
```javascript
const PRECACHE_URLS = [
  '/',
  '/installers',
  '/learn',
  '/quote',
  '/faq',
  '/safety-score-explained',
  '/cities/austin',
  '/cities/houston', '/cities/dallas',
  '/cities/san-antonio',
  '/cities/fort-worth',
  '/texas-solar-incentives-2025',
  '/index.css',
  '/logo.png'
];
```

**Also Create**: `/public/offline.html` fallback page

---

## 8. SOCIAL MEDIA INTEGRATION

### Required Social Profiles

**Status**: ❌ Not created yet
**Required For**: Schema markup, brand authority, backlinks

**Platforms to Create:**

1. **Twitter/X** (@solarinstallerstx)
   - Bio: "Texas's only bankruptcy-proof solar installer directory. 500+ companies rated. Veteran-owned. Protecting homeowners since 2024."
   - Header image: Texas solar panels
   - Profile pic: Company logo
   - Pin tweet: Link to Safety Score page
   - Content: Daily tweets on bankruptcies, policy updates, tips

2. **LinkedIn Company Page** (SolarInstallersTX / Widescope Industries)
   - Followers: Connect with installers, NABCEP professionals, solar industry
   - Content: 3 posts/week (industry news, company spotlights, guides)
   - Add all team members

3. **Facebook Business Page**
   - Category: Internet Marketing Service / Directory
   - Add business hours, contact info, website
   - Post 5x/week: Homeowner education, local news, installer features
   - Enable reviews and messaging

4. **YouTube Channel** (Future - Low Priority)
   - How-to videos
   - Installer interviews
   - Safety score explanations

**Update After Creation:**
- Add social URLs to Organization schema (index.html)
- Add social links to footer
- Update SEOHead twitter:site property (currently @SolarInstallersTX)

---

## 9. GOOGLE BUSINESS PROFILE

**Status**: ❌ Not created
**Impact**: Local search visibility, trust signals

**Setup Information:**

**Business Details:**
- **Name**: SolarInstallersTX - Solar Installer Directory (or Widescope Industries LLC)
- **Category**: Internet Marketing Service
- **Phone**: (682) 999-0953
- **Email**: solar@solarinstallerstx.com
- **Website**: https://solarinstallerstx.com
- **Address**: [REQUIRED - Add physical address]

**Description (750 chars):**
"SolarInstallersTX is Texas's most trusted solar installer directory, featuring 500+ companies with verified safety scores. After 100+ solar bankruptcies left Texas homeowners stranded in 2024, we created the industry's first 100-point Safety Scoring System to help you choose wisely. Our veteran-owned directory evaluates every installer across 16 data points including insurance, bonding, NABCEP certification, BBB rating, and bankruptcy history. Compare quotes, read reviews, and avoid fly-by-night companies. All listings are verified and regularly updated. Free quotes, no obligation. Protecting Texas homeowners from solar scams since 2024."

**Photos to Upload:**
- Logo
- Office/team photos
- Safety score badge graphics
- Website screenshots
- Texas solar panels

**Posts to Create:**
1. Welcome post introducing Safety Score system
2. Recent bankruptcy alert
3. How to vet solar installers guide

**Enable:**
- Messaging
- Q&A
- Reviews (respond to all within 24-48 hours)

---

## 10. CANONICAL NAP (Name, Address, Phone)

**Status**: ⚠️ Inconsistent - Phone exists, address missing

**Current:**
- **Phone**: (682) 999-0953 (in footer and contact page)
- **Email**: solar@solarinstallerstx.com
- **Address**: MISSING - needed for NAP consistency

**Required Action:**

**Option A - Physical Office:**
If you have a physical office, use that address:
```
Widescope Industries LLC
[Street Address]
[City], TX [ZIP]
(682) 999-0953
```

**Option B - Virtual Office/Home-Based:**
If virtual/home-based, consider:
1. UPS Store mailbox (looks professional)
2. Coworking space address
3. Or omit address and use just phone/email

**Update Locations:**
1. ✅ Footer - already has phone/email, add address
2. ✅ Contact page - already has phone/email, add address
3. ⚠️ LocalBusiness schema in index.html - add address
4. ⚠️ Google Business Profile - add address
5. ⚠️ All citation sources (Bing, Yelp, etc.)

**CRITICAL**: Use EXACT same format everywhere (including punctuation, abbreviations, suite numbers)

---

## PRIORITY IMPLEMENTATION ORDER

### Week 1 (Critical - Do First):
1. ✅ Create this documentation
2. ⏳ Generate sitemap with current dates (`npm run generate-sitemap`)
3. ⏳ Create/obtain company logo (logo.png)
4. ⏳ Create default OG image (og-default.png)
5. ⏳ Fix aggregate rating schema (real data, not hardcoded "1")
6. ⏳ Add breadcrumb schema to city pages and installer pages
7. ⏳ Add FAQ schema to /faq page
8. ⏳ Decide on GTM: Remove code OR get real container ID

### Week 2 (High Impact):
1. Add apple touch icons
2. Implement image lazy loading across site
3. Create/setup Google Business Profile
4. Create social media profiles (Twitter, LinkedIn, Facebook)
5. Establish canonical NAP with physical address
6. Optimize font loading (self-host or font-display: swap)
7. Add preconnect for Stripe, Vercel, Ahrefs

### Week 3 (Important):
1. Split sitemap into sitemap index
2. Expand service worker precache
3. Add HowTo schema to guide pages
4. Create city/blog OG image templates
5. Verify console statement removal
6. Test all schema in Google Rich Results Test

### Month 2+ (Ongoing):
1. Create YouTube channel
2. Generate social media content calendar
3. Monitor GBP Q&A and reviews
4. Update schema as site grows
5. A/B test OG images for CTR

---

## TESTING & VALIDATION

### Required Tools:
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Google Search Console**: Verify sitemap, check coverage
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

### Test Checklist:
- [ ] All schema validates without errors
- [ ] Breadcrumbs display in search results (takes 2-4 weeks)
- [ ] FAQ rich snippets appear (takes 2-6 weeks)
- [ ] OG images display correctly on Facebook/LinkedIn/Twitter
- [ ] Apple touch icons display on iOS home screen
- [ ] All social profiles linked and verified
- [ ] GBP verified and fully populated
- [ ] Sitemap accessible and submitted to GSC
- [ ] No console errors in production build
- [ ] Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

---

## NOTES

- All image creation can be done with Canva (free tier sufficient)
- Schema testing should be done BEFORE deploying to production
- Social media profiles should be created simultaneously to ensure username consistency
- NAP must be EXACT across all platforms (Google checks this for local SEO)
- This document should be updated as tasks are completed

**Last Updated**: 2025-11-11
**Next Review**: After Week 1 tasks completed
