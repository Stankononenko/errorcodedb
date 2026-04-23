"use client";

import { useEffect, useState } from "react";

interface SavedItem {
  code: string;
  title: string;
  url: string;
  category: string;
  brand?: string;
  savedAt: number;
}

interface Props {
  code: string;
  title: string;
  url: string;
  category: string;
  brand?: string;
}

const KEY = "ecdb:saved";

function readSaved(): SavedItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSaved(items: SavedItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* noop */
  }
}

export default function SaveButton({ code, title, url, category, brand }: Props) {
  const [isSaved, setSaved] = useState(false);

  useEffect(() => {
    const items = readSaved();
    setSaved(items.some((i) => i.url === url));
  }, [url]);

  function toggle() {
    const items = readSaved();
    if (isSaved) {
      writeSaved(items.filter((i) => i.url !== url));
      setSaved(false);
    } else {
      writeSaved([
        { code, title, url, category, brand, savedAt: Date.now() },
        ...items.filter((i) => i.url !== url),
      ].slice(0, 100));
      setSaved(true);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from saved" : "Save this code"}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors shadow-sm ${
        isSaved
          ? "bg-amber-50 border-amber-300 text-amber-800"
          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      <svg
        className="h-4 w-4"
        fill={isSaved ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3-7 3V5z"
        />
      </svg>
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
