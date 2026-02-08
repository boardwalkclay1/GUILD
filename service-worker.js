self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("guild-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "guild-style.css",
        "guild-logo.png",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
