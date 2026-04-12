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
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
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
