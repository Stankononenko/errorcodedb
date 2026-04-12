import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHVACCodes } from "@/lib/data-loader";
import { HVAC_BRANDS, HVAC_DEVICE_TYPES } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo-helpers";
import { HVACDeviceType } from "@/lib/types";

interface PageProps { params: Promise<{ brand: string; deviceType: string }> }

export async function generateStaticParams() {
  const codes = getHVACCodes();
  const seen = new Set<string>();
  return codes.filter((c) => { const k = `${c.brandSlug}/${c.deviceTypeSlug}`; if (seen.has(k)) return false; seen.add(k); return true; })
    .map((c) => ({ brand: c.brandSlug, deviceType: c.deviceTypeSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand, deviceType } = await params;
  const bInfo = HVAC_BRANDS.find((b) => b.slug === brand);
  const dtInfo = HVAC_DEVICE_TYPES[deviceType as HVACDeviceType];
  if (!bInfo || !dtInfo) return { title: "Not Found" };
  return {
    title: `${bInfo.name} ${dtInfo.label} Error Codes`,
    description: `All ${bInfo.name} ${dtInfo.label.toLowerCase()} error codes with repair guides.`,
    alternates: { canonical: getCanonicalUrl(`/hvac/${brand}/${deviceType}`) },
  };
}

export default async function HVACDeviceTypePage({ params }: PageProps) {
  const { brand, deviceType } = await params;
  const bInfo = HVAC_BRANDS.find((b) => b.slug === brand);
  const dtInfo = HVAC_DEVICE_TYPES[deviceType as HVACDeviceType];
  if (!bInfo || !dtInfo) notFound();
  const codes = getHVACCodes(brand, deviceType);
  if (codes.length === 0) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "HVAC", href: "/hvac" }, { label: bInfo.name, href: `/hvac/${brand}` }, { label: dtInfo.label, href: `/hvac/${brand}/${deviceType}` }]} />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">{bInfo.name} {dtInfo.label} Error Codes</h1>
      <p className="mt-2 text-lg text-gray-600">{codes.length} codes with step-by-step repair instructions.</p>
      <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b"><th className="text-left px-4 py-3 font-semibold">Code</th><th className="text-left px-4 py-3 font-semibold">Title</th><th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Description</th></tr></thead>
          <tbody>
            {codes.sort((a, b) => a.code.localeCompare(b.code)).map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3"><Link href={`/hvac/${brand}/${deviceType}/${c.code.toLowerCase()}`} className="font-mono font-semibold text-brand-primary hover:underline">{c.displayCode}</Link></td>
                <td className="px-4 py-3 font-medium text-gray-800">{c.title}</td>
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell line-clamp-1">{c.shortDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
