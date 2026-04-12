import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPrinterCodes } from "@/lib/data-loader";
import { PRINTER_BRANDS } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo-helpers";

interface PageProps { params: Promise<{ brand: string }> }

export async function generateStaticParams() {
  const codes = getPrinterCodes();
  return [...new Set(codes.map((c) => c.brandSlug))].map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand } = await params;
  const info = PRINTER_BRANDS.find((b) => b.slug === brand);
  if (!info) return { title: "Not Found" };
  return { title: `${info.name} Printer Error Codes`, description: `All ${info.name} printer error codes with fixes.`, alternates: { canonical: getCanonicalUrl(`/printer/${brand}`) } };
}

export default async function PrinterBrandPage({ params }: PageProps) {
  const { brand } = await params;
  const info = PRINTER_BRANDS.find((b) => b.slug === brand);
  if (!info) notFound();
  const codes = getPrinterCodes(brand);
  if (codes.length === 0) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Printers", href: "/printer" }, { label: info.name, href: `/printer/${brand}` }]} />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">{info.name} Printer Error Codes</h1>
      <p className="mt-2 text-lg text-gray-600">{codes.length} error codes with step-by-step fixes.</p>
      <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b"><th className="text-left px-4 py-3 font-semibold">Code</th><th className="text-left px-4 py-3 font-semibold">Type</th><th className="text-left px-4 py-3 font-semibold">Title</th></tr></thead>
          <tbody>
            {codes.sort((a, b) => a.code.localeCompare(b.code)).map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3"><Link href={`/printer/${brand}/${c.code.toLowerCase()}`} className="font-mono font-semibold text-brand-primary hover:underline">{c.displayCode}</Link></td>
                <td className="px-4 py-3 text-gray-500 capitalize">{c.errorType}</td>
                <td className="px-4 py-3 text-gray-700">{c.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
