// ===============================
// GUILD MASTER SERVICE WORKER — FIXED PATHS
// ===============================

const CACHE_NAME = "guild-master-cache-v2";

const ASSETS = [

  // --- GUILD ROOT ---
  "index.html",
  "guild-style.css",
  "the-guild.png",
  "favicon.ico",

  // --- GUILD BACKGROUNDS ---
  "image/Arcadium.jpg",
  "image/Armory.jpeg",
  "image/Aurum-Veritas.jpg",
  "image/Porta-Imperii.jpg",
  "image/Tributum.jpg",
  "image/Vestry.jpg",
  "image/apotheosis-chamber.jpg",
  "image/gladiator-forum.jpg",
  "image/strategy-chamber.jpg",

  // --- TRADE_ALIVE ---
  "Trade_Alive/index.html",
  "Trade_Alive/style.css",
  "Trade_Alive/app.js",

  // --- GOLDEN FORMULA ---
  "goldenformula/simulator.html",
  "goldenformula/style.css",
  "goldenformula/app.js"
];

// INSTALL — safe caching
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        ASSETS.map(asset =>
          fetch(asset)
            .then(res => {
              if (!res.ok) throw new Error("Missing: " + asset);
              return cache.put(asset, res);
            })
            .catch(() => console.warn("[SW] Skipped:", asset))
        )
      )
    )
  );
  self.skipWaiting();
});

// ACTIVATE — clean old caches
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
