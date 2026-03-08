// ===============================
// GUILD SERVICE WORKER — v6 (FINAL + CLEAN)
// ===============================

const CACHE_NAME = "guild-cache-v6";

// Cache ONLY files that exist inside THIS repo
const ASSETS = [

  // ROOT FILES
  "index.html",
  "guild-style.css",
  "guild-engine.js",
  "the-guild.png",
  "favicon.ico",
  "manifest.json",

  // CORE GUILD PAGES
  "guild.html",
  "glossary.html",
  "golden-rules.html",
  "guild-discipline.html",
  "inside-the-guild.html",
  "guild-family.html",
  "training-hall.html",
  "gf-paywall.html",
  "guild-goldenformula.html",
  "arena-secrets.html",

  // TRAINING MODULES (PATTERNS, OPTIONS, ETC.)
  "chart-patterns.html",
  "training/patterns/pattern-level1.html",
  "training/patterns/pattern-level2.html",
  "training/patterns/pattern-level3.html",
  "training/patterns/pattern-level4.html",

  "training/accessing-options.html",
  "training/accessing-options/banks.html",
  "training/accessing-options/brokers.html",
  "training/accessing-options/simulator.html",

  // TRAINING JS
  "training/js/patterns-level1.js",
  "training/js/patterns-level2.js",
  "training/js/patterns-level3.js",
  "training/js/patterns-level4.js",
  "training/js/accessing-options.js",

  // ICONS
  "icons/icon-door.svg",
  "icons/icon-dragon.svg",
  "icons/icon-arena.svg",
  "icons/icon-forge.svg",
  "icons/icon-purse.svg",

  // BACKGROUNDS
  "image/Arcadium.jpg",
  "image/Armory.jpeg",
  "image/Aurum-Veritas.jpg",
  "image/Porta-Imperii.jpg",
  "image/Tributum.jpg",
  "image/Vestry.jpg",
  "image/apotheosis-chamber.jpg",
  "image/gladiator-forum.jpg",
  "image/strategy-chamber.jpg",
  "guild-background-gold.png"
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
