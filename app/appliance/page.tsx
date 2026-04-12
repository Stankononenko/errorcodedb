import type { Metadata } from "next";
import Link from "next/link";
import { getApplianceCodes } from "@/lib/data-loader";
import { APPLIANCE_BRANDS, APPLIANCE_DEVICE_TYPES } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, getCanonicalUrl } from "@/lib/seo-helpers";
import { SITE_URL } from "@/lib/constants";
import { ApplianceDeviceType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Appliance Error Codes — All Brands & Devices",
  description:
    "Find error codes for Samsung, LG, Whirlpool, Bosch, GE, and more. Washers, dryers, dishwashers, refrigerators — with step-by-step fix guides.",
  alternates: { canonical: getCanonicalUrl("/appliance") },
};

export default function ApplianceIndexPage() {
  const allCodes = getApplianceCodes();

  const brandStats = APPLIANCE_BRANDS.map((brand) => {
    const codes = allCodes.filter((c) => c.brandSlug === brand.slug);
    const deviceTypes = [...new Set(codes.map((c) => c.deviceTypeSlug))];
    return { ...brand, codeCount: codes.length, deviceTypes };
  }).filter((b) => b.codeCount > 0);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Appliance Error Codes", url: `${SITE_URL}/appliance` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Appliance Error Codes", href: "/appliance" }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">Appliance Error Codes</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl">
            Complete error code database for home appliances. Find the meaning, causes, and
            step-by-step repair instructions for error codes on washers, dryers, dishwashers,
            refrigerators, ovens, microwaves, and more from all major brands.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Brand</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandStats.map((brand) => (
              <Link
                key={brand.slug}
                href={`/appliance/${brand.slug}`}
                className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-gray-900">{brand.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{brand.codeCount} error codes</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {brand.deviceTypes.map((dt) => (
                    <span
                      key={dt}
                      className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {APPLIANCE_DEVICE_TYPES[dt as ApplianceDeviceType]?.label || dt}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Codes Table */}
        {allCodes.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              All Appliance Error Codes ({allCodes.length})
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Brand</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Device</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Code</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900 hidden sm:table-cell">Title</th>
                  </tr>
                </thead>
                <tbody>
                  {allCodes
                    .sort((a, b) => a.brand.localeCompare(b.brand) || a.deviceType.localeCompare(b.deviceType) || a.code.localeCompare(b.code))
                    .map((code) => (
                      <tr key={code.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-700">{code.brand}</td>
                        <td className="px-4 py-2 text-gray-700">{code.deviceType}</td>
                        <td className="px-4 py-2">
                          <Link
                            href={`/appliance/${code.brandSlug}/${code.deviceTypeSlug}/${code.code.toLowerCase()}`}
                            className="font-mono font-semibold text-brand-primary hover:underline"
                          >
                            {code.displayCode}
                          </Link>
                        </td>
                        <td className="px-4 py-2 text-gray-600 hidden sm:table-cell">{code.title}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
