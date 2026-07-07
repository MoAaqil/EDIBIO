// EdiStore PWA Service Worker
const CACHE_NAME = 'edistore-v1';
const ASSETS = [
  '/',
  '/manifest.json',
  '/logo.png'
];

self.addEventListener('install', (event) => {
  (event as any).waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  (event as any).respondWith(
    caches.match((event as any).request).then((cachedResponse) => {
      return cachedResponse || fetch((event as any).request);
    })
  );
});
