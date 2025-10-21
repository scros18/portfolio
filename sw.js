// Service Worker for Aggressive Caching - Sam Croston Portfolio
// Version 1.2.0 - Performance Optimized

const CACHE_NAME = 'sam-portfolio-v1.2.0';
const RUNTIME_CACHE = 'sam-portfolio-runtime-v1.2.0';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/dist/main.js',
  '/favicon.svg',
  '/site.webmanifest'
];

// Assets to cache on first use
const RUNTIME_ASSETS = [
  '/favicon-16.png',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/favicon-192.png',
  '/favicon-512.png'
];

// Cache-first strategy for these extensions
const CACHE_EXTENSIONS = [
  '.css',
  '.js',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.webp',
  '.woff',
  '.woff2',
  '.ttf',
  '.json',
  '.webmanifest'
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (only cache same-origin)
  // Let browser handle font caching via HTTP headers to avoid CSP violations
  if (url.origin !== location.origin) {
    return;
  }

  // HTML - Network-first with cache fallback (always fresh)
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Static assets - Cache-first (maximum performance)
  if (shouldCache(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAME));
    return;
  }

  // Everything else - Network-first
  event.respondWith(networkFirstStrategy(request));
});

// Cache-first strategy (instant load from cache, update in background)
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    // Return cached version immediately
    // Update cache in background (stale-while-revalidate)
    updateCache(request, cache).catch(() => {}); // Fire and forget
    return cached;
  }

  // Not in cache, fetch from network and cache it
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Network failed, return offline page or error
    return new Response('Offline - Asset not cached', { status: 503 });
  }
}

// Network-first strategy (for HTML and dynamic content)
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // No cache available
    return new Response('Offline', { status: 503 });
  }
}

// Update cache in background
async function updateCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
  } catch (error) {
    // Ignore update errors
  }
}

// Check if URL should be cached
function shouldCache(pathname) {
  return CACHE_EXTENSIONS.some(ext => pathname.endsWith(ext));
}

// Message handler for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
      })
    );
  }
});
