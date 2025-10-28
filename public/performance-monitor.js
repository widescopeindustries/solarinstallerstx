
// Performance data queue
let queue = [];
const MAX_QUEUE_SIZE = 10;
const ENDPOINT = 'https://vitals.vercel-insights.com/v1/vitals';

// Send metrics to analytics
function sendToAnalytics(metric) {
  const data = {
    dsn: window.ENV_ANALYTICS_ID, // Your analytics ID
    id: metric.id || crypto.randomUUID(),
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.name === 'CLS' ? metric.value * 1000 : metric.value,
    speed: navigator.connection?.effectiveType || '',
    connection: navigator.connection?.type || '',
    deviceMemory: navigator.deviceMemory || '',
    hardwareConcurrency: navigator.hardwareConcurrency || '',
    deviceType: /mobile|tablet|ipad/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    timestamp: Date.now()
  };

  // Add to queue
  queue.push(data);

  // Send if queue is full or if it's a critical metric
  if (queue.length >= MAX_QUEUE_SIZE || ['LCP', 'FID', 'CLS'].includes(metric.name)) {
    const body = JSON.stringify({ metrics: queue });
    queue = [];

    // Using navigator.sendBeacon for better reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, body);
    } else {
      fetch(ENDPOINT, {
        body,
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Also send to Google Analytics if available
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// Measure Core Web Vitals and other performance metrics
function measureWebVitals() {
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    sendToAnalytics({
      name: 'LCP',
      value: lastEntry.startTime,
      id: lastEntry.id
    });
  }).observe({ entryTypes: ['largest-contentful-paint'], buffered: true });

  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      sendToAnalytics({
        name: 'FID',
        value: entry.processingStart - entry.startTime,
        id: entry.id
      });
    });
  }).observe({ entryTypes: ['first-input'], buffered: true });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  let clsEntries = [];
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        const firstSessionEntry = clsEntries.length === 0;
        const maxSessionGap = 1000;
        const maxSessionDuration = 5000;

        if (firstSessionEntry || entry.startTime - clsEntries[clsEntries.length - 1].startTime < maxSessionGap) {
          clsEntries.push(entry);
        } else {
          clsValue += getSessionValue(clsEntries);
          clsEntries = [entry];
        }

        if (entry.startTime - clsEntries[0].startTime >= maxSessionDuration) {
          clsValue += getSessionValue(clsEntries);
          clsEntries = [entry];
        }
      }
    }
    
    if (clsEntries.length > 0) {
      sendToAnalytics({
        name: 'CLS',
        value: getSessionValue(clsEntries),
        id: 'cls-' + Math.random().toString(36).slice(2)
      });
    }
  }).observe({ entryTypes: ['layout-shift'] });

  // Time to First Byte (TTFB)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (entry.name === window.location.href) {
        sendToAnalytics({
          name: 'TTFB',
          value: entry.responseStart - entry.requestStart,
          id: 'ttfb-' + Math.random().toString(36).slice(2)
        });
      }
    });
  }).observe({ entryTypes: ['navigation'] });

  // First Contentful Paint (FCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      sendToAnalytics({
        name: 'FCP',
        value: entry.startTime,
        id: entry.id
      });
    });
  }).observe({ entryTypes: ['paint'], buffered: true });

  // Long Tasks
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (entry.duration > 50) { // Only report tasks longer than 50ms
        sendToAnalytics({
          name: 'LONG_TASK',
          value: entry.duration,
          id: 'lt-' + Math.random().toString(36).slice(2)
        });
      }
    });
  }).observe({ entryTypes: ['longtask'] });
}

// Helper function to calculate CLS session value
function getSessionValue(entries) {
  return entries
    .reduce((sum, entry) => sum + entry.value, 0);
}
}

// Error monitoring
window.addEventListener('error', (event) => {
  sendToAnalytics({
    name: 'JS_ERROR',
    value: 1,
    id: 'error-' + Math.random().toString(36).slice(2),
    error: {
      message: event.message,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno
    }
  });
});

window.addEventListener('unhandledrejection', (event) => {
  sendToAnalytics({
    name: 'PROMISE_ERROR',
    value: 1,
    id: 'promise-error-' + Math.random().toString(36).slice(2),
    error: {
      message: event.reason?.message || String(event.reason)
    }
  });
});

// Resource timing
function observeResourceTiming() {
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
        sendToAnalytics({
          name: 'API_TIMING',
          value: entry.duration,
          id: 'api-' + Math.random().toString(36).slice(2),
          api: {
            url: entry.name,
            initiator: entry.initiatorType,
            duration: entry.duration,
            startTime: entry.startTime
          }
        });
      }
    });
  }).observe({ entryTypes: ['resource'] });
}

// Initialize monitoring
function initMonitoring() {
  measureWebVitals();
  observeResourceTiming();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMonitoring);
} else {
  initMonitoring();
}
