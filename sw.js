const CACHE_NAME = 'jesus-prayer-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/settings.html',
  '/assets/css/jp.css',
  '/assets/js/jp.js',
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
  '/assets/img/app-icons/orthodox-cross-192x192.png',
  '/assets/img/app-icons/orthodox-cross-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});