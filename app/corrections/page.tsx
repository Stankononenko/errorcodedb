import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Corrections",
  description: `Public log of corrections made to ${SITE_NAME} error code pages. We fix mistakes in the open.`,
  alternates: { canonical: getCanonicalUrl("/corrections") },
};

/**
 * Public corrections log. Empty at launch (by design — site is new).
 * When we ship a correction we append it here with date / page / fix.
 * A visible log of mistakes corrected is a stronger trust signal than
 * an invisible edit history.
 */
const CORRECTIONS: Array<{
  date: string;
  page: string;
  pageUrl: string;
  before: string;
  after: string;
  credit?: string;
}> = [
  // Example format (will populate as real corrections come in):
  // {
  //   date: "2026-05-12",
  //   page: "P0420 Toyota Camry",
  //   pageUrl: "/obd2/p0420",
  //   before: "Listed B1S2 O2 sensor as primary cause.",
  //   after: "Corrected: B1S1 O2 sensor issues more commonly trigger P0420 on 2AR-FE.",
  //   credit: "Reported by reader R.M.",
  // },
];

export default function CorrectionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 sm:px-6">
      <header className="border-b border-gray-200 pb-6 mb-8">
        <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-800">
          Corrections
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Public corrections log
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          When we make a mistake, we fix it — and we log the fix here. Transparency
          beats pretending nothing happened.
        </p>
      </header>

      <div className="prose prose-gray max-w-none text-gray-700 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-0 mb-3">
            How to report a correction
          </h2>
          <p>
            Email{" "}
            <a href="mailto:contact@errorcodedb.com" className="text-brand-primary font-medium hover:underline">
              contact@errorcodedb.com
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="text-brand-primary font-medium hover:underline">
              contact form
            </Link>
            . Please include:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>The URL of the page you&rsquo;re flagging</li>
            <li>The specific sentence or section that&rsquo;s wrong</li>
            <li>What the correct information should be, if you know</li>
            <li>A source (service manual page, OEM document, forum post, your own experience) if available</li>
          </ul>
          <p className="mt-3">
            We aim to acknowledge within 48 hours and ship a published fix within a week.
            Credit is offered by default when we use your correction — let us know if you
            prefer to stay anonymous.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Published corrections
          </h2>

          {CORRECTIONS.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
              <p className="text-gray-900 font-medium">No corrections published yet.</p>
              <p className="mt-1 text-sm text-gray-600">
                This log is new — we&rsquo;ll post the first correction the moment a reader
                catches something worth fixing. Help us keep this list honest.
              </p>
            </div>
          ) : (
            <ol className="space-y-4">
              {CORRECTIONS.map((c, i) => (
                <li key={i} className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <time className="font-mono text-gray-600" dateTime={c.date}>{c.date}</time>
                    <Link href={c.pageUrl} className="font-semibold text-brand-primary hover:underline">
                      {c.page}
                    </Link>
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded bg-red-50 border border-red-100 px-3 py-2">
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-red-800">
                        Before
                      </div>
                      <div className="mt-1 text-gray-800">{c.before}</div>
                    </div>
                    <div className="rounded bg-emerald-50 border border-emerald-100 px-3 py-2">
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
                        After
                      </div>
                      <div className="mt-1 text-gray-800">{c.after}</div>
                    </div>
                  </div>
                  {c.credit && (
                    <p className="mt-2 text-xs text-gray-500">{c.credit}</p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="border-t border-gray-200 pt-6 text-sm text-gray-600">
          <p>
            See also:{" "}
            <Link href="/editorial-policy" className="text-brand-primary hover:underline">Editorial Policy</Link>
            {" · "}
            <Link href="/about" className="text-brand-primary hover:underline">About</Link>
            {" · "}
            <Link href="/contact" className="text-brand-primary hover:underline">Contact</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
