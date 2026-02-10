// ================================
// GUILD ENGINE — CINEMATIC SYSTEM
// Controls fog, pillars, scrolls,
// lightning, transitions, and CSS
// ================================

document.addEventListener("DOMContentLoaded", () => {

  // 1. Inject Fog Layers
  const fogBack = document.createElement("div");
  fogBack.className = "fog-layer fog-back";

  const fogFront = document.createElement("div");
  fogFront.className = "fog-layer fog-front";

  document.body.appendChild(fogBack);
  document.body.appendChild(fogFront);

  // 2. Inject Pillars
  const leftPillar = document.createElement("div");
  leftPillar.className = "pillar pillar-left";

  const rightPillar = document.createElement("div");
  rightPillar.className = "pillar pillar-right";

  document.body.appendChild(leftPillar);
  document.body.appendChild(rightPillar);

  // 3. Golden Scroll Entry
  const scroll = document.createElement("div");
  scroll.className = "gold-scroll";
  scroll.innerHTML = `
    <h1 class="scroll-title">${document.title}</h1>
  `;
  document.body.appendChild(scroll);

  setTimeout(() => {
    scroll.classList.add("open");
  }, 300);

  // 4. Lightning Flashes
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
      setTimeout(() => window.location.href = link.href, 600);
    });
  });

  // 6. Dynamic CSS Manipulation
  window.GuildStyle = {
    setFogOpacity(value) {
      document.documentElement.style.setProperty("--fog-opacity", value);
    },
    setBackgroundBlur(px) {
      document.documentElement.style.setProperty("--bg-blur", px + "px");
    },
    setPillarOpacity(value) {
      document.documentElement.style.setProperty("--pillar-opacity", value);
    },
    setBackgroundOpacity(value) {
      document.documentElement.style.setProperty("--bg-opacity", value);
    }
  };

});
