const CACHE_NAME = 'uk-theory-test-v1';
const ASSETS = [
  '/',
  '/car/',
  '/motorcycle/',
  '/lorry/',
  '/manifest.json',
  '/assets/icon.svg',
  '/assets/css/landing.css',
  '/assets/css/main.css',
  '/car/assets/css/main.css',
  '/motorcycle/assets/css/main.css',
  '/lorry/assets/css/main.css',
  '/car/assets/js/app.js',
  '/car/assets/js/data.js',
  '/car/assets/js/signs-v2.js',
  '/motorcycle/assets/js/app.js',
  '/motorcycle/assets/js/data.js',
  '/motorcycle/assets/js/signs.js',
  '/lorry/assets/js/app.js',
  '/lorry/assets/js/data.js',
  '/lorry/assets/js/signs.js',
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
