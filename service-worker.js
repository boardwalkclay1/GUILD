// ===============================
// GUILD SERVICE WORKER — v6 (FINAL + CLEAN + CORRECT PATHS)
// ===============================

const CACHE_NAME = "guild-cache-v6";

const ASSETS = [

  // ROOT FILES
  "index.html",
  "the-guild.png",
  "favicon.ico",
  "manifest.json",

  // GUILD CORE FILES (INSIDE /guild/)
  "guild/guild-style.css",
  "guild/guild-engine.js",

  // CORE GUILD PAGES
  "guild/guild.html",
  "guild/glossary.html",
  "guild/golden-rules.html",
  "guild/guild-discipline.html",
  "guild/inside-the-guild.html",
  "guild/guild-family.html",
  "guild/training-hall.html",
  "guild/gf-paywall.html",
  "guild/guild-goldenformula.html",
  "guild/arena-secrets.html",
  "guild/guild-entry.html",

  // TRAINING MODULES
  "guild/chart-patterns.html",
  "guild/training/patterns/pattern-level1.html",
  "guild/training/patterns/pattern-level2.html",
  "guild/training/patterns/pattern-level3.html",
  "guild/training/patterns/pattern-level4.html",

  "guild/training/accessing-options.html",
  "guild/training/accessing-options/banks.html",
  "guild/training/accessing-options/brokers.html",
  "guild/training/accessing-options/simulator.html",

  // TRAINING JS
  "guild/training/js/patterns-level1.js",
  "guild/training/js/patterns-level2.js",
  "guild/training/js/patterns-level3.js",
  "guild/training/js/patterns-level4.js",
  "guild/training/js/accessing-options.js",

  // ICONS
  "guild/icons/icon-door.svg",
  "guild/icons/icon-dragon.svg",
  "guild/icons/icon-arena.svg",
  "guild/icons/icon-forge.svg",
  "guild/icons/icon-purse.svg",

  // BACKGROUNDS
  "guild/image/Arcadium.jpg",
  "guild/image/Armory.jpeg",
  "guild/image/Aurum-Veritas.jpg",
  "guild/image/Porta-Imperii.jpg",
  "guild/image/Tributum.jpg",
  "guild/image/Vestry.jpg",
  "guild/image/apotheosis-chamber.jpg",
  "guild/image/gladiator-forum.jpg",
  "guild/image/strategy-chamber.jpg",
  "guild/guild-background-gold.png"
];

// INSTALL — cache everything
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
