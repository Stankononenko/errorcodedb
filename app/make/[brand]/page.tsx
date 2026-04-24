import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { CAR_MAKES, SITE_URL } from "@/lib/constants";
import { getAllOBDCodes } from "@/lib/data-loader";
import {
  buildBreadcrumbJsonLd,
  getCanonicalUrl,
  buildOgMetadata,
} from "@/lib/seo-helpers";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return CAR_MAKES.map((m) => ({ brand: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand } = await params;
  const make = CAR_MAKES.find((m) => m.slug === brand);
  if (!make) return { title: "Not Found" };

  const title = `${make.name} OBD-II Codes — Diagnostic Trouble Codes for All ${make.name} Vehicles`;
  const description = `Complete list of ${make.name}-specific OBD-II diagnostic trouble codes (P1XXX) plus generic P0XXX codes that affect ${make.name} engines. Causes, symptoms, step-by-step fixes.`;
  return {
    title,
    description,
    alternates: { canonical: getCanonicalUrl(`/make/${brand}`) },
    ...buildOgMetadata(title, description, "obd2"),
  };
}

export default async function MakeHubPage({ params }: PageProps) {
  const { brand } = await params;
  const make = CAR_MAKES.find((m) => m.slug === brand);
  if (!make) notFound();

  // Find OBD codes mentioning this make in title (P1 manufacturer codes)
  const allCodes = getAllOBDCodes();
  const lowerName = make.name.toLowerCase();
  const specific = allCodes.filter((c) =>
    c.title.toLowerCase().includes(lowerName) || c.title.toLowerCase().includes(lowerName.split(" ")[0]),
  );

  // Group by subsystem/subcategory
  const grouped: Record<string, typeof specific> = {};
  for (const c of specific) {
    const key = c.subcategory || "Other";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(c);
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "OBD-II Codes", url: `${SITE_URL}/obd2` },
    { name: `${make.name} Codes`, url: `${SITE_URL}/make/${brand}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "OBD-II Codes", href: "/obd2" },
            { label: `${make.name}`, href: `/make/${brand}` },
          ]}
        />

        <header className="mt-6 border-b border-gray-200 pb-6">
          <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
            {specific.length} codes found
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {make.name} OBD-II diagnostic trouble codes
          </h1>
          <p className="mt-3 text-lg text-gray-600 leading-relaxed">
            Manufacturer-specific error codes and {make.name}-relevant generic codes, with
            causes, symptoms, and step-by-step fix guides.
          </p>
        </header>

        <section className="mt-6 prose prose-gray max-w-none text-gray-700">
          <p>
            {make.name} vehicles use the same SAE J2012 OBD-II standard as every other
            car built for the North American market since 1996. Generic codes (P0XXX, B0XXX,
            C0XXX, U0XXX) mean the same thing on a {make.name} as they do on any other car.
            Where {make.name} differs is the P1XXX manufacturer-specific range, which uses
            code definitions set by the automaker&rsquo;s own diagnostic strategy. Those
            are the codes to pay attention to — a P1125 on a {make.name} does not mean the
            same thing as a P1125 on another brand.
          </p>
          <p>
            Below are the {make.name}-specific codes we have in our database, grouped by
            subsystem. For generic P0XXX codes that affect all vehicles, see the{" "}
            <Link href="/obd2/range/p0xxx" className="text-brand-primary font-medium hover:underline">
              generic powertrain range page
            </Link>
            .
          </p>
        </section>

        {specific.length === 0 && (
          <section className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-gray-900 font-medium">
              We don&rsquo;t have {make.name}-specific codes documented yet.
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Start with the{" "}
              <Link href="/obd2/range/p0xxx" className="text-brand-primary hover:underline">
                generic P0XXX code list
              </Link>
              {" "}— 90% of {make.name} check-engine issues are covered by these codes.
            </p>
          </section>
        )}

        {Object.entries(grouped).map(([subcategory, codes]) => (
          <section key={subcategory} className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{subcategory}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {codes
                .sort((a, b) => a.code.localeCompare(b.code))
                .map((code) => (
                  <li key={code.code}>
                    <Link
                      href={`/obd2/${code.code.toLowerCase()}`}
                      className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:border-brand-primary hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-mono font-semibold text-brand-primary shrink-0 text-sm">
                        {code.code}
                      </span>
                      <span className="text-sm text-gray-700 truncate">
                        {code.title}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <section className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">Looking for something else?</h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            Browse all codes by range at the{" "}
            <Link href="/obd2/range/p1xxx" className="font-medium text-brand-primary hover:underline">
              P1XXX manufacturer hub
            </Link>
            , read the{" "}
            <Link href="/guides/obd-ii-explained" className="font-medium text-brand-primary hover:underline">
              OBD-II explainer
            </Link>
            , or{" "}
            <Link href="/search" className="font-medium text-brand-primary hover:underline">
              search the full database
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
