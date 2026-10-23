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
        children: [run("Graphic Designer  |  IT & Network Support  |  Web Designer & Developer", { size: 22, color: ACCENT, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 },
        children: [run("Metro Manila, Philippines", { size: 20 }), sep(), link("mjmallorca04@gmail.com", "mailto:mjmallorca04@gmail.com")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
        children: [
          link("linkedin.com/in/mj-mallorca-1b8767410", "https://www.linkedin.com/in/mj-mallorca-1b8767410/"), sep(),
          link("behance.net/mjmallorca1", "https://www.behance.net/mjmallorca1"), sep(),
          link("Portfolio: mllrcmjpersonalportfolio.vercel.app", "https://mllrcmjpersonalportfolio.vercel.app"),
        ] }),

      heading("Professional Summary"),
      para([run("Information Technology student and graphic designer who designs accessible digital interfaces and builds responsive front-end web applications that align with real business needs. Brings a year of graphic design for an MPL Philippines esports team, freelance product design for a milk tea brand, and hands-on IT and network support experience, turning complex requirements into clear visual prototypes, polished layouts and clean, scalable front-end code.")]),

      heading("Experience"),
      ...entry("Graphic Designer — Aurora Gaming", "Oct 2025 – Present (1 yr)"),
      bullet("Design match-day graphics for MPL Philippines Season 18, including match results, pre-game announcements, defeat recaps and the season match schedule."),
      bullet("Create the “Road to 100K” follower-milestone campaign and Mobile Legends hero build and emblem guides featuring the team roster."),
      bullet("Build reusable templates so posts can be published right after each match, with sponsor-ready layouts for Infinix."),
      ...entry("Freelance Graphic Designer — Super Daddy Milk Tea Shop", "May 2026 – Oct 2026 (6 mos)"),
      bullet("Designed product posters for the shop’s milk tea, cheesecake, coffee and frappe line, including Oreo, Red Velvet, Classic, Iced Latte, Matcha and Mango drinks."),
      bullet("Created social media promotions with product photo retouching, price callouts and bilingual (English–Filipino) copy, giving each drink its own bold color theme."),
      ...entry("Technical & Network Support Intern — PTSI Philippines", "Jun 2026 – Oct 2026", "Productivity Technologies Services, Inc."),
      bullet("Supported day-to-day IT operations, troubleshooting hardware, software and network issues."),

      heading("Projects"),
      ...entry("PTSI Corporate Website — Web Designer & Developer", "2026"),
      bullet("Designed and developed a responsive corporate website for an IT products and services company, covering About Us, Partners, Products, Services, News, Careers and Contact."),
      para([run("Live: ", { bold: true }), link("ptsiwebsite.vercel.app", "https://ptsiwebsite.vercel.app")], 40),
      ...entry("BSAid — FAR1 Visual Novel Website — Web Designer & Developer", "2026"),
      bullet("Designed and built the website for a visual novel that teaches Financial Accounting and Reporting 1, with a retro pixel-art look and a keyboard-navigable, in-browser game menu."),
      para([run("Live: ", { bold: true }), link("bs-aid-website.vercel.app", "https://bs-aid-website.vercel.app")], 40),
      ...entry("Personal Portfolio Website — Designer & Developer", "2026"),
      bullet("Designed and coded an interactive, responsive portfolio in HTML, CSS and JavaScript, deployed on Vercel."),

      heading("Education"),
      ...entry("Pamantasan ng Lungsod ng Valenzuela", "Present", "Information Technology — 4th Year Student"),

      heading("Certifications"),
      para([run("Networking Basics", { bold: true }), run(" — Cisco Networking Academy, July 2026")]),

      heading("Skills"),
      skillLine("Graphic Design", "Adobe Photoshop, Adobe Illustrator, Figma, CapCut, Photo Manipulation, Social Media Design, Layout Design"),
      skillLine("Web Development", "HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Responsive Design, Vercel"),
      skillLine("IT & Networking", "Technical Support, Hardware & Software Troubleshooting, Networking Fundamentals"),
      skillLine("UI/UX", "Wireframing, Prototyping, Accessible Interface Design"),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("wrote", OUT); });
