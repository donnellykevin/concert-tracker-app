self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('concert-app').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js'
      ]);
    })
  );
});