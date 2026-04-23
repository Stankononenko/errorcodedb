"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { categoryAccent } from "@/lib/search";

interface SavedItem {
  code: string;
  title: string;
  url: string;
  category: string;
  brand?: string;
  savedAt: number;
}

const KEY = "ecdb:saved";

export default function SavedPage() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* noop */
    }
  }, []);

  function remove(url: string) {
    const next = items.filter((i) => i.url !== url);
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
  }

  function clearAll() {
    if (!confirm("Remove all saved codes?")) return;
    setItems([]);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Saved", href: "/saved" }]} />

      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Saved codes</h1>
          {mounted && (
            <p className="mt-1 text-sm text-gray-600">
              {items.length === 0
                ? "Bookmark codes to read them later or reference offline."
                : `${items.length} code${items.length === 1 ? "" : "s"} saved to this device.`}
            </p>
          )}
        </div>
        {mounted && items.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="shrink-0 text-xs font-medium text-gray-500 hover:text-red-600"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-6">
        {!mounted && <div className="text-sm text-gray-500">Loading…</div>}

        {mounted && items.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3-7 3V5z" />
            </svg>
            <p className="mt-4 text-gray-900 font-medium">No saved codes yet</p>
            <p className="mt-1 text-sm text-gray-600">
              Tap the <strong>Save</strong> button on any code page to bookmark it here.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link
                href="/search"
                className="inline-flex items-center rounded-lg bg-brand-primary text-white px-4 py-2 text-sm font-medium hover:bg-brand-secondary transition-colors"
              >
                Search codes
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Browse categories
              </Link>
            </div>
          </div>
        )}

        {mounted && items.length > 0 && (
          <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
            {items.map((it) => (
              <li key={it.url} className="flex items-start gap-3 px-4 py-3">
                <Link href={it.url} className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-brand-primary">{it.code}</span>
                    <span className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${categoryAccent(prettyCat(it.category))}`}>
                      {prettyCat(it.category)}
                    </span>
                    {it.brand && (
                      <span className="text-xs text-gray-500">{it.brand}</span>
                    )}
                  </div>
                  <div className="mt-0.5 text-sm text-gray-900 truncate">{it.title}</div>
                </Link>
                <button
                  type="button"
                  onClick={() => remove(it.url)}
                  aria-label="Remove"
                  className="shrink-0 rounded p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function prettyCat(cat: string): string {
  const m: Record<string, string> = {
    obd2: "OBD-II",
    appliance: "Appliance",
    hvac: "HVAC",
    printer: "Printer",
    windows: "Windows",
  };
  return m[cat] || cat;
}
