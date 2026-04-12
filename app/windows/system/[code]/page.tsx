import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWindowsCodes, getWindowsCode, windowsToUnified } from "@/lib/data-loader";
import { getCodePageTitle, getCodePageDescription, getCanonicalUrl } from "@/lib/seo-helpers";
import CodePageLayout from "@/components/code-page/CodePageLayout";

interface PageProps { params: Promise<{ code: string }> }

export async function generateStaticParams() {
  return getWindowsCodes("system").map((c) => ({ code: c.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code: slug } = await params;
  const w = getWindowsCode("system", slug);
  if (!w) return { title: "Not Found" };
  const u = windowsToUnified(w);
  return { title: getCodePageTitle(u), description: getCodePageDescription(u), alternates: { canonical: getCanonicalUrl(`/windows/system/${slug}`) } };
}

export default async function SystemCodePage({ params }: PageProps) {
  const { code: slug } = await params;
  const w = getWindowsCode("system", slug);
  if (!w) notFound();
  const u = windowsToUnified(w);
  return <CodePageLayout code={u} breadcrumbs={[{ label: "Windows", href: "/windows" }, { label: "System Errors", href: "/windows/system" }, { label: w.displayCode, href: `/windows/system/${slug}` }]} canonicalPath={`/windows/system/${slug}`} />;
}
