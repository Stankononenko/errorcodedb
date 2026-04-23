"use client";

import { useState } from "react";
import { UnifiedCode } from "@/lib/types";
import { SeverityBadge, DifficultyBadge } from "@/components/ui/Badge";

interface CodeHeroProps {
  code: UnifiedCode;
}

const CATEGORY_ACCENT: Record<string, string> = {
  obd2: "from-blue-50 border-blue-200",
  appliance: "from-emerald-50 border-emerald-200",
  hvac: "from-cyan-50 border-cyan-200",
  printer: "from-violet-50 border-violet-200",
  windows: "from-orange-50 border-orange-200",
};

const CATEGORY_LABEL: Record<string, string> = {
  obd2: "OBD-II",
  appliance: "Appliance",
  hvac: "HVAC",
  printer: "Printer",
  windows: "Windows",
};

function mostLikelyCause(code: UnifiedCode): string {
  const high = code.causes.find((c) => c.likelihood === "high");
  return high?.cause || code.causes[0]?.cause || "Multiple possible causes — see below.";
}

export default function CodeHero({ code }: CodeHeroProps) {
  const [copied, setCopied] = useState(false);

  const accent = CATEGORY_ACCENT[code.category] || "from-blue-50 border-blue-200";
  const catLabel = CATEGORY_LABEL[code.category] || code.category;

  const h1 =
    code.category === "obd2"
      ? `${code.displayCode} — ${code.title}`
      : code.brand && code.deviceType
        ? `${code.brand} ${code.deviceType} ${code.displayCode} — ${code.title}`
        : `${code.displayCode} — ${code.title}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code.displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }

  const totalSteps = code.fixSteps.length;
  const likelyCause = mostLikelyCause(code);

  return (
    <header className={`bg-gradient-to-b ${accent} to-white border rounded-xl p-5 sm:p-7 shadow-sm`}>
      {/* Top row: category chip + alternative codes */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center rounded-full bg-white/80 border border-gray-300 px-2.5 py-0.5 font-medium text-gray-700">
          {catLabel}
        </span>
        {code.brand && (
          <span className="text-gray-600">
            {code.brand}
            {code.deviceType ? ` · ${code.deviceType}` : ""}
          </span>
        )}
        {code.alternativeCodes && code.alternativeCodes.length > 0 && (
          <span className="text-gray-500">
            Also: <span className="font-mono text-gray-700">{code.alternativeCodes.join(", ")}</span>
          </span>
        )}
      </div>

      {/* Code + copy + badges */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy code ${code.displayCode}`}
          className="group inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-3 py-1.5 font-mono text-2xl sm:text-3xl font-bold text-brand-primary hover:bg-gray-50 transition-colors shadow-sm"
        >
          <span>{code.displayCode}</span>
          <span className="text-xs font-sans font-medium text-gray-500 group-hover:text-brand-primary">
            {copied ? "✓ Copied" : "Copy"}
          </span>
        </button>
        {code.severity && <SeverityBadge severity={code.severity} />}
        <DifficultyBadge difficulty={code.diyDifficulty} />
      </div>

      {/* Title */}
      <h1 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
        {h1}
      </h1>

      {/* Quick answer card — the most important block */}
      <div className="mt-5 rounded-lg bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div className="p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              What it means
            </div>
            <p className="mt-1 text-sm text-gray-900 leading-snug">
              {code.shortDescription}
            </p>
          </div>
          <div className="p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Most likely cause
            </div>
            <p className="mt-1 text-sm text-gray-900 leading-snug">
              {likelyCause}
            </p>
          </div>
          <div className="p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              How to fix
            </div>
            <p className="mt-1 text-sm text-gray-900 leading-snug">
              {totalSteps} step{totalSteps === 1 ? "" : "s"} · {code.repairTime}
            </p>
            <a
              href="#fix-steps"
              className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
            >
              Jump to fix
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Safety warnings */}
      {(code.safetyImpact || code.safetyWarning) && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 sm:p-4">
          <div className="flex items-start gap-2">
            <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-red-900 font-medium leading-snug">
              <strong>Safety: </strong>
              {code.safetyImpact || code.safetyWarning}
            </div>
          </div>
        </div>
      )}

      {/* Key stats grid — desktop-friendly */}
      <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <Stat label="DIY Cost" value={`$${code.estimatedCost.diy.min}–${code.estimatedCost.diy.max}`} />
        <Stat label="Pro Cost" value={`$${code.estimatedCost.professional.min}–${code.estimatedCost.professional.max}`} />
        <Stat label="Difficulty" value={code.diyDifficulty} capitalize />
        <Stat label="Time" value={code.repairTime} />
      </dl>
    </header>
  );
}

function Stat({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="rounded-md bg-white/60 border border-gray-200 px-3 py-2">
      <dt className="text-[11px] uppercase tracking-wide font-medium text-gray-500">{label}</dt>
      <dd className={`mt-0.5 text-sm font-semibold text-gray-900 ${capitalize ? "capitalize" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
