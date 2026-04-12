import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHVACCodes, getHVACCode, hvacToUnified } from "@/lib/data-loader";
import { HVAC_BRANDS, HVAC_DEVICE_TYPES } from "@/lib/constants";
import { getCodePageTitle, getCodePageDescription, getCanonicalUrl } from "@/lib/seo-helpers";
import CodePageLayout from "@/components/code-page/CodePageLayout";
import { HVACDeviceType } from "@/lib/types";

interface PageProps { params: Promise<{ brand: string; deviceType: string; code: string }> }

export async function generateStaticParams() {
  return getHVACCodes().map((c) => ({ brand: c.brandSlug, deviceType: c.deviceTypeSlug, code: c.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand, deviceType, code: slug } = await params;
  const hvac = getHVACCode(brand, deviceType, slug);
  if (!hvac) return { title: "Not Found" };
  const u = hvacToUnified(hvac);
  return { title: getCodePageTitle(u), description: getCodePageDescription(u), alternates: { canonical: getCanonicalUrl(`/hvac/${brand}/${deviceType}/${slug}`) } };
}

export default async function HVACCodePage({ params }: PageProps) {
  const { brand, deviceType, code: slug } = await params;
  const hvac = getHVACCode(brand, deviceType, slug);
  if (!hvac) notFound();
  const bInfo = HVAC_BRANDS.find((b) => b.slug === brand);
  const dtInfo = HVAC_DEVICE_TYPES[deviceType as HVACDeviceType];
  const u = hvacToUnified(hvac);
  const path = `/hvac/${brand}/${deviceType}/${slug}`;

  return (
    <CodePageLayout code={u}
      breadcrumbs={[
        { label: "HVAC", href: "/hvac" },
        { label: bInfo?.name || brand, href: `/hvac/${brand}` },
        { label: dtInfo?.label || deviceType, href: `/hvac/${brand}/${deviceType}` },
        { label: hvac.displayCode, href: path },
      ]}
      canonicalPath={path} />
  );
}
