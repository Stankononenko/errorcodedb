import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

interface Props {
  compact?: boolean;
  className?: string;
}

/**
 * Brand logo.
 * Mark = a subtle wrench + lightning bolt ligature hinting at both
 * "repair" and "error signal." Brand-blue, Inter weight-700.
 */
export default function Logo({ compact = false, className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME} home`}
      className={`group inline-flex items-center gap-2 font-bold text-brand-primary ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        {/* Rounded square background */}
        <rect x="1" y="1" width="30" height="30" rx="7" fill="var(--color-brand-primary)" />
        {/* Lightning bolt — error signal */}
        <path
          d="M18.5 6 L10 17.2 H15 L13.5 26 L22 14.8 H17 L18.5 6 Z"
          fill="white"
          stroke="white"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span className="text-base sm:text-lg tracking-tight">
          Error<span className="text-brand-accent">Code</span>DB
        </span>
      )}
    </Link>
  );
}
