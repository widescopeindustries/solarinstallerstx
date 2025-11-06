
const CACHE_NAME = 'solarinstallerstx-1762472606876';
const PRECACHE_URLS = [
  '/',
  '/about',
  '/contact',
  '/faq',
  '/texas-guide'
];

const STATIC_ASSET_REGEX = /\.(?:css|woff2?|png|jpg|jpeg|gif|svg|webp)$/i;

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
  if (!request.url.startsWith('http')) {
    return fetch(request);
  }
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  const contentType = networkResponse.headers.get('content-type') || '';
  if (
    request.method === 'GET' &&
    networkResponse.status === 200 &&
    !contentType.includes('text/html')
  ) {
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  if (!request.url.startsWith('http')) {
    return;
  }

  // Network-first for navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/'))
    );
    return;
  }

  const url = new URL(request.url);

  // Always fetch JS modules from the network to avoid serving stale HTML
  if (url.origin === self.location.origin && url.pathname.endsWith('.js')) {
    event.respondWith(fetch(request));
    return;
  }

  // Cache-first for static assets and fonts
  if (url.origin === self.location.origin && STATIC_ASSET_REGEX.test(url.pathname)) {
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
