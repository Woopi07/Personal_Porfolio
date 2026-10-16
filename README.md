# Personal Portfolio — Graphic & UI/UX Designer

A static, dependency-free portfolio site (HTML + CSS + vanilla JS). Open `index.html` directly or host it on GitHub Pages / Netlify / Vercel.

## Palette
| Token | Hex | Use |
|---|---|---|
| Charcoal | `#222831` | Main background, primary containers |
| Slate | `#393E46` | Secondary cards, borders, hover backgrounds |
| Taupe | `#948979` | Accents, subtitles, badges, subtle borders |
| Cream | `#DFD0B8` | Headings, high-contrast text, CTAs |

## Features
- Sticky translucent header with backdrop blur and scroll-based active-section highlighting
- Hero with mouse-tracking 3D portrait, floating skill chips and count-up stats
- Skill pills with soft cream glow + magnetic hover
- Filterable project grid with FLIP layout animations and 3D tilt + glare on cards
- Project lightbox with gallery thumbnails, scope, deliverables and external links (Esc / backdrop to close, focus trap)
- Vertical experience timeline with scroll progress line and fade-ins
- Contact form (opens the visitor's mail app pre-filled), copy-email button with toast, magnetic social icons
- Custom cursor (fine pointers only), fully responsive, respects `prefers-reduced-motion`

## Personalising
- **Name / bio / timeline / email / socials:** edit `index.html` (search for `Your Name`, `hello@yourdomain.com`, `Your City`).
- **Hero stats:** `data-count` attributes in the hero.
- **Projects:** edit the `projects` array at the top of `js/main.js`. Cards use generated placeholder artwork; add real images with
  `images: ["assets/work/project-1.jpg", "assets/work/project-2.jpg", "assets/work/project-3.jpg"]`.
- **Portrait:** replace `assets/portrait.webp`.
