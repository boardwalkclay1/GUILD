// ===============================
// GUILD MASTER SERVICE WORKER — FINAL CLEAN VERSION
// ===============================

const CACHE_NAME = "guild-master-cache-v3";

const ASSETS = [

  // --- ROOT FILES ---
  "index.html",
  "guild-style.css",
  "guild-engine.js",
  "the-guild.png",
  "favicon.ico",

  // --- GUILD PAGES ---
  "guild.html",
  "glossary.html",
  "golden-rules.html",
  "guild-discipline.html",
  "inside-the-guild.html",
  "guild-family.html",
  "training-hall.html",
  "gf-paywall.html",
  "guild-goldenformula.html",

  // --- GUILD BACKGROUNDS ---
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

// INSTALL — cache only files inside THIS repo
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(ASSETS)
    )
  );
  self.skipWaiting();
});

// ACTIVATE — remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// FETCH — network first, fallback to cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(res => res)
      .catch(() => caches.match(event.request))
  );
});
