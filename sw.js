const CACHE_NAME = 'jp-0.0.8';
const urlsToCache = [
  '/',
  '/index.html',
  '/settings.html',
  '/manifest.json',
  '/assets/css/jp.css',
  '/assets/js/jp.js',
  '/assets/js/pwa.js',
  '/assets/img/cross.png',
  '/assets/img/hail-mary.jpg',
  '/assets/img/jesus.jpg',
  '/assets/img/jesusprayer.png',
  '/assets/img/lords-prayer.jpg',
  '/assets/img/mary.jpg',
  '/assets/img/app-icons/gear.svg',
  '/assets/img/app-icons/moon-fill.svg',
  '/assets/img/app-icons/moon.svg',
  '/assets/img/app-icons/orthodox-cross.svg',
  '/assets/img/app-icons/sun-fill.svg',
  '/assets/img/app-icons/sun.svg',
  '/assets/img/app-icons/toggle-off.svg',
  '/assets/img/app-icons/toggle-on.svg',
  '/assets/img/app-icons/x-circle.svg',
  '/assets/img/app-icons/orthodox-cross-192x192.png',
  '/assets/img/app-icons/orthodox-cross-512x512.png',
  '/assets/img/app-icons/orthodox-cross-512x512-filled.png'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(() => {
                // Optional: return an offline page or placeholder image later.
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('message', event => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});