// ===============================
// GUILD SERVICE WORKER — FINAL FIXED VERSION
// ===============================

const CACHE_NAME = "guild-cache-v4";  // bump version to force refresh

const ASSETS = [
  "index.html",
  "guild-style.css",
  "guild-engine.js",
  "manifest.json",

  // Icons
  "the-guild.png",   // <-- NEW main icon for PWA + Home Screen
  "favicon.ico",

  // Cinematic Backgrounds (correct folder path)
  "image/Arcadium.jpg",
  "image/Armory.jpeg",
  "image/Aurum-Veritas.jpg",
  "image/Porta-Imperii.jpg",
  "image/Tributum.jpg",
  "image/Vestry.jpg",
  "image/apotheosis-chamber.jpg",
  "image/gladiator-forum.jpg",
  "image/strategy-chamber.jpg",

  // Guild Seals / Fog / Pillars
  "image/guild-seal.png",
  "image/fog.png",
  "image/guild-pillar.png"
];

// INSTALL — cache everything fresh
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // activate immediately
});

// ACTIVATE — delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // take control of all pages
});

// FETCH — network first, fallback to cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match(event.request))
  );
});
