const CACHE_NAME = 'nouari-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://i.ibb.co/dKqg2r4/icon-192.png',
  'https://i.ibb.co/6Y4qJ1T/icon-512.png',
  'https://i.ibb.co/4WQ0k8P/compass-base.png',
  'https://i.ibb.co/2K2x6v3/compass-needle.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@700&family=Orbitron:wght@400..900&display=swap',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window'})
      .then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
  );
});