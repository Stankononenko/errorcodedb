"use client";

import { useEffect, useState } from "react";

interface Props {
  codeId: string;
}

type Vote = "up" | "down" | null;

/**
 * "Was this helpful?" widget.
 * Stores each vote in localStorage under `feedback:{codeId}` so the user
 * doesn't double-vote. No analytics wired up yet — future work.
 */
export default function HelpfulFeedback({ codeId }: Props) {
  const [vote, setVote] = useState<Vote>(null);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`feedback:${codeId}`);
      if (saved === "up" || saved === "down") {
        setVote(saved);
      }
    } catch {
      /* noop */
    }
  }, [codeId]);

  function cast(next: Exclude<Vote, null>) {
    if (vote === next) return; // already voted same way
    setVote(next);
    try {
      localStorage.setItem(`feedback:${codeId}`, next);
    } catch {
      /* noop */
    }
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 2500);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-gray-900">Was this helpful?</p>
          <p className="mt-0.5 text-xs text-gray-500">
            Your feedback helps us improve. No account needed.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => cast("up")}
            aria-pressed={vote === "up"}
            aria-label="Yes, this was helpful"
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
              vote === "up"
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a2 2 0 001.106 1.789l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.4 8.8A4 4 0 006 10.334z" />
            </svg>
            Yes
          </button>

          <button
            type="button"
            onClick={() => cast("down")}
            aria-pressed={vote === "down"}
            aria-label="No, this was not helpful"
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
              vote === "down"
                ? "bg-amber-50 border-amber-300 text-amber-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.834A2 2 0 0012.894 2.044l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.8-2.4a4 4 0 00.4-1.866z" />
            </svg>
            No
          </button>
        </div>
      </div>

      {showThanks && (
        <p className="mt-2 text-sm text-emerald-700 font-medium">
          Thanks for the feedback!
        </p>
      )}
    </div>
  );
}
