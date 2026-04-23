import Link from "next/link";
import fs from "fs";
import path from "path";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import SearchBar from "@/components/search/SearchBar";

function walkJsonFiles(dir: string, acc: string[] = [], base = dir): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkJsonFiles(full, acc, base);
    else if (entry.isFile() && entry.name.endsWith(".json")) {
      acc.push(path.relative(base, full));
    }
  }
  return acc;
}

const CATEGORIES = [
  {
    title: "OBD-II",
    subtitle: "Cars & Trucks",
    description: "Check engine light codes for all vehicles 1996+. P, B, C, and U codes.",
    href: "/obd2",
    icon: "\uD83D\uDE97",
    accent: "from-blue-50 border-blue-200 hover:border-blue-300",
  },
  {
    title: "Appliances",
    subtitle: "Home Devices",
    description: "Samsung, LG, Whirlpool, Bosch, GE — washers, dryers, dishwashers, refrigerators, ovens.",
    href: "/appliance",
    icon: "\uD83E\uDDFA",
    accent: "from-emerald-50 border-emerald-200 hover:border-emerald-300",
  },
  {
    title: "HVAC",
    subtitle: "Heating & Cooling",
    description: "Furnace blink codes, AC errors, heat pumps, mini-splits, thermostats, water heaters.",
    href: "/hvac",
    icon: "\u2744\uFE0F",
    accent: "from-cyan-50 border-cyan-200 hover:border-cyan-300",
  },
  {
    title: "Printers",
    subtitle: "Home & Office",
    description: "HP, Canon, Epson, Brother, Xerox, Lexmark — paper jams, ink errors, hardware faults.",
    href: "/printer",
    icon: "\uD83D\uDDA8\uFE0F",
    accent: "from-violet-50 border-violet-200 hover:border-violet-300",
  },
  {
    title: "Windows",
    subtitle: "PC Errors",
    description: "BSOD stop codes, Windows Update errors, system errors, and browser/network errors.",
    href: "/windows",
    icon: "\uD83D\uDCBB",
    accent: "from-orange-50 border-orange-200 hover:border-orange-300",
  },
  {
    title: "TVs & Consoles",
    subtitle: "Entertainment",
    description: "Samsung, LG, Sony, Vizio TVs · PlayStation, Xbox, Nintendo error codes.",
    href: "/appliance",
    icon: "\uD83D\uDCFA",
    accent: "from-pink-50 border-pink-200 hover:border-pink-300",
  },
];

// Hand-picked codes that drive high search traffic ("trending" even though
// static — these really are the most-searched error codes).
const TRENDING_CODES = [
  { code: "P0420", title: "Catalyst System Efficiency Below Threshold", href: "/obd2/p0420", cat: "OBD-II" },
  { code: "P0300", title: "Random/Multiple Cylinder Misfire Detected", href: "/obd2/p0300", cat: "OBD-II" },
  { code: "P0171", title: "System Too Lean (Bank 1)", href: "/obd2/p0171", cat: "OBD-II" },
  { code: "P0128", title: "Coolant Temperature Below Thermostat Regulating Temp", href: "/obd2/p0128", cat: "OBD-II" },
  { code: "1E", title: "Samsung Washer Water Level Sensor Error", href: "/appliance/samsung/washer/1e", cat: "Samsung" },
  { code: "F8E2", title: "Whirlpool Washer Door Latch Failure", href: "/appliance/whirlpool/washer/f8e2", cat: "Whirlpool" },
  { code: "LE", title: "LG Washer Motor Error", href: "/appliance/lg/washer/le", cat: "LG" },
  { code: "0x0000007B", title: "INACCESSIBLE_BOOT_DEVICE (BSOD)", href: "/windows/bsod/0x0000007b", cat: "Windows" },
];

const SYMPTOMS = [
  { label: "Check engine light is on", query: "check engine", icon: "⚠️" },
  { label: "Washer won't drain", query: "washer drain", icon: "💧" },
  { label: "Furnace is blinking", query: "furnace blink", icon: "🔥" },
  { label: "PC won't boot / BSOD", query: "boot BSOD", icon: "💻" },
  { label: "Printer paper jam", query: "paper jam", icon: "🖨️" },
  { label: "AC not cooling", query: "AC not cooling", icon: "❄️" },
];

interface SiteStats {
  total: number;
  byCat: { label: string; count: number }[];
  brands: number;
}

function collectStats(): SiteStats {
  const dataDir = path.join(process.cwd(), "data");
  const files = walkJsonFiles(dataDir);

  const byCat: Record<string, number> = {};
  const brands = new Set<string>();
  let total = 0;

  for (const relPath of files) {
    const full = path.join(dataDir, relPath);
    try {
      const raw = fs.readFileSync(full, "utf-8");
      const data = JSON.parse(raw);
      if (!Array.isArray(data)) continue;
      const parts = relPath.split(path.sep);
      const cat = parts[0];
      byCat[cat] = (byCat[cat] || 0) + data.length;
      total += data.length;
      if (parts.length > 1 && (cat === "appliance" || cat === "hvac")) {
        brands.add(parts[1]);
      }
    } catch {
      /* skip bad files */
    }
  }

  const catLabels: Record<string, string> = {
    obd2: "OBD-II",
    appliance: "Appliances",
    hvac: "HVAC",
    printer: "Printers",
    windows: "Windows",
  };

  return {
    total,
    byCat: Object.entries(byCat)
      .map(([k, v]) => ({ label: catLabels[k] || k, count: v }))
      .sort((a, b) => b.count - a.count),
    brands: brands.size,
  };
}

