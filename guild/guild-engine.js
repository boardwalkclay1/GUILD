// ================================
// GUILD ENGINE — CLEAN REBUILD
// ================================

document.addEventListener("DOMContentLoaded", () => {

  // 0. Per-page background
  const body = document.body;
  const bgImage = body.getAttribute("data-bg");
  if (bgImage) {
    document.documentElement.style.setProperty(
      "--page-bg-url",
      `url("${bgImage}")`
    );
  }

  // 1. Fog Layers
  const fogBack = document.createElement("div");
  fogBack.className = "fog-layer fog-back";

  const fogFront = document.createElement("div");
  fogFront.className = "fog-layer fog-front";

  document.body.appendChild(fogBack);
  document.body.appendChild(fogFront);

  // 2. Pillars
  const leftPillar = document.createElement("div");
  leftPillar.className = "pillar pillar-left";

  const rightPillar = document.createElement("div");
  rightPillar.className = "pillar pillar-right";

  document.body.appendChild(leftPillar);
  document.body.appendChild(rightPillar);

  // 3. Golden Scroll
  const scroll = document.createElement("div");
  scroll.className = "gold-scroll";
  scroll.innerHTML = `<h1 class="scroll-title">${document.title}</h1>`;
  document.body.appendChild(scroll);

  setTimeout(() => scroll.classList.add("open"), 300);

  // 4. Lightning
  setInterval(() => {
    const flash = document.createElement("div");
    flash.className = "lightning-flash";
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
  }, 6000 + Math.random() * 4000);

  // 5. Page Transitions
  document.querySelectorAll(".page-link").forEach(link => {
    link.addEventListener("click", e => {
      if (link.target === "_blank") return;
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => (window.location.href = link.href), 600);
    });
  });

  // 6. Dynamic Style Controls
  window.GuildStyle = {
    setFogOpacity(v) {
      document.documentElement.style.setProperty("--fog-opacity", v);
    },
    setBackgroundBlur(px) {
      document.documentElement.style.setProperty("--bg-blur", px + "px");
    },
    setPillarOpacity(v) {
      document.documentElement.style.setProperty("--pillar-opacity", v);
    },
    setBackgroundOpacity(v) {
      document.documentElement.style.setProperty("--bg-opacity", v);
    }
  };

  // 7. Authentication System
  window.GuildAuth = {
    master: "Guild Master",

    isLoggedIn() {
      return localStorage.getItem("guild_member") === "paid";
    },

    currentUser() {
      return localStorage.getItem("guild_username");
    },

    isMaster() {
      return this.currentUser() === this.master;
    },

    enforceProtection() {
      const path = window.location.pathname;

      // Only protect pages inside /guild/
      const insideGuild = path.includes("/guild/");
      if (!insideGuild) return;

      // Allow these pages without login
      const safePages = [
        "/guild/guild-entry.html"
      ];

      if (safePages.some(p => path.endsWith(p))) return;

      // If not logged in → send to Gates (index.html)
      if (!this.isLoggedIn()) {
        window.location.href = "../index.html";
        return;
      }

      // Expiration check
      const unlockUntil = Number(localStorage.getItem("guild_unlock_until"));
      if (Date.now() > unlockUntil) {
        alert("Your access has expired. Renew in the Inner Hall.");
        window.location.href = "guild-entry.html";
      }
    }
  };

  // Enforce protection
  window.GuildAuth.enforceProtection();

  // 8. Global go() transition
  window.go = function (nextPage) {
    const overlay = document.createElement("div");
    overlay.className = "colosseum-transition";
    document.body.appendChild(overlay);

    setTimeout(() => {
      window.location.href = nextPage;
    }, 650);
  };
});
