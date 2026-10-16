# Mj Mallorca — Software Developer & Graphic Designer

A static, dependency-free portfolio site (HTML + CSS + vanilla JS). Open `index.html` directly or host it on GitHub Pages / Netlify / Vercel.

## Palette
| Token | Hex | Use |
|---|---|---|
| Navy | `#061E29` | Main background, primary containers |
| Ocean | `#1D546D` | Secondary cards, borders, hover backgrounds |
| Teal | `#5F9598` | Accents, subtitles, badges, subtle borders |
| Mist | `#F3F4F4` | Headings, high-contrast text, CTAs |

`--teal-soft` (`#8EC3C5`) is a lighter teal used only for small text on ocean surfaces, where plain teal is too low-contrast.

## Features
- Sticky translucent header with backdrop blur and scroll-based active-section highlighting
- Playful "design-editor" hero: selection boxes with handles, multiplayer cursor, pill labels, stickers and a toolbar around a mouse-tracking 3D portrait
- Skill pills with soft cream glow + magnetic hover
- Filterable project grid with FLIP layout animations and 3D tilt + glare on cards
- Project lightbox with gallery thumbnails, scope, deliverables and external links (Esc / backdrop to close, focus trap)
- Vertical experience timeline with scroll progress line and fade-ins
- Contact form (opens the visitor's mail app pre-filled), copy-email button with toast, magnetic social icons
- Custom cursor (fine pointers only), fully responsive, respects `prefers-reduced-motion`

## Personalising
- **Name / bio / timeline / email / socials:** edit `index.html` (search for `hello@yourdomain.com`, `Your City`, `Year`, `School Name` and the social URLs).
- **Hero stats:** `data-count` attributes in the hero.
- **Projects:** edit the `projects` array at the top of `js/main.js`. Cards use generated placeholder artwork; add real images with
  `images: ["assets/work/project-1.jpg", "assets/work/project-2.jpg", "assets/work/project-3.jpg"]`.
- **Portrait:** replace `assets/portrait.webp`.
