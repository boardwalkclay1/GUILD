// ===============================
// GUILD MASTER SERVICE WORKER — WRAPS ALL REPOS
// ===============================

const CACHE_NAME = "guild-master-cache-v1";

// Assets from ALL repos (Guild, Trade_Alive, GoldenFormula)
const ASSETS = [

  // --- GUILD ROOT ---
  "/GUILD/index.html",
  "/GUILD/guild-style.css",
  "/GUILD/the-guild.png",
  "/GUILD/favicon.ico",

  // --- GUILD BACKGROUNDS ---
  "/GUILD/image/Arcadium.jpg",
  "/GUILD/image/Armory.jpeg",
  "/GUILD/image/Aurum-Veritas.jpg",
  "/GUILD/image/Porta-Imperii.jpg",
  "/GUILD/image/Tributum.jpg",
  "/GUILD/image/Vestry.jpg",
  "/GUILD/image/apotheosis-chamber.jpg",
  "/GUILD/image/gladiator-forum.jpg",
  "/GUILD/image/strategy-chamber.jpg",

  // --- TRADE_ALIVE (embed support) ---
  "/Trade_Alive/index.html",
  "/Trade_Alive/style.css",
  "/Trade_Alive/app.js",

  // --- GOLDEN FORMULA (embed support) ---
  "/goldenformula/simulator.html",
  "/goldenformula/style.css",
  "/goldenformula/app.js"
];

// INSTALL — safe caching (skips missing files)
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
