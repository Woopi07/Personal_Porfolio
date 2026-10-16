/* =========================================================
   Portfolio — interactions
   ========================================================= */
(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const EASE = "cubic-bezier(.22, 1, .36, 1)";

  const C = { ink: "#000000", wine: "#8E1616", sand: "#E8C999", cream: "#F8EEDF" };

  /* =======================================================
     Project data — replace art with real images by setting
     `images: ["assets/work/xyz-1.jpg", ...]` on any project.
     ======================================================= */
  const CATEGORY_LABEL = {
    uiux: "UI/UX & Web",
    social: "Esports & Social Media",
  };

  const projects = [
    {
      id: "ptsi",
      tags: ["Web Design", "Front-end", "Responsive", "Vercel"],
      landscape: true,
      title: "PTSI Corporate Website",
      category: "uiux",
      summary: "Corporate website for an IT solutions company since 1993.",
      description: "A modern corporate website for Productivity Technologies Services, Inc. (PTSI), an IT products and services provider since 1993. Bold navy-and-amber branding, a clear “Solutions that Transform” message and an embedded company video present over three decades of experience with confidence.",
      client: "Productivity Technologies Services, Inc.",
      year: "2026",
      role: "Web Designer & Developer",
      scope: "Site structure and navigation, hero and page design, responsive front-end development and deployment — covering About Us, Partners, Products, Services, News, Careers and Contact.",
      deliverables: ["Information architecture & navigation", "Hero with company video", "Products, services & partners pages", "News, careers & contact pages", "Responsive build deployed on Vercel"],
      links: [{ label: "Visit Live Site", url: "https://ptsiwebsite.vercel.app" }],
      images: ["assets/work/web/ptsi-home.webp"],
      cover: "30% 50%",
      art: ["ui"],
      mark: "PT",
    },
    {
      id: "aurora-match-day",
      tags: ["Photoshop", "Photo Manipulation", "Templates", "Esports"],
      title: "Aurora Gaming — Match Day",
      category: "social",
      summary: "Match results, schedules and hype posters for MPL PH Season 18.",
      description: "Match-day graphics for Aurora Gaming in MPL Philippines Season 18 — from pre-game hype to final scores. Every post shares one cinematic teal system, so wins, losses and announcements all feel unmistakably Aurora in the feed.",
      client: "Aurora Gaming",
      year: "2026",
      role: "Graphic Designer",
      scope: "Pre-game announcement posters, best-of-three result templates for wins and losses, defeat recap posters and the full Season 18 match schedule — built as reusable templates so posts could go live right after each match.",
      deliverables: ["Match result templates (win & loss)", "Defeat recap poster", "Season 18 match schedule", "“Battle of World Champions” match-day poster", "Sponsor-ready layouts (Infinix)"],
      links: [],
      images: ["assets/work/aurora/match-result.webp", "assets/work/aurora/world-champions.webp", "assets/work/aurora/match-result-loss.webp", "assets/work/aurora/defeat-poster.webp", "assets/work/aurora/match-schedule.webp"],
      cover: "50% 18%",
      art: ["esports"],
      mark: "AG",
    },
    {
      id: "bsaid",
      tags: ["Game UI", "Pixel Art", "Front-end", "Vercel"],
      landscape: true,
      title: "BSAid — FAR1 Visual Novel",
      category: "uiux",
      summary: "Retro pixel-art site for a game that teaches accounting.",
      description: "The website for BSAid, a visual novel adventure that teaches Financial Accounting and Reporting 1 — one case file, one journal entry at a time. A retro arcade look (pixel clouds, neon grid, a game-style menu) turns a dry subject into something students want to click into.",
      client: "BSAid",
      year: "2026",
      role: "Web Designer & Developer",
      scope: "Visual direction, landing page and section design, responsive front-end build, and a playable in-browser menu with keyboard controls (↑↓ to select, Enter to confirm) leading into Case #01.",
      deliverables: ["Retro pixel-art visual system", "Landing page with game-style menu", "About, Story, Gameplay, Case Files & Help sections", "Play-online & download flows", "Responsive build deployed on Vercel"],
      links: [{ label: "Visit Live Site", url: "https://bs-aid-website.vercel.app" }],
      images: ["assets/work/web/bsaid-home.webp"],
      cover: "50% 40%",
      art: ["ui"],
      mark: "BS",
    },
    {
      id: "aurora-road-to-100k",
      tags: ["Campaign", "Compositing", "Social Media"],
      title: "Aurora Gaming — Road to 100K",
      category: "social",
      summary: "Follower milestone campaign, from cinematic to LEGO.",
      description: "A follower-goal campaign counting a player’s journey to 100,000 followers. Each update takes a fresh creative angle — from a moody mountain-and-moon composite to a playful LEGO minifigure — while the progress tracker keeps the series connected.",
      client: "Aurora Gaming",
      year: "2026",
      role: "Graphic Designer",
      scope: "Milestone campaign concept, progress-tracker system and photo manipulation for each follower-goal update.",
      deliverables: ["Follower goal posts", "Progress tracker graphics", "Photo manipulation & compositing"],
      links: [],
      images: ["assets/work/aurora/follower-goal-lego.webp", "assets/work/aurora/follower-goal.webp"],
      cover: "50% 30%",
      art: ["social"],
      mark: "AG",
    },
    {
      id: "aurora-hero-builds",
      tags: ["Layout", "Compositing", "MLBB"],
      title: "Aurora Gaming — Hero Build Guides",
      category: "social",
      summary: "MLBB hero build & emblem guides featuring the roster.",
      description: "Educational posts that pair a player with their signature Mobile Legends hero — item build, emblems and battle spell laid out so fans can copy the setup at a glance.",
      client: "Aurora Gaming",
      year: "2026",
      role: "Graphic Designer",
      scope: "Build & emblem guide layout, hero artwork compositing and player photo integration.",
      deliverables: ["Hero build & emblem guides", "Item, emblem & spell icon systems", "Player × hero composites"],
      links: [],
      images: ["assets/work/aurora/eudora-build.webp", "assets/work/aurora/rafaela-build.webp"],
      cover: "50% 35%",
      art: ["esports"],
      mark: "AG",
    },
  ];

  /* =======================================================
     Certifications — add one object per certificate.
     `image` (certificate scan, opens in a lightbox), `url` (verify link),
     `credential` (ID) and `skills` are optional.
     ======================================================= */
  const certifications = [
    {
      title: "Networking Basics",
      issuer: "Cisco Networking Academy",
      date: "22 Jul 2026",
      credential: "53cb3c21-70f5-4dea-8356-8ab1cdc25133",
      image: "assets/certs/cisco-networking-basics.webp",
      skills: ["Networking", "TCP/IP", "Network Devices"],
    },
  ];

  /* =======================================================
     Generative placeholder artwork (SVG) in the site palette
     ======================================================= */
  let artUid = 0;
  function makeArt(kind, mark, v = 0) {
    const id = `g${++artUid}`;
    const bgA = v % 2 ? C.wine : C.ink;
    const bgB = v % 2 ? C.ink : C.wine;
    const defs = `<defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bgA}"/><stop offset="1" stop-color="${bgB}"/>
      </linearGradient></defs>
      <rect width="400" height="300" fill="url(#${id})"/>`;
    let body = "";

    switch (kind) {
      case "brand":
        body = `
          <circle cx="${300 - v * 40}" cy="70" r="120" fill="${C.sand}" opacity=".18"/>
          <g transform="rotate(-10 140 170)">
            <rect x="50" y="110" width="180" height="108" rx="8" fill="${C.cream}"/>
            <circle cx="95" cy="164" r="26" fill="${C.ink}"/>
            <text x="95" y="171" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="20" fill="${C.cream}">${mark}</text>
            <rect x="135" y="150" width="70" height="8" rx="4" fill="${C.ink}"/>
            <rect x="135" y="166" width="48" height="6" rx="3" fill="${C.sand}"/>
          </g>
          <g transform="rotate(8 280 180)">
            <rect x="200" y="120" width="160" height="96" rx="8" fill="${C.ink}" stroke="${C.sand}" stroke-opacity=".5"/>
            <text x="280" y="178" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="34" fill="${C.cream}">${mark}</text>
          </g>`;
        break;

      case "packaging":
        body = [0, 1, 2].map((i) => {
          const x = 80 + i * 120, h = 150 - (i === 1 ? 0 : 20);
          return `
          <g>
            <rect x="${x - 42}" y="${250 - h}" width="84" height="${h}" rx="14" fill="${C.cream}" opacity="${i === 1 ? 1 : .85}"/>
            <rect x="${x - 46}" y="${238 - h}" width="92" height="22" rx="6" fill="${C.sand}"/>
            <circle cx="${x}" cy="${250 - h / 2}" r="28" fill="${C.ink}"/>
            <text x="${x}" y="${256 - h / 2}" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="15" fill="${C.cream}">${mark}</text>
            <rect x="${x - 24}" y="${270 - h / 2 + 22}" width="48" height="5" rx="2.5" fill="${C.wine}"/>
          </g>`;
        }).join("") + `<rect x="0" y="250" width="400" height="50" fill="${C.ink}" opacity=".7"/>`;
        break;

      case "ui":
        body = `
          <rect x="34" y="34" width="332" height="232" rx="12" fill="${C.ink}" stroke="${C.sand}" stroke-opacity=".5"/>
          <rect x="34" y="34" width="332" height="26" rx="12" fill="${C.wine}"/>
          <circle cx="52" cy="47" r="4" fill="${C.sand}"/><circle cx="66" cy="47" r="4" fill="${C.sand}"/><circle cx="80" cy="47" r="4" fill="${C.cream}"/>
          <text x="58" y="104" font-family="Fredoka,sans-serif" font-weight="700" font-size="${v ? 22 : 28}" fill="${C.cream}">${v ? "STUDIO WORK" : "DESIGN THAT"}</text>
          <text x="58" y="${v ? 128 : 134}" font-family="Fredoka,sans-serif" font-weight="700" font-size="${v ? 22 : 28}" fill="none" stroke="${C.sand}">${v ? "& JOURNAL" : "MOVES."}</text>
          <rect x="58" y="152" width="80" height="22" rx="11" fill="${C.cream}"/>
          <rect x="226" y="80" width="116" height="100" rx="10" fill="${C.sand}" opacity=".85"/>
          <circle cx="284" cy="130" r="26" fill="${C.cream}" opacity=".9"/>
          ${[0, 1, 2].map((i) => `<rect x="${58 + i * 98}" y="196" width="88" height="52" rx="8" fill="${C.wine}"/><rect x="${66 + i * 98}" y="230" width="50" height="6" rx="3" fill="${C.sand}"/>`).join("")}`;
        break;

      case "phone":
        body = [0, 1].map((i) => {
          const x = 110 + i * 110, y = i ? 50 : 30;
          return `
          <g>
            <rect x="${x}" y="${y}" width="120" height="236" rx="22" fill="${C.ink}" stroke="${C.cream}" stroke-opacity=".6" stroke-width="2"/>
            <rect x="${x + 44}" y="${y + 10}" width="32" height="6" rx="3" fill="${C.wine}"/>
            <text x="${x + 14}" y="${y + 44}" font-family="Fredoka,sans-serif" font-weight="700" font-size="14" fill="${C.cream}">${i ? "Progress" : "Today"}</text>
            ${i
              ? `<circle cx="${x + 60}" cy="${y + 104}" r="36" fill="none" stroke="${C.wine}" stroke-width="10"/>
                 <circle cx="${x + 60}" cy="${y + 104}" r="36" fill="none" stroke="${C.cream}" stroke-width="10" stroke-dasharray="160 230" transform="rotate(-90 ${x + 60} ${y + 104})"/>
                 <text x="${x + 60}" y="${y + 110}" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="16" fill="${C.cream}">72%</text>`
              : `<rect x="${x + 14}" y="${y + 58}" width="92" height="64" rx="12" fill="${C.sand}"/>
                 <text x="${x + 24}" y="${y + 98}" font-family="Fredoka,sans-serif" font-weight="700" font-size="22" fill="${C.ink}">${mark}</text>`}
            ${[0, 1, 2].map((r) => `<rect x="${x + 14}" y="${y + 140 + r * 28}" width="92" height="20" rx="8" fill="${C.wine}"/><rect x="${x + 22}" y="${y + 148 + r * 28}" width="${30 + r * 14}" height="4" rx="2" fill="${C.cream}" opacity=".7"/>`).join("")}
          </g>`;
        }).join("");
        break;

      case "esports":
        body = `
          <polygon points="0,300 0,190 400,40 400,300" fill="${C.sand}" opacity=".2"/>
          <polygon points="0,300 0,240 400,120 400,300" fill="${C.wine}"/>
          <polygon points="150,40 250,40 220,260 120,260" fill="${C.cream}" opacity=".08"/>
          <text x="200" y="${v ? 150 : 140}" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="${v ? 46 : 50}" font-style="italic" fill="${C.cream}">${v ? "VICTORY" : "MATCH DAY"}</text>
          <text x="200" y="${v ? 190 : 190}" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="30" fill="none" stroke="${C.sand}" stroke-width="1.5">${mark} vs RX · 2—1</text>
          <rect x="140" y="214" width="120" height="26" rx="4" fill="${C.cream}" transform="skewX(-14)"/>
          <text x="200" y="232" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="800" font-size="12" letter-spacing="3" fill="${C.ink}">LIVE 19:00</text>`;
        break;

      case "social":
        body = Array.from({ length: 9 }, (_, i) => {
          const col = i % 3, row = Math.floor(i / 3);
          const x = 60 + col * 96, y = 12 + row * 96;
          const fill = [C.cream, C.sand, C.wine][(i + v) % 3];
          const ink = fill === C.cream ? C.ink : C.cream;
          const shape = i % 4 === 0
            ? `<text x="${x + 44}" y="${y + 54}" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="22" fill="${ink}">${mark}</text>`
            : i % 4 === 1
              ? `<circle cx="${x + 44}" cy="${y + 44}" r="22" fill="${ink}" opacity=".85"/>`
              : i % 4 === 2
                ? `<rect x="${x + 16}" y="${y + 30}" width="56" height="8" rx="4" fill="${ink}"/><rect x="${x + 16}" y="${y + 46}" width="36" height="8" rx="4" fill="${ink}" opacity=".6"/>`
                : `<polygon points="${x + 44},${y + 18} ${x + 70},${y + 66} ${x + 18},${y + 66}" fill="${ink}" opacity=".85"/>`;
          return `<rect x="${x}" y="${y}" width="88" height="88" rx="6" fill="${fill}"/>${shape}`;
        }).join("");
        break;

      case "vector": {
        const sun = v === 1 ? C.cream : C.sand;
        body = `
          <circle cx="${v === 1 ? 120 : 270}" cy="110" r="56" fill="${sun}"/>
          <polygon points="0,300 0,200 90,120 170,210 250,140 400,250 400,300" fill="${C.wine}"/>
          <polygon points="0,300 0,250 120,180 230,260 330,200 400,240 400,300" fill="${C.sand}" opacity=".7"/>
          <polygon points="0,300 0,280 140,240 260,290 400,260 400,300" fill="${C.ink}"/>
          ${[0, 1, 2, 3].map((i) => `<path d="M${40 + i * 24} ${60 + (i % 2) * 10} q 8 -8 16 0 q 8 -8 16 0" fill="none" stroke="${C.cream}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`).join("")}`;
        break;
      }

      case "character":
        body = `
          <circle cx="200" cy="150" r="118" fill="${C.sand}" opacity=".22"/>
          <rect x="140" y="170" width="120" height="130" rx="50" fill="${C.cream}"/>
          <circle cx="200" cy="128" r="62" fill="${C.cream}"/>
          <path d="M140 118 q 10 -70 60 -66 q 54 -4 62 62 q -30 -30 -62 -20 q -34 -14 -60 24z" fill="${C.ink}"/>
          <circle cx="178" cy="136" r="7" fill="${C.ink}"/><circle cx="222" cy="136" r="7" fill="${C.ink}"/>
          <path d="M184 160 q 16 ${v ? 18 : 12} 32 0" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
          <circle cx="166" cy="154" r="8" fill="${C.sand}" opacity=".6"/><circle cx="234" cy="154" r="8" fill="${C.sand}" opacity=".6"/>
          <text x="200" y="250" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="26" fill="${C.ink}">${mark}</text>`;
        break;

      case "layout":
      default:
        body = `
          <rect x="40" y="46" width="320" height="208" rx="4" fill="${C.cream}"/>
          <line x1="200" y1="46" x2="200" y2="254" stroke="${C.sand}" stroke-width="2"/>
          <rect x="56" y="64" width="128" height="96" fill="${v ? C.sand : C.wine}"/>
          <text x="58" y="186" font-family="Fredoka,sans-serif" font-weight="700" font-size="18" fill="${C.ink}">${v ? "OUR STORY" : "ANNUAL"}</text>
          ${[0, 1, 2, 3].map((i) => `<rect x="58" y="${198 + i * 12}" width="${120 - (i % 2) * 30}" height="5" rx="2" fill="${C.wine}" opacity=".6"/>`).join("")}
          <text x="216" y="96" font-family="Fredoka,sans-serif" font-weight="700" font-size="34" fill="${C.ink}">${mark}</text>
          ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="216" y="${112 + i * 12}" width="${126 - (i % 3) * 22}" height="5" rx="2" fill="${C.wine}" opacity=".6"/>`).join("")}
          <rect x="216" y="204" width="60" height="34" fill="${C.sand}"/><rect x="282" y="204" width="60" height="34" fill="${C.ink}"/>`;
    }

    return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${defs}${body}</svg>`;
  }

  const mediaFor = (p, i) =>
    p.images && p.images[i]
      ? `<img src="${p.images[i]}" alt="${p.title} — image ${i + 1}" loading="lazy" decoding="async"${p.cover ? ` style="object-position:${p.cover}"` : ""} />`
      : makeArt(p.art[i % p.art.length], p.mark, i);

  /* =======================================================
     Render project showcases (alternating rows with an image deck)
     ======================================================= */
  const webList = $("#webList");
  const designList = $("#designList");
  const wall = $("#workWall");
  const arrowSVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  const chevron = (dir) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}"/></svg>`;
  const pad = (n) => String(n).padStart(2, "0");
  const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const imageCount = (p) => (p.images ? p.images.length : 1);

  const showcaseHTML = (p, i) => {
    const n = imageCount(p);
    const site = p.landscape && p.links && p.links[0];
    const slides = Array.from({ length: n }, (_, k) =>
      `<div class="sc-slide" data-pos="${k}">${mediaFor(p, k)}</div>`).join("");
    return `
    <article class="showcase${p.landscape ? " is-landscape" : ""}" data-cat="${p.category}" data-id="${p.id}" data-reveal>
      <div class="sc-stage-wrap">
        <div class="sc-stage" data-tilt-card data-slides="${n}" data-current="0" role="button" tabindex="0"
             aria-label="Open project: ${p.title}">
          ${site ? `<div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>${host(site.url)}</span></div>` : ""}
          <div class="sc-deck">${slides}</div>
        </div>
        ${n > 1 ? `
        <div class="sc-controls">
          <button class="sc-btn" data-step="-1" aria-label="Previous image">${chevron(-1)}</button>
          <span class="sc-counter"><b>01</b> / ${pad(n)}</span>
          <button class="sc-btn" data-step="1" aria-label="Next image">${chevron(1)}</button>
          <span class="sc-progress" aria-hidden="true"><i></i></span>
        </div>` : ""}
      </div>
      <div class="sc-info">
        <span class="sc-index" aria-hidden="true">${pad(i + 1)}</span>
        <span class="tag">${CATEGORY_LABEL[p.category]}</span>
        <h3 class="sc-title">${p.title}</h3>
        <p class="sc-desc">${p.description}</p>
        <dl class="sc-meta">
          <div><dt>Client</dt><dd>${p.client}</dd></div>
          <div><dt>Role</dt><dd>${p.role}</dd></div>
          <div><dt>Year</dt><dd>${p.year}</dd></div>
        </dl>
        <ul class="sc-tags">${(p.tags || []).map((t) => `<li>${t}</li>`).join("")}</ul>
        <div class="sc-actions">
          <button class="btn btn-sm btn-primary" data-project="${p.id}" data-magnetic>View case study ${arrowSVG}</button>
          ${site ? `<a class="btn btn-sm btn-ghost" href="${site.url}" target="_blank" rel="noopener" data-magnetic>Visit live site ↗</a>` : ""}
        </div>
      </div>
    </article>`;
  };
  const webProjects = projects.filter((p) => p.category === "uiux");
  const designProjects = projects.filter((p) => p.category === "social");
  webList.innerHTML = webProjects.map(showcaseHTML).join("");
  designList.innerHTML = designProjects.map(showcaseHTML).join("");

  // Every image as its own tile in a masonry wall
  const wallItems = designProjects.flatMap((p) =>
    Array.from({ length: imageCount(p) }, (_, k) => ({ p, k })));
  wall.innerHTML = wallItems.map(({ p, k }, i) => `
    <button class="wall-item${p.landscape ? " is-landscape" : ""}" data-project="${p.id}" data-index="${k}" data-cat="${p.category}"
            data-reveal style="--d:${(i % 4) * 0.06}s" aria-label="Open ${p.title}, image ${k + 1}">
      ${mediaFor(p, k).replace(/ style="object-position:[^"]*"/, "")}
      <span class="wall-cap"><b>${p.title}</b><small>${CATEGORY_LABEL[p.category]}</small></span>
    </button>`).join("");
  $("#wallCount").textContent = wallItems.length;

  // Certificates
  const certLogo = `<svg viewBox="0 0 120 120" aria-hidden="true"><g transform="translate(0 2)"><path d="M28 92V28H45L60 52L75 28H92V92H76V58L64 76H56L44 58V92Z"/><rect x="55" y="25" width="10" height="10" transform="rotate(45 60 30)"/></g></svg>`;
  $("#certGrid").innerHTML = certifications.map((c, i) => `
    <article class="cert${c.placeholder ? " is-placeholder" : ""}" data-tilt data-reveal style="--d:${i * 0.08}s">
      ${c.image
        ? `<button class="cert-media" data-cert="${i}" aria-label="View ${c.title} certificate">
             <img src="${c.image}" alt="${c.title} certificate from ${c.issuer}" loading="lazy" />
             <span class="cert-zoom">View certificate</span>
           </button>`
        : `<div class="cert-media">${certLogo}</div>`}
      <div class="cert-body">
        <span class="cert-date">${c.date}</span>
        <h3>${c.title}</h3>
        <p>${c.issuer}</p>
        ${c.skills ? `<ul class="cert-skills">${c.skills.map((k) => `<li>${k}</li>`).join("")}</ul>` : ""}
        ${c.credential ? `<p class="cert-id">ID · ${c.credential}</p>` : ""}
        ${c.url ? `<a class="cert-link" href="${c.url}" target="_blank" rel="noopener">Verify credential ↗</a>` : ""}
      </div>
    </article>`).join("");

  // Certificate lightbox
  const lightbox = $("#certLightbox");
  const lightboxImg = $("img", lightbox);
  let lbReturn = null;
  const closeLightbox = () => {
    if (!lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lbReturn) lbReturn.focus({ preventScroll: true });
  };
  $("#certGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cert]");
    if (!btn) return;
    const c = certifications[+btn.dataset.cert];
    lbReturn = btn;
    lightboxImg.src = c.image;
    lightboxImg.alt = `${c.title} certificate from ${c.issuer}`;
    $(".lightbox-cap", lightbox).textContent = `${c.title} · ${c.issuer} · ${c.date}`;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => $(".lightbox-close", lightbox).focus(), 60);
  });
  $$("[data-lb-close]", lightbox).forEach((el) => el.addEventListener("click", closeLightbox));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---- image decks: arrows, swipe, keyboard, autoplay while visible ---- */
  const AUTOPLAY_MS = 3600;
  const setDeck = (stage, next) => {
    const n = +stage.dataset.slides;
    const cur = ((next % n) + n) % n;
    stage.dataset.current = cur;
    $$(".sc-slide", stage).forEach((sl, k) => { sl.dataset.pos = (k - cur + n) % n; });
    const wrap = stage.closest(".sc-stage-wrap");
    const counter = wrap && $(".sc-counter b", wrap);
    if (counter) counter.textContent = pad(cur + 1);
    const bar = wrap && $(".sc-progress i", wrap);
    if (bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
  };

  $$(".showcase").forEach((row) => {
    const stage = $(".sc-stage", row);
    const n = +stage.dataset.slides;
    const open = () => openModal(row.dataset.id, stage, +stage.dataset.current);
    stage.addEventListener("click", open);
    stage.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      if (n > 1 && e.key === "ArrowRight") setDeck(stage, +stage.dataset.current + 1);
      if (n > 1 && e.key === "ArrowLeft") setDeck(stage, +stage.dataset.current - 1);
    });
    if (n < 2) return;

    $$(".sc-btn", row).forEach((b) => b.addEventListener("click", () => {
      setDeck(stage, +stage.dataset.current + +b.dataset.step);
      row.classList.add("is-paused-by-user");
    }));

    // swipe
    let sx = null;
    stage.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    stage.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) {
        stage.dataset.swiped = "1";
        setDeck(stage, +stage.dataset.current + (dx < 0 ? 1 : -1));
        row.classList.add("is-paused-by-user");
      }
    });
    stage.addEventListener("click", (e) => {
      if (stage.dataset.swiped) { e.stopImmediatePropagation(); delete stage.dataset.swiped; }
    }, true);

    // autoplay only while on screen and not hovered
    if (reduceMotion) { row.classList.add("no-autoplay"); return; }
    let timer = null;
    const tick = () => {
      if (!row.matches(":hover") && !row.classList.contains("is-paused-by-user") && !document.hidden)
        setDeck(stage, +stage.dataset.current + 1);
    };
    new IntersectionObserver(([en]) => {
      clearInterval(timer);
      row.classList.toggle("is-playing", en.isIntersecting);
      if (en.isIntersecting) timer = setInterval(tick, AUTOPLAY_MS);
    }, { threshold: 0.45 }).observe(row);
  });

  /* =======================================================
     Header: scrolled state + active section highlighting
     ======================================================= */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navLinks = $$(".nav-link");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);

  const setActive = (id) =>
    navLinks.forEach((a) => {
      const on = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });

  // Pick the section crossing an imaginary line 35% down the viewport.
  const updateActive = () => {
    const line = window.innerHeight * 0.35;
    let current = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1].id;
    setActive(current);
  };
  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);

  // Mobile menu
  const menuToggle = $("#menuToggle");
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  };
  menuToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.forEach((a) => a.addEventListener("click", closeMenu));

  /* =======================================================
     Scroll reveal
     ======================================================= */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
  $$("[data-reveal]").forEach((el) => revealIO.observe(el));

  // Timeline progress line
  const timeline = $("#timeline");
  const updateTimeline = () => {
    const r = timeline.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
    timeline.style.setProperty("--progress", `${p * 100}%`);
  };
  updateTimeline();
  window.addEventListener("scroll", updateTimeline, { passive: true });

  /* =======================================================
     3D tilt (project cards, services, timeline) — pointer only
     ======================================================= */
  const addTilt = (el, max = 8, { glare = false } = {}) => {
    el.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.classList.add("is-tracking");
      el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
      if (glare) { el.style.setProperty("--mx", `${px * 100}%`); el.style.setProperty("--my", `${py * 100}%`); }
    });
    el.addEventListener("pointerleave", () => {
      el.classList.remove("is-tracking");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  };

  if (finePointer && !reduceMotion) {
    $$("[data-tilt-card]").forEach((el) => addTilt(el, 7, { glare: true }));
    $$("[data-tilt]").forEach((el) => {
      el.style.transform = "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))";
      el.style.transition = "transform .5s cubic-bezier(.22,1,.36,1), border-color .35s, background-color .35s";
      addTilt(el, 4);
    });
  }

  /* =======================================================
     Hero portrait: mouse-tracking depth
     ======================================================= */
  const stage = $("#portraitStage");
  const card = $(".portrait-card", stage);
  const glow = $(".hero-glow");
  const hero = $("#hero");

  if (finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
      stage.classList.add("is-tracking");
      card.style.setProperty("--ry", `${dx * 14}deg`);
      card.style.setProperty("--rx", `${-dy * 12}deg`);
      glow.style.setProperty("--gx", `${dx * 40}px`);
      glow.style.setProperty("--gy", `${dy * 40}px`);
    });
    hero.addEventListener("pointerleave", () => {
      stage.classList.remove("is-tracking");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      glow.style.setProperty("--gx", "0px");
      glow.style.setProperty("--gy", "0px");
    });
  } else if (!reduceMotion && window.DeviceOrientationEvent && !finePointer) {
    // Gentle gyroscope tilt on mobile where permission isn't required
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma == null) return;
      card.style.setProperty("--ry", `${Math.max(-12, Math.min(12, e.gamma / 3))}deg`);
      card.style.setProperty("--rx", `${Math.max(-10, Math.min(10, (e.beta - 45) / -4))}deg`);
    });
  }

  /* =======================================================
     Custom cursor + magnetic elements
     ======================================================= */
  if (finePointer && !reduceMotion) {
    const dot = $(".cursor-dot"), ring = $(".cursor-ring");
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      document.body.classList.add("has-cursor");
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    });
    document.addEventListener("pointerleave", () => document.body.classList.remove("has-cursor"));
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener("pointerover", (e) => {
      const t = e.target;
      document.body.classList.toggle("cursor-view", !!t.closest("[data-tilt-card], .wall-item"));
      document.body.classList.toggle("cursor-light", !!t.closest(".f-follow, .f-main"));
      document.body.classList.toggle("cursor-hover", !!t.closest("a, button, .pill, input, textarea, select, [data-tilt]") && !t.closest("[data-tilt-card], .wall-item"));
    });

    $$("[data-magnetic]").forEach((el) => {
      const strength = el.classList.contains("social") ? 0.45 : el.classList.contains("nav-link") ? 0.25 : 0.32;
      el.style.transition = (getComputedStyle(el).transition ? getComputedStyle(el).transition + ", " : "") + "transform .5s cubic-bezier(.22,1,.36,1)";
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* =======================================================
     Toast
     ======================================================= */
  const toastEl = $("#toast");
  let toastTimer;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2600);
  };

  /* =======================================================
     Project modal / lightbox
     ======================================================= */
  const modal = $("#projectModal");
  const modalHero = $("#modalHero");
  const modalThumbs = $("#modalThumbs");
  let lastFocus = null;

  const showSlide = (p, i) => {
    const site = p.landscape && p.links && p.links[0];
    const bar = site
      ? `<div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>${site.url.replace(/^https?:\/\//, "")}</span></div>`
      : "";
    modalHero.innerHTML = bar + mediaFor(p, i);
    modalHero.classList.toggle("is-browser", !!site);
    $$("button", modalThumbs).forEach((b, j) => {
      b.classList.toggle("is-active", j === i);
      b.setAttribute("aria-pressed", String(j === i));
    });
  };

  const openModal = (id, trigger, start = 0) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    lastFocus = trigger || document.activeElement;

    $("#modalTag").textContent = CATEGORY_LABEL[p.category];
    $("#modalTitle").textContent = p.title;
    $("#modalDesc").textContent = p.description;
    $("#modalClient").textContent = p.client;
    $("#modalYear").textContent = p.year;
    $("#modalRole").textContent = p.role;
    $("#modalScope").textContent = p.scope;
    $("#modalDeliverables").innerHTML = p.deliverables.map((d) => `<li>${d}</li>`).join("");
    $("#modalLinks").innerHTML = (p.links || []).map((l, i) =>
      `<a class="btn btn-sm ${i ? "btn-ghost" : "btn-primary"}" href="${l.url}" target="_blank" rel="noopener">${l.label} ${arrowSVG}</a>`).join("");

    const count = Math.max(p.art.length, (p.images || []).length);
    modalThumbs.innerHTML = Array.from({ length: count }, (_, i) =>
      `<button type="button" aria-label="Show image ${i + 1}">${mediaFor(p, i)}</button>`).join("");
    $$("button", modalThumbs).forEach((b, i) => b.addEventListener("click", () => showSlide(p, i)));
    modalThumbs.hidden = count < 2;
    $(".modal-panel", modal).classList.toggle("is-stacked", !!p.landscape);
    showSlide(p, Math.min(start, count - 1));

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    $(".modal-body", modal).scrollTop = 0;
    $(".modal-panel", modal).scrollTop = 0;
    setTimeout(() => $(".modal-close", modal).focus(), 60);
  };

  const closeModal = () => {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  [webList, designList, wall].forEach((root) => root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project]");
    if (btn) openModal(btn.dataset.project, btn, +(btn.dataset.index || 0));
  }));
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) {
      if (e.key === "Escape") closeMenu();
      return;
    }
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      // simple focus trap
      const f = $$("a[href], button:not([disabled])", modal).filter((x) => x.offsetParent !== null);
      const firstEl = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    }
  });

  /* =======================================================
     Copy email + contact form
     ======================================================= */
  const emailLink = $("#emailAddress");
  const email = emailLink.textContent.trim();

  $("#copyEmail").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = email; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      ta.remove();
    }
    toast("Email copied to clipboard");
  });

  // Messages are delivered to the inbox by FormSubmit (formsubmit.co); if that
  // service can't be reached, fall back to opening the visitor's email app.
  const FORM_ENDPOINT = `https://formsubmit.co/ajax/${email}`;
  const sendToInbox = async (fields) => {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _template: "table", _captcha: "false", ...fields }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || String(json.success) === "false") throw new Error(json.message || res.status);
  };
  const form = $("#contactForm");
  const submitBtn = $('button[type="submit"]', form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((input) => {
      const valid = input.value.trim() && (input.type !== "email" || /^\S+@\S+\.\S+$/.test(input.value));
      input.closest(".field").classList.toggle("has-error", !valid);
      if (!valid) ok = false;
    });
    if (!ok) { toast("Please fill in the highlighted fields"); return; }

    const data = new FormData(form);
    if (data.get("_honey")) return; // bot
    const subject = `[Portfolio] ${data.get("topic")} — ${data.get("name")}`;

    const label = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    try {
      await sendToInbox({
        name: data.get("name"),
        email: data.get("email"),
        topic: data.get("topic"),
        message: data.get("message"),
        _subject: subject,
        _replyto: data.get("email"),
      });
      toast("Message sent — I’ll get back to you soon!");
      form.reset();
    } catch (err) {
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast("Opening your email app instead…");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = label;
    }
  });
  $$("input, textarea", form).forEach((el) =>
    el.addEventListener("input", () => el.closest(".field").classList.remove("has-error")));

  // Footer quick email: "leave your email and I'll reach out"
  const quick = $("#quickForm");
  const quickInput = $("#quickEmail", quick);
  quick.addEventListener("submit", async (e) => {
    e.preventDefault();
    const val = quickInput.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(val)) {
      quick.classList.add("has-error");
      toast("Please enter a valid email");
      return;
    }
    if ($('[name="_honey"]', quick).value) return; // bot
    quick.classList.remove("has-error");
    const btn = $("button", quick);
    btn.disabled = true;
    try {
      await sendToInbox({
        email: val,
        message: "Wants to work together — left their email in the portfolio footer.",
        _subject: `[Portfolio] New contact request — ${val}`,
        _replyto: val,
      });
      toast("Got it — I’ll reach out soon!");
      quick.reset();
    } catch {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Let’s work together")}`;
      toast("Opening your email app instead…");
    } finally {
      btn.disabled = false;
    }
  });
  quickInput.addEventListener("input", () => quick.classList.remove("has-error"));

  // Footer buddy: the pupil follows the cursor
  const pupil = $(".buddy-pupil");
  const eye = $(".buddy-eye");
  if (pupil && !reduceMotion) {
    let raf = 0, px = 0, py = 0;
    const look = () => {
      raf = 0;
      const r = eye.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = px - cx, dy = py - cy;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260);
      pupil.style.transform = `translate(${(dx / d) * 17 * k}px, ${(dy / d) * 10 * k}px)`;
    };
    window.addEventListener("pointermove", (e) => {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(look);
    }, { passive: true });
  }

  $("#year").textContent = new Date().getFullYear();
})();
