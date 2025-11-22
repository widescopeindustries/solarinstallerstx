# Data Layer Quick Reference

## 🚀 Quick Start

```typescript
// Import everything from one place
import {
  getAllInstallers,
  getInstallersByCity,
  getCityBySlug,
  getRecentBlogPosts,
  formatCurrency,
  revalidateInstallers,
} from '@/app/lib/data'
```

---

## 📖 Common Patterns

### Pattern 1: Simple Server Component

```typescript
import { getAllInstallers } from '@/app/lib/data'

export default async function InstallersPage() {
  const installers = await getAllInstallers()

  return (
    <div>
      <h1>{installers.length} Solar Installers</h1>
      {installers.map(installer => (
        <div key={installer.id}>{installer.company_name}</div>
      ))}
    </div>
  )
}
```

### Pattern 2: Parallel Data Fetching

```typescript
import { getTopInstallers, getRecentBlogPosts, getInstallerCount } from '@/app/lib/data'

export default async function HomePage() {
  // Fetch in parallel
  const [topInstallers, recentPosts, totalCount] = await Promise.all([
    getTopInstallers(5),
    getRecentBlogPosts(3),
    getInstallerCount(),
  ])

  return (
    <div>
      <h1>Total Installers: {totalCount}</h1>
      <TopInstallers data={topInstallers} />
      <RecentBlog posts={recentPosts} />
    </div>
  )
}
```

### Pattern 3: Dynamic Route with Static Params

```typescript
import { getInstallerBySlug, getAllInstallers } from '@/app/lib/data'
import { notFound } from 'next/navigation'

// Dynamic page
export default async function InstallerPage({
  params
}: {
  params: { slug: string }
}) {
  try {
    const installer = await getInstallerBySlug(params.slug)
    return <InstallerProfile installer={installer} />
  } catch (error) {
    notFound()
  }
}

// Static generation of all installer pages
export async function generateStaticParams() {
  const installers = await getAllInstallers()
  return installers.map(installer => ({
    slug: installer.slug,
  }))
}
```

### Pattern 4: City Page with Metadata

```typescript
import { getCityBySlug, getInstallersByCity, getInstallerCountByCity } from '@/app/lib/data'
import type { Metadata } from 'next'

// Generate metadata
export async function generateMetadata({
  params
}: {
  params: { city: string }
}): Promise<Metadata> {
  const city = getCityBySlug(params.city)
  const count = await getInstallerCountByCity(params.city)

  return {
    title: `${count} Solar Installers in ${city?.name}, Texas`,
    description: city?.description,
  }
}

// Page component
export default async function CityPage({
  params
}: {
  params: { city: string }
}) {
  const city = getCityBySlug(params.city)
  const installers = await getInstallersByCity(params.city)

  return (
    <div>
      <h1>Solar Installers in {city?.name}</h1>
      <p>Population: {city?.population}</p>
      <p>Avg Cost: {city?.avgSolarCost}</p>
      <InstallerList installers={installers} />
    </div>
  )
}
```

### Pattern 5: Server Action with Revalidation

```typescript
'use server'

import { createQuoteRequest, logTCPAConsent, revalidateHomePage } from '@/app/lib/data'
import { redirect } from 'next/navigation'

export async function submitQuoteForm(formData: FormData) {
  const quoteData = {
    zipCode: formData.get('zipCode') as string,
    monthlyBill: Number(formData.get('monthlyBill')),
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    source: 'homepage_form',
  }

  try {
    // Create quote
    const quote = await createQuoteRequest(quoteData)

    // Log TCPA consent
    await logTCPAConsent({
      name: `${quoteData.firstName} ${quoteData.lastName}`,
      phone: quoteData.phone,
      email: quoteData.email,
      consentVersion: 'v1.0',
      consentText: 'I consent to receive marketing communications...',
      leadSource: 'homepage_form',
      quoteRequestId: quote.id,
    })

    // Revalidate cache
    revalidateHomePage()

    // Redirect to thank you page
    redirect('/thank-you')
  } catch (error) {
    console.error('Quote submission error:', error)
    return { error: 'Failed to submit quote request' }
  }
}
```

### Pattern 6: Search with Streaming

```typescript
import { searchInstallers } from '@/app/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  const results = await searchInstallers(query)

  return Response.json({
    query,
    count: results.length,
    results: results.slice(0, 20), // Limit to 20 results
  })
}
```

### Pattern 7: Blog Page with Related Posts

```typescript
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/app/lib/data'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({
  params
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedBlogPosts(params.slug, 3)

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      <aside>
        <h2>Related Articles</h2>
        {relatedPosts.map(related => (
          <a key={related.slug} href={`/blog/${related.slug}`}>
            {related.title}
          </a>
        ))}
      </aside>
    </article>
  )
}
```

### Pattern 8: Client Component with Server Data

```typescript
// app/installers/page.tsx (Server Component)
import { getAllInstallers } from '@/app/lib/data'
import { InstallerFilter } from './InstallerFilter'

export default async function InstallersPage() {
  const installers = await getAllInstallers()

  return (
    <div>
      <h1>Solar Installers</h1>
      {/* Pass data to Client Component */}
      <InstallerFilter installers={installers} />
    </div>
  )
}

// app/installers/InstallerFilter.tsx (Client Component)
'use client'

import { useState } from 'react'
import type { Database } from '@/app/lib/supabase/types'

type Installer = Database['public']['Tables']['installers']['Row']

export function InstallerFilter({ installers }: { installers: Installer[] }) {
  const [tier, setTier] = useState<string>('all')

  const filtered = tier === 'all'
    ? installers
    : installers.filter(i => i.tier === tier)

  return (
    <div>
      <select value={tier} onChange={e => setTier(e.target.value)}>
        <option value="all">All Tiers</option>
        <option value="Gold">Gold</option>
        <option value="Silver">Silver</option>
        <option value="Bronze">Bronze</option>
      </select>

      {filtered.map(installer => (
        <div key={installer.id}>{installer.company_name}</div>
      ))}
    </div>
  )
}
```

