/**
 * Performance optimization utilities
 * Improves FCP, LCP, and reduces TBT
 */

/**
 * Preload critical routes for faster navigation
 */
export const preloadCriticalRoutes = () => {
  if (typeof window === 'undefined') return;

  const criticalRoutes = [
    '/cities/austin',
    '/cities/dallas',
    '/cities/houston',
    '/cities/san-antonio',
  ];

  // Use requestIdleCallback for non-blocking prefetch
  const prefetchRoute = (route: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    link.as = 'document';
    document.head.appendChild(link);
  };

  if ('requestIdleCallback' in window) {
    criticalRoutes.forEach(route => {
      requestIdleCallback(() => prefetchRoute(route), { timeout: 2000 });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      criticalRoutes.forEach(prefetchRoute);
    }, 1000);
  }
};

/**
 * Defer non-critical CSS loading
 */
export const deferNonCriticalCSS = () => {
  if (typeof window === 'undefined') return;

  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
  linkElements.forEach((link: Element) => {
    const htmlLink = link as HTMLLinkElement;
    // Skip critical CSS
    if (!htmlLink.href.includes('critical') && !htmlLink.dataset.critical) {
      htmlLink.media = 'print';
      htmlLink.onload = () => {
        htmlLink.media = 'all';
      };
    }
  });
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImages = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;

          if (src) img.src = src;
          if (srcset) img.srcset = srcset;

          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
};

/**
 * Report Web Vitals to Google Analytics
 */
export const reportWebVitals = () => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  const reportMetric = (metric: any) => {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  };

  // Import web-vitals dynamically
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onCLS(reportMetric);
    onFID(reportMetric);
    onFCP(reportMetric);
    onLCP(reportMetric);
    onTTFB(reportMetric);
  }).catch(() => {
    // web-vitals not available, skip reporting
  });
};

/**
 * Optimize third-party scripts loading
 */
export const optimizeThirdPartyScripts = () => {
  if (typeof window === 'undefined') return;

  // Delay analytics until user interaction or 3 seconds
  let analyticsLoaded = false;

  const loadAnalytics = () => {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    // Analytics is already loaded in index.html, just track interaction
    if ((window as any).gtag) {
      (window as any).gtag('event', 'user_engaged', {
        event_category: 'engagement',
      });
    }
  };

  // Load on first user interaction
  ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
    window.addEventListener(event, loadAnalytics, { once: true, passive: true });
  });

  // Fallback: load after 3 seconds
  setTimeout(loadAnalytics, 3000);
};

/**
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Run after page load
  window.addEventListener('load', () => {
    // Use requestIdleCallback for non-critical tasks
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        preloadCriticalRoutes();
        lazyLoadImages();
        reportWebVitals();
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        preloadCriticalRoutes();
        lazyLoadImages();
        reportWebVitals();
      }, 1000);
    }
  });

  // Optimize third-party scripts on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeThirdPartyScripts);
  } else {
    optimizeThirdPartyScripts();
  }
};
