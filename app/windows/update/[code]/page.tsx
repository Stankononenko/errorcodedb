import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWindowsCodes, getWindowsCode, windowsToUnified } from "@/lib/data-loader";
import { getCodePageTitle, getCodePageDescription, getCanonicalUrl } from "@/lib/seo-helpers";
import CodePageLayout from "@/components/code-page/CodePageLayout";

interface PageProps { params: Promise<{ code: string }> }

export async function generateStaticParams() {
  return getWindowsCodes("update").map((c) => ({ code: c.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code: slug } = await params;
  const w = getWindowsCode("update", slug);
  if (!w) return { title: "Not Found" };
  const u = windowsToUnified(w);
  return { title: getCodePageTitle(u), description: getCodePageDescription(u), alternates: { canonical: getCanonicalUrl(`/windows/update/${slug}`) } };
}

export default async function UpdateCodePage({ params }: PageProps) {
  const { code: slug } = await params;
  const w = getWindowsCode("update", slug);
  if (!w) notFound();
  const u = windowsToUnified(w);
  return <CodePageLayout code={u} breadcrumbs={[{ label: "Windows", href: "/windows" }, { label: "Update Errors", href: "/windows/update" }, { label: w.displayCode, href: `/windows/update/${slug}` }]} canonicalPath={`/windows/update/${slug}`} />;
}
