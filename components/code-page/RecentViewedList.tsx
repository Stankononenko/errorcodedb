"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { categoryAccent } from "@/lib/search";

interface RecentItem {
  code: string;
  title: string;
  url: string;
  category: string;
  brand?: string;
  viewedAt: number;
}

const KEY = "ecdb:recent";

interface Props {
  /** If true, show as a card with title. If false, render nothing when empty. */
  showTitle?: boolean;
  limit?: number;
}

export default function RecentViewedList({ showTitle = true, limit = 6 }: Props) {
  const [items, setItems] = useState<RecentItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.slice(0, limit));
      }
    } catch {
      /* noop */
    }
  }, [limit]);

  if (!mounted || items.length === 0) return null;

  return (
    <section aria-labelledby="recent-heading">
      {showTitle && (
        <h2 id="recent-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Recently viewed
        </h2>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((it) => (
          <li key={it.url}>
            <Link
              href={it.url}
              className="flex items-start gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 hover:border-brand-primary hover:bg-blue-50 transition-colors"
            >
              <span className="font-mono font-semibold text-brand-primary shrink-0 text-sm">
                {it.code}
              </span>
              <span className={`shrink-0 text-[10px] rounded px-1.5 py-0.5 font-medium ${categoryAccent(prettyCat(it.category))}`}>
                {prettyCat(it.category)}
              </span>
              <span className="text-sm text-gray-700 truncate">{it.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
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
