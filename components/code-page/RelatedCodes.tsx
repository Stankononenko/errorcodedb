import Link from "next/link";
import fs from "fs";
import path from "path";
import { CodeCategory } from "@/lib/types";

interface RelatedCodesProps {
  codes: string[];
  category: CodeCategory;
  brand?: string;
  brandSlug?: string;
  deviceTypeSlug?: string;
}

interface RelatedEntry {
  code: string;
  title: string;
  url: string;
}

function getCodeUrl(
  code: string,
  category: CodeCategory,
  brandSlug?: string,
  deviceTypeSlug?: string,
): string {
  switch (category) {
    case "obd2":
      return `/obd2/${code.toLowerCase()}`;
    case "appliance":
      return `/appliance/${brandSlug}/${deviceTypeSlug}/${code.toLowerCase()}`;
    case "hvac":
      return `/hvac/${brandSlug}/${deviceTypeSlug}/${code.toLowerCase()}`;
    case "printer":
      return `/printer/${brandSlug}/${code.toLowerCase()}`;
    case "windows":
      return `/windows/${code.toLowerCase()}`;
    default:
      return "#";
  }
}

/**
 * Try to find the short title of a related code by reading the data file.
 * Returns null if the file can't be found / code not in it (not every
 * related code has a dedicated page yet).
 */
function findTitle(
  code: string,
  category: CodeCategory,
  brandSlug?: string,
  deviceTypeSlug?: string,
): string | null {
  const dataDir = path.join(process.cwd(), "data");
  const lc = code.toLowerCase();

  try {
    if (category === "obd2") {
      const dir = path.join(dataDir, "obd2");
      if (!fs.existsSync(dir)) return null;
      for (const f of fs.readdirSync(dir)) {
        if (!f.endsWith(".json")) continue;
        const codes = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as Array<{ code: string; title: string }>;
        const match = codes.find((c) => c.code.toLowerCase() === lc);
        if (match) return match.title;
      }
    } else if (category === "appliance" && brandSlug && deviceTypeSlug) {
      const file = path.join(dataDir, "appliance", brandSlug, `${deviceTypeSlug}.json`);
      if (fs.existsSync(file)) {
        const codes = JSON.parse(fs.readFileSync(file, "utf-8")) as Array<{ code: string; title: string }>;
        const match = codes.find((c) => c.code.toLowerCase() === lc);
        if (match) return match.title;
      }
    } else if (category === "hvac" && brandSlug && deviceTypeSlug) {
      const file = path.join(dataDir, "hvac", brandSlug, `${deviceTypeSlug}.json`);
      if (fs.existsSync(file)) {
        const codes = JSON.parse(fs.readFileSync(file, "utf-8")) as Array<{ code: string; title: string }>;
        const match = codes.find((c) => c.code.toLowerCase() === lc);
        if (match) return match.title;
      }
    } else if (category === "printer" && brandSlug) {
      const file = path.join(dataDir, "printer", `${brandSlug}.json`);
      if (fs.existsSync(file)) {
        const codes = JSON.parse(fs.readFileSync(file, "utf-8")) as Array<{ code: string; title: string }>;
        const match = codes.find((c) => c.code.toLowerCase() === lc);
        if (match) return match.title;
      }
    }
  } catch {
    /* noop */
  }

  return null;
}

export default function RelatedCodes({
  codes,
  category,
  brandSlug,
  deviceTypeSlug,
}: RelatedCodesProps) {
  if (codes.length === 0) return null;

  const enriched: RelatedEntry[] = codes.map((code) => ({
    code,
    title: findTitle(code, category, brandSlug, deviceTypeSlug) || "",
    url: getCodeUrl(code, category, brandSlug, deviceTypeSlug),
  }));

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Related error codes</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {enriched.map(({ code, title, url }) => (
          <li key={code}>
            <Link
              href={url}
              className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-brand-primary hover:bg-blue-50 transition-colors"
            >
              <span className="font-mono font-semibold text-brand-primary shrink-0">
                {code}
              </span>
              {title && (
                <span className="text-sm text-gray-700 group-hover:text-gray-900 line-clamp-2">
                  {title}
                </span>
              )}
              {!title && (
                <span className="text-sm text-gray-400 italic">
                  View details
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
