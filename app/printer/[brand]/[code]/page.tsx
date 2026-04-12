import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPrinterCodes, getPrinterCode, printerToUnified } from "@/lib/data-loader";
import { PRINTER_BRANDS } from "@/lib/constants";
import { getCodePageTitle, getCodePageDescription, getCanonicalUrl } from "@/lib/seo-helpers";
import CodePageLayout from "@/components/code-page/CodePageLayout";

interface PageProps { params: Promise<{ brand: string; code: string }> }

export async function generateStaticParams() {
  return getPrinterCodes().map((c) => ({ brand: c.brandSlug, code: c.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand, code: slug } = await params;
  const p = getPrinterCode(brand, slug);
  if (!p) return { title: "Not Found" };
  const u = printerToUnified(p);
  return { title: getCodePageTitle(u), description: getCodePageDescription(u), alternates: { canonical: getCanonicalUrl(`/printer/${brand}/${slug}`) } };
}

export default async function PrinterCodePage({ params }: PageProps) {
  const { brand, code: slug } = await params;
  const p = getPrinterCode(brand, slug);
  if (!p) notFound();
  const bInfo = PRINTER_BRANDS.find((b) => b.slug === brand);
  const u = printerToUnified(p);
  const path = `/printer/${brand}/${slug}`;

  return (
    <CodePageLayout code={u}
      breadcrumbs={[
        { label: "Printers", href: "/printer" },
        { label: bInfo?.name || brand, href: `/printer/${brand}` },
        { label: p.displayCode, href: path },
      ]}
      canonicalPath={path} />
  );
}
