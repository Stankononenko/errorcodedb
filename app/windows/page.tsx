import type { Metadata } from "next";
import Link from "next/link";
import { getWindowsCodes } from "@/lib/data-loader";
import { WINDOWS_CATEGORIES } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Windows Error Codes — BSOD, Update, System & Browser Errors",
  description: "Fix Windows errors: Blue Screen of Death codes, Windows Update errors, system errors, and browser/network errors with step-by-step guides.",
  alternates: { canonical: getCanonicalUrl("/windows") },
};

export default function WindowsIndexPage() {
  const allCodes = getWindowsCodes();
  const catStats = WINDOWS_CATEGORIES.map((cat) => ({
    ...cat,
    count: allCodes.filter((c) => c.category === cat.slug).length,
  })).filter((c) => c.count > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Windows Error Codes", href: "/windows" }]} />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Windows Error Codes</h1>
      <p className="mt-2 text-lg text-gray-600 max-w-3xl">Complete database of Windows errors: BSOD stop codes, Windows Update errors, system errors, and browser/network errors.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {catStats.map((cat) => (
          <Link key={cat.slug} href={`/windows/${cat.slug}`} className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-gray-900">{cat.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{cat.description}</p>
            <p className="text-sm text-gray-500 mt-2">{cat.count} error codes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