---

## 🎨 Formatting Utilities

```typescript
import { formatCurrency, formatNumber, generateSlug, truncateText } from '@/app/lib/data'

// Currency
formatCurrency(17500) // "$17,500"

// Numbers
formatNumber(1234567) // "1,234,567"

// Slugs
generateSlug('Austin Solar Installers!') // "austin-solar-installers"

// Text truncation
truncateText('Long description...', 50) // "Long description..."
```

---

## 🔄 Cache Management

```typescript
import {
  revalidateInstallers,
  revalidateCityPage,
  revalidateInstallerPage,
  revalidateAfterInstallerUpdate,
} from '@/app/lib/data'

// After updating installer in database
revalidateAfterInstallerUpdate({
  slug: 'austin-solar-experts',
  location_city: 'Austin',
})

// Or manually invalidate specific pages
revalidateInstallerPage('austin-solar-experts')
revalidateCityPage('austin')
revalidateInstallers() // Clear all installer cache
```

---

## 📊 All Available Functions

### Installers (10 functions)
- `getAllInstallers()` - All installers, sorted by score
- `getInstallersByCity(city)` - City-specific installers
- `getInstallerBySlug(slug)` - Single installer (throws if not found)
- `getTopInstallers(limit)` - Gold tier installers
- `getNABCEPInstallers()` - NABCEP certified only
- `getInstallersByTier(tier)` - Filter by tier
- `getPremiumInstallers()` - Verified installers
- `getInstallerCount()` - Total count
- `getInstallersByRegion(cities)` - Multiple cities
- `searchInstallers(query)` - Search function

### Cities (11 functions)
- `getCityBySlug(slug)` - Single city data
- `getAllCitySlugs()` - All city slugs
- `getInstallerCountByCity(city)` - Installer count per city
- `getAllCitiesWithCounts()` - Cities with counts
- `getTopCitiesByInstallerCount(limit)` - Top cities
- `getCitiesByRegion(region)` - Regional filter
- `getAllRegions()` - All regions
- `getCitiesByPopulation()` - Population sorted
- `searchCities(query)` - Search cities
- `getMajorCities()` - Population > 500k
- `getNearbyCities(city)` - Same region nearby

### Blog (8 functions)
- `getAllBlogPosts()` - All posts
- `getBlogPostBySlug(slug)` - Single post
- `getRecentBlogPosts(limit)` - Recent posts
- `getBlogPostsByCategory(category)` - Category filter
- `getAllBlogCategories()` - All categories
- `getRelatedBlogPosts(slug, limit)` - Related posts
- `getBlogPostCount()` - Total count
- `searchBlogPosts(query)` - Search posts

### Quotes (3 functions)
- `createQuoteRequest(data)` - Create quote
- `logTCPAConsent(data)` - Log consent
- `getQuoteRequestById(id)` - Get quote

### Revalidation (11 functions)
- `revalidateInstallers()` - All installer cache
- `revalidateCityPage(city)` - City page
- `revalidateInstallerPage(slug)` - Installer page
- `revalidateAllCityPages()` - All cities
- `revalidateInstallerDirectory()` - Directory
- `revalidateHomePage()` - Home page
- `revalidateBlogPosts()` - Blog
- `revalidateEntireSite()` - Full site
- `revalidateAfterInstallerUpdate(installer)` - Smart revalidation
- `revalidateAfterInstallerCreation(installer)` - After create
- `revalidateAfterInstallerDeletion(installer)` - After delete

### Performance (25+ functions)
See full documentation for complete list.

---

## 🔒 Type Safety Example

```typescript
import type { Database } from '@/app/lib/supabase/types'

// Fully typed installer
type Installer = Database['public']['Tables']['installers']['Row']

function processInstaller(installer: Installer) {
  // TypeScript knows all fields:
  // - installer.company_name
  // - installer.total_safety_score
  // - installer.tier
  // - installer.nabcep_certified
  // ... and all 16 safety score fields
}
```

---

## ⚡ Performance Tips

1. **Use Parallel Fetching**
   ```typescript
   // Good
   const [a, b, c] = await Promise.all([getA(), getB(), getC()])

   // Bad
   const a = await getA()
   const b = await getB()
   const c = await getC()
   ```

2. **Leverage Caching**
   ```typescript
   // Functions are already cached, just call them
   const installers = await getAllInstallers() // Cached for 1 hour
   ```

3. **Use Suspense for Loading**
   ```typescript
   <Suspense fallback={<Loading />}>
     <AsyncComponent />
   </Suspense>
   ```

4. **Revalidate Intelligently**
   ```typescript
   // After update, only revalidate affected pages
   revalidateAfterInstallerUpdate(installer)
   ```

---

## 📚 Full Documentation

For complete documentation, see:
- `DATA_LAYER_DOCUMENTATION.md` - Full guide (600+ lines)
- `AGENT_4_REPORT.md` - Implementation report

---

## ✅ Ready to Use

All utilities are production-ready. Simply import and use in your Server Components!

```typescript
import { getAllInstallers, getCityBySlug } from '@/app/lib/data'

export default async function Page() {
  const installers = await getAllInstallers()
  const city = getCityBySlug('austin')

  return <YourComponent installers={installers} city={city} />
}
```
