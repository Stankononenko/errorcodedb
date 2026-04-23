/**
 * Build-time search index generator.
 * Walks all /data/**.json files and produces public/search-index.json
 * — a flat array of compact entries for client-side fuzzy search.
 */
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const OUT_FILE = path.join(process.cwd(), "public", "search-index.json");

interface IndexEntry {
  c: string; // code
  t: string; // title
  s: string; // shortDescription (truncated)
  u: string; // url path
  cat: string; // category label (OBD, Appliance, HVAC, Printer, Windows)
  b?: string; // brand (optional)
  d?: string; // device type / windows category (optional)
}

const entries: IndexEntry[] = [];

function truncate(str: string, n = 120): string {
  if (!str) return "";
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function jsonFilesIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
}

function subDirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => fs.statSync(path.join(dir, f)).isDirectory());
}

// OBD-II
for (const file of jsonFilesIn(path.join(DATA_DIR, "obd2"))) {
  const codes = readJson<Array<{ code: string; title: string; shortDescription: string; system?: string }>>(
    path.join(DATA_DIR, "obd2", file),
  );
  for (const c of codes) {
    entries.push({
      c: c.code,
      t: c.title,
      s: truncate(c.shortDescription),
      u: `/obd2/${c.code.toLowerCase()}`,
      cat: "OBD-II",
      d: c.system,
    });
  }
}

// Appliance
for (const brand of subDirs(path.join(DATA_DIR, "appliance"))) {
  const brandDir = path.join(DATA_DIR, "appliance", brand);
  for (const file of jsonFilesIn(brandDir)) {
    const deviceType = file.replace(".json", "");
    const codes = readJson<
      Array<{ code: string; displayCode: string; title: string; shortDescription: string; brand: string; deviceType: string }>
    >(path.join(brandDir, file));
    for (const c of codes) {
      entries.push({
        c: c.displayCode || c.code,
        t: c.title,
        s: truncate(c.shortDescription),
        u: `/appliance/${brand}/${deviceType}/${c.code.toLowerCase()}`,
        cat: "Appliance",
        b: c.brand,
        d: c.deviceType,
      });
    }
  }
}

// HVAC
for (const brand of subDirs(path.join(DATA_DIR, "hvac"))) {
  const brandDir = path.join(DATA_DIR, "hvac", brand);
  for (const file of jsonFilesIn(brandDir)) {
    const deviceType = file.replace(".json", "");
    const codes = readJson<
      Array<{ code: string; displayCode: string; title: string; shortDescription: string; brand: string; deviceType: string }>
    >(path.join(brandDir, file));
    for (const c of codes) {
      entries.push({
        c: c.displayCode || c.code,
        t: c.title,
        s: truncate(c.shortDescription),
        u: `/hvac/${brand}/${deviceType}/${c.code.toLowerCase()}`,
        cat: "HVAC",
        b: c.brand,
        d: c.deviceType,
      });
    }
  }
}

// Printer
for (const file of jsonFilesIn(path.join(DATA_DIR, "printer"))) {
  const brand = file.replace(".json", "");
  const codes = readJson<
    Array<{ code: string; displayCode: string; title: string; shortDescription: string; brand: string }>
  >(path.join(DATA_DIR, "printer", file));
  for (const c of codes) {
    entries.push({
      c: c.displayCode || c.code,
      t: c.title,
      s: truncate(c.shortDescription),
      u: `/printer/${brand}/${c.code.toLowerCase()}`,
      cat: "Printer",
      b: c.brand,
    });
  }
}

// Windows
const WIN_SLUG: Record<string, string> = {
  "bsod.json": "bsod",
  "update-errors.json": "update",
  "system-errors.json": "system",
  "browser-errors.json": "browser",
};
const WIN_LABEL: Record<string, string> = {
  bsod: "BSOD",
  update: "Windows Update",
  system: "System",
  browser: "Browser/Network",
};
for (const file of jsonFilesIn(path.join(DATA_DIR, "windows"))) {
  const slug = WIN_SLUG[file] || file.replace(".json", "");
  const codes = readJson<
    Array<{ code: string; displayCode: string; title: string; shortDescription: string }>
  >(path.join(DATA_DIR, "windows", file));
  for (const c of codes) {
    entries.push({
      c: c.displayCode || c.code,
      t: c.title,
      s: truncate(c.shortDescription),
      u: `/windows/${slug}/${c.code.toLowerCase()}`,
      cat: "Windows",
      d: WIN_LABEL[slug] || slug,
    });
  }
}

fs.writeFileSync(OUT_FILE, JSON.stringify(entries));
console.log(`Search index generated: ${entries.length} entries → ${OUT_FILE}`);
