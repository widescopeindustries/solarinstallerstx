# Next.js Image Optimization - Quick Reference Guide

## Quick Start

### Import
```tsx
import Image from 'next/image'
```

---

## Common Patterns

### 1. Hero Image (Above-Fold, Critical)
```tsx
<Image
  src="/hero.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  priority              // Loads immediately
  quality={85}          // Higher quality for hero
  sizes="(max-width: 768px) 100vw, 50vw"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Logo (Below-Fold)
```tsx
<Image
  src="/logo.png"
  alt="Company logo"
  width={200}
  height={100}
  loading="lazy"        // Default, can omit
  sizes="200px"
/>
```

### 3. Profile Photo
```tsx
<Image
  src="/portrait.jpg"
  alt="John Doe - CEO"
  width={300}
  height={400}
  quality={90}          // Higher quality for people
  loading="lazy"
  sizes="(max-width: 768px) 150px, 300px"
/>
```

### 4. External Image (CDN/API)
```tsx
<Image
  src="https://api.example.com/image.jpg"
  alt="External image"
  width={800}
  height={600}
  unoptimized          // Skip Next.js optimization
  loading="lazy"
/>
```

### 5. Responsive Container (Fill)
```tsx
<div className="relative w-full h-64">
  <Image
    src="/background.jpg"
    alt="Background"
    fill                 // Fills parent container
    className="object-cover"
    sizes="100vw"
  />
</div>
```

---

## Props Reference

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | string | ✅ | Image source (local or remote) |
| `alt` | string | ✅ | Alt text for accessibility |
| `width` | number | ✅* | Image width in pixels (*not required if `fill`) |
| `height` | number | ✅* | Image height in pixels (*not required if `fill`) |
| `priority` | boolean | ❌ | Load immediately (for LCP) |
| `loading` | 'lazy' \| 'eager' | ❌ | Lazy load (default) or eager |
| `quality` | number (1-100) | ❌ | Image quality (default: 75) |
| `sizes` | string | ❌ | Responsive sizes (important!) |
| `fill` | boolean | ❌ | Fill parent container |
| `placeholder` | 'blur' \| 'empty' | ❌ | Blur placeholder |
| `blurDataURL` | string | ❌ | Base64 blur image |
| `unoptimized` | boolean | ❌ | Skip optimization (external) |
| `className` | string | ❌ | CSS classes |

---

## When to Use What

### Use `priority` when:
- ✅ Image is above-fold
- ✅ Image is the LCP element
- ✅ Hero images
- ✅ Logo in header (sometimes)

**DON'T use on:**
- ❌ Below-fold images
- ❌ Footer content
- ❌ Lazy-loaded sections

### Use `quality` when:
- ✅ Hero images: 85-90
- ✅ Profile photos: 85-95
- ✅ Product images: 80-90
- ✅ Icons/logos: 75-80 (default)

### Use `unoptimized` when:
- ✅ External API images (Mapbox, Google Maps)
- ✅ Animated GIFs
- ✅ SVGs (use `<img>` instead)

### Use `fill` when:
- ✅ Background images
- ✅ Unknown dimensions
- ✅ Responsive containers
- ✅ Cover/contain layouts

---

## Sizes Attribute

**Critical for performance!** Tells browser which image size to load.

### Examples:

**Full-width on mobile, 50% on desktop:**
```tsx
sizes="(max-width: 768px) 100vw, 50vw"
```

**Fixed width:**
```tsx
sizes="200px"
```

**Different breakpoints:**
```tsx
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

**Responsive grid:**
```tsx
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

---

## Common Mistakes

### ❌ Missing width/height
```tsx
<Image src="/img.jpg" alt="Broken" />  // Error!
```

### ✅ Always provide dimensions
```tsx
<Image src="/img.jpg" alt="Good" width={800} height={600} />
```

---

### ❌ Using priority everywhere
```tsx
<Image src="/footer-logo.png" priority />  // Wasteful!
```

### ✅ Only use on critical images
```tsx
<Image src="/hero.jpg" priority />  // Good for LCP
<Image src="/footer-logo.png" loading="lazy" />  // Good for footer
```

---

### ❌ External images without unoptimized
```tsx
<Image src="https://api.mapbox.com/..." />  // May fail!
```

### ✅ Use unoptimized for external
```tsx
<Image src="https://api.mapbox.com/..." unoptimized />
```

---

### ❌ Missing sizes attribute
```tsx
<Image src="/img.jpg" width={1920} height={1080} />  // Browser loads full size!
```

### ✅ Always specify sizes
```tsx
<Image
  src="/img.jpg"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, 800px"  // Loads appropriate size
/>
```

---

## Performance Tips

### 1. Use JPEG for photos
- Smaller file size than PNG
- Better compression

### 2. Use PNG for logos/icons
- Better quality for text/graphics
- Transparency support

### 3. Optimize source images
- Don't upload 10MB originals
- Resize to max display size (e.g., 2048px)
- Compress before uploading

### 4. Add blur placeholders
- Prevents layout shift
- Improves perceived performance

### 5. Use correct aspect ratios
- Prevents layout shift
- Maintains image quality

---

## Debugging

### Check format delivery
1. Open DevTools → Network tab
2. Load page
3. Filter by images
4. Check "Type" column - should show `avif` or `webp`

### Check lazy loading
1. DevTools → Network tab
2. Scroll down page
3. Images should load as you scroll
4. Check "Waterfall" timing

### Check sizes
1. DevTools → Elements tab
2. Inspect image
3. Check `srcset` attribute
4. Should have multiple sizes (640w, 750w, etc.)

### Web Vitals
1. Console should show Web Vitals logs in dev mode
2. Look for LCP, CLS warnings
3. Check `priority` prop if LCP is poor

---

## Migration Checklist

When converting an `<img>` to `<Image>`:

1. ✅ Import `Image` from 'next/image'
2. ✅ Get image dimensions (width/height)
3. ✅ Add `alt` text
4. ✅ Add `sizes` attribute
5. ✅ Add `priority` if above-fold
6. ✅ Add `loading="lazy"` if below-fold
7. ✅ Add `unoptimized` if external
8. ✅ Test locally
9. ✅ Check Network tab for format

---

## Resources

- [Next.js Image Documentation](https://nextjs.org/docs/api-reference/next/image)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I Use WebP](https://caniuse.com/webp)
- [Can I Use AVIF](https://caniuse.com/avif)

---

## Support

For questions or issues:
1. Check Next.js Image docs
2. Review this quick reference
3. Check IMAGE_OPTIMIZATION_COMPLETE.md for detailed examples
4. Review Web Vitals console logs

**Agent 5 - Quick Reference Guide**
