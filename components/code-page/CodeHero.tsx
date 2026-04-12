import { UnifiedCode } from "@/lib/types";
import { SeverityBadge, DifficultyBadge } from "@/components/ui/Badge";

interface CodeHeroProps {
  code: UnifiedCode;
}

export default function CodeHero({ code }: CodeHeroProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-3xl font-bold text-brand-primary font-mono">
          {code.displayCode}
        </span>
        {code.severity && <SeverityBadge severity={code.severity} />}
        <DifficultyBadge difficulty={code.diyDifficulty} />
        {code.alternativeCodes && code.alternativeCodes.length > 0 && (
          <span className="text-sm text-gray-500">
            Also: {code.alternativeCodes.join(", ")}
          </span>
        )}
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        {code.category === "obd2"
          ? `${code.displayCode} — ${code.title}`
          : `${code.brand} ${code.deviceType} Error Code ${code.displayCode} — ${code.title}`}
      </h1>

      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4">
        <p className="text-gray-800 font-medium">{code.shortDescription}</p>
      </div>

      <p className="text-gray-700 leading-relaxed">{code.fullDescription}</p>

      {code.safetyImpact && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800 text-sm font-medium">
            &#9888;&#65039; Safety: {code.safetyImpact}
          </p>
        </div>
      )}

      {code.safetyWarning && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800 text-sm font-medium">
            &#9888;&#65039; Warning: {code.safetyWarning}
          </p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-gray-500 block">DIY Cost</span>
          <span className="font-semibold">${code.estimatedCost.diy.min}–${code.estimatedCost.diy.max}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Pro Cost</span>
          <span className="font-semibold">${code.estimatedCost.professional.min}–${code.estimatedCost.professional.max}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Difficulty</span>
          <span className="font-semibold capitalize">{code.diyDifficulty}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Time</span>
          <span className="font-semibold">{code.repairTime}</span>
        </div>
      </div>
    </div>
  );
}
