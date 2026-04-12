import fs from "fs";
import path from "path";

const SITE_URL = "https://errorcodedb.com";
const DATA_DIR = path.join(process.cwd(), "data");
const OUT_DIR = path.join(process.cwd(), "public");

interface SitemapEntry {
  url: string;
  priority: number;
  changefreq: string;
}

function readJsonArray<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function getCodesFromDir(dir: string): { code: string }[] {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const codes: { code: string }[] = [];
  for (const file of files) {
    const data = readJsonArray<{ code: string }>(path.join(dir, file));
    codes.push(...data);
  }
  return codes;
}

interface ApplianceEntry {
  brandSlug: string;
  deviceTypeSlug: string;
  code: string;
}

function getAllApplianceCodes(): ApplianceEntry[] {
  const baseDir = path.join(DATA_DIR, "appliance");
  if (!fs.existsSync(baseDir)) return [];
  const result: ApplianceEntry[] = [];
  const brands = fs.readdirSync(baseDir).filter((f) =>
    fs.statSync(path.join(baseDir, f)).isDirectory()
  );
  for (const brand of brands) {
    const brandDir = path.join(baseDir, brand);
    const files = fs.readdirSync(brandDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const deviceType = file.replace(".json", "");
      const data = readJsonArray<{ code: string }>(path.join(brandDir, file));
      for (const item of data) {
        result.push({ brandSlug: brand, deviceTypeSlug: deviceType, code: item.code });
      }
    }
  }
  return result;
}

function buildSitemap(): string {
  const entries: SitemapEntry[] = [];

  // Static pages
  entries.push({ url: SITE_URL, priority: 1.0, changefreq: "weekly" });
  entries.push({ url: `${SITE_URL}/obd2`, priority: 0.9, changefreq: "weekly" });
  entries.push({ url: `${SITE_URL}/appliance`, priority: 0.9, changefreq: "weekly" });
  entries.push({ url: `${SITE_URL}/about`, priority: 0.3, changefreq: "monthly" });
  entries.push({ url: `${SITE_URL}/privacy`, priority: 0.2, changefreq: "monthly" });
  entries.push({ url: `${SITE_URL}/terms`, priority: 0.2, changefreq: "monthly" });
  entries.push({ url: `${SITE_URL}/disclaimer`, priority: 0.2, changefreq: "monthly" });
  entries.push({ url: `${SITE_URL}/contact`, priority: 0.3, changefreq: "monthly" });

  // OBD-II code pages
  const obdCodes = getCodesFromDir(path.join(DATA_DIR, "obd2"));
  for (const code of obdCodes) {
    entries.push({
      url: `${SITE_URL}/obd2/${code.code.toLowerCase()}`,
      priority: 0.8,
      changefreq: "monthly",
    });
  }

  // Appliance pages
  const appCodes = getAllApplianceCodes();
  const brands = new Set<string>();
  const brandDevices = new Set<string>();
  for (const c of appCodes) {
    brands.add(c.brandSlug);
    brandDevices.add(`${c.brandSlug}/${c.deviceTypeSlug}`);
    entries.push({
      url: `${SITE_URL}/appliance/${c.brandSlug}/${c.deviceTypeSlug}/${c.code.toLowerCase()}`,
      priority: 0.8,
      changefreq: "monthly",
    });
  }
  for (const brand of brands) {
    entries.push({ url: `${SITE_URL}/appliance/${brand}`, priority: 0.7, changefreq: "weekly" });
  }
  for (const bd of brandDevices) {
    entries.push({ url: `${SITE_URL}/appliance/${bd}`, priority: 0.7, changefreq: "weekly" });
  }

  // HVAC pages
  const hvacDir = path.join(DATA_DIR, "hvac");
  if (fs.existsSync(hvacDir)) {
    entries.push({ url: `${SITE_URL}/hvac`, priority: 0.9, changefreq: "weekly" });
    const hvacBrands = new Set<string>();
    const hvacBrandDevices = new Set<string>();
    for (const brand of fs.readdirSync(hvacDir).filter((f) => fs.statSync(path.join(hvacDir, f)).isDirectory())) {
      const brandDir = path.join(hvacDir, brand);
      for (const file of fs.readdirSync(brandDir).filter((f) => f.endsWith(".json"))) {
        const dt = file.replace(".json", "");
        const data = readJsonArray<{ code: string }>(path.join(brandDir, file));
        hvacBrands.add(brand);
        hvacBrandDevices.add(`${brand}/${dt}`);
        for (const item of data) {
          entries.push({ url: `${SITE_URL}/hvac/${brand}/${dt}/${item.code.toLowerCase()}`, priority: 0.8, changefreq: "monthly" });
        }
      }
    }
    for (const b of hvacBrands) entries.push({ url: `${SITE_URL}/hvac/${b}`, priority: 0.7, changefreq: "weekly" });
    for (const bd of hvacBrandDevices) entries.push({ url: `${SITE_URL}/hvac/${bd}`, priority: 0.7, changefreq: "weekly" });
  }

  // Printer pages
  const printerDir = path.join(DATA_DIR, "printer");
  if (fs.existsSync(printerDir)) {
    entries.push({ url: `${SITE_URL}/printer`, priority: 0.9, changefreq: "weekly" });
    for (const file of fs.readdirSync(printerDir).filter((f) => f.endsWith(".json"))) {
      const brand = file.replace(".json", "");
      const data = readJsonArray<{ code: string; brandSlug: string }>(path.join(printerDir, file));
      entries.push({ url: `${SITE_URL}/printer/${brand}`, priority: 0.7, changefreq: "weekly" });
      for (const item of data) {
        entries.push({ url: `${SITE_URL}/printer/${brand}/${item.code.toLowerCase()}`, priority: 0.8, changefreq: "monthly" });
      }
    }
  }

  // Windows pages
  const winDir = path.join(DATA_DIR, "windows");
  if (fs.existsSync(winDir)) {
    entries.push({ url: `${SITE_URL}/windows`, priority: 0.9, changefreq: "weekly" });
    for (const file of fs.readdirSync(winDir).filter((f) => f.endsWith(".json"))) {
      const cat = file.replace(".json", "");
      const catSlug = cat.replace("update-errors", "update").replace("system-errors", "system").replace("browser-errors", "browser");
      entries.push({ url: `${SITE_URL}/windows/${catSlug}`, priority: 0.7, changefreq: "weekly" });
      const data = readJsonArray<{ code: string }>(path.join(winDir, file));
      for (const item of data) {
        entries.push({ url: `${SITE_URL}/windows/${catSlug}/${item.code.toLowerCase()}`, priority: 0.8, changefreq: "monthly" });
      }
    }
  }

  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

const sitemap = buildSitemap();
fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), sitemap);
console.log(`Sitemap generated with ${sitemap.split("<url>").length - 1} URLs`);
