"use client";

import { useEffect } from "react";

interface Props {
  code: string;
  title: string;
  url: string;
  category: string;
  brand?: string;
}

const KEY = "ecdb:recent";
const MAX = 20;

export interface RecentItem {
  code: string;
  title: string;
  url: string;
  category: string;
  brand?: string;
  viewedAt: number;
}

/**
 * Hidden component that records a page view into localStorage.
 * Used by the homepage / saved page to show "Recently viewed".
 */
export default function RecentView({ code, title, url, category, brand }: Props) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const items: RecentItem[] = raw ? JSON.parse(raw) : [];
      const filtered = Array.isArray(items) ? items.filter((i) => i.url !== url) : [];
      const next: RecentItem[] = [
        { code, title, url, category, brand, viewedAt: Date.now() },
        ...filtered,
      ].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
  }, [code, title, url, category, brand]);

  return null;
}
