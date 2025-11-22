# Data Fetching Layer Documentation

## Overview

This document describes the server-side data fetching layer created for the Next.js App Router migration. All utilities use React Server Components and Next.js caching for optimal performance.

---

## 📁 File Structure

```
src/app/lib/
├── data/
│   ├── installers.ts      # Installer data fetching (221 lines)
│   ├── cities.ts          # City data and utilities (126 lines)
│   ├── blog.ts            # Blog post utilities (115 lines)
│   ├── quotes.ts          # Quote request handling (147 lines)
│   └── index.ts           # Centralized exports (94 lines)
├── performance.ts         # Performance utilities (234 lines)
├── revalidate.ts          # Cache revalidation (102 lines)
└── supabase/
    ├── server.ts          # Server-side Supabase clients
    ├── client.ts          # Client-side Supabase client
    └── types.ts           # Auto-generated TypeScript types

Total: 1,039 lines of production-ready code
```

---

## 🔧 Installation & Setup

All utilities are ready to use. No additional installation required.

### Environment Variables Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ryinjghimmyisvttfibi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Server-only
```

---

## 📚 Usage Examples

### 1. Installer Data Fetching

#### Get All Installers (Server Component)

```typescript
import { getAllInstallers } from '@/app/lib/data'

export default async function InstallersPage() {
  const installers = await getAllInstallers()

  return (
    <div>
      <h1>Solar Installers ({installers.length})</h1>
      {installers.map(installer => (
        <InstallerCard key={installer.id} installer={installer} />
      ))}
    </div>
  )
}
```

#### Get Installers by City

```typescript
import { getInstallersByCity } from '@/app/lib/data'

export default async function CityPage({ params }: { params: { city: string } }) {
  const installers = await getInstallersByCity(params.city)

  return <InstallerList installers={installers} />
}
```

#### Get Top Gold Tier Installers

```typescript
import { getTopInstallers } from '@/app/lib/data'

export default async function HomePage() {
  const topInstallers = await getTopInstallers(10)

  return (
    <section>
      <h2>Top Rated Solar Installers</h2>
      <TopInstallerList installers={topInstallers} />
    </section>
  )
}
```

#### Get Single Installer by Slug

```typescript
import { getInstallerBySlug } from '@/app/lib/data'

export default async function InstallerDetailPage({
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
```

#### Get NABCEP Certified Installers

```typescript
import { getNABCEPInstallers } from '@/app/lib/data'

export default async function NABCEPPage() {
  const installers = await getNABCEPInstallers()

  return (
    <div>
      <h1>NABCEP Certified Installers</h1>
      <p>{installers.length} certified professionals</p>
      <InstallerGrid installers={installers} />
    </div>
  )
}
```

#### Get Installers by Tier

```typescript
import { getInstallersByTier } from '@/app/lib/data'

export default async function TierPage({ tier }: { tier: 'Gold' | 'Silver' | 'Bronze' }) {
  const installers = await getInstallersByTier(tier)

  return <InstallerList installers={installers} tierBadge={tier} />
}
```

#### Search Installers

```typescript
import { searchInstallers } from '@/app/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  const results = await searchInstallers(query)

  return Response.json({ results })
}
```

---

### 2. City Data Utilities

#### Get City by Slug

```typescript
import { getCityBySlug } from '@/app/lib/data'

export default async function CityPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city)

  if (!city) {
    notFound()
  }

  return (
    <div>
      <h1>Solar Installers in {city.name}</h1>
      <p>Population: {city.population}</p>
      <p>Average Solar Cost: {city.avgSolarCost}</p>
      <p>Sun Hours: {city.sunHoursPerDay}/day</p>
    </div>
  )
}
```

#### Get All Cities with Installer Counts

```typescript
import { getAllCitiesWithCounts } from '@/app/lib/data'

export default async function CitiesPage() {
  const cities = await getAllCitiesWithCounts()

  return (
    <div>
      <h1>Solar Installers by City</h1>
      {cities.map(city => (
        <CityCard
          key={city.slug}
          city={city}
          installerCount={city.installerCount}
        />
      ))}
    </div>
  )
}
```

#### Get Top Cities by Installer Count

```typescript
import { getTopCitiesByInstallerCount } from '@/app/lib/data'

