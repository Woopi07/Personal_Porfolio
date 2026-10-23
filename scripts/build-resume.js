// Builds an ATS-friendly résumé: single column, standard headings, real text.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType,
  LevelFormat, BorderStyle, TabStopType,
} = require("docx");

const OUT = process.argv[2];
const FONT = "Calibri";
const INK = "000000";
const ACCENT = "8E1616";

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 21, bold: o.bold, italics: o.italics, color: o.color || INK });
const link = (label, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text: label, font: FONT, size: 20, color: "1F4E79", underline: {} })] });
const sep = () => run("  |  ", { size: 20 });

const heading = (text) => new Paragraph({
  spacing: { before: 220, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
  children: [run(text.toUpperCase(), { bold: true, size: 23, color: ACCENT })],
});

// Title on the left, dates right-aligned on the same line (tab stop, not a table)
const entry = (left, right, sub) => [
  new Paragraph({
    spacing: { before: 120, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: 10466 }],
    children: [run(left, { bold: true }), run("\t" + right, { bold: true })],
  }),
  ...(sub ? [new Paragraph({ spacing: { after: 40 }, children: [run(sub, { italics: true })] })] : []),
];

const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 40 },
  children: [run(text)],
});

const para = (children, after = 60) => new Paragraph({ spacing: { after }, children });

const skillLine = (label, items) => para([run(label + ": ", { bold: true }), run(items)], 50);

const doc = new Document({
  creator: "Mj Mallorca",
  title: "Mj Mallorca — Résumé",
  styles: { default: { document: { run: { font: FONT, size: 21 } } } },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 260 } } } }],
    }],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [run("MJ MALLORCA", { bold: true, size: 40 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
        children: [run("Graphic Designer  |  Web Designer & Developer", { size: 22, color: ACCENT, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 },
        children: [run("Metro Manila, Philippines", { size: 20 }), sep(), link("mjmallorca04@gmail.com", "mailto:mjmallorca04@gmail.com")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
        children: [
          link("linkedin.com/in/mj-mallorca-1b8767410", "https://www.linkedin.com/in/mj-mallorca-1b8767410/"), sep(),
          link("behance.net/mjmallorca1", "https://www.behance.net/mjmallorca1"), sep(),
          link("Portfolio: mllrcmjpersonalportfolio.vercel.app", "https://mllrcmjpersonalportfolio.vercel.app"),
        ] }),

      heading("Professional Summary"),
      para([run("Information Technology student and graphic designer who designs accessible digital interfaces and builds responsive front-end web applications that align with real business needs. Brings a year of graphic design for an International Esports organization, freelance product design for a local milk tea brand, and hands-on IT and network support experience, turning complex requirements into clear visual prototypes, polished layouts and clean, scalable front-end code.")]),

      heading("Experience"),
      ...entry("Freelance Graphic Designer — Aurora Gaming", "Oct 2025 – Present (1 yr)"),
      bullet("Design match-day graphics for Tournament Posting, including match results, pre-game announcements, defeat recaps and the season match schedule."),
      bullet("Build reusable templates so posts can be published right after each match, with sponsor-ready layouts for Aurora Esports."),
      ...entry("Freelance Graphic Designer — Super Daddy Milk Tea Shop", "Aug 2025 – Feb 2026 (6 mos)"),
      bullet("Designed product posters for the shop’s coffee, milk tea, and frappe lines, featuring signature flavors and seasonal drink offerings."),
      bullet("Created social media promotions with product photo retouching, price callouts and bilingual (English–Filipino) copy, giving each drink its own bold color theme."),
      ...entry("Technical & Network Support Intern — PTSI Philippines", "Jun 2026 – Oct 2026", "Productivity Technologies Services, Inc."),
      bullet("Supported day-to-day IT operations, troubleshooting hardware, software and network issues."),
      bullet("Designed and developed the company’s official website using modern web development standards."),

      heading("Projects"),
      ...entry("PTSI Corporate Website — Web Designer & Developer", "2026"),
      bullet("Designed and developed a responsive corporate website for an IT products and services company, covering About Us, Partners, Products, Services, News, Careers and Contact."),
      para([run("Live: ", { bold: true }), link("ptsiwebsite.vercel.app", "https://ptsiwebsite.vercel.app")], 40),
      ...entry("BSAid — FAR1 Visual Novel Website — Web Designer & Developer", "2026"),
      bullet("Designed and built the website for BSA Student Thesis, with a retro pixel-art look and a keyboard-navigable, in-browser game menu."),
      para([run("Live: ", { bold: true }), link("bs-aid-website.vercel.app", "https://bs-aid-website.vercel.app")], 40),
      ...entry("Personal Portfolio Website — Designer & Developer", "2026"),
      bullet("Designed and coded an interactive, responsive portfolio in HTML, CSS and JavaScript, deployed on Vercel."),

      heading("Education"),
      ...entry("Pamantasan ng Lungsod ng Valenzuela", "Present", "Information Technology — 4th Year Student"),

      heading("Skills"),
      skillLine("Graphic Design", "Adobe Photoshop, Adobe Illustrator, Figma, CapCut, Photo Manipulation, Social Media Design, Layout Design"),
      skillLine("Web Development", "HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Responsive Design, Vercel"),
      skillLine("IT & Networking", "Technical Support, Hardware & Software Troubleshooting, Networking Fundamentals"),
      skillLine("UI/UX", "Wireframing, Prototyping, Accessible Interface Design"),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("wrote", OUT); });
