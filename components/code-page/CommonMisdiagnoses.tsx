import { UnifiedCode } from "@/lib/types";

interface Props {
  code: UnifiedCode;
}

interface Pitfall {
  mistake: string;
  why: string;
}

/**
 * "Common Misdiagnoses" — the most valuable section for SEO because
 * nobody else writes it. Points out which parts people throw money
 * at that usually aren't the problem.
 */
function pitfallsFor(code: UnifiedCode): Pitfall[] {
  const t = code.title.toLowerCase();
  const c = code.code.toUpperCase();

  // P0420 / P0430 — catalyst efficiency
  if (/catalyst|catalytic/i.test(t)) {
    return [
      {
        mistake: "Immediately replacing the catalytic converter ($800–$2,500).",
        why: "More than half the time a bad O2 sensor is feeding the ECM false readings and the cat is fine. Always confirm both O2 sensors switch correctly before condemning the cat.",
      },
      {
        mistake: "Swapping in an aftermarket cat that's below spec.",
        why: "Many aftermarket cats set P0420 again within months because catalytic efficiency is borderline. OEM or CARB-approved replacements are worth the $150–$400 premium.",
      },
      {
        mistake: "Ignoring the upstream exhaust leak.",
        why: "A leak in the downpipe or flex joint pulls air into the exhaust stream, fooling the downstream O2 sensor. You'll replace the cat twice before the smoke test finds the leak.",
      },
    ];
  }

  // Misfire codes
  if (/misfire/i.test(t) || /P030[0-9]/.test(c)) {
    return [
      {
        mistake: "Replacing all spark plugs and coils at once.",
        why: "Expensive scattershot. Swap the suspect coil/plug to a known-good cylinder and see if the misfire follows. That narrows to the actual failed component in 10 minutes.",
      },
      {
        mistake: "Buying a new fuel injector before testing.",
        why: "Injectors are often blamed for cylinder-specific misfires but rarely fail. A noid light test or resistance check confirms before spending $100–$300 per injector.",
      },
      {
        mistake: "Assuming random misfire (P0300) = worn plugs.",
        why: "Random misfire is more commonly caused by a vacuum leak, low fuel pressure, or failing MAF sensor. Smoke-test the intake first.",
      },
    ];
  }

  // Fuel trim / lean codes
  if (/fuel trim|lean|rich|P017[1-5]/i.test(t) || /P017[1-5]/.test(c)) {
    return [
      {
        mistake: "Replacing the O2 sensor first.",
        why: "The O2 sensor is reporting correctly — the engine genuinely is lean (or rich). Fix the underlying cause (vacuum leak, failing MAF, fuel pump weak) before spending on sensors.",
      },
      {
        mistake: "Cleaning the MAF sensor without testing first.",
        why: "MAF contamination is common but by no means always the cause. Compare actual MAF g/s reading vs. spec at idle and WOT — if it's within 10%, the MAF is fine.",
      },
      {
        mistake: "Ignoring the PCV system.",
        why: "A stuck-open PCV valve or cracked hose causes significant vacuum leaks, especially on high-mileage engines. Inspect before chasing electronics.",
      },
    ];
  }

  // Transmission codes
  if (/transmission|shift|solenoid|torque converter/i.test(t) || /^P07[0-9][0-9]/.test(c)) {
    return [
      {
        mistake: "Jumping straight to a transmission rebuild ($2,500–$5,000).",
        why: "Many shift-solenoid codes are fixed with a solenoid pack replacement ($200–$500) or even a fluid service. Get a second opinion before authorizing a rebuild.",
      },
      {
        mistake: "Ignoring the fluid level or condition.",
        why: "Low or burnt ATF causes nearly every solenoid and pressure-control code on this list. Check level and color before anything else.",
      },
    ];
  }

  // O2 sensor codes
  if (/O2 sensor|oxygen|HO2S/i.test(t) || /^P013[0-9]/.test(c)) {
    return [
      {
        mistake: "Replacing the sensor without checking heater circuit wiring.",
        why: "P013X heater codes are often a blown fuse or open circuit, not a dead sensor. A $100 sensor and 30 minutes of labor wasted if the wiring is the problem.",
      },
      {
        mistake: "Buying generic aftermarket O2 sensors for European vehicles.",
        why: "Narrow-band aftermarket sensors often don't meet wide-band spec on BMW/Audi/Mercedes. OEM-equivalent (NTK, Bosch) is worth the extra $30.",
      },
    ];
  }

  // Appliance generic
  if (code.category === "appliance") {
    if (/door|lock|switch/i.test(t)) {
      return [
        {
          mistake: "Replacing the control board first.",
          why: "Control boards are expensive ($150–$400). Door latch mechanisms and micro-switches fail 10x more often and cost $20–$60. Verify the switch with a multimeter first.",
        },
      ];
    }
    if (/drain|pump|water/i.test(t)) {
      return [
        {
          mistake: "Buying a new drain pump before checking the hose.",
          why: "Kinked or clogged drain hoses (and blocked filters in the sump) account for most drain faults. Physically inspect the full path before replacing the pump.",
        },
      ];
    }
  }

  // HVAC generic
  if (code.category === "hvac") {
    return [
      {
        mistake: "Topping off refrigerant without leak-testing.",
        why: "If the system is low, it's leaking. Adding more refrigerant ($200–$500) without fixing the leak means the issue returns in weeks and wastes EPA-regulated refrigerant.",
      },
      {
        mistake: "Replacing the thermostat when the real issue is the control board.",
        why: "Thermostats are cheap so people swap them first. If the new one doesn't fix it, the furnace/AC control board or low-voltage wiring is the real culprit.",
      },
    ];
  }

  return [];
}

export default function CommonMisdiagnoses({ code }: Props) {
  const pitfalls = pitfallsFor(code);
  if (pitfalls.length === 0) return null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Common misdiagnoses — don&rsquo;t waste money here
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        These are the mistakes we see most often when people troubleshoot {code.displayCode}.
        Avoiding them saves hundreds of dollars.
      </p>
      <ul className="mt-4 space-y-3">
        {pitfalls.map((p, i) => (
          <li
            key={i}
            className="rounded-lg border-l-4 border-amber-400 bg-amber-50/50 px-4 py-3"
          >
            <div className="flex items-start gap-2.5">
              <svg className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{p.mistake}</p>
                <p className="mt-1 text-sm text-gray-700 leading-snug">{p.why}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
