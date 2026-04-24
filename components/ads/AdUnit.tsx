/**
 * AdSense slot wrapper.
 *
 * Every variant reserves fixed min-height so the page doesn't shift
 * when the real ad loads (CLS protection → Core Web Vitals → AdSense RPM).
 * When NEXT_PUBLIC_ADSENSE_ENABLED !== "true" we render a visible
 * dashed placeholder at the same dimensions so layout is identical in
 * dev/preview.
 *
 * Positions map to specific AdSense slots we'll define when the account
 * is approved. Naming follows https://support.google.com/adsense placement docs.
 */

export type AdPosition =
  | "top-banner" // leaderboard above fold but BELOW TLDR (not above)
  | "after-intro" // after symptoms/causes block, before fix steps
  | "in-article-1" // mid-article, between fix steps and cost section
  | "matched-content" // Google Matched Content carousel — big RPM boost
  | "high-intent" // after cost section — people reading this are about to spend money
  | "bottom-banner" // just above footer
  | "sidebar-sticky" // desktop sidebar, sticky
  | "anchor-bottom" // mobile only, fixed bottom (above BottomNav)
  | "leaderboard" // legacy alias for after-intro
  | "in-content-1" // legacy alias for in-article-1
  | "in-content-2" // legacy alias for high-intent
  | "sidebar"; // legacy alias for sidebar-sticky

interface AdUnitProps {
  position: AdPosition;
  className?: string;
}

interface SlotDef {
  /** Reserved minHeight in px, guarantees zero CLS */
  minHeight: number;
  /** Tailwind width hint (full = full container) */
  width: "full" | "300";
  /** Google slot format for when real ads go in */
  format:
    | "leaderboard"
    | "responsive"
    | "matched-content"
    | "medium-rectangle"
    | "anchor";
  /** Visible label in the placeholder (for debugging) */
  label: string;
}

const SLOTS: Record<AdPosition, SlotDef> = {
  // New canonical positions
  "top-banner": { minHeight: 90, width: "full", format: "leaderboard", label: "Top Banner" },
  "after-intro": { minHeight: 280, width: "full", format: "responsive", label: "After Intro" },
  "in-article-1": { minHeight: 280, width: "full", format: "responsive", label: "In-Article 1" },
  "matched-content": {
    minHeight: 320,
    width: "full",
    format: "matched-content",
    label: "Matched Content",
  },
  "high-intent": {
    minHeight: 280,
    width: "full",
    format: "responsive",
    label: "High-Intent",
  },
  "bottom-banner": { minHeight: 90, width: "full", format: "leaderboard", label: "Bottom Banner" },
  "sidebar-sticky": {
    minHeight: 600,
    width: "300",
    format: "medium-rectangle",
    label: "Sidebar Sticky",
  },
  "anchor-bottom": {
    minHeight: 60,
    width: "full",
    format: "anchor",
    label: "Anchor (mobile)",
  },

  // Legacy aliases — map to new slots so existing pages keep rendering
  leaderboard: { minHeight: 90, width: "full", format: "leaderboard", label: "After Intro" },
  "in-content-1": { minHeight: 280, width: "full", format: "responsive", label: "In-Article 1" },
  "in-content-2": { minHeight: 280, width: "full", format: "responsive", label: "High-Intent" },
  sidebar: { minHeight: 600, width: "300", format: "medium-rectangle", label: "Sidebar" },
};

export default function AdUnit({ position, className = "" }: AdUnitProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
  const slot = SLOTS[position];
  const widthClass = slot.width === "300" ? "w-[300px]" : "w-full";

  // CLS-safe wrapper: the min-height is reserved even if the ad never loads
  const wrapperStyle: React.CSSProperties = {
    minHeight: slot.minHeight,
  };

  if (isEnabled) {
    // Real AdSense <ins> tag goes here when we have account + slot IDs
    return (
      <div
        className={`${widthClass} ${className}`}
        style={wrapperStyle}
        data-ad-position={position}
        data-ad-format={slot.format}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg text-xs text-gray-400 ${widthClass} ${className}`}
      style={wrapperStyle}
      aria-hidden="true"
      data-ad-position={position}
    >
      Ad Placeholder · {slot.label}
    </div>
  );
}
