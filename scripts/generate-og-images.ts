/**
 * Build-time generator for Open Graph preview images.
 * Produces /public/og/*.svg files (1200×630), one per category plus a
 * default. Referenced from per-page openGraph metadata so Twitter/
 * Facebook/LinkedIn shares get real branding instead of naked links.
 *
 * SVG keeps the bundle tiny (~2 KB each) and crisp on any device.
 * A future pass can generate per-code PNGs for the top-1000 pages.
 */
import fs from "fs";
import path from "path";

const OUT_DIR = path.join(process.cwd(), "public", "og");

interface CategoryDef {
  slug: string;
  label: string;
  subtitle: string;
  accent: string;
  accentLight: string;
  icon: string; // emoji-ish glyph (compatible with social scrapers)
}

const CATEGORIES: CategoryDef[] = [
  {
    slug: "default",
    label: "ErrorCodeDB",
    subtitle: "Find & Fix Any Error Code",
    accent: "#1e40af",
    accentLight: "#dbeafe",
    icon: "⚡",
  },
  {
    slug: "obd2",
    label: "OBD-II Codes",
    subtitle: "2,000+ diagnostic trouble codes for every car 1996+",
    accent: "#2563eb",
    accentLight: "#dbeafe",
    icon: "🚗",
  },
  {
    slug: "appliance",
    label: "Appliance Errors",
    subtitle: "Washers, dryers, ovens, fridges — 100+ brands",
    accent: "#059669",
    accentLight: "#d1fae5",
    icon: "🧺",
  },
  {
    slug: "hvac",
    label: "HVAC Error Codes",
    subtitle: "Furnaces, AC, heat pumps, mini-splits, water heaters",
    accent: "#0891b2",
    accentLight: "#cffafe",
    icon: "❄️",
  },
  {
    slug: "printer",
    label: "Printer Errors",
    subtitle: "HP, Canon, Epson, Brother, Xerox, Lexmark",
    accent: "#7c3aed",
    accentLight: "#ede9fe",
    icon: "🖨️",
  },
  {
    slug: "windows",
    label: "Windows Errors",
    subtitle: "BSOD stop codes, Update errors, browser errors",
    accent: "#ea580c",
    accentLight: "#ffedd5",
    icon: "💻",
  },
];

function svgTemplate(cat: CategoryDef): string {
  // 1200×630 is the canonical OG size for Twitter/Facebook/LinkedIn.
  // Using plain system-ui so no external font fetch is needed.
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${cat.accentLight}" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Side accent bar -->
  <rect x="0" y="0" width="12" height="630" fill="${cat.accent}" />

  <!-- Logo mark (matches app/icon.svg) -->
  <g transform="translate(80 80)">
    <rect x="0" y="0" width="72" height="72" rx="16" fill="${cat.accent}" />
    <path d="M42 15 L22 42 H34 L30 61 L50 34 H38 L42 15 Z" fill="#ffffff" stroke="#ffffff" stroke-width="1" stroke-linejoin="round" />
  </g>

  <!-- Brand wordmark -->
  <text x="172" y="130" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="32" font-weight="700" fill="#0f172a">
    ErrorCodeDB
  </text>

  <!-- Category glyph (large) -->
  <text x="80" y="380" font-size="160" font-family="'Apple Color Emoji', 'Segoe UI Emoji', sans-serif">
    ${cat.icon}
  </text>

  <!-- Category label -->
  <text x="260" y="340" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="72" font-weight="800" fill="#0f172a">
    ${esc(cat.label)}
  </text>

  <!-- Subtitle -->
  <text x="260" y="395" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="28" font-weight="500" fill="#475569">
    ${esc(cat.subtitle)}
  </text>

  <!-- Bottom stats strip -->
  <rect x="0" y="555" width="1200" height="75" fill="${cat.accent}" opacity="0.05" />
  <text x="80" y="600" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="${cat.accent}">
    7,000+ codes · 100+ brands · Free forever · errorcodedb.com
  </text>
</svg>
`;
}

function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const cat of CATEGORIES) {
    const file = path.join(OUT_DIR, `${cat.slug}.svg`);
    fs.writeFileSync(file, svgTemplate(cat));
  }

  console.log(`OG images generated: ${CATEGORIES.length} SVGs → ${OUT_DIR}`);
}

run();
