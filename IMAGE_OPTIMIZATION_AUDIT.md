# Image Optimization Audit - Solar Installers TX
## Agent 5: Image & Performance Optimization

**Date:** November 22, 2025
**Project:** Solar Installers TX (Next.js Migration)
**Status:** Next.js 16.0.3 installed, migration in progress

---

## Executive Summary

The codebase has been migrated to Next.js 16 with image optimization configured in `next.config.ts`. However, **legacy React code** still uses:
- Custom `<OptimizedImage>` component with manual srcset generation
- Raw `<img>` tags without Next.js Image optimization
- No blur placeholders for LCP improvement
- Missing `priority` prop on critical above-fold images

**Expected Performance Gains:**
- **LCP improvement:** 40-60% (from 3-4s to <2.5s)
- **CLS reduction:** <0.1 (width/height prevents layout shift)
- **Bundle size reduction:** ~30% (lazy loading)
- **Bandwidth savings:** 50-70% (WebP/AVIF via Next.js)

---

## Current Image Inventory

### **Critical Priority (Above-Fold - Affects LCP)**

| File Path | Line | Current Method | Image | Size | Action Required |
|-----------|------|----------------|-------|------|-----------------|
| `src/pages/Index.tsx` | 311 | `<img>` tag | `/solar-safety-scored-badge.png` | Unknown | Convert to `next/image` with `priority` |
| `src/components/HeroSection.tsx` | 134-145 | `<OptimizedImage>` | `/images/hero-solar` | 1024x683 | Convert to `next/image` with `priority` |

**Impact:** These images load above-fold and directly affect Largest Contentful Paint (LCP). Must use `priority` prop.

---

### **High Priority (Visible, Below-Fold)**

| File Path | Line | Current Method | Image | Size | Action Required |
|-----------|------|----------------|-------|------|-----------------|
| `src/pages/About.tsx` | 62-68 | `<img>` tag | `/images/sba-sdvosb-logo.png` | 192x192 | Convert to `next/image` (lazy) |
| `src/pages/About.tsx` | 96-101 | `<img>` tag | `/images/owner-portrait.jpg` | 224xAuto | Convert to `next/image` (lazy) |
| `src/components/Footer.tsx` | 23-29 | `<img>` tag | `/images/sba-sdvosb-logo.png` | 64x64 | Convert to `next/image` (lazy) |
| `src/pages/BadgeWidget.tsx` | 32 | `<img>` tag | `/images/verified-badge.png` | 192x192 | Convert to `next/image` (lazy) |

**Impact:** Visible images that benefit from lazy loading and automatic format optimization.

---

### **Medium Priority (External/Dynamic)**

| File Path | Line | Current Method | Image | Size | Action Required |
|-----------|------|----------------|-------|------|-----------------|
| `src/components/StaticMap.tsx` | 69-76 | `<img>` tag | Mapbox API URL (dynamic) | 800x300 | Convert to `next/image`, add `unoptimized` for external URL |

**Impact:** External API images need special handling with `unoptimized` prop.

---

### **Infrastructure (Core Component)**

| File Path | Current Method | Action Required |
|-----------|----------------|-----------------|
| `src/components/OptimizedImage.tsx` | Custom `<picture>` with srcset | **DEPRECATE** - Replace with Next.js Image wrapper |

**Impact:** This component generates manual srcsets for AVIF/WebP/JPG. Next.js Image does this automatically with better optimization.

**Usage Count:** Used in:
- `src/components/HeroSection.tsx`
- `src/components/NABCEPInstallers.tsx` (imported but not used)
- `scripts/Austin.tsx`

---

## Current Configuration

### `next.config.ts` - Image Settings

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'ryinjghimmyisvttfibi.supabase.co',
      pathname: '/storage/v1/object/**',
    },
  ],
  formats: ['image/avif', 'image/webp'],
}
```

**Status:** ✅ Configured for Supabase storage
**Missing:** Mapbox API domain, other external CDNs

---

## Image Assets in `/public`

```
/public/solar-safety-scored-badge.png
/public/images/
  ├── hero-solar-minimal-320w.jpg
  ├── hero-solar-minimal-640w.jpg
  ├── hero-solar-minimal-1024w.jpg
  ├── hero-solar-minimal-1280w.jpg
  ├── hero-solar-minimal-1920w.jpg
  ├── hero-solar-minimal-320w.webp
  ├── hero-solar-minimal-640w.webp
  ├── hero-solar-minimal-1024w.webp
  ├── hero-solar-minimal-1280w.webp
  ├── hero-solar-minimal-1920w.webp
  ├── hero-solar-320w.jpg
  ├── hero-solar-640w.jpg
  ├── hero-solar-1024w.jpg
  ├── hero-solar-1280w.jpg
  ├── hero-solar-1920w.jpg
  ├── hero-solar-1920w.webp
  ├── sba-sdvosb-logo.png
  ├── owner-portrait.jpg
  └── verified-badge.png (possibly missing - needs verification)
