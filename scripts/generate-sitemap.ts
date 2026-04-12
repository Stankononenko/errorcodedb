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

function getAllOBDCodes(): { code: string }[] {
  const dir = path.join(DATA_DIR, "obd2");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const codes: { code: string }[] = [];
  for (const file of files) {
    const data = readJsonArray<{ code: string }>(path.join(dir, file));
    codes.push(...data);
  }
  return codes;
}

function buildSitemap(): string {
  const entries: SitemapEntry[] = [];

  // Static pages
  entries.push({ url: SITE_URL, priority: 1.0, changefreq: "weekly" });
  entries.push({ url: `${SITE_URL}/obd2`, priority: 0.9, changefreq: "weekly" });
  entries.push({ url: `${SITE_URL}/about`, priority: 0.3, changefreq: "monthly" });
  entries.push({ url: `${SITE_URL}/privacy`, priority: 0.2, changefreq: "monthly" });
  entries.push({ url: `${SITE_URL}/terms`, priority: 0.2, changefreq: "monthly" });
  entries.push({ url: `${SITE_URL}/disclaimer`, priority: 0.2, changefreq: "monthly" });
  entries.push({ url: `${SITE_URL}/contact`, priority: 0.3, changefreq: "monthly" });

  // OBD-II code pages
  const obdCodes = getAllOBDCodes();
  for (const code of obdCodes) {
    entries.push({
      url: `${SITE_URL}/obd2/${code.code.toLowerCase()}`,
      priority: 0.8,
      changefreq: "monthly",
    });
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
