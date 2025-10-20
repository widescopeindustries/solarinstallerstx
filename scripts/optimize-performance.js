import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Performance optimization script for Core Web Vitals
console.log('🚀 Starting Core Web Vitals optimization...');

// 1. Create service worker for caching
const serviceWorkerContent = `
const CACHE_NAME = 'solarinstallerstx-v1';
const urlsToCache = [
  '/',
  '/about',
  '/contact',
  '/faq',
  '/texas-guide',
  '/dist/assets/index.css',
  '/dist/assets/index.js',
  '/dist/assets/hero-solar-optimized.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;

fs.writeFileSync(path.join(__dirname, '../public/sw.js'), serviceWorkerContent);

// 2. Create critical CSS extraction script
const criticalCSSContent = `
/* Critical CSS for above-the-fold content */
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.hero-section { min-height: 100vh; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); }
.btn-primary { background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; }
.text-white { color: white; }
.text-center { text-align: center; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
`;

fs.writeFileSync(path.join(__dirname, '../public/critical.css'), criticalCSSContent);

// 3. Create resource hints file
const resourceHintsContent = `
<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="//api.mapbox.com">
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://api.mapbox.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical resources -->
<link rel="preload" href="/dist/assets/hero-solar-optimized.webp" as="image" type="image/webp">
<link rel="preload" href="/dist/assets/index.css" as="style">
<link rel="preload" href="/dist/assets/index.js" as="script">

<!-- Prefetch next page resources -->
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
