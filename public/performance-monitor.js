
// Core Web Vitals monitoring
function sendToAnalytics(metric) {
  // Note: Vercel Analytics automatically tracks Core Web Vitals
  // Custom tracking disabled to avoid conflicts
  console.log('Web Vital:', metric.name, metric.value, metric.id);
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
