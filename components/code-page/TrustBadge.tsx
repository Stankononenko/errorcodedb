import Link from "next/link";

interface Props {
  lastUpdated?: string; // ISO date
}

/**
 * Editorial trust strip shown on every code page.
 * Linked to /editorial-policy for E-E-A-T transparency.
 */
export default function TrustBadge({ lastUpdated }: Props) {
  const date = lastUpdated ? new Date(lastUpdated) : new Date();
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1.5">
          <svg
            className="h-3.5 w-3.5 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Reviewed by{" "}
          <Link
            href="/editorial-policy"
            className="font-semibold text-gray-900 hover:text-brand-primary hover:underline"
          >
            ErrorCodeDB Editorial Team
          </Link>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Last reviewed {formatted}
        </span>
        <Link
          href="/editorial-policy"
          className="inline-flex items-center gap-1.5 hover:text-brand-primary"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Editorial policy &amp; sources
        </Link>
      </div>
    </div>
  );
}
