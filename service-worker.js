// ===============================
// GUILD SERVICE WORKER — CLEAN + VERIFIED
// ===============================

const CACHE_NAME = "guild-cache-v7";  // bump version to force refresh

const ASSETS = [
  "index.html",
  "guild-style.css",

  // Only include this if it actually exists
  // "guild-engine.js",

  // Icons
  "the-guild.png",
  "favicon.ico",

  // Backgrounds that DO exist in /image/
  "image/Arcadium.jpg",
  "image/Armory.jpeg",
  "image/Aurum-Veritas.jpg",
  "image/Porta-Imperii.jpg",
  "image/Tributum.jpg",
  "image/Vestry.jpg",
  "image/apotheosis-chamber.jpg",
  "image/gladiator-forum.jpg",
  "image/strategy-chamber.jpg"
];

// INSTALL — cache everything fresh
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        ASSETS.map(asset =>
          fetch(asset)
            .then(response => {
              if (!response.ok) throw new Error("Missing: " + asset);
              return cache.put(asset, response);
            })
            .catch(err => console.warn("[SW] Skipped:", asset))
        )
      )
    )
  );
  self.skipWaiting();
});

// ACTIVATE — delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH — network first, fallback to cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match(event.request))
  );
});
