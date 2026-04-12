import type { Metadata } from "next";
import Link from "next/link";
import { getPrinterCodes } from "@/lib/data-loader";
import { PRINTER_BRANDS } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Printer Error Codes — HP, Canon, Epson, Brother, Xerox",
  description: "Find error codes for all major printer brands. Paper jams, ink errors, hardware faults, connectivity — with step-by-step fix guides.",
  alternates: { canonical: getCanonicalUrl("/printer") },
};

export default function PrinterIndexPage() {
  const allCodes = getPrinterCodes();
  const brandStats = PRINTER_BRANDS.map((b) => {
    const codes = allCodes.filter((c) => c.brandSlug === b.slug);
    return { ...b, codeCount: codes.length };
  }).filter((b) => b.codeCount > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Printer Error Codes", href: "/printer" }]} />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Printer Error Codes</h1>
      <p className="mt-2 text-lg text-gray-600 max-w-3xl">Complete database of printer error codes from HP, Canon, Epson, Brother, Xerox, and Lexmark.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brandStats.map((b) => (
          <Link key={b.slug} href={`/printer/${b.slug}`} className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-gray-900">{b.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{b.codeCount} error codes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
