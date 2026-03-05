self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("guild-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "guild-style.css",
        "guild-logo.png",
        "manifest.json",

        // Cinematic Backgrounds
        "Arcadium.jpg",
        "Armory.jpeg",
        "Aurum-Veritas.jpg",
        "Porta-Imperii.jpg",
        "Tributum.jpg",
        "Vestry.jpg",
        "apotheosis-chamber.jpg",
        "gladiator-forum.jpg",
        "strategy-chamber.jpg"
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
