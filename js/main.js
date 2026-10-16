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
    branding: "Visual Branding",
    uiux: "UI/UX & Web",
    social: "Esports & Social Media",
    vector: "Vector Art & Layouts",
  };

  const projects = [
    {
      id: "aurora-mpl-s18",
      title: "Aurora Gaming × MPL PH S18",
      category: "social",
      wide: true,
      summary: "Match-day and social media graphics for an MPL Philippines team.",
      description: "A season-long social media kit for Aurora Gaming in MPL Philippines Season 18 — match results, schedules, player features and hero build guides, all built on one teal, cinematic visual system that keeps the team instantly recognisable in the feed.",
      client: "Aurora Gaming",
      year: "2026",
      role: "Graphic Designer",
      scope: "Match result and defeat posters, season match schedule, follower milestone campaign and hero build & emblem guides — designed as reusable templates so posts could go live right after each match.",
      deliverables: ["Match result templates (win & defeat)", "Season 18 match schedule", "“Road to 100K” follower goal post", "Hero build & emblem guides", "Sponsor-ready layouts (Infinix)"],
      links: [],
      images: [
        "assets/work/aurora/match-result.webp",
        "assets/work/aurora/defeat-poster.webp",
        "assets/work/aurora/match-schedule.webp",
        "assets/work/aurora/follower-goal.webp",
        "assets/work/aurora/hero-build.webp",
      ],
      cover: "50% 18%",
      art: ["esports"],
      mark: "AG",
    },
    {
      id: "kopi-senja",
      title: "Kopi Senja Identity",
      category: "branding",
      summary: "Warm, nostalgic identity for an artisan coffee roaster.",
      description: "A full brand identity for a small-batch coffee roaster — rooted in sunset tones and hand-drawn type to feel crafted, local and warm.",
      client: "Kopi Senja",
      year: "2025",
      role: "Brand Designer",
      scope: "Brand strategy workshop, logo exploration, identity system and packaging rollout across retail and social touchpoints.",
      deliverables: ["Primary & secondary logo suite", "Colour + typography system", "Jar label & cup packaging", "Brand guidelines (32 pages)"],
      links: [{ label: "View on Behance", url: "https://www.behance.net/" }],
      art: ["brand", "packaging", "brand"],
      mark: "KS",
    },
    {
      id: "pulse-app",
      title: "Pulse Fitness App",
      category: "uiux",
      summary: "Habit-driven workout tracker, from research to hi-fi prototype.",
      description: "A mobile fitness companion that turns workouts into streaks. Designed end-to-end in Figma with a reusable component library.",
      client: "Concept / Case Study",
      year: "2025",
      role: "UI/UX Designer",
      scope: "User interviews, journey mapping, low-fi wireframes, usability testing and an interactive high-fidelity prototype.",
      deliverables: ["User flows & wireframes", "Design system (60+ components)", "Interactive Figma prototype", "Usability test report"],
      links: [{ label: "Open Prototype", url: "https://www.figma.com/" }, { label: "Case Study", url: "https://www.behance.net/" }],
      art: ["phone", "ui", "phone"],
      mark: "P",
    },
    {
      id: "lumen-studio",
      title: "Lumen Studio Website",
      category: "uiux",
      wide: true,
      summary: "Editorial landing page for an architecture studio.",
      description: "A calm, image-led website for an architecture practice, with a modular layout grid that scales from case studies to journal posts.",
      client: "Lumen Studio",
      year: "2024",
      role: "Web Designer",
      scope: "Information architecture, responsive layout design, motion guidelines and dev hand-off with Tailwind CSS tokens.",
      deliverables: ["Sitemap & wireframes", "Desktop / tablet / mobile layouts", "Interaction specs", "Next.js + Tailwind build support"],
      links: [{ label: "Live Site", url: "https://example.com/" }, { label: "GitHub", url: "https://github.com/" }],
      art: ["ui", "layout", "ui"],
      mark: "L",
    },
    {
      id: "feed-campaign",
      title: "Ramadan Feed Campaign",
      category: "social",
      summary: "30-day content series for a retail brand’s Instagram.",
      description: "A cohesive feed grid and story series that kept a retail brand consistent across a month-long seasonal campaign.",
      client: "Retail Brand (Internship)",
      year: "2024",
      role: "Social Media Designer",
      scope: "Content calendar visuals, carousel templates, story stickers and short promotional video edits in CapCut.",
      deliverables: ["30 feed posts", "12 carousel templates", "Story & reel covers", "Short-form promo videos"],
      links: [{ label: "View Posts", url: "https://www.instagram.com/" }],
      art: ["social", "phone", "social"],
      mark: "RF",
    },
    {
      id: "wildlines",
      title: "Wildlines Vector Series",
      category: "vector",
      summary: "Personal series of flat vector landscapes and characters.",
      description: "An ongoing personal series exploring limited palettes, bold silhouettes and geometric simplification in Adobe Illustrator.",
      client: "Personal Project",
      year: "2023",
      role: "Illustrator",
      scope: "Concept sketches, vector illustration, print preparation and merchandise mockups.",
      deliverables: ["12 vector illustrations", "Poster print set", "Sticker sheet", "Wallpaper pack"],
      links: [{ label: "View on Behance", url: "https://www.behance.net/" }],
      art: ["vector", "vector", "character"],
      mark: "W",
    },
    {
      id: "brand-book",
      title: "Brand Profile Book",
      category: "vector",
      summary: "Company profile book with an editorial grid system.",
      description: "A printed and digital company profile combining photography, infographics and a strict typographic grid.",
      client: "Corporate Client",
      year: "2023",
      role: "Layout Designer",
      scope: "Content structuring, editorial grid, infographic design and print production files.",
      deliverables: ["48-page profile book", "Infographic set", "Print-ready PDF", "Interactive PDF version"],
      links: [{ label: "Read Online", url: "https://issuu.com/" }],
      art: ["layout", "layout", "brand"],
      mark: "BP",
    },
    {
      id: "terra-goods",
      title: "Terra Goods Packaging",
      category: "branding",
      summary: "Eco-friendly label system for a pantry goods line.",
      description: "A modular label system that lets a growing product line stay recognisable while every flavour gets its own personality.",
      client: "Terra Goods",
      year: "2023",
      role: "Packaging Designer",
      scope: "Label architecture, illustration accents, dieline preparation and retail shelf mockups.",
      deliverables: ["8 jar label designs", "Dielines & print specs", "Shelf & e-commerce mockups"],
      links: [{ label: "View on Behance", url: "https://www.behance.net/" }],
      art: ["packaging", "brand", "packaging"],
      mark: "TG",
    },
    {
      id: "character-mascot",
      title: "Mascot & Character Design",
      category: "vector",
      summary: "Friendly mascot for a student community brand.",
      description: "A playful mascot with a full expression sheet, designed to bring personality to event posters and social content.",
      client: "Student Community",
      year: "2022",
      role: "Illustrator",
      scope: "Character exploration, turnaround sheet, expression set and usage guide.",
      deliverables: ["Character turnaround", "10-pose expression sheet", "Sticker pack", "Usage guide"],
      links: [{ label: "View on Behance", url: "https://www.behance.net/" }],
      art: ["character", "vector", "character"],
      mark: "M",
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
     Render project cards
     ======================================================= */
  const grid = $("#projectGrid");
  const arrowSVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  grid.innerHTML = projects.map((p, i) => `
    <article class="project-card${p.wide ? " is-wide" : ""}" data-cat="${p.category}" data-reveal style="--d:${(i % 3) * 0.08}s">
      <button class="card-inner" data-project="${p.id}" data-tilt-card aria-label="Open project: ${p.title}">
        <div class="card-media">${mediaFor(p, 0)}</div>
        <div class="card-body">
          <div>
            <span class="tag">${CATEGORY_LABEL[p.category]}</span>
            <h3>${p.title}</h3>
            <p>${p.summary}</p>
          </div>
          <span class="card-arrow">${arrowSVG}</span>
        </div>
      </button>
    </article>`).join("");

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
    let current = sections[0].id;
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

  // Count-up stats
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      countIO.unobserve(el);
      if (reduceMotion) { el.textContent = target; return; }
      const start = performance.now(), dur = 1400;
      const tick = (t) => {
        const k = Math.min(1, (t - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => countIO.observe(el));

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
     Filtering with FLIP layout animation
     ======================================================= */
  const filters = $$(".filter");
  const indicator = $(".filter-indicator");

  const moveIndicator = (btn) => {
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.height = `${btn.offsetHeight}px`;
    indicator.style.transform = `translate(${btn.offsetLeft}px, ${btn.offsetTop}px)`;
  };

  const applyFilter = (cat) => {
    const cards = $$(".project-card", grid);
    const first = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));
    const wasHidden = new Map(cards.map((c) => [c, c.classList.contains("is-hidden")]));

    cards.forEach((c) => {
      const show = cat === "all" || c.dataset.cat === cat;
      c.classList.toggle("is-hidden", !show);
      c.classList.add("is-visible"); // make sure reveal state doesn't hide them
    });

    if (reduceMotion) return;

    cards.forEach((c, i) => {
      if (c.classList.contains("is-hidden")) return;
      if (wasHidden.get(c)) {
        c.animate(
          [{ opacity: 0, transform: "translateY(24px) scale(.94)" }, { opacity: 1, transform: "none" }],
          { duration: 550, easing: EASE, delay: i * 40, fill: "backwards" }
        );
        return;
      }
      const a = first.get(c), b = c.getBoundingClientRect();
      const dx = a.left - b.left, dy = a.top - b.top;
      const sx = a.width / b.width, sy = a.height / b.height;
      if (dx || dy || sx !== 1 || sy !== 1) {
        c.animate(
          [{ transformOrigin: "top left", transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
           { transformOrigin: "top left", transform: "none" }],
          { duration: 600, easing: EASE }
        );
      }
    });
  };

  filters.forEach((btn) => btn.addEventListener("click", () => {
    if (btn.classList.contains("is-active")) return;
    filters.forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", String(b === btn)); });
    moveIndicator(btn);
    applyFilter(btn.dataset.filter);
  }));

  const activeFilter = () => $(".filter.is-active");
  requestAnimationFrame(() => moveIndicator(activeFilter()));
  window.addEventListener("resize", () => moveIndicator(activeFilter()));
  document.fonts && document.fonts.ready.then(() => moveIndicator(activeFilter()));

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
      document.body.classList.toggle("cursor-view", !!t.closest("[data-tilt-card]"));
      document.body.classList.toggle("cursor-hover", !!t.closest("a, button, .pill, input, textarea, select, [data-tilt]") && !t.closest("[data-tilt-card]"));
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
    modalHero.innerHTML = mediaFor(p, i);
    $$("button", modalThumbs).forEach((b, j) => {
      b.classList.toggle("is-active", j === i);
      b.setAttribute("aria-pressed", String(j === i));
    });
  };

  const openModal = (id, trigger) => {
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
    showSlide(p, 0);

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

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project]");
    if (btn) openModal(btn.dataset.project, btn);
  });
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

  const form = $("#contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((input) => {
      const valid = input.value.trim() && (input.type !== "email" || /^\S+@\S+\.\S+$/.test(input.value));
      input.closest(".field").classList.toggle("has-error", !valid);
      if (!valid) ok = false;
    });
    if (!ok) { toast("Please fill in the highlighted fields"); return; }

    const data = new FormData(form);
    const subject = `[Portfolio] ${data.get("topic")} — ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast("Opening your email app…");
    form.reset();
  });
  $$("input, textarea", form).forEach((el) =>
    el.addEventListener("input", () => el.closest(".field").classList.remove("has-error")));

  $("#year").textContent = new Date().getFullYear();
})();
