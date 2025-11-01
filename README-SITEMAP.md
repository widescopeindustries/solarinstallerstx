# Dynamic Sitemap Generator

This project includes a dynamic sitemap generator that creates a sitemap.xml file with all installer pages.

## How to Generate the Sitemap

### Option 1: Manual Generation (Recommended)

Run this command to generate the sitemap:

```bash
npx tsx scripts/generate-sitemap.ts
```

This will:
- Fetch all installers from the database
- Generate unique URLs for each installer (e.g., `/installer/512-solar-austin-texas-abc123`)
- Create/update `public/sitemap.xml` with all pages
- Include static pages (home, about, contact, etc.)

### Option 2: Add to Build Process

You can add this to your `package.json` scripts:

```json
{
  "scripts": {
    "generate-sitemap": "npx tsx scripts/generate-sitemap.ts",
    "prebuild": "npm run generate-sitemap"
  }
}
```

This will automatically generate the sitemap before each build.

## Submitting to Google Search Console

1. **Generate the sitemap** using the command above
2. **Deploy your site** (the sitemap will be available at `https://solarinstallerstx.com/sitemap.xml`)
3. **Go to Google Search Console**
4. **Navigate to Sitemaps** (in the left sidebar)
5. **Submit your sitemap URL**: `https://solarinstallerstx.com/sitemap.xml`

### Updating the Sitemap

Whenever you add new installers:
1. Run `npx tsx scripts/generate-sitemap.ts`
2. Deploy the updated sitemap
3. Google will automatically re-crawl it (or you can request indexing in Search Console)

## Sitemap Structure

The sitemap includes:
- **Static pages** (home, about, contact, etc.) - Priority: 0.8-1.0
- **Installer detail pages** - Priority: 0.8, Updated weekly
- **Last modification dates** - Based on installer `updated_at` field

## SEO Benefits

Each installer page includes:
- ✅ Unique URL with location keywords
- ✅ Optimized title tags (Company Name - NABCEP Solar Installer in City, State)
- ✅ Meta descriptions with phone numbers and location
- ✅ Schema.org LocalBusiness structured data
- ✅ Breadcrumb navigation
- ✅ Semantic HTML with proper heading hierarchy
- ✅ Mobile-responsive design

This structure helps Google:
- Index each installer separately
- Show installer pages in local search results
- Display rich snippets with ratings, location, and contact info
- Rank for location-specific queries (e.g., "solar installer in Austin TX")
