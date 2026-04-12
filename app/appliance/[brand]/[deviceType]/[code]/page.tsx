import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApplianceCodes, getApplianceCode, applianceToUnified } from "@/lib/data-loader";
import { APPLIANCE_BRANDS, APPLIANCE_DEVICE_TYPES } from "@/lib/constants";
import { getCodePageTitle, getCodePageDescription, getCanonicalUrl } from "@/lib/seo-helpers";
import CodePageLayout from "@/components/code-page/CodePageLayout";
import { ApplianceDeviceType } from "@/lib/types";

interface PageProps {
  params: Promise<{ brand: string; deviceType: string; code: string }>;
}

export async function generateStaticParams() {
  const allCodes = getApplianceCodes();
  return allCodes.map((c) => ({
    brand: c.brandSlug,
    deviceType: c.deviceTypeSlug,
    code: c.code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand, deviceType, code: codeSlug } = await params;
  const appCode = getApplianceCode(brand, deviceType, codeSlug);
  if (!appCode) return { title: "Code Not Found" };

  const unified = applianceToUnified(appCode);
  return {
    title: getCodePageTitle(unified),
    description: getCodePageDescription(unified),
    alternates: { canonical: getCanonicalUrl(`/appliance/${brand}/${deviceType}/${codeSlug}`) },
    openGraph: {
      title: getCodePageTitle(unified),
      description: getCodePageDescription(unified),
    },
  };
}

export default async function ApplianceCodePage({ params }: PageProps) {
  const { brand, deviceType, code: codeSlug } = await params;
  const appCode = getApplianceCode(brand, deviceType, codeSlug);
  if (!appCode) notFound();

  const brandInfo = APPLIANCE_BRANDS.find((b) => b.slug === brand);
  const dtInfo = APPLIANCE_DEVICE_TYPES[deviceType as ApplianceDeviceType];
  const unified = applianceToUnified(appCode);
  const canonicalPath = `/appliance/${brand}/${deviceType}/${codeSlug}`;

  return (
    <CodePageLayout
      code={unified}
      breadcrumbs={[
        { label: "Appliances", href: "/appliance" },
        { label: brandInfo?.name || brand, href: `/appliance/${brand}` },
        { label: dtInfo?.label || deviceType, href: `/appliance/${brand}/${deviceType}` },
        { label: appCode.displayCode, href: canonicalPath },
      ]}
      canonicalPath={canonicalPath}
    />
  );
}