export default function HomePage() {
  const stats = collectStats();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "The most comprehensive error code database. Find meanings, causes, and step-by-step fixes for error codes on cars, appliances, HVAC systems, printers, and computers.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={websiteJsonLd} />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-white pt-10 pb-10 sm:pt-16 sm:pb-14">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {stats.total.toLocaleString()} error codes · free forever · no signup
          </div>

          <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Find &amp; Fix Any Error Code
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Plain-language explanations, step-by-step fixes, and repair costs for
            every error code on cars, appliances, HVAC, printers, and computers.
          </p>
          <div className="mt-6 sm:mt-7">
            <SearchBar variant="hero" autoFocus={false} />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500">
            <span className="font-medium text-gray-600">Try:</span>
            <Link href="/search?q=P0420" className="hover:text-brand-primary hover:underline font-mono">P0420</Link>
            <span aria-hidden="true">·</span>
            <Link href="/search?q=Samsung+washer+1E" className="hover:text-brand-primary hover:underline">Samsung washer 1E</Link>
            <span aria-hidden="true">·</span>
            <Link href="/search?q=0x0000007B" className="hover:text-brand-primary hover:underline font-mono">0x0000007B</Link>
            <span aria-hidden="true">·</span>
            <Link href="/search?q=blinking+red+light+furnace" className="hover:text-brand-primary hover:underline">blinking furnace</Link>
          </div>
        </div>

        {/* Trust stats strip */}
        <div className="mt-10 sm:mt-14 mx-auto max-w-5xl px-4">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            <StatCard label="Error codes" value={stats.total.toLocaleString()} />
            <StatCard label="Brands covered" value={`${stats.brands}+`} />
            <StatCard label="Categories" value={stats.byCat.length.toString()} />
            <StatCard label="Price" value="Free" />
          </dl>
        </div>
      </section>

      {/* Symptom quick-picks */}
      <section className="py-10 sm:py-12 border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Don&rsquo;t know the code?</h2>
              <p className="mt-1 text-sm text-gray-600">Start with a symptom instead.</p>
            </div>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {SYMPTOMS.map((s) => (
              <li key={s.query}>
                <Link
                  href={`/search?q=${encodeURIComponent(s.query)}`}
                  className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 hover:border-brand-primary hover:bg-blue-50 transition-colors"
                >
                  <span className="text-lg shrink-0" aria-hidden="true">{s.icon}</span>
                  <span className="truncate">{s.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Browse by Category</h2>
            <p className="mt-1 text-sm text-gray-600">
              {stats.byCat.map((c) => `${c.label} ${c.count.toLocaleString()}`).join(" · ")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className={`group block bg-gradient-to-b ${cat.accent} to-white border rounded-xl p-5 transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl shrink-0" aria-hidden="true">{cat.icon}</div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{cat.subtitle}</div>
                    <h3 className="mt-0.5 text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending codes */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Most-searched error codes</h2>
              <p className="mt-1 text-sm text-gray-600">The ones drivers, homeowners, and IT pros look up most.</p>
            </div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {TRENDING_CODES.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 hover:border-brand-primary hover:bg-blue-50 transition-colors"
                >
                  <span className="font-mono font-semibold text-brand-primary shrink-0 text-sm sm:text-base">
                    {c.code}
                  </span>
                  <span className="inline-flex shrink-0 items-center rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                    {c.cat}
                  </span>
                  <span className="text-sm text-gray-700 truncate">{c.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SEO / About */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">About {SITE_NAME}</h2>
          <div className="prose prose-gray max-w-none text-gray-700 space-y-3 text-sm sm:text-base">
            <p>
              {SITE_NAME} is a free reference for error codes on everyday devices.
              Whether your check engine light just came on, your washing machine is showing a
              mysterious error, or your furnace LED is blinking a pattern, we have the answers.
            </p>
            <p>
              Every code page includes a plain-language explanation of what it means, common causes
              ranked by likelihood, step-by-step repair instructions with difficulty and time
              estimates, DIY vs. professional repair costs, and answers to frequently asked questions.
            </p>
            <p>
              Our database covers OBD-II automotive codes, home appliance errors from Samsung, LG,
              Whirlpool, Bosch, GE, Miele and {stats.brands - 6}+ other brands, HVAC system errors,
              printer errors from HP, Canon, Epson, Brother, Xerox, Lexmark, and Windows errors
              including BSOD stop codes and update errors.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white border border-gray-200 px-4 py-3 text-center shadow-sm">
      <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
      <div className="mt-0.5 text-[11px] sm:text-xs uppercase tracking-wide font-medium text-gray-500">
        {label}
      </div>
    </div>
  );
}
