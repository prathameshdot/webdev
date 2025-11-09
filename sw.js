// Simple service worker for Sangam Opticals
// - Precaches core assets
// - Provides cache-first strategy for navigation and static assets
// - Falls back to network when required

const CACHE_NAME = 'sangam-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/site.webmanifest',
  '/data/content.json',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png',
  '/assets/favicon-32x32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!currentCaches.includes(key)) return caches.delete(key);
        return null;
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // For navigation requests, try cache-first then network
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then(cached => cached || fetch(event.request))
    );
    return;
  }

  // For other requests, try cache first, then network, and update cache
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then(networkResponse => {
        // Only cache successful responses
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
          return networkResponse;
        }
        const cloned = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        return networkResponse;
      }).catch(() => {
        // Optionally return a fallback asset (could be offline page)
        return caches.match('/index.html');
      });
    })
  );
});

// Keep the service worker file small and dependency-free. For advanced caching,
// consider using Workbox and a build step to generate a precache manifest.
