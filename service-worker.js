// ===============================
// GUILD SERVICE WORKER — FIXED
// ===============================

const CACHE_NAME = "guild-cache-v2";  // <-- version bump forces refresh

const ASSETS = [
  "index.html",
  "guild-style.css",
  "guild-logo.png",
  "manifest.json",

  // Backgrounds (correct folder path)
  "image/Arcadium.jpg",
  "image/Armory.jpeg",
  "image/Aurum-Veritas.jpg",
  "image/Porta-Imperii.jpg",
  "image/Tributum.jpg",
  "image/Vestry.jpg",
  "image/apotheosis-chamber.jpg",
  "image/gladiator-forum.jpg",
  "image/strategy-chamber.jpg",

  // Guild Seals / Icons (add these if used)
  "image/guild-seal.png",
  "image/fog.png",
  "image/guild-pillar.png"
];

// INSTALL — cache everything fresh
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // <-- forces immediate activation
});

// ACTIVATE — delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // <-- ensures new SW controls all pages
});

// FETCH — network first, fallback to cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
