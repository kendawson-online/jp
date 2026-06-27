const CACHE_NAME = '0.1.1-beta';
const urlsToCache = [
  '/',
  '/index.html',
  '/settings.html',
  '/manifest.json',
  '/assets/css/base.css',
  '/assets/css/main.css',
  '/assets/css/settings.css',
  '/assets/js/app-state.js',
  '/assets/js/utils.js',
  '/assets/js/pwa.js',
  '/assets/js/ui-main.js',
  '/assets/js/ui-settings.js',
  '/assets/js/main.js',
  '/assets/js/settings.js',
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
  '/assets/img/app-icons/checkmark.svg',
  '/assets/img/app-icons/download.svg',
  '/assets/img/app-icons/orthodox-cross-192x192.png',
  '/assets/img/app-icons/orthodox-cross-512x512.png',
  '/assets/img/app-icons/orthodox-cross-512x512-filled.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});