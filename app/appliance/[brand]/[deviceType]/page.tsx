import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplianceCodes } from "@/lib/data-loader";
import { APPLIANCE_BRANDS, APPLIANCE_DEVICE_TYPES } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, getCanonicalUrl } from "@/lib/seo-helpers";
import { SITE_URL } from "@/lib/constants";
import { ApplianceDeviceType } from "@/lib/types";

interface PageProps {
  params: Promise<{ brand: string; deviceType: string }>;
}

export async function generateStaticParams() {
  const allCodes = getApplianceCodes();
  const combos = new Set<string>();
  const results: { brand: string; deviceType: string }[] = [];
  for (const code of allCodes) {
    const key = `${code.brandSlug}/${code.deviceTypeSlug}`;
    if (!combos.has(key)) {
      combos.add(key);
      results.push({ brand: code.brandSlug, deviceType: code.deviceTypeSlug });
    }
  }
  return results;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandSlug, deviceType: dtSlug } = await params;
  const brandInfo = APPLIANCE_BRANDS.find((b) => b.slug === brandSlug);
  const dtInfo = APPLIANCE_DEVICE_TYPES[dtSlug as ApplianceDeviceType];
  if (!brandInfo || !dtInfo) return { title: "Not Found" };

  return {
    title: `${brandInfo.name} ${dtInfo.label} Error Codes — Complete List`,
    description: `All ${brandInfo.name} ${dtInfo.label.toLowerCase()} error codes with meanings, causes, and step-by-step repair guides.`,
    alternates: { canonical: getCanonicalUrl(`/appliance/${brandSlug}/${dtSlug}`) },
  };
}

export default async function DeviceTypePage({ params }: PageProps) {
  const { brand: brandSlug, deviceType: dtSlug } = await params;
  const brandInfo = APPLIANCE_BRANDS.find((b) => b.slug === brandSlug);
  const dtInfo = APPLIANCE_DEVICE_TYPES[dtSlug as ApplianceDeviceType];
  if (!brandInfo || !dtInfo) notFound();

  const codes = getApplianceCodes(brandSlug, dtSlug);
  if (codes.length === 0) notFound();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Appliances", url: `${SITE_URL}/appliance` },
    { name: brandInfo.name, url: `${SITE_URL}/appliance/${brandSlug}` },
    { name: dtInfo.label, url: `${SITE_URL}/appliance/${brandSlug}/${dtSlug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Appliances", href: "/appliance" },
            { label: brandInfo.name, href: `/appliance/${brandSlug}` },
            { label: dtInfo.label, href: `/appliance/${brandSlug}/${dtSlug}` },
          ]}
        />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {brandInfo.name} {dtInfo.label} Error Codes
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl">
            Complete list of {brandInfo.name} {dtInfo.label.toLowerCase()} error codes.
            {codes.length} codes with detailed causes, symptoms, and step-by-step repair instructions.
          </p>
        </div>

        <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Code</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 hidden sm:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              {codes
                .sort((a, b) => a.code.localeCompare(b.code))
                .map((code) => (
                  <tr key={code.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/appliance/${brandSlug}/${dtSlug}/${code.code.toLowerCase()}`}
                        className="font-mono font-semibold text-brand-primary hover:underline"
                      >
                        {code.displayCode}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{code.title}</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell line-clamp-1">{code.shortDescription}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
