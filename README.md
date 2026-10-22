# Mj Mallorca — Software Developer & Graphic Designer

A static, dependency-free portfolio site (HTML + CSS + vanilla JS). Open `index.html` directly or host it on GitHub Pages / Netlify / Vercel.

## Palette
| Token | Hex | Use |
|---|---|---|
| Ink | `#000000` | Main background, primary containers |
| Wine | `#8E1616` | Secondary cards, borders, hover backgrounds |
| Sand | `#E8C999` | Accents, subtitles, badges, subtle borders |
| Cream | `#F8EEDF` | Headings, high-contrast text, CTAs |

`--sand-soft` (`#F0D9B5`) is a lighter sand used only for small text on wine surfaces.

## Features
- Sticky translucent header with backdrop blur and scroll-based active-section highlighting
- Playful "design-editor" hero: selection boxes with handles, multiplayer cursor, pill labels, stickers and a toolbar around a mouse-tracking 3D portrait
- Skill pills with soft cream glow + magnetic hover
- Separate Web Projects and Graphic Design sections: alternating showcases with auto-playing, swipeable image decks (arrows, keyboard, 3D tilt), plus a masonry wall of every design piece
- Project lightbox with gallery thumbnails, scope, deliverables and external links (Esc / backdrop to close, focus trap)
- Vertical experience timeline with scroll progress line and fade-ins
- Certifications grid with light-sweep hover cards
- Contact form (opens the visitor's mail app pre-filled), copy-email button with toast, magnetic social icons
- Custom cursor (fine pointers only), fully responsive, respects `prefers-reduced-motion`

## Personalising
- **Name / bio / timeline / socials:** edit `index.html`.
- **Contact form:** "Send Message" opens the visitor's email app with the message pre-filled to `mjmallorca04@gmail.com`. The footer quick-email box is forwarded by [FormSubmit](https://formsubmit.co) — its first submission sends an activation email to that inbox; click **Activate** once.
- **Projects:** edit the `projects` array at the top of `js/main.js`. Each project shows as a showcase row with a flip-through image deck, and every image also appears in the "Every piece" gallery wall. Set `images: [...]`, `tags`, `links`, and `landscape: true` for website screenshots (adds a browser frame).
- **Certifications:** edit the `certifications` array in `js/main.js` — `{ title, issuer, date, url?, image? }`. Remove `placeholder: true` once filled in.
- **Portrait:** replace `assets/portrait.webp`.

## Logo
The **M** logo lives in `assets/logo/`: a single bold geometric M (V-notch top, V counter below) with a diamond set into the notch as its one accent. Drawn as solid shapes, it stays crisp from billboard size down to a 16px favicon.

| File | Use |
|---|---|
| `mj-logo-black.svg` / `-1024.png` | Primary — black tile (also `favicon.svg`) |
| `mj-logo-wine.svg` / `-1024.png` | Wine tile — profile pictures, social avatars |
| `mj-logo-sand.svg` / `-1024.png` | Sand tile — light contexts |
| `mj-logo-cream.svg` / `-1024.png` | Cream tile — light contexts, print |
| `mj-mark-cream.svg` | Mark only, for dark backgrounds |
| `mj-mark-black.svg` | Mark only, for light backgrounds |
| `mj-lockup-dark.svg` / `.png` | Mark + name + title, for dark backgrounds |
| `mj-lockup-light.svg` / `.png` | Mark + name + title, for light backgrounds |

The lockup text is outlined (Fredoka SemiBold converted to vector paths), so it renders identically everywhere without the font installed.

## Résumé
An ATS-friendly résumé (single column, standard headings, real text) is published at `assets/resume/Mj-Mallorca-Resume.pdf` and `.docx`, linked from the hero and Contact section. To update it, edit `scripts/build-resume.js`, then:

```bash
node scripts/build-resume.js assets/resume/Mj-Mallorca-Resume.docx
soffice --headless --convert-to pdf --outdir assets/resume assets/resume/Mj-Mallorca-Resume.docx
```

## Deploying updates
`index.html` loads `css/style.css?v=…` and `js/main.js?v=…`. After changing either file, bump the `v=` value (e.g. to the latest commit hash) so browsers fetch the new version instead of a cached one.
