"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import {
  loadIndex,
  searchIndex,
  categoryAccent,
  type IndexEntry,
  type ScoredEntry,
} from "@/lib/search";

const CATEGORIES = ["All", "OBD-II", "Appliance", "HVAC", "Printer", "Windows"];

function SearchResults() {
  const sp = useSearchParams();
  const q = sp?.get("q") || "";
  const [index, setIndex] = useState<IndexEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cat, setCat] = useState("All");

  useEffect(() => {
    loadIndex().then((idx) => {
      setIndex(idx);
      setLoaded(true);
    });
  }, []);

  const results = useMemo(() => {
    if (!loaded || !q.trim()) return [];
    return searchIndex(index, q, 200, cat === "All" ? undefined : cat);
  }, [index, loaded, q, cat]);

  const byCat = useMemo(() => {
    const m: Record<string, number> = {};
    if (loaded) {
      for (const c of CATEGORIES.slice(1)) {
        m[c] = searchIndex(index, q, 1000, c).length;
      }
    }
    return m;
  }, [index, loaded, q]);

  const totalHits = Object.values(byCat).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Search", href: "/search" }]} />

      <div className="mt-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {q ? (
            <>
              Results for <span className="text-brand-primary">&ldquo;{q}&rdquo;</span>
            </>
          ) : (
            "Search error codes"
          )}
        </h1>
        {loaded && q && (
          <p className="mt-1 text-sm text-gray-600">
            {totalHits.toLocaleString()} matches across all categories
          </p>
        )}
      </div>

      <div className="mt-4">
        <SearchBar variant="hero" />
      </div>

      {/* Category filter chips */}
      {q && loaded && totalHits > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const count = c === "All" ? totalHits : byCat[c] || 0;
            const isActive = cat === c;
            const disabled = count === 0;
            return (
              <button
                key={c}
                type="button"
                onClick={() => !disabled && setCat(c)}
                disabled={disabled}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                  isActive
                    ? "border-brand-primary bg-brand-primary text-white"
                    : disabled
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {c} <span className={isActive ? "text-white/80" : "text-gray-400"}>({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Results list */}
      <div className="mt-6">
        {!loaded && <div className="text-sm text-gray-500">Loading…</div>}

        {loaded && q && results.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-gray-900 font-medium">No results for &ldquo;{q}&rdquo;.</p>
            <p className="mt-1 text-sm text-gray-600">
              Try the exact code (e.g. <span className="font-mono">P0420</span>), a brand,
              or a symptom keyword.
            </p>
          </div>
        )}

        {loaded && !q && (
          <div className="rounded-lg border border-gray-200 bg-blue-50 p-6">
            <p className="text-gray-900 font-medium">
              Search {index.length.toLocaleString()} error codes
            </p>
            <p className="mt-1 text-sm text-gray-700">
              Type an error code, brand (e.g. &ldquo;Samsung washer&rdquo;), or a few symptom words.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
            {results.map((r: ScoredEntry) => (
              <li key={r.u}>
                <Link href={r.u} className="block px-4 py-3 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-brand-primary">{r.c}</span>
                    <span className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${categoryAccent(r.cat)}`}>
                      {r.cat}
                    </span>
                    {r.b && (
                      <span className="text-xs text-gray-500">
                        {r.b}
                        {r.d ? ` · ${r.d}` : ""}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-base text-gray-900">{r.t}</div>
                  {r.s && <div className="mt-0.5 text-sm text-gray-600 line-clamp-2">{r.s}</div>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl p-8 text-gray-500">Loading…</div>}>
      <SearchResults />
    </Suspense>
  );
}
