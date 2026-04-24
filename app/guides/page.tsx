import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl, buildOgMetadata } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Guides — How error codes work & when to DIY",
  description: `${SITE_NAME} guides: how OBD-II really works, DIY vs. mechanic decision, how to use a scan tool, and more.`,
  alternates: { canonical: getCanonicalUrl("/guides") },
  ...buildOgMetadata(
    "Guides — ErrorCodeDB",
    "How error codes work, when to DIY, and how to read them.",
    "default",
  ),
};

interface Guide {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  tag: string;
}

const GUIDES: Guide[] = [
  {
    slug: "obd-ii-explained",
    title: "OBD-II explained — what your check-engine light really knows",
    description:
      "The 10-minute primer on how on-board diagnostics work: what the ECM monitors, why codes set, what freeze frame is, and how a cheap scanner fits into the picture.",
    readTime: "10 min read",
    tag: "Automotive",
  },
  {
    slug: "diy-vs-mechanic",
    title: "DIY vs. mechanic — a framework for deciding",
    description:
      "Not every check-engine light is a DIY job, and not every one needs a shop. A clear decision matrix for deciding which repairs make financial and safety sense to tackle yourself.",
    readTime: "8 min read",
    tag: "Decision",
  },
  {
    slug: "reading-check-engine-codes",
    title: "How to read a check-engine code without a dealer visit",
    description:
      "Step-by-step: buy (or borrow) a scanner, plug into the OBD port, pull codes, read freeze frame, interpret results, and clear safely. Works on every car 1996+.",
    readTime: "12 min read",
    tag: "How-to",
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14 sm:px-6">
      <header className="border-b border-gray-200 pb-6 mb-8">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
          Guides
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Background reading
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Deeper explainers that don&rsquo;t fit on a single code page.
          How the systems work, when to DIY, how to read codes safely.
        </p>
      </header>

      <ul className="space-y-3">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-brand-primary hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-700">
                  {g.tag}
                </span>
                <span className="text-gray-500">{g.readTime}</span>
              </div>
              <h2 className="mt-2 text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                {g.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {g.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
