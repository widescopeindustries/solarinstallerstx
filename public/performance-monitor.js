
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
