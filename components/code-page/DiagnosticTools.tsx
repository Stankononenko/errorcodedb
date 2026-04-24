import { UnifiedCode } from "@/lib/types";

interface Props {
  code: UnifiedCode;
}

interface ToolRec {
  tier: "budget" | "prosumer" | "professional";
  name: string;
  priceRange: string;
  fit: string;
  pros: string;
  cons: string;
}

function obdToolSet(code: UnifiedCode): ToolRec[] {
  const isBasic = /P0[01]\d\d|P03\d\d|P04\d\d/.test(code.code);
  const needsBiDi = /transmission|ABS|SRS|relearn|crank|cam/i.test(code.title);

  const base: ToolRec[] = [
    {
      tier: "budget",
      name: "BlueDriver (iOS/Android)",
      priceRange: "$110–130",
      fit: "Reads all generic OBD-II codes, freeze frame, live data. Cloud-backed repair reports make this the best bang-for-buck consumer tool.",
      pros: "Wireless, no subscription, vehicle-specific enhanced codes for most brands",
      cons: "Bi-directional control limited vs. pro tools",
    },
    {
      tier: "budget",
      name: "ANCEL AD410 / FOXWELL NT301",
      priceRange: "$40–70",
      fit: isBasic
        ? "Perfect for this code — reads, freeze-frames, clears. That's all you need for a P0XXX generic."
        : "Reads code but won't do actuator tests for deeper troubleshooting.",
      pros: "Cheap, reliable, no phone required",
      cons: "No bi-directional control, no enhanced manufacturer codes",
    },
    {
      tier: "prosumer",
      name: "Autel MaxiCOM MK808 / AP200",
      priceRange: "$350–600",
      fit: "All-systems scan, bi-directional control, actuator tests, special service functions.",
      pros: "Reads ABS, SRS, transmission; annual update fee small",
      cons: "Hardware cost, occasional model-specific gaps",
    },
    {
      tier: "professional",
      name: "Launch X431 PRO / Autel MaxiSys",
      priceRange: "$1,200–3,000",
      fit: needsBiDi
        ? "Strongly recommended for this code — may require bi-directional actuator tests to confirm the fix."
        : "Overkill for a simple reader, but worth it if you diagnose multiple vehicles.",
      pros: "Full dealer-level diagnostics, ECU coding, programming",
      cons: "Expensive, annual subscription, learning curve",
    },
  ];

  return base;
}

function appliancePrinterTools(): ToolRec[] {
  return [
    {
      tier: "budget",
      name: "Digital Multimeter (Fluke 107, Klein MM300)",
      priceRange: "$30–80",
      fit: "Essential for testing continuity on thermal fuses, door switches, heating elements, and motor windings.",
      pros: "No electronics skills required for basic continuity + voltage",
      cons: "Won't read the error code itself — you need the appliance's display",
    },
    {
      tier: "prosumer",
      name: "Non-contact voltage tester + infrared thermometer",
      priceRange: "$20–50 each",
      fit: "Quickly verify power reaches components and measure operating temps without probes.",
      pros: "Fast, safe, no disassembly",
      cons: "Qualitative not quantitative",
    },
  ];
}

function hvacTools(): ToolRec[] {
  return [
    {
      tier: "prosumer",
      name: "Manifold gauge set + digital scale",
      priceRange: "$80–250",
      fit: "Read high/low side pressures and charge by weight when recharging refrigerant.",
      pros: "Only way to truly diagnose sealed-system issues",
      cons: "EPA 609/608 certification required to legally purchase refrigerant",
    },
    {
      tier: "professional",
      name: "Combustion analyzer (for gas furnaces/boilers)",
      priceRange: "$500–1,500",
      fit: "Measures CO output, O2 content, and efficiency. Non-negotiable when troubleshooting ignition or flame codes.",
      pros: "Only way to verify safe combustion after repair",
      cons: "Expensive, requires calibration",
    },
  ];
}

export default function DiagnosticTools({ code }: Props) {
  let tools: ToolRec[] = [];
  let intro = "";

  if (code.category === "obd2") {
    tools = obdToolSet(code);
    intro = `Reading ${code.displayCode} on a cheap scanner gets you the code string and freeze frame, which is enough for 80% of DIY diagnosis. Fixing it often requires more — specifically bi-directional control to cycle solenoids, test actuators, or run adaptive resets after parts replacement. Here's what we recommend by budget tier.`;
  } else if (code.category === "hvac") {
    tools = hvacTools();
    intro = "HVAC diagnostics go beyond reading the flash or display code. The real work happens at the sealed refrigerant circuit or combustion chamber. These tools separate guesses from actual measurements.";
  } else if (code.category === "appliance" || code.category === "printer") {
    tools = appliancePrinterTools();
    intro = "Most appliance and printer error codes display on the unit itself — no scanner needed. What you do need for DIY repair is the ability to test components. A cheap multimeter covers 90% of cases.";
  } else {
    // Windows / other — skip
    return null;
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Which Tools Diagnose {code.displayCode} Best?
      </h2>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{intro}</p>

      <ul className="mt-4 space-y-3">
        {tools.map((t) => (
          <li
            key={t.name}
            className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                t.tier === "budget"
                  ? "bg-emerald-100 text-emerald-800"
                  : t.tier === "prosumer"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-violet-100 text-violet-800"
              }`}>
                {t.tier}
              </span>
              <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
              <span className="text-xs text-gray-500">{t.priceRange}</span>
            </div>
            <p className="mt-1.5 text-sm text-gray-700 leading-snug">{t.fit}</p>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="text-emerald-700">
                <strong>Pros:</strong> {t.pros}
              </div>
              <div className="text-amber-700">
                <strong>Cons:</strong> {t.cons}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
