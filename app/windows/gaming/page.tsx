import type { Metadata } from "next";
import Link from "next/link";
import { getWindowsCodes } from "@/lib/data-loader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl, buildOgMetadata } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "PC Gaming & Launcher Error Codes — Steam, Epic, Battle.net, Xbox PC",
  description:
    "Fix errors in Steam, Epic Games, Battle.net, Riot, Ubisoft Connect, EA App, Xbox App for PC, and GOG Galaxy. Step-by-step repair guides.",
  alternates: { canonical: getCanonicalUrl("/windows/gaming") },
  ...buildOgMetadata(
    "PC Gaming Error Codes",
    "Steam, Epic, Battle.net, Xbox PC app error codes — fix guides",
    "windows",
  ),
};

export default function GamingIndexPage() {
  const codes = getWindowsCodes("gaming");
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Windows", href: "/windows" },
          { label: "Gaming", href: "/windows/gaming" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        PC Gaming & Launcher Error Codes
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        {codes.length} errors across Steam, Epic Games, Battle.net, Xbox PC app,
        and other PC game launchers.
      </p>
      <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3 font-semibold">Code</th>
              <th className="text-left px-4 py-3 font-semibold">Title</th>
            </tr>
          </thead>
          <tbody>
            {codes
              .sort((a, b) => a.code.localeCompare(b.code))
              .map((c) => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/windows/gaming/${c.code.toLowerCase()}`}
                      className="font-mono text-sm font-semibold text-brand-primary hover:underline"
                    >
                      {c.displayCode}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{c.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
