"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  loadIndex,
  searchIndex,
  categoryAccent,
  type ScoredEntry,
} from "@/lib/search";

interface Props {
  variant?: "header" | "hero";
  autoFocus?: boolean;
  placeholder?: string;
}

export default function SearchBar({
  variant = "header",
  autoFocus = false,
  placeholder,
}: Props) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<ScoredEntry[]>([]);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load index on first focus or first keystroke
  const ensureIndex = useCallback(async () => {
    if (loaded) return;
    await loadIndex();
    setLoaded(true);
  }, [loaded]);

  // Run search whenever query changes
  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    (async () => {
      await ensureIndex();
      const idx = await loadIndex();
      if (cancelled) return;
      const r = searchIndex(idx, q, 8);
      setResults(r);
      setActive(0);
    })();
    return () => {
      cancelled = true;
    };
  }, [q, ensureIndex]);

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Global keyboard shortcut: "/" or "cmd/ctrl+k" focuses search
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isEditable =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isEditable)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length, a + 1));
      setOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active > 0 && results[active - 1]) {
        router.push(results[active - 1].u);
        setOpen(false);
        setQ("");
      } else if (q.trim()) {
        router.push(`/search?q=${encodeURIComponent(q.trim())}`);
        setOpen(false);
      }
    }
  }

  const isHero = variant === "hero";

  return (
    <div
      ref={wrapRef}
      className={`relative ${isHero ? "w-full max-w-2xl mx-auto" : "w-full"}`}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          autoFocus={autoFocus}
          placeholder={placeholder || (isHero ? "Search any error code — e.g. P0420, 1E, 0x0000007B" : "Search error codes…")}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            ensureIndex();
          }}
          onKeyDown={handleKey}
          aria-label="Search error codes"
          aria-autocomplete="list"
          aria-expanded={open}
          className={`w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition ${
            isHero ? "h-14 text-base sm:text-lg" : "h-10 text-sm"
          }`}
        />
        <svg
          aria-hidden="true"
          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${isHero ? "h-5 w-5" : "h-4 w-4"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
        </svg>
        {!isHero && (
          <kbd className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 text-[10px] font-mono text-gray-500">
            /
          </kbd>
        )}
      </div>

      {open && q.trim() && (
        <div
          role="listbox"
          className={`absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl ${
            isHero ? "max-h-[60vh]" : "max-h-[70vh]"
          } overflow-y-auto`}
        >
          {results.length === 0 && loaded && (
            <div className="p-4 text-sm text-gray-500">
              No matches for <span className="font-mono text-gray-900">{q}</span>.
              <div className="mt-2 text-xs">
                Try the full code (e.g. P0420) or a brand (e.g. &quot;Samsung washer&quot;).
              </div>
            </div>
          )}
          {results.length === 0 && !loaded && (
            <div className="p-4 text-sm text-gray-500">Loading search index…</div>
          )}
          {results.length > 0 && (
            <>
              <ul className="py-1">
                {results.map((r, i) => (
                  <li key={r.u}>
                    <Link
                      href={r.u}
                      onMouseEnter={() => setActive(i + 1)}
                      onClick={() => {
                        setOpen(false);
                        setQ("");
                      }}
                      className={`block px-4 py-3 transition ${
                        active === i + 1 ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-brand-primary">{r.c}</span>
                        <span className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${categoryAccent(r.cat)}`}>
                          {r.cat}
                        </span>
                        {r.b && (
                          <span className="text-[10px] text-gray-500 truncate">
                            {r.b}
                            {r.d ? ` · ${r.d}` : ""}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-sm text-gray-900 line-clamp-1">{r.t}</div>
                      {r.s && (
                        <div className="mt-0.5 text-xs text-gray-500 line-clamp-1">{r.s}</div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/search?q=${encodeURIComponent(q.trim())}`}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                }}
                className="block border-t border-gray-100 bg-gray-50 px-4 py-2.5 text-center text-sm font-medium text-brand-primary hover:bg-gray-100"
              >
                View all results for &ldquo;{q}&rdquo; &rarr;
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
