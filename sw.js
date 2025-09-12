const CACHE_NAME = 'beasttaleforge-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/images/btf-logo.png',
    '/images/maizy-tunnel.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .catch(err => console.log('Cache failed:', err))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
            .catch(() => caches.match('/index.html'))
    );
});