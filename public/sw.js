
const CACHE_NAME = 'solarinstallerstx-' + (new Date().toISOString().split('T')[0]);
const STATIC_CACHE = 'static-' + (new Date().toISOString().split('T')[0]);
const API_CACHE = 'api-' + (new Date().toISOString().split('T')[0]);
const IMAGE_CACHE = 'images-' + (new Date().toISOString().split('T')[0]);

const PRECACHE_URLS = [
  '/',
  '/about',
  '/contact',
  '/faq',
  '/texas-guide',
  '/installers.json',
  '/critical.css',
  '/resource-hints.html',
  '/site.webmanifest'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)),
      caches.open(IMAGE_CACHE),
      caches.open(API_CACHE)
    ])
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, API_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => !currentCaches.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  // Claim any clients that loaded before the service worker was activated
  return self.clients.claim();
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    // Return cached response and update cache in background
    if (navigator.onLine) {
      fetch(request)
        .then(networkResponse => {
          if (networkResponse.ok) {
            cache.put(request, networkResponse);
          }
        })
        .catch(() => {});
    }
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (request.method === 'GET' && networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
  }
  return new Response('Network error happened', {
    status: 408,
    headers: { 'Content-Type': 'text/plain' },
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Apply different strategies based on request type
  if (request.mode === 'navigate') {
    // Network-first strategy for navigation requests with offline fallback
    event.respondWith(
      networkFirst(request, STATIC_CACHE)
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Cache-first for static assets
  if (/.(?:js|css|woff2?|json|webmanifest)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Cache-first with background refresh for images
  if (/.(?:png|jpg|jpeg|gif|svg|webp|avif)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Network-first for API requests (Supabase and Mapbox)
  if (url.hostname.includes('supabase.co') || url.hostname.includes('mapbox.com')) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // Default to network-first for everything else
  event.respondWith(networkFirst(request, STATIC_CACHE));
});
