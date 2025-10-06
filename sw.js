const CACHE = 'cope-v2';
const ASSETS = ['/', '/index.html','/styles.css','/app.js','/offline.html','/icons/cope-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/offline.html')))
  );
});
