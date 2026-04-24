import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getApplianceCodes } from "@/lib/data-loader";
import { APPLIANCE_DEVICE_TYPES, APPLIANCE_BRANDS, SITE_URL } from "@/lib/constants";
import {
  buildBreadcrumbJsonLd,
  getCanonicalUrl,
  buildOgMetadata,
} from "@/lib/seo-helpers";
import { ApplianceDeviceType } from "@/lib/types";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  // All device type slugs that have at least one code
  const allCodes = getApplianceCodes();
  const types = [...new Set(allCodes.map((c) => c.deviceTypeSlug))];
  return types.map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const typeInfo = APPLIANCE_DEVICE_TYPES[type as ApplianceDeviceType];
  if (!typeInfo) return { title: "Not Found" };

  const title = `${typeInfo.labelPlural} Error Codes — All Brands`;
  const description = `Complete list of ${typeInfo.label.toLowerCase()} error codes across Samsung, LG, Whirlpool, Bosch, GE, and 100+ brands. Causes, fix guides, costs.`;
  return {
    title,
    description,
    alternates: { canonical: getCanonicalUrl(`/appliance/by-device-type/${type}`) },
    ...buildOgMetadata(title, description, "appliance"),
  };
}

export default async function DeviceTypeHubPage({ params }: PageProps) {
  const { type } = await params;
  const typeInfo = APPLIANCE_DEVICE_TYPES[type as ApplianceDeviceType];
  if (!typeInfo) notFound();

  const allCodes = getApplianceCodes();
  const codes = allCodes.filter((c) => c.deviceTypeSlug === type);
  if (codes.length === 0) notFound();

  // Group by brand
  const byBrand: Record<string, typeof codes> = {};
  for (const c of codes) {
    if (!byBrand[c.brandSlug]) byBrand[c.brandSlug] = [];
    byBrand[c.brandSlug].push(c);
  }

  // Sort brands by code count
  const sortedBrands = Object.entries(byBrand).sort(
    ([, a], [, b]) => b.length - a.length,
  );

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Appliances", url: `${SITE_URL}/appliance` },
    { name: typeInfo.labelPlural, url: `${SITE_URL}/appliance/by-device-type/${type}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Appliances", href: "/appliance" },
            { label: typeInfo.labelPlural, href: `/appliance/by-device-type/${type}` },
          ]}
        />

        <header className="mt-6 border-b border-gray-200 pb-6">
          <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-800">
            {codes.length} codes · {sortedBrands.length} brands
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {typeInfo.labelPlural} error codes — all brands
          </h1>
          <p className="mt-3 text-lg text-gray-600 leading-relaxed">
            Find error code meanings and step-by-step fix guides for {typeInfo.label.toLowerCase()}s
            from every major brand. {codes.length.toLocaleString()} codes indexed across{" "}
            {sortedBrands.length} manufacturers.
          </p>
        </header>

        <section className="mt-6 prose prose-gray max-w-none text-gray-700">
          <p>
            Many {typeInfo.label.toLowerCase()} errors share root causes across brands — a drain
            fault on a Samsung washer and a Whirlpool washer both start at the coin filter. But
            the codes and diagnostic paths differ brand-to-brand. Use this page to find your
            specific code, or browse by brand below if you already know the manufacturer.
          </p>
        </section>

        <div className="mt-8 space-y-8">
          {sortedBrands.map(([brandSlug, brandCodes]) => {
            const brandInfo = APPLIANCE_BRANDS.find((b) => b.slug === brandSlug);
            return (
              <section key={brandSlug}>
                <div className="flex items-end justify-between gap-3 mb-3 pb-2 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    <Link
                      href={`/appliance/${brandSlug}`}
                      className="hover:text-brand-primary"
                    >
                      {brandInfo?.name || brandSlug}
                    </Link>
                  </h2>
                  <span className="text-xs text-gray-500">
                    {brandCodes.length} code{brandCodes.length === 1 ? "" : "s"}
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {brandCodes
                    .sort((a, b) => a.code.localeCompare(b.code))
                    .map((code) => (
                      <li key={code.id}>
                        <Link
                          href={`/appliance/${brandSlug}/${type}/${code.code.toLowerCase()}`}
                          className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:border-brand-primary hover:bg-blue-50 transition-colors"
                        >
                          <span className="font-mono font-semibold text-brand-primary shrink-0 text-sm">
                            {code.displayCode}
                          </span>
                          <span className="text-sm text-gray-700 truncate">
                            {code.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
