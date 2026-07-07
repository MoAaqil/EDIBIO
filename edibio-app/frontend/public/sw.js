// Service Worker for Edibio PWA
const CACHE_NAME = 'edibio-cache-v3'; // Bumped version

// Core assets to cache immediately
const PRECACHE_ASSETS = [
    '/',
    '/login',
    '/manifest.json',
    '/logo.png',
    '/favicon.ico',
];

// Patterns for dynamic caching
const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com';
const GOOGLE_FONTS_STATIC_URL = 'https://fonts.gstatic.com';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Pre-caching core assets');
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip Firebase/API calls (handled by Firebase SDK offline persistence)
    // We want to skip auth and firestore calls to let their own listeners handle it
    if (event.request.url.includes('firestore.googleapis.com') ||
        event.request.url.includes('identitytoolkit.googleapis.com')) return;

    // NETWORK-FIRST for Navigation requests (HTML pages)
    // This solves the ERR_FAILED issue by ensuring we always try the live site first
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match(event.request).then((cachedResponse) => {
                        return cachedResponse || caches.match('/') || Response.error();
                    });
                })
        );
        return;
    }

    // CACHE-FIRST for Assets (Images, Fonts, Scripts)
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Background refresh for non-fonts (Stale-While-Revalidate)
                if (!event.request.url.includes('fonts')) {
                    fetch(event.request).then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse.clone());
                            });
                        }
                    }).catch(() => { });
                }
                return cachedResponse;
            }

            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) return networkResponse;

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // If an asset fails and it's not in cache, just let it fail
            });
        })
    );
});
