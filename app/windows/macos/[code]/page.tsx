import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWindowsCodes, getWindowsCode, windowsToUnified } from "@/lib/data-loader";
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
  return getWindowsCodes("macos").map((c) => ({ code: c.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code: slug } = await params;
  const w = getWindowsCode("macos", slug);
  if (!w) return { title: "Not Found" };
  const u = windowsToUnified(w);
  const title = getCodePageTitle(u);
  const description = getCodePageDescription(u);
  return {
    title,
    description,
    alternates: { canonical: getCanonicalUrl(`/windows/macos/${slug}`) },
    ...buildOgMetadata(title, description, "windows"),
  };
}

export default async function MacOSCodePage({ params }: PageProps) {
  const { code: slug } = await params;
  const w = getWindowsCode("macos", slug);
  if (!w) notFound();
  const u = windowsToUnified(w);
  return (
    <CodePageLayout
      code={u}
      breadcrumbs={[
        { label: "Windows", href: "/windows" },
        { label: "macOS", href: "/windows/macos" },
        { label: w.displayCode, href: `/windows/macos/${slug}` },
      ]}
      canonicalPath={`/windows/macos/${slug}`}
    />
  );
}
