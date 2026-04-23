// Lightweight client-side search over the pre-built /search-index.json.
// No deps — scoring on plain substring + token matches, tuned for error codes.

export interface IndexEntry {
  c: string; // code
  t: string; // title
  s: string; // shortDescription
  u: string; // url
  cat: string; // category
  b?: string; // brand
  d?: string; // device/subtype
}

export interface ScoredEntry extends IndexEntry {
  score: number;
}

let cache: IndexEntry[] | null = null;
let cachePromise: Promise<IndexEntry[]> | null = null;

export async function loadIndex(): Promise<IndexEntry[]> {
  if (cache) return cache;
  if (!cachePromise) {
    cachePromise = fetch("/search-index.json")
      .then((r) => r.json())
      .then((d: IndexEntry[]) => {
        cache = d;
        return d;
      })
      .catch(() => {
        cachePromise = null;
        return [];
      });
  }
  return cachePromise;
}

function norm(str: string): string {
  return (str || "").toLowerCase().trim();
}

/**
 * Score a single entry against the query.
 * Weights favor exact code matches (what users search most: "P0420", "1E", "F03").
 */
function score(entry: IndexEntry, q: string, qTokens: string[]): number {
  const code = norm(entry.c);
  const title = norm(entry.t);
  const brand = norm(entry.b || "");
  const device = norm(entry.d || "");
  const short = norm(entry.s);

  let s = 0;

  // Exact code match → top
  if (code === q) s += 1000;
  // Code starts with query (typing in progress)
  else if (code.startsWith(q)) s += 600;
  // Code contains query
  else if (code.includes(q)) s += 300;

  // Strip non-alnum for loose code match ("p-0420" matches "P0420")
  const codeAlnum = code.replace(/[^a-z0-9]/g, "");
  const qAlnum = q.replace(/[^a-z0-9]/g, "");
  if (qAlnum.length >= 3 && codeAlnum === qAlnum) s += 800;
  else if (qAlnum.length >= 3 && codeAlnum.startsWith(qAlnum)) s += 400;

  // Brand/device boosts
  if (brand && brand.includes(q)) s += 80;
  if (device && device.includes(q)) s += 60;

  // Title / description
  if (title.includes(q)) s += 40;
  if (short.includes(q)) s += 15;

  // Token matches (multi-word query)
  if (qTokens.length > 1) {
    const all = `${code} ${title} ${brand} ${device} ${short}`;
    const hits = qTokens.filter((t) => t.length > 1 && all.includes(t)).length;
    s += hits * 10;
  }

  return s;
}

export function searchIndex(
  index: IndexEntry[],
  query: string,
  limit = 20,
  category?: string,
): ScoredEntry[] {
  const q = norm(query);
  if (!q) return [];
  const qTokens = q.split(/\s+/).filter(Boolean);

  const results: ScoredEntry[] = [];
  for (const e of index) {
    if (category && e.cat !== category) continue;
    const sc = score(e, q, qTokens);
    if (sc > 0) results.push({ ...e, score: sc });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

export function categoryAccent(cat: string): string {
  switch (cat) {
    case "OBD-II":
      return "bg-blue-100 text-blue-800";
    case "Appliance":
      return "bg-green-100 text-green-800";
    case "HVAC":
      return "bg-cyan-100 text-cyan-800";
    case "Printer":
      return "bg-purple-100 text-purple-800";
    case "Windows":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
