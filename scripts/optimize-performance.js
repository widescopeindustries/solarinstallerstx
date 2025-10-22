import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Performance optimization script for Core Web Vitals
console.log('🚀 Starting Core Web Vitals optimization...');

// 1. Create service worker for caching
const cacheVersion = `solarinstallerstx-${Date.now()}`;
const serviceWorkerContent = `
const CACHE_NAME = '${cacheVersion}';
const PRECACHE_URLS = [
  '/',
  '/about',
  '/contact',
  '/faq',
  '/texas-guide'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  if (request.method === 'GET' && networkResponse.status === 200) {
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  // Network-first for navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/'))
    );
    return;
  }

  // Cache-first for static assets and fonts
  const url = new URL(request.url);
  if (url.origin === self.location.origin || /\.(?:js|css|woff2?|png|jpg|jpeg|gif|svg|webp)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Network-first fallback for APIs (Supabase) and Mapbox
  if (url.hostname.includes('supabase.co') || url.hostname.includes('mapbox.com')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
`;

fs.writeFileSync(path.join(__dirname, '../public/sw.js'), serviceWorkerContent);

// 2. Create critical CSS extraction script
const criticalCSSContent = `
/* Critical CSS for above-the-fold shell */
html, body {
  margin: 0;
  padding: 0;
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  background-color: #0F172A;
  color: #F8FAFC;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero-gradient {
  background: linear-gradient(135deg, #0F172A 0%, #164E63 40%, #0EA5E9 100%);
  color: inherit;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 1.5rem;
}

.hero-subtitle {
  max-width: 640px;
  margin: 0 auto 2rem;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  line-height: 1.6;
  color: rgba(248, 250, 252, 0.85);
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #38BDF8, #0EA5E9);
  color: #0F172A;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 12px 25px rgba(14, 165, 233, 0.25);
}

.hero-cta span {
  display: inline-flex;
  align-items: center;
}

.hero-cta svg {
  width: 20px;
  height: 20px;
}
`;

fs.writeFileSync(path.join(__dirname, '../public/critical.css'), criticalCSSContent);

// 3. Create resource hints file
const resourceHintsContent = `
<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="//api.mapbox.com">
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link rel="dns-prefetch" href="//biuligjxffzdydlmnoqs.supabase.co">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://api.mapbox.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://biuligjxffzdydlmnoqs.supabase.co" crossorigin>

<!-- Prefetch helpful routes -->
<link rel="prefetch" href="/about">
<link rel="prefetch" href="/contact">
<link rel="prefetch" href="/faq">
`;

fs.writeFileSync(path.join(__dirname, '../public/resource-hints.html'), resourceHintsContent);

// 4. Create performance monitoring script
const performanceMonitorContent = `
// Core Web Vitals monitoring
function sendToAnalytics(metric) {
  // Send to Google Analytics or your analytics service
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// Measure Core Web Vitals
function measureWebVitals() {
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      sendToAnalytics({
        name: 'LCP',
        value: entry.startTime,
        id: entry.id
      });
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      sendToAnalytics({
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        id: entry.id
      });
    }
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    sendToAnalytics({
      name: 'CLS',
      value: clsValue,
      id: 'cls-measurement'
    });
  }).observe({ entryTypes: ['layout-shift'] });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', measureWebVitals);
} else {
  measureWebVitals();
}
`;

fs.writeFileSync(path.join(__dirname, '../public/performance-monitor.js'), performanceMonitorContent);

// 5. Create bundle analyzer configuration
const bundleAnalyzerConfig = `
module.exports = {
  analyzerMode: 'static',
  analyzerPort: 8888,
  openAnalyzer: false,
  generateStatsFile: true,
  statsFilename: 'bundle-stats.json',
  reportFilename: 'bundle-report.html',
  defaultSizes: 'parsed',
  excludeAssets: null,
  statsOptions: null,
  logLevel: 'info'
};
`;

fs.writeFileSync(path.join(__dirname, '../bundle-analyzer.config.js'), bundleAnalyzerConfig);

console.log('✅ Core Web Vitals optimization complete!');
console.log('📁 Files created:');
console.log('   - public/sw.js (Service Worker)');
console.log('   - public/critical.css (Critical CSS)');
console.log('   - public/resource-hints.html (Resource Hints)');
console.log('   - public/performance-monitor.js (Performance Monitoring)');
console.log('   - bundle-analyzer.config.js (Bundle Analysis)');
console.log('');
console.log('🚀 Next steps:');
console.log('   1. Register service worker in your main app');
console.log('   2. Include critical CSS inline in <head>');
console.log('   3. Add resource hints to your HTML');
console.log('   4. Include performance monitoring script');
console.log('   5. Run bundle analysis: npm run analyze');
