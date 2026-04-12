import type { Metadata } from "next";
import Link from "next/link";
import { getHVACCodes } from "@/lib/data-loader";
import { HVAC_BRANDS, HVAC_DEVICE_TYPES } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, getCanonicalUrl } from "@/lib/seo-helpers";
import { SITE_URL } from "@/lib/constants";
import { HVACDeviceType } from "@/lib/types";

export const metadata: Metadata = {
  title: "HVAC Error Codes — Furnaces, AC, Heat Pumps, Thermostats",
  description: "Find error codes for Carrier, Lennox, Trane, Goodman, Rheem, Daikin, Mitsubishi, Honeywell, Nest. Furnace blink codes, AC errors, mini-split codes.",
  alternates: { canonical: getCanonicalUrl("/hvac") },
};

export default function HVACIndexPage() {
  const allCodes = getHVACCodes();
  const brandStats = HVAC_BRANDS.map((brand) => {
    const codes = allCodes.filter((c) => c.brandSlug === brand.slug);
    const deviceTypes = [...new Set(codes.map((c) => c.deviceTypeSlug))];
    return { ...brand, codeCount: codes.length, deviceTypes };
  }).filter((b) => b.codeCount > 0);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "HVAC Error Codes", url: `${SITE_URL}/hvac` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "HVAC Error Codes", href: "/hvac" }]} />
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">HVAC Error Codes</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl">
            Complete database of HVAC error codes. Furnace LED blink codes, air conditioner errors,
            heat pump codes, mini-split system errors, thermostat troubleshooting, and water heater codes.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandStats.map((brand) => (
            <Link key={brand.slug} href={`/hvac/${brand.slug}`}
              className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-900">{brand.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{brand.codeCount} error codes</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {brand.deviceTypes.map((dt) => (
                  <span key={dt} className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {HVAC_DEVICE_TYPES[dt as HVACDeviceType]?.label || dt}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
