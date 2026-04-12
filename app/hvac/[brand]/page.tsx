import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHVACCodes } from "@/lib/data-loader";
import { HVAC_BRANDS, HVAC_DEVICE_TYPES } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/seo-helpers";
import { HVACDeviceType } from "@/lib/types";

interface PageProps { params: Promise<{ brand: string }> }

export async function generateStaticParams() {
  const codes = getHVACCodes();
  return [...new Set(codes.map((c) => c.brandSlug))].map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand } = await params;
  const info = HVAC_BRANDS.find((b) => b.slug === brand);
  if (!info) return { title: "Not Found" };
  return {
    title: `${info.name} HVAC Error Codes`,
    description: `All ${info.name} error codes for furnaces, AC, heat pumps, and thermostats.`,
    alternates: { canonical: getCanonicalUrl(`/hvac/${brand}`) },
  };
}

export default async function HVACBrandPage({ params }: PageProps) {
  const { brand } = await params;
  const info = HVAC_BRANDS.find((b) => b.slug === brand);
  if (!info) notFound();
  const codes = getHVACCodes(brand);
  if (codes.length === 0) notFound();

  const groups = codes.reduce<Record<string, typeof codes>>((acc, c) => {
    if (!acc[c.deviceTypeSlug]) acc[c.deviceTypeSlug] = [];
    acc[c.deviceTypeSlug].push(c);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "HVAC", href: "/hvac" }, { label: info.name, href: `/hvac/${brand}` }]} />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">{info.name} Error Codes</h1>
      <p className="mt-2 text-lg text-gray-600">{codes.length} error codes</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(groups).map(([dt, dtCodes]) => (
          <Link key={dt} href={`/hvac/${brand}/${dt}`}
            className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900">{info.name} {HVAC_DEVICE_TYPES[dt as HVACDeviceType]?.label || dt}</h3>
            <p className="text-sm text-gray-500 mt-1">{dtCodes.length} codes</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b"><th className="text-left px-4 py-3 font-semibold">Device</th><th className="text-left px-4 py-3 font-semibold">Code</th><th className="text-left px-4 py-3 font-semibold">Title</th></tr></thead>
          <tbody>
            {codes.sort((a, b) => a.deviceType.localeCompare(b.deviceType) || a.code.localeCompare(b.code)).map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{c.deviceType}</td>
                <td className="px-4 py-2"><Link href={`/hvac/${brand}/${c.deviceTypeSlug}/${c.code.toLowerCase()}`} className="font-mono font-semibold text-brand-primary hover:underline">{c.displayCode}</Link></td>
                <td className="px-4 py-2 text-gray-600">{c.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
