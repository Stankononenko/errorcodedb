import type { Metadata } from "next";
import Link from "next/link";
import { getWindowsCodes } from "@/lib/data-loader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Windows Update Error Codes — Complete List & Fixes",
  description: "All Windows Update error codes with step-by-step fixes.",
  alternates: { canonical: getCanonicalUrl("/windows/update") },
};

export default function UpdateIndexPage() {
  const codes = getWindowsCodes("update");
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Windows", href: "/windows" }, { label: "Update Errors", href: "/windows/update" }]} />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Windows Update Error Codes</h1>
      <p className="mt-2 text-lg text-gray-600">{codes.length} update errors with fixes.</p>
      <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b"><th className="text-left px-4 py-3 font-semibold">Code</th><th className="text-left px-4 py-3 font-semibold">Title</th></tr></thead>
          <tbody>
            {codes.sort((a, b) => a.code.localeCompare(b.code)).map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3"><Link href={`/windows/update/${c.code.toLowerCase()}`} className="font-mono text-sm font-semibold text-brand-primary hover:underline">{c.displayCode}</Link></td>
                <td className="px-4 py-3 text-gray-700">{c.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