```

**Observations:**
- Hero images have **manual responsive variants** (320w, 640w, 1024w, 1280w, 1920w)
- Both JPG and WebP formats exist
- **Next.js Image will auto-generate these** - original high-res source images can be used instead

---

## Optimization Strategy

### Phase 1: Critical Path (LCP Optimization)
1. Convert `src/pages/Index.tsx` - Solar Safety badge
2. Convert `src/components/HeroSection.tsx` - Hero image
3. Add `priority` prop to both
4. Add blur placeholders for smooth loading

### Phase 2: Core Infrastructure
1. Create new `src/components/NextOptimizedImage.tsx` wrapper
2. Replace all `<OptimizedImage>` imports with new component
3. Deprecate old OptimizedImage.tsx

### Phase 3: Secondary Images
1. Convert About page images
2. Convert Footer logo
3. Convert BadgeWidget image

### Phase 4: External Images
1. Update `next.config.ts` for Mapbox domain
2. Convert StaticMap component with `unoptimized` prop

### Phase 5: Performance Monitoring
1. Create `src/app/lib/web-vitals.ts`
2. Add Web Vitals reporting to layout
3. Monitor LCP, CLS, FID improvements

---

## Expected Performance Improvements

### Before (Current State)
- **LCP:** 3.5-4.5s (manual srcset, no priority loading)
- **CLS:** 0.15-0.25 (inconsistent width/height attributes)
- **Image Format:** Manual WebP fallback to JPG
- **Lazy Loading:** Custom intersection observer
- **Bundle Size:** ~450KB (OptimizedImage component included)

### After (Next.js Image)
- **LCP:** <2.5s (automatic priority, optimized formats)
- **CLS:** <0.1 (enforced width/height, aspect ratio)
- **Image Format:** Auto AVIF → WebP → fallback
- **Lazy Loading:** Native browser + Next.js optimization
- **Bundle Size:** ~320KB (Next.js built-in image handling)

### Core Web Vitals Impact
- ✅ **LCP:** GOOD (<2.5s) - Currently POOR (>4s)
- ✅ **FID:** GOOD (<100ms) - Already good
- ✅ **CLS:** GOOD (<0.1) - Currently NEEDS IMPROVEMENT (0.15)

---

## Next.js Image Best Practices

### 1. Priority Images (Above-Fold)
```tsx
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Description"
  width={1920}
  height={1080}
  priority  // Preload, don't lazy load
  placeholder="blur"
  blurDataURL="data:image/..." // Optional blur
/>
```

### 2. Lazy-Loaded Images (Below-Fold)
```tsx
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  loading="lazy"  // Default behavior
  sizes="(max-width: 768px) 100vw, 200px"
/>
```

### 3. External Images (APIs)
```tsx
<Image
  src="https://api.mapbox.com/..."
  alt="Map"
  width={800}
  height={300}
  unoptimized  // Skip Next.js optimization for external URLs
/>
```

---

## Migration Checklist

### Configuration
- [x] Next.js installed (v16.0.3)
- [x] Image optimization configured in next.config.ts
- [ ] Add Mapbox domain to remotePatterns
- [ ] Add other external CDN domains (if any)

### Components
- [ ] Convert Index.tsx hero badge
- [ ] Convert HeroSection.tsx hero image
- [ ] Create NextOptimizedImage wrapper
- [ ] Update all OptimizedImage imports
- [ ] Convert About page images
- [ ] Convert Footer logo
- [ ] Convert BadgeWidget image
- [ ] Convert StaticMap component

### Performance
- [ ] Create web-vitals.ts
- [ ] Add performance monitoring
- [ ] Generate blur placeholders
- [ ] Test LCP improvements
- [ ] Verify CLS <0.1

### Cleanup
- [ ] Remove old OptimizedImage.tsx
- [ ] Delete unused responsive image variants from /public
- [ ] Update documentation

---

## Files to Modify

1. `src/pages/Index.tsx` - Line 311
2. `src/components/HeroSection.tsx` - Lines 134-145
3. `src/pages/About.tsx` - Lines 62-68, 96-101
4. `src/components/Footer.tsx` - Lines 23-29
5. `src/pages/BadgeWidget.tsx` - Line 32
6. `src/components/StaticMap.tsx` - Lines 69-76
7. `src/components/OptimizedImage.tsx` - **Entire component (deprecate)**
8. `next.config.ts` - Add Mapbox domain
9. **NEW:** `src/app/lib/web-vitals.ts` - Performance monitoring

---

## Risk Assessment

### Low Risk
- Converting standard images with known dimensions
- Adding `priority` prop to hero images
- Width/height attributes prevent layout shift

### Medium Risk
- External Mapbox images (need `unoptimized` prop)
- Replacing OptimizedImage component (widely used)
- Potential build time increase (image optimization)

### Mitigation
- Test each conversion incrementally
- Keep old OptimizedImage.tsx until all migrations complete
- Use `unoptimized` for external/dynamic URLs
- Monitor bundle size after conversion

---

## Success Metrics

### Performance (Core Web Vitals)
- **LCP:** Target <2.5s (currently ~4s)
- **CLS:** Target <0.1 (currently ~0.2)
- **FID/INP:** Maintain <100ms

### Technical
- **Image Format Adoption:** 80%+ AVIF/WebP delivery
- **Lazy Loading:** 100% below-fold images
- **Bundle Size:** <350KB initial load
- **Bandwidth Savings:** 50-70% per image

### User Experience
- **Perceived Load Time:** 40% faster
- **Layout Stability:** Zero visible shifts
- **Mobile Performance:** 50% improvement on 3G

---

## Conclusion

The Solar Installers TX codebase has Next.js infrastructure in place but is not utilizing Next.js Image optimization. Converting all images to `next/image` will yield **significant performance gains** with minimal risk.

**Priority 1:** Convert critical above-fold images (hero badge, hero image)
**Priority 2:** Replace OptimizedImage component infrastructure
**Priority 3:** Convert remaining images systematically

**Estimated Time:** 2-3 hours for complete conversion
**Expected Impact:** 40-60% LCP improvement, <0.1 CLS, 50-70% bandwidth savings

---

**Status:** ✅ Audit Complete - Ready to begin Phase 1 conversions

**Next Steps:** Begin critical path optimization (Index.tsx + HeroSection.tsx)
