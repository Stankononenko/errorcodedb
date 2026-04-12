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
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  const allCodes = getApplianceCodes();
  const brands = [...new Set(allCodes.map((c) => c.brandSlug))];
  return brands.map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brandInfo = APPLIANCE_BRANDS.find((b) => b.slug === brandSlug);
  if (!brandInfo) return { title: "Brand Not Found" };

  return {
    title: `${brandInfo.name} Error Codes — All Appliances`,
    description: `Complete list of ${brandInfo.name} error codes for washers, dryers, dishwashers, refrigerators, and more. Step-by-step fix guides.`,
    alternates: { canonical: getCanonicalUrl(`/appliance/${brandSlug}`) },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { brand: brandSlug } = await params;
  const brandInfo = APPLIANCE_BRANDS.find((b) => b.slug === brandSlug);
  if (!brandInfo) notFound();

  const codes = getApplianceCodes(brandSlug);
  if (codes.length === 0) notFound();

  const deviceGroups = codes.reduce<Record<string, typeof codes>>((acc, code) => {
    if (!acc[code.deviceTypeSlug]) acc[code.deviceTypeSlug] = [];
    acc[code.deviceTypeSlug].push(code);
    return acc;
  }, {});

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Appliances", url: `${SITE_URL}/appliance` },
    { name: brandInfo.name, url: `${SITE_URL}/appliance/${brandSlug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Appliances", href: "/appliance" },
            { label: brandInfo.name, href: `/appliance/${brandSlug}` },
          ]}
        />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {brandInfo.name} Error Codes
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl">
            All {brandInfo.name} appliance error codes with meanings, causes, and step-by-step
            repair instructions. {codes.length} error codes across{" "}
            {Object.keys(deviceGroups).length} device types.
          </p>
        </div>

        {/* Device Type Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(deviceGroups).map(([deviceSlug, deviceCodes]) => {
            const dtInfo = APPLIANCE_DEVICE_TYPES[deviceSlug as ApplianceDeviceType];
            return (
              <Link
                key={deviceSlug}
                href={`/appliance/${brandSlug}/${deviceSlug}`}
                className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-gray-900">
                  {brandInfo.name} {dtInfo?.label || deviceSlug}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{deviceCodes.length} error codes</p>
              </Link>
            );
          })}
        </div>

        {/* All Codes for Brand */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All {brandInfo.name} Error Codes
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Device</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Code</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Title</th>
                </tr>
              </thead>
              <tbody>
                {codes
                  .sort((a, b) => a.deviceType.localeCompare(b.deviceType) || a.code.localeCompare(b.code))
                  .map((code) => (
                    <tr key={code.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">{code.deviceType}</td>
                      <td className="px-4 py-2">
                        <Link
                          href={`/appliance/${brandSlug}/${code.deviceTypeSlug}/${code.code.toLowerCase()}`}
                          className="font-mono font-semibold text-brand-primary hover:underline"
                        >
                          {code.displayCode}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-gray-600">{code.title}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
