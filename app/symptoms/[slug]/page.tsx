import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { SYMPTOMS } from "@/lib/symptoms";
import {
  buildBreadcrumbJsonLd,
  getCanonicalUrl,
  buildOgMetadata,
} from "@/lib/seo-helpers";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SYMPTOMS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = SYMPTOMS[slug];
  if (!s) return { title: "Not Found" };
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: getCanonicalUrl(`/symptoms/${slug}`) },
    ...buildOgMetadata(s.title, s.description, s.ogCategory),
  };
}

export default async function SymptomPage({ params }: PageProps) {
  const { slug } = await params;
  const s = SYMPTOMS[slug];
  if (!s) notFound();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Diagnose by symptom", url: `${SITE_URL}/symptoms` },
    { name: s.h1, url: `${SITE_URL}/symptoms/${s.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Symptoms", href: "/symptoms" },
            { label: s.h1, href: `/symptoms/${s.slug}` },
          ]}
        />

        <header className="mt-6 border-b border-gray-200 pb-6">
          <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
            {s.category} · Symptom
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {s.h1}
          </h1>
          <p className="mt-3 text-lg text-gray-600 leading-relaxed">
            {s.description}
          </p>
        </header>

        <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
          <section>
            <p
              className="text-base"
              dangerouslySetInnerHTML={{ __html: s.intro }}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Check these first</h2>
            <ol className="space-y-2 list-decimal pl-5">
              {s.checkFirst.map((step, i) => (
                <li key={i} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Most likely error codes behind this symptom
            </h2>
            <ul className="space-y-2">
              {s.relatedCodes.map((c) => (
                <li key={c.url}>
                  <Link
                    href={c.url}
                    className="block rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-brand-primary hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-semibold text-brand-primary">
                        {c.code}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {c.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{c.why}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-xl font-bold text-amber-900 mt-0 mb-2">When to stop DIY and call a pro</h2>
            <p className="text-sm text-amber-900 m-0">{s.whenToCallPro}</p>
          </section>

          <section className="border-t border-gray-200 pt-6 text-sm text-gray-600">
            <p>
              See also:{" "}
              <Link href="/symptoms" className="text-brand-primary hover:underline">
                All symptoms
              </Link>
              {" · "}
              <Link href="/guides" className="text-brand-primary hover:underline">
                Guides
              </Link>
              {" · "}
              <Link href="/search" className="text-brand-primary hover:underline">
                Search by code
              </Link>
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
