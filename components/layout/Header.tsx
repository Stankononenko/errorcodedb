"use client";

import Link from "next/link";
import { useState } from "react";
import { MAIN_NAV_ITEMS } from "@/lib/constants";
import SearchBar from "@/components/search/SearchBar";
import Logo from "@/components/layout/Logo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top row: brand + search + nav + menu */}
        <div className="flex h-14 items-center justify-between gap-3">
          <Logo />


          {/* Desktop search — wide, centered */}
          <div className="hidden md:block flex-1 max-w-xl">
            <SearchBar variant="header" />
          </div>

          <nav className="hidden md:flex items-center gap-5">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-gray-700 shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>

        {/* Mobile-only search row — always visible under brand */}
        <div className="md:hidden pb-2.5">
          <SearchBar variant="header" />
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <nav className="md:hidden pb-3 border-t border-gray-100 pt-2">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
