import { UnifiedCode } from "@/lib/types";

interface Props {
  code: UnifiedCode;
}

interface Hazard {
  level: "critical" | "warning" | "caution";
  title: string;
  body: string;
}

/**
 * Detects hazard level from code content and renders a prominent
 * colored banner BEFORE any fix steps. Required for AdSense approval
 * on pages involving electrical / gas / refrigerant / HV battery work.
 */
function detectHazards(code: UnifiedCode): Hazard[] {
  const hazards: Hazard[] = [];
  const text = `${code.title} ${code.fullDescription} ${code.shortDescription} ${
    code.safetyImpact || ""
  } ${code.safetyWarning || ""} ${(code.deviceType || "")} ${(code.brand || "")}`.toLowerCase();

  const brand = (code.brand || "").toLowerCase();
  const device = (code.deviceType || "").toLowerCase();

  // High-voltage EV battery codes — fatal shock risk
  const isEV =
    /tesla|rivian|lucid|lightning|mach-e|e-gmp|leaf|prius|ioniq|bolt|volt/.test(brand) ||
    /ev-charger|hybrid battery|hv battery|high voltage|high-voltage|traction battery|inverter/.test(text) ||
    code.code.toLowerCase().startsWith("p3a") ||
    code.code.toLowerCase().startsWith("p3b") ||
    code.code.toLowerCase().startsWith("p3c") ||
    code.code.toLowerCase().startsWith("p3d");

  if (isEV) {
    hazards.push({
      level: "critical",
      title: "High-voltage hazard — fatal shock risk",
      body: "EV traction battery systems run at 400–800 V DC. Contact can cause instant cardiac arrest. Only certified high-voltage technicians should service these components. Isolate the HV system (remove service disconnect, wait 10+ minutes, verify 0 V with a calibrated meter) before any contact. This is NOT a DIY repair.",
    });
  }

  // Gas appliance / furnace / water heater
  const isGas =
    /furnace|water heater|gas range|gas cooktop|gas dryer|boiler/.test(device) ||
    /gas valve|gas leak|carbon monoxide|natural gas|propane|ignition module/.test(text);

  if (isGas) {
    hazards.push({
      level: "warning",
      title: "Carbon monoxide & gas leak risk",
      body: "Gas appliances produce carbon monoxide when combustion is incomplete. CO is odorless and can be fatal within minutes at high concentrations. If you smell gas, leave the building and call your gas utility immediately. Never attempt gas repairs without shutting off the supply valve. Verify a working CO detector on every floor before returning to service.",
    });
  }

  // HVAC refrigerant
  const hasRefrigerant =
    /air conditioner|heat pump|mini-split|ac unit/.test(device) ||
    /refrigerant|r-410a|r-22|r-32|freon|compressor/.test(text);

  if (hasRefrigerant && !isGas) {
    hazards.push({
      level: "warning",
      title: "EPA-regulated refrigerant",
      body: "Refrigerant handling requires EPA Section 608 certification in the US. Releasing refrigerant to atmosphere is a federal violation. Lines remain pressurized to 300+ PSI and can cause severe frostbite on skin contact. Call a licensed HVAC technician for any work involving the sealed refrigerant loop.",
    });
  }

  // Mains-voltage electrical (appliances, washers, dryers)
  const hasMainsElectrical =
    /washer|dryer|dishwasher|oven|microwave|cooktop|refrigerator/.test(device) &&
    /wiring|relay|control board|motor|heating element|thermal fuse/.test(text);

  if (hasMainsElectrical && hazards.length === 0) {
    hazards.push({
      level: "caution",
      title: "Electrical shock risk",
      body: "120–240 V AC can be lethal. Always unplug the appliance or switch off the circuit breaker before opening panels, and verify with a non-contact voltage tester. Discharge any capacitors (microwaves especially) before touching internals.",
    });
  }

  // Check engine with airbag / SRS
  if (
    code.code.toLowerCase().startsWith("b") &&
    /airbag|srs|pretensioner|occupant|curtain|deployment/.test(text)
  ) {
    hazards.push({
      level: "warning",
      title: "Airbag / SRS system — deployment risk",
      body: "Airbag modules contain pyrotechnic charges that can deploy unexpectedly, causing serious injury. Always disconnect the vehicle battery and wait 10 minutes before working near any SRS component. Never apply power to airbag connectors outside of dealer-level diagnostic procedures.",
    });
  }

  return hazards;
}

const STYLES: Record<Hazard["level"], { wrap: string; icon: string; label: string }> = {
  critical: {
    wrap: "bg-red-50 border-red-300 text-red-900",
    icon: "text-red-600",
    label: "Danger",
  },
  warning: {
    wrap: "bg-amber-50 border-amber-300 text-amber-900",
    icon: "text-amber-600",
    label: "Warning",
  },
  caution: {
    wrap: "bg-yellow-50 border-yellow-200 text-yellow-900",
    icon: "text-yellow-600",
    label: "Caution",
  },
};

export default function SafetyBanner({ code }: Props) {
  const hazards = detectHazards(code);
  if (hazards.length === 0) return null;

  return (
    <div className="space-y-3">
      {hazards.map((h, i) => {
        const s = STYLES[h.level];
        return (
          <div
            key={i}
            role="alert"
            className={`rounded-xl border-2 ${s.wrap} p-4 sm:p-5`}
          >
            <div className="flex items-start gap-3">
              <div className={`shrink-0 ${s.icon}`}>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
                <h3 className="mt-0.5 text-base font-bold leading-tight">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">
                  {h.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
