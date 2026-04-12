import type { Metadata } from "next";
import Link from "next/link";
import { getWindowsCodes } from "@/lib/data-loader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Blue Screen of Death (BSOD) Error Codes — Complete List",
  description: "All Windows BSOD stop codes with meanings, causes, and step-by-step fix guides.",
  alternates: { canonical: getCanonicalUrl("/windows/bsod") },
};

export default function BSODIndexPage() {
  const codes = getWindowsCodes("bsod");
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Windows", href: "/windows" }, { label: "BSOD", href: "/windows/bsod" }]} />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Blue Screen of Death (BSOD) Error Codes</h1>
      <p className="mt-2 text-lg text-gray-600">{codes.length} BSOD stop codes with causes and fixes.</p>
      <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b"><th className="text-left px-4 py-3 font-semibold">Code</th><th className="text-left px-4 py-3 font-semibold">Title</th></tr></thead>
          <tbody>
            {codes.sort((a, b) => a.code.localeCompare(b.code)).map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3"><Link href={`/windows/bsod/${c.code.toLowerCase()}`} className="font-mono text-sm font-semibold text-brand-primary hover:underline">{c.displayCode}</Link></td>
                <td className="px-4 py-3 text-gray-700">{c.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
