import type { Metadata } from "next";
import Link from "next/link";
import { getAllOBDCodes } from "@/lib/data-loader";
import { OBD_SYSTEMS } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd, getCanonicalUrl } from "@/lib/seo-helpers";
import { SITE_URL } from "@/lib/constants";
import { OBDSystem, Severity } from "@/lib/types";

export const metadata: Metadata = {
  title: "OBD-II Error Codes — Complete List with Meanings & Fixes",
  description:
    "Browse all OBD-II diagnostic trouble codes (DTCs). Find the meaning, causes, symptoms, and step-by-step fix guide for any check engine light code.",
  alternates: { canonical: getCanonicalUrl("/obd2") },
};

function getSeverityColor(severity: Severity): string {
  const colors: Record<Severity, string> = {
    high: "text-red-600",
    medium: "text-amber-600",
    low: "text-green-600",
    info: "text-blue-600",
  };
  return colors[severity];
}

export default function OBD2IndexPage() {
  const allCodes = getAllOBDCodes();

  const systemGroups = Object.entries(OBD_SYSTEMS).map(([key, meta]) => {
    const codes = allCodes.filter((c) => c.system === key);
    return { system: key as OBDSystem, ...meta, codes };
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "OBD-II Codes", url: `${SITE_URL}/obd2` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "OBD-II Codes", href: "/obd2" }]} />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">OBD-II Error Codes</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl">
            Complete list of OBD-II diagnostic trouble codes (DTCs) for all vehicles 1996 and newer.
            Find the meaning, common causes, and step-by-step repair instructions for any check engine light code.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemGroups.map((group) => (
            <div key={group.system} className="bg-white border border-gray-200 rounded-lg p-5">
              <h2 className="font-bold text-lg text-gray-900">{group.label}</h2>
              <p className="text-sm text-gray-600 mt-1">{group.description}</p>
              <p className="text-sm text-gray-500 mt-2">{group.codes.length} codes</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All OBD-II Codes</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Code</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 hidden sm:table-cell">System</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 hidden md:table-cell">Severity</th>
                </tr>
              </thead>
              <tbody>
                {allCodes
                  .sort((a, b) => a.code.localeCompare(b.code))
                  .map((code) => (
                    <tr key={code.code} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link
                          href={`/obd2/${code.code.toLowerCase()}`}
                          className="font-mono font-semibold text-brand-primary hover:underline"
                        >
                          {code.code}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{code.title}</td>
                      <td className="px-4 py-3 text-gray-500 capitalize hidden sm:table-cell">{code.system}</td>
                      <td className={`px-4 py-3 capitalize font-medium hidden md:table-cell ${getSeverityColor(code.severity)}`}>
                        {code.severity}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
