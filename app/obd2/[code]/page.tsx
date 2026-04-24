import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllOBDCodes, getOBDCodeBySlug, obdToUnified } from "@/lib/data-loader";
import {
  getCodePageTitle,
  getCodePageDescription,
  getCanonicalUrl,
  buildOgMetadata,
} from "@/lib/seo-helpers";
import CodePageLayout from "@/components/code-page/CodePageLayout";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  const codes = getAllOBDCodes();
  return codes.map((c) => ({ code: c.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code: slug } = await params;
  const obdCode = getOBDCodeBySlug(slug);
  if (!obdCode) return { title: "Code Not Found" };

  const unified = obdToUnified(obdCode);
  const title = getCodePageTitle(unified);
  const description = getCodePageDescription(unified);
  return {
    title,
    description,
    alternates: { canonical: getCanonicalUrl(`/obd2/${slug}`) },
    ...buildOgMetadata(title, description, "obd2"),
  };
}

export default async function OBD2CodePage({ params }: PageProps) {
  const { code: slug } = await params;
  const obdCode = getOBDCodeBySlug(slug);
  if (!obdCode) notFound();

  const unified = obdToUnified(obdCode);
  const canonicalPath = `/obd2/${slug}`;

  return (
    <CodePageLayout
      code={unified}
      breadcrumbs={[
        { label: "OBD-II Codes", href: "/obd2" },
        { label: obdCode.code, href: canonicalPath },
      ]}
      canonicalPath={canonicalPath}
    />
  );
}
