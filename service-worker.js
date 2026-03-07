// ===============================
// GUILD SERVICE WORKER — CLEAN + CORRECT
// ===============================

const CACHE_NAME = "guild-cache-v4";

// Cache ONLY files that exist inside THIS repo
const ASSETS = [

  // ROOT
  "index.html",
  "guild-style.css",
  "guild-engine.js",
  "the-guild.png",
  "favicon.ico",
  "manifest.json",

  // GUILD PAGES
  "guild.html",
  "glossary.html",
  "golden-rules.html",
  "guild-discipline.html",
  "inside-the-guild.html",
  "guild-family.html",
  "training-hall.html",
  "gf-paywall.html",
  "guild-goldenformula.html",

  // BACKGROUNDS
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

// INSTALL — cache everything that exists in THIS repo
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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
