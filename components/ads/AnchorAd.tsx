"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only anchor ad that sticks to the bottom of the viewport
 * ABOVE the BottomNav. Appears after the user has scrolled 30%+ down
 * the page (so it doesn't block the TL;DR on arrival).
 *
 * Can be dismissed with the × button — we remember the dismissal for
 * the session so repeat navigation doesn't re-show on every page.
 */

const DISMISS_KEY = "ecdb:anchor-ad-dismissed";

export default function AnchorAd() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

  useEffect(() => {
    // Don't resurrect if user dismissed this session
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      /* noop */
    }

    function onScroll() {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const pct = y / h;
      if (pct > 0.3) setVisible(true);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* noop */
    }
  }

  if (dismissed || !visible) return null;

  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      className="md:hidden fixed bottom-14 left-0 right-0 z-20 pb-[env(safe-area-inset-bottom)] bg-white/95 backdrop-blur border-t border-gray-200 shadow-lg"
    >
      <div className="relative flex items-center justify-center px-3 py-2" style={{ minHeight: 60 }}>
        {isEnabled ? (
          <div
            className="w-full"
            style={{ minHeight: 50 }}
            data-ad-position="anchor-bottom"
            data-ad-format="anchor"
          />
        ) : (
          <div
            className="flex w-full items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400"
            style={{ minHeight: 50 }}
          >
            Ad Placeholder · Anchor
          </div>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss advertisement"
          className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200/80 text-gray-600 hover:bg-gray-300"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
