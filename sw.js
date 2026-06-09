const CACHE_NAME = 'uk-theory-test-v2';
const ASSETS = [
  '/',
  '/car/',
  '/motorcycle/',
  '/lorry/',
  '/manifest.json',
  '/assets/icon.svg',
  '/assets/css/landing.css',
  '/assets/css/main-v9.css',
  '/car/assets/css/main-v9.css',
  '/motorcycle/assets/css/main-v9.css',
  '/lorry/assets/css/main-v9.css',
  '/car/assets/js/app-v14.js',
  '/car/assets/js/data-v2.js',
  '/car/assets/js/signs-v3.js',
  '/motorcycle/assets/js/app-v14.js',
  '/motorcycle/assets/js/data-v2.js',
  '/motorcycle/assets/js/signs-v3.js',
  '/lorry/assets/js/app-v14.js',
  '/lorry/assets/js/data-v2.js',
  '/lorry/assets/js/signs-v3.js',
];

// Install — cache core assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch — cache-first for static, network-first for API
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, clone);
            });
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