export default async function PopularCities() {
  const topCities = await getTopCitiesByInstallerCount(5)

  return (
    <section>
      <h2>Most Popular Cities</h2>
      <ul>
        {topCities.map(city => (
          <li key={city.slug}>
            {city.name} - {city.installerCount} installers
          </li>
        ))}
      </ul>
    </section>
  )
}
```

#### Get Nearby Cities

```typescript
import { getNearbyCities } from '@/app/lib/data'

export default function CityPage({ city }: { city: string }) {
  const nearby = getNearbyCities(city)

  return (
    <aside>
      <h3>Nearby Cities</h3>
      <ul>
        {nearby.map(c => (
          <li key={c.slug}>
            <Link href={`/cities/${c.slug}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
```

---

### 3. Blog Data Utilities

#### Get All Blog Posts

```typescript
import { getAllBlogPosts } from '@/app/lib/data'

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div>
      <h1>Solar Energy Blog</h1>
      {posts.map(post => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
```

#### Get Recent Blog Posts

```typescript
import { getRecentBlogPosts } from '@/app/lib/data'

export default async function Sidebar() {
  const recentPosts = await getRecentBlogPosts(3)

  return (
    <aside>
      <h3>Recent Posts</h3>
      <ul>
        {recentPosts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
```

#### Get Related Blog Posts

```typescript
import { getRelatedBlogPosts } from '@/app/lib/data'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const relatedPosts = await getRelatedBlogPosts(params.slug, 3)

  return (
    <section>
      <h2>Related Articles</h2>
      <BlogPostGrid posts={relatedPosts} />
    </section>
  )
}
```

---

### 4. Quote Request Handling

#### Create Quote Request (Server Action)

```typescript
'use server'

import { createQuoteRequest, logTCPAConsent } from '@/app/lib/data'

export async function submitQuoteRequest(formData: FormData) {
  const quoteData = {
    zipCode: formData.get('zipCode') as string,
    monthlyBill: Number(formData.get('monthlyBill')),
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    source: 'website_form',
  }

  try {
    const quote = await createQuoteRequest(quoteData)

    // Log TCPA consent
    await logTCPAConsent({
      name: `${quoteData.firstName} ${quoteData.lastName}`,
      phone: quoteData.phone,
      email: quoteData.email,
      consentVersion: 'v1.0',
      consentText: 'I consent to receive calls and texts...',
      leadSource: 'quote_form',
      quoteRequestId: quote.id,
    })

    return { success: true, quoteId: quote.id }
  } catch (error) {
    return { success: false, error: 'Failed to submit quote' }
  }
}
```

---

### 5. Cache Revalidation

#### Revalidate After Data Update

```typescript
'use server'

import {
  revalidateInstallerPage,
  revalidateAfterInstallerUpdate
} from '@/app/lib/data'

export async function updateInstaller(slug: string, data: any) {
  // Update installer in database
  const installer = await supabase
    .from('installers')
    .update(data)
    .eq('slug', slug)
    .select()
    .single()

  // Revalidate cache
  revalidateAfterInstallerUpdate({
    slug: installer.slug,
    location_city: installer.location_city,
  })

  return installer
}
```

#### Manual Cache Invalidation

```typescript
'use server'

import {
  revalidateInstallers,
  revalidateCityPage,
  revalidateHomePage
} from '@/app/lib/data'

export async function refreshCache() {
  revalidateInstallers()      // Revalidate all installer data
  revalidateCityPage('austin') // Revalidate specific city
  revalidateHomePage()         // Revalidate home page
}
```

---

### 6. Performance Utilities

#### Format Currency and Numbers

```typescript
import { formatCurrency, formatNumber } from '@/app/lib/data'

export default function PricingCard({ cost }: { cost: number }) {
  return (
    <div>
      <p>System Cost: {formatCurrency(cost)}</p>
      <p>Installations: {formatNumber(1234567)}</p>
    </div>
  )
}
```

#### Generate Slugs

```typescript
import { generateSlug } from '@/app/lib/data'

export function createInstallerSlug(companyName: string) {
  return generateSlug(companyName)
  // "Austin Solar Experts!" → "austin-solar-experts"
}
```

#### Parallel Data Fetching

```typescript
import { fetchParallel } from '@/app/lib/data'

export default async function HomePage() {
  const [topInstallers, recentPosts, cityCount] = await fetchParallel([
    () => getTopInstallers(5),
    () => getRecentBlogPosts(3),
    () => getInstallerCount(),
  ])

  return (
    <div>
      <TopInstallers installers={topInstallers} />
      <RecentBlog posts={recentPosts} />
      <Stats count={cityCount} />
    </div>
  )
}
```

---

## 🚀 Caching Strategy

All data fetching functions use Next.js `unstable_cache` with optimized revalidation times:

| Data Type | Revalidation | Reason |
|-----------|-------------|---------|
| Static Content (Guides, About) | 86400s (24h) | Rarely changes |
| Installer Data | 3600s (1h) | Updates moderately |
| City Pages | 3600s (1h) | Installer counts change |
| Top Installers | 7200s (2h) | More stable data |
| Blog Posts | 86400s (24h) | Static content |
| NABCEP Data | 86400s (24h) | Certifications rarely change |

### Cache Tags

All installer-related data uses the `['installers']` tag, allowing bulk revalidation:

```typescript
revalidateTag('installers') // Invalidates all installer cache
```

---

## 📊 Available Functions

### Installer Functions

- `getAllInstallers()` - Get all installers, sorted by safety score
- `getInstallersByCity(city: string)` - Get installers in specific city
- `getInstallerBySlug(slug: string)` - Get single installer (throws if not found)
- `getTopInstallers(limit: number)` - Get Gold tier installers
- `getNABCEPInstallers()` - Get NABCEP certified installers
- `getInstallersByTier(tier)` - Filter by Gold/Silver/Bronze/Unranked
- `getPremiumInstallers()` - Get verified premium installers
- `getInstallerCount()` - Get total installer count
- `getInstallersByRegion(cities: string[])` - Get installers in multiple cities
- `searchInstallers(query: string)` - Search by name/company

### City Functions

- `getCityBySlug(slug: string)` - Get city data
- `getAllCitySlugs()` - Get all city slugs for routing
- `getInstallerCountByCity(city: string)` - Get installer count for city
- `getAllCitiesWithCounts()` - Get cities with installer counts
- `getTopCitiesByInstallerCount(limit: number)` - Top cities by installers
- `getCitiesByRegion(region: string)` - Filter by region
- `getAllRegions()` - Get all unique regions
- `getCitiesByPopulation()` - Cities sorted by population
- `searchCities(query: string)` - Search cities
- `getMajorCities()` - Cities with population > 500k
- `getNearbyCities(city: string)` - Get nearby cities (same region)

### Blog Functions

- `getAllBlogPosts()` - Get all blog posts
- `getBlogPostBySlug(slug: string)` - Get single post
- `getRecentBlogPosts(limit: number)` - Get recent posts
- `getBlogPostsByCategory(category: string)` - Filter by category
- `getAllBlogCategories()` - Get all categories
- `getRelatedBlogPosts(slug: string, limit: number)` - Related posts
- `getBlogPostCount()` - Total post count
- `searchBlogPosts(query: string)` - Search posts

### Quote Functions

- `createQuoteRequest(data)` - Create new quote
- `logTCPAConsent(data)` - Log TCPA consent
- `getQuoteRequestById(id: string)` - Get quote by ID

### Revalidation Functions

- `revalidateInstallers()` - Invalidate all installer cache
- `revalidateCityPage(city: string)` - Invalidate city page
- `revalidateInstallerPage(slug: string)` - Invalidate installer page
- `revalidateAllCityPages()` - Invalidate all city pages
- `revalidateInstallerDirectory()` - Invalidate /installers page
- `revalidateHomePage()` - Invalidate home page
- `revalidateBlogPosts()` - Invalidate blog posts
- `revalidateEntireSite()` - Nuclear option (use sparingly)
- `revalidateAfterInstallerUpdate(installer)` - Auto-revalidate after update
- `revalidateAfterInstallerCreation(installer)` - Auto-revalidate after create
- `revalidateAfterInstallerDeletion(installer)` - Auto-revalidate after delete

### Performance Utilities

- `formatCurrency(amount: number)` - Format as USD
- `formatNumber(num: number)` - Format with commas
- `generateSlug(text: string)` - Create URL slug
- `truncateText(text: string, maxLength: number)` - Truncate with ellipsis
- `calculateReadingTime(text: string)` - Reading time in minutes
- `fetchParallel(fetchers)` - Parallel async operations
- `batchArray(array, size)` - Split array into batches
- `debounce(func, wait)` - Debounce function
- `throttle(func, limit)` - Throttle function
- `isClient()` / `isServer()` - Environment checks

---

## 🎯 Best Practices

### 1. Use Server Components for Data Fetching

```typescript
// ✅ Good - Server Component
export default async function Page() {
  const data = await getAllInstallers()
  return <List data={data} />
}

// ❌ Bad - Client Component with useEffect
'use client'
export default function Page() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/api/installers').then(...)
  }, [])
  return <List data={data} />
}
```

### 2. Parallel Data Fetching

```typescript
// ✅ Good - Parallel fetching
const [installers, cities, posts] = await Promise.all([
  getAllInstallers(),
  getAllCitiesWithCounts(),
  getRecentBlogPosts(5),
])

// ❌ Bad - Sequential fetching
const installers = await getAllInstallers()
const cities = await getAllCitiesWithCounts()
const posts = await getRecentBlogPosts(5)
```

### 3. Error Handling

```typescript
// ✅ Good - Handle errors gracefully
try {
  const installer = await getInstallerBySlug(slug)
  return <InstallerProfile installer={installer} />
} catch (error) {
  notFound()
}

// ❌ Bad - No error handling
const installer = await getInstallerBySlug(slug)
return <InstallerProfile installer={installer} />
```

### 4. Cache Revalidation

```typescript
// ✅ Good - Use helper functions
revalidateAfterInstallerUpdate(installer)

// ❌ Bad - Manual revalidation
revalidatePath(`/installer/${installer.slug}`)
revalidatePath(`/cities/${installer.location_city}`)
revalidatePath('/installers')
revalidatePath('/')
```

---

## 🔍 Type Safety

All functions are fully typed using auto-generated Supabase types:

```typescript
import type { Database } from '@/app/lib/supabase/types'

type Installer = Database['public']['Tables']['installers']['Row']
type CityData = {
  name: string
  slug: string
  population: string
  avgSolarCost: string
  // ... etc
}
```

TypeScript will catch type errors at compile time, ensuring data integrity.

---

## 📝 Migration from React Query

### Before (React Query)

```typescript
'use client'
import { useQuery } from '@tanstack/react-query'

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['installers'],
    queryFn: () => fetch('/api/installers').then(r => r.json())
  })

  if (isLoading) return <Loading />
  if (error) return <Error />

  return <List data={data} />
}
```

### After (Server Components)

```typescript
import { getAllInstallers } from '@/app/lib/data'
import { Suspense } from 'react'

export default async function Page() {
  const installers = await getAllInstallers()

  return (
    <Suspense fallback={<Loading />}>
      <List data={installers} />
    </Suspense>
  )
}
```

**Benefits:**
- ✅ No client-side JavaScript for data fetching
- ✅ Automatic caching via Next.js
- ✅ Faster initial page load
- ✅ Better SEO (data rendered on server)
- ✅ Simplified code (no loading/error states)

---

## 🧪 Testing

Create a test file to verify utilities:

```typescript
// test-data-layer.ts
import { getAllInstallers, getInstallerCount } from '@/app/lib/data'

async function test() {
  const installers = await getAllInstallers()
  console.log(`Found ${installers.length} installers`)

  const count = await getInstallerCount()
  console.log(`Total count: ${count}`)
}

test()
```

Run with: `npx tsx test-data-layer.ts` (after configuring path aliases)

---

## 📦 Summary

**Created Files:**
- ✅ `src/app/lib/data/installers.ts` - 221 lines
- ✅ `src/app/lib/data/cities.ts` - 126 lines
- ✅ `src/app/lib/data/blog.ts` - 115 lines
- ✅ `src/app/lib/data/quotes.ts` - 147 lines
- ✅ `src/app/lib/data/index.ts` - 94 lines
- ✅ `src/app/lib/performance.ts` - 234 lines
- ✅ `src/app/lib/revalidate.ts` - 102 lines

**Total:** 1,039 lines of production-ready code

**Functions:** 50+ data fetching and utility functions

**Caching:** Optimized revalidation times (1h - 24h)

**Type Safety:** Full TypeScript support with Supabase types

---

## 🎉 Next Steps for Other Agents

1. **Agent 5 (Client Components)**: Import these utilities in Server Components, pass data as props to Client Components
2. **Agent 6 (Forms & Actions)**: Use `createQuoteRequest` and `logTCPAConsent` in Server Actions
3. **Agent 7 (Testing)**: Write integration tests for data utilities
4. **Agent 8 (Optimization)**: Use performance utilities for client-side optimizations

All data fetching is ready to use. Simply import and call async functions in Server Components!
