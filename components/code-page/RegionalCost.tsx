import { UnifiedCode } from "@/lib/types";

interface Props {
  code: UnifiedCode;
}

const REGIONS = [
  { name: "Calgary, AB", labor: 130, partsFactor: 1.00, note: "Higher shop rates than Toronto, imported parts add ~5%" },
  { name: "Toronto, ON", labor: 145, partsFactor: 1.05, note: "Most brands' Canadian parts hub — good OEM availability" },
  { name: "New York, NY", labor: 175, partsFactor: 1.10, note: "Dealer rates often $200+; independents drop to $140–160" },
  { name: "Los Angeles, CA", labor: 165, partsFactor: 1.05, note: "CA emissions rules can add catalytic converter costs" },
  { name: "Dallas, TX", labor: 125, partsFactor: 0.95, note: "Lower overhead = consistently cheaper than coastal cities" },
  { name: "London, UK", labor: 110, partsFactor: 1.20, note: "GBP labor lower but parts 15–25% higher than US retail" },
  { name: "Sydney, AU", labor: 160, partsFactor: 1.30, note: "Remote market = premium on imported parts" },
];

function estimateHours(code: UnifiedCode): number {
  const rt = (code.repairTime || "").toLowerCase();
  // Parse strings like "30-60 minutes", "1-2 hours", "2-4 hours"
  const mMin = rt.match(/(\d+)\s*-\s*(\d+)\s*min/);
  if (mMin) return (Number(mMin[1]) + Number(mMin[2])) / 120; // avg
  const mHr = rt.match(/(\d+)\s*-\s*(\d+)\s*h/);
  if (mHr) return (Number(mHr[1]) + Number(mHr[2])) / 2;
  const mSingleH = rt.match(/(\d+)\s*h/);
  if (mSingleH) return Number(mSingleH[1]);
  const mSingleM = rt.match(/(\d+)\s*min/);
  if (mSingleM) return Number(mSingleM[1]) / 60;
  return 1; // fallback
}

export default function RegionalCost({ code }: Props) {
  // Only meaningful for codes with a real "professional" cost
  const proMin = code.estimatedCost.professional.min;
  const proMax = code.estimatedCost.professional.max;
  if (proMax === 0) return null;

  const hours = estimateHours(code);
  const partsMid = Math.max(proMin - 120, 0); // rough: remove baseline US labor to get parts
  const avgPartsUsd = (proMin + proMax) / 2 - 130 * hours;
  const partsBase = Math.max(avgPartsUsd, partsMid, 0);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Regional Repair Cost Breakdown
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Pro repair cost for {code.displayCode} varies significantly by metro area due to
        labor rates and parts availability. Estimates below assume {hours.toFixed(1)} hour
        {hours === 1 ? "" : "s"} of shop time plus typical parts.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-2 pr-3">Region</th>
              <th className="py-2 pr-3">Labor/hr</th>
              <th className="py-2 pr-3">Estimated total</th>
              <th className="py-2 hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {REGIONS.map((r) => {
              const total = Math.round(r.labor * hours + partsBase * r.partsFactor);
              const low = Math.round(total * 0.85);
              const high = Math.round(total * 1.15);
              return (
                <tr key={r.name}>
                  <td className="py-2 pr-3 font-medium text-gray-900 whitespace-nowrap">{r.name}</td>
                  <td className="py-2 pr-3 text-gray-700 whitespace-nowrap">${r.labor}</td>
                  <td className="py-2 pr-3 text-gray-900 font-semibold whitespace-nowrap">
                    ${low}–${high}
                  </td>
                  <td className="py-2 text-xs text-gray-500 hidden sm:table-cell">{r.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-500 italic">
        Figures are averages from independent shops. Dealer service typically adds 30–50%.
        Getting 2–3 quotes before authorizing work is always worth the call.
      </p>
    </section>
  );
}
