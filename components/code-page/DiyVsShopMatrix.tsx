import { UnifiedCode } from "@/lib/types";

interface Props {
  code: UnifiedCode;
}

interface Row {
  factor: string;
  diy: string;
  shop: string;
  diyBetter: boolean;
}

function buildRows(code: UnifiedCode): Row[] {
  const diff = code.diyDifficulty;
  const isEasy = diff === "easy";
  const isIntermediate = diff === "intermediate";
  const isAdvanced = diff === "advanced";
  const isPro = diff === "professional";

  const diy = code.estimatedCost.diy;
  const pro = code.estimatedCost.professional;
  const diySavings = pro.min - diy.max; // how much DIY saves at minimum

  return [
    {
      factor: "Typical cost",
      diy: `$${diy.min}–$${diy.max}`,
      shop: `$${pro.min}–$${pro.max}`,
      diyBetter: true,
    },
    {
      factor: "Time to complete",
      diy: `${code.repairTime} + learning`,
      shop: `Same labor time + ride to shop`,
      diyBetter: !isPro,
    },
    {
      factor: "Tools required",
      diy: isEasy
        ? "Basic hand tools most households have"
        : isIntermediate
          ? "Socket set + multimeter ($40–80 if buying)"
          : "Specialty tools / diagnostic scanner ($200+ if buying)",
      shop: "All tools on-site, no acquisition cost",
      diyBetter: isEasy,
    },
    {
      factor: "Warranty / guarantee",
      diy: "No warranty — you eat the cost if parts fail",
      shop: "12–24 month labor warranty standard at reputable shops",
      diyBetter: false,
    },
    {
      factor: "Risk of making it worse",
      diy: isEasy
        ? "Low — easy to recover from mistakes"
        : isPro
          ? "High — wrong move can cost more than the original repair"
          : "Moderate — follow the steps carefully",
      shop: "Low — experienced techs catch their own errors",
      diyBetter: isEasy || isIntermediate,
    },
  ];
}

export default function DiyVsShopMatrix({ code }: Props) {
  // Skip when cost gap is zero / meaningless (e.g. Windows fixes)
  if (code.category === "windows") return null;

  const rows = buildRows(code);
  const verdict = getVerdict(code);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        DIY vs. shop — which makes sense for {code.displayCode}?
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-2 pr-3">Factor</th>
              <th className="py-2 pr-3">DIY</th>
              <th className="py-2 pr-3">Shop</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => (
              <tr key={r.factor}>
                <td className="py-2 pr-3 font-medium text-gray-900 whitespace-nowrap">{r.factor}</td>
                <td className={`py-2 pr-3 text-sm ${r.diyBetter ? "text-emerald-700" : "text-gray-700"}`}>
                  {r.diy}
                </td>
                <td className={`py-2 pr-3 text-sm ${!r.diyBetter ? "text-emerald-700" : "text-gray-700"}`}>
                  {r.shop}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`mt-4 rounded-lg border-l-4 px-4 py-3 ${verdict.accent}`}>
        <p className="text-sm font-semibold text-gray-900">{verdict.headline}</p>
        <p className="mt-1 text-sm text-gray-700 leading-snug">{verdict.detail}</p>
      </div>
    </section>
  );
}

function getVerdict(code: UnifiedCode): { headline: string; detail: string; accent: string } {
  const d = code.diyDifficulty;
  const savings = code.estimatedCost.professional.min - code.estimatedCost.diy.max;

  if (d === "easy") {
    return {
      headline: "Verdict: strong DIY candidate",
      detail: `At the "easy" difficulty level this repair is reasonable for most owners with basic tools. You'd save roughly $${Math.max(savings, 50)} and about the same amount of time as dropping it at a shop.`,
      accent: "border-emerald-400 bg-emerald-50/60",
    };
  }

  if (d === "intermediate") {
    return {
      headline: "Verdict: DIY if you've done similar work before",
      detail: `Tackleable by someone with basic mechanical experience, but not a first-time project. Potential savings ~$${Math.max(savings, 100)}. Budget extra time for unexpected steps.`,
      accent: "border-blue-400 bg-blue-50/60",
    };
  }

  if (d === "advanced") {
    return {
      headline: "Verdict: advanced DIY only — consider the shop",
      detail: `This repair requires diagnostic skill, possibly specialty tools, and can get worse with wrong moves. Unless you've fixed similar issues before, the ~$${Math.max(savings, 150)} savings usually isn't worth the risk.`,
      accent: "border-amber-400 bg-amber-50/60",
    };
  }

  return {
    headline: "Verdict: call a professional",
    detail: "This repair involves safety-critical systems, specialty tooling, or manufacturer-specific procedures. DIY risk outweighs savings. Get 2–3 quotes before authorizing work.",
    accent: "border-red-400 bg-red-50/60",
  };
}
