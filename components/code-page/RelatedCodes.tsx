import Link from "next/link";
import { CodeCategory } from "@/lib/types";

interface RelatedCodesProps {
  codes: string[];
  category: CodeCategory;
  brand?: string;
  brandSlug?: string;
  deviceTypeSlug?: string;
}

function getCodeUrl(
  code: string,
  category: CodeCategory,
  brandSlug?: string,
  deviceTypeSlug?: string
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

export default function RelatedCodes({ codes, category, brandSlug, deviceTypeSlug }: RelatedCodesProps) {
  if (codes.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Related Error Codes</h2>
      <div className="flex flex-wrap gap-2">
        {codes.map((code) => (
          <Link
            key={code}
            href={getCodeUrl(code, category, brandSlug, deviceTypeSlug)}
            className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-mono font-medium text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
          >
            {code}
          </Link>
        ))}
      </div>
    </section>
  );
}
