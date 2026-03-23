// ================================
// GUILD ENGINE — CLEAN + CLOUDFLARE CORRECT
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

  // ============================================
  // 7. AUTH SYSTEM — CLOUDFLARE READY
  // ============================================

  const WORKER_URL = "https://guild-work.boardwalkclay1.workers.dev";

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

    async verifyWithWorker() {
      const username = this.currentUser();
      if (!username) return false;

      try {
        const res = await fetch(`${WORKER_URL}/api/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username })
        });

        const data = await res.json();
        if (!data.ok) return false;

        localStorage.setItem("guild_unlock_until", data.unlock_until);
        return true;

      } catch (err) {
        console.error("Worker check failed:", err);
        return false;
      }
    },

    async enforceProtection() {
      const path = window.location.pathname;

      // Only protect Cloudflare Pages guild folder
      if (!path.startsWith("/guild/")) return;

      // Allowed without login
      const safePages = [
        "/guild/guild-entry.html",
        "/guild/after-payment.html",
        "/guild/having-second-thoughts.html",
        "/guild/login.html"
      ];

      if (safePages.includes(path)) return;

      // Not logged in
      if (!this.isLoggedIn()) {
        window.location.href = "/guild/login.html";
        return;
      }

      // Expired
      const unlockUntil = Number(localStorage.getItem("guild_unlock_until"));
      if (Date.now() > unlockUntil) {
        alert("Your access has expired. Renew in the Inner Hall.");
        localStorage.clear();
        window.location.href = "/guild/guild-entry.html";
        return;
      }

      // Worker verification
      const ok = await this.verifyWithWorker();
      if (!ok) {
        alert("Session invalid. Please log in again.");
        localStorage.clear();
        window.location.href = "/guild/login.html";
      }
    }
  };

  // Enforce protection
  window.GuildAuth.enforceProtection();

  // 8. Global go() — Cloudflare-safe
  window.go = function (nextPage) {
    const overlay = document.createElement("div");
    overlay.className = "colosseum-transition";
    document.body.appendChild(overlay);

    setTimeout(() => {
      window.location.href = nextPage;
    }, 650);
  };
});
