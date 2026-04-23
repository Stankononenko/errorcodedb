import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_NAME} for questions, feedback, corrections, or suggestions about error codes.`,
  alternates: { canonical: getCanonicalUrl("/contact") },
};

const REASONS = [
  {
    title: "Report an error",
    body: "Spotted an incorrect cause, a fix step that doesn't work, or an outdated cost estimate? Let us know — accuracy is our top priority and we'll review and update quickly.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: "Suggest a code",
    body: "Can't find a code you're looking up? Tell us the make, model, and code string — we'll add it to the queue.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: "Share a fix that worked",
    body: "If a fix we documented worked (or didn't), your feedback helps us rank likely causes better for the next reader.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Press / partnership",
    body: "For press inquiries, content partnerships, or advertising questions, get in touch and we'll respond within a business day.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 sm:px-6">
      <header className="border-b border-gray-200 pb-6 mb-8">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
          Contact
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Get in touch
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Corrections, suggestions, and feedback all make the site better.
          We read every email.
        </p>
      </header>

      {/* Email CTA */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6m-18 0v8a2 2 0 002 2h14a2 2 0 002-2V8m-18 0V6a2 2 0 012-2h14a2 2 0 012 2v2" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Email us at</p>
            <a
              href="mailto:contact@errorcodedb.com"
              className="mt-0.5 block text-xl sm:text-2xl font-bold text-brand-primary hover:underline break-all"
            >
              contact@errorcodedb.com
            </a>
            <p className="mt-2 text-xs text-gray-500">
              We respond within 48 hours on business days.
            </p>
          </div>
        </div>
      </div>

      {/* What to include */}
      <section className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">What to write about</h2>
        <ul className="mt-4 space-y-3">
          {REASONS.map((r) => (
            <li
              key={r.title}
              className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-brand-primary">
                {r.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{r.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Tips for corrections */}
      <section className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tips for a fast response</h2>
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm text-gray-700 leading-relaxed">
            If you&rsquo;re reporting an error, please include:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
            <li>The URL of the page</li>
            <li>The specific part that&rsquo;s wrong (quote it if you can)</li>
            <li>What the correct information should be (if you know)</li>
            <li>Source (service manual page, manufacturer doc, etc.) if available</li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            We prioritize corrections over feature requests — the goal is accuracy first.
          </p>
        </div>
      </section>

      <div className="mt-10 text-sm text-gray-600">
        <p>
          See also:{" "}
          <Link href="/about" className="text-brand-primary hover:underline">About</Link>
          {" · "}
          <Link href="/disclaimer" className="text-brand-primary hover:underline">Disclaimer</Link>
          {" · "}
          <Link href="/privacy" className="text-brand-primary hover:underline">Privacy</Link>
        </p>
      </div>
    </div>
  );
}
