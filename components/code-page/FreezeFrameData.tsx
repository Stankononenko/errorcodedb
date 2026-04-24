import { UnifiedCode } from "@/lib/types";

interface Props {
  code: UnifiedCode;
}

/**
 * OBD-II only. Freeze Frame Data explains the snapshot of engine
 * parameters captured the moment the code set. This is technician-
 * grade content that's missing from most competitors' pages.
 *
 * Renders null for non-OBD categories.
 */
export default function FreezeFrameData({ code }: Props) {
  if (code.category !== "obd2") return null;

  const system = code.obdSystem;

  // Heuristic to pick which parameters are most relevant
  const isMisfire = /misfire/i.test(code.title) || /P030\d/.test(code.code);
  const isFuelTrim = /fuel trim|lean|rich/i.test(code.title);
  const isCatalyst = /catalyst|catalytic/i.test(code.title);
  const isO2 = /O2 sensor|oxygen|HO2S/i.test(code.title);
  const isKnock = /knock|detonation/i.test(code.title);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Freeze Frame Data — What to Look For
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        When {code.displayCode} sets, the ECM captures a snapshot of key engine parameters.
        Reading this freeze frame through a capable scan tool tells you the exact conditions
        under which the fault occurred — crucial for narrowing the root cause.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {system === "powertrain" && (
          <>
            <FrameItem label="Engine RPM" hint="Idle (600–900) vs. cruise (1800–2500) changes which systems are active." />
            <FrameItem label="Vehicle Speed (VSS)" hint="Faults that only appear above ~40 mph point at high-load components (cat, O2 downstream)." />
            <FrameItem label="Coolant Temp (ECT)" hint="Cold vs. warmed up narrows to thermostat, startup enrichment, or closed-loop switch." />
            <FrameItem label="Intake Air Temp (IAT)" hint="Large IAT/ECT mismatch at startup hints at sensor wiring." />
            <FrameItem label="MAP / MAF reading" hint="Compare vs. spec for current RPM — deviation suggests vacuum leak or MAF fault." />
            <FrameItem label="Throttle Position (TPS)" hint="Captures whether fault set under load (WOT) or closed throttle." />
            <FrameItem label="Short-Term Fuel Trim (STFT)" hint={isFuelTrim ? "Directly relevant here — look for ±8% or more at idle." : "Sanity check for mixture-related faults."} />
            <FrameItem label="Long-Term Fuel Trim (LTFT)" hint={isFuelTrim ? "LTFT > +15% (lean) or < -15% (rich) indicates adaptive compensation hitting its limit." : "Stable LTFT rules out chronic mixture issues."} />
          </>
        )}

        {isMisfire && (
          <>
            <FrameItem label="Cylinder contribution" hint="Which cylinder misfired — compare cranking compression on that cylinder only." />
            <FrameItem label="Misfire counter" hint="Rate of 10+ per 200 revolutions sets catalyst-damaging P030X." />
          </>
        )}

        {isCatalyst && (
          <FrameItem label="Downstream O2 voltage" hint="Should stay flat around 0.6–0.8V. If it mirrors upstream sensor, cat efficiency is dropping." />
        )}

        {isO2 && (
          <>
            <FrameItem label="O2 sensor voltage" hint="Healthy sensor cycles 0.1–0.9V 1–5 times per second under closed loop." />
            <FrameItem label="Heater circuit resistance" hint="Open heater = P013X set." />
          </>
        )}

        {isKnock && (
          <FrameItem label="Knock sensor activity" hint="Raw voltage spikes >2V at cruise → real knock. Flat line at 0V → sensor open circuit." />
        )}

        {system === "chassis" && (
          <>
            <FrameItem label="Wheel speed sensors" hint="Compare all four — a single wheel reading 0 km/h while others show speed is a dead sensor or harness break." />
            <FrameItem label="Yaw rate" hint="Stuck at 0°/s = yaw sensor failure. Noisy = wiring problem." />
          </>
        )}

        {system === "body" && (
          <>
            <FrameItem label="Battery voltage" hint="SRS / body modules drop out below 10.8V while cranking." />
            <FrameItem label="Ignition state" hint="Confirms whether the fault sets Key-On-Engine-Off or only with engine running." />
          </>
        )}

        {system === "network" && (
          <>
            <FrameItem label="CAN bus activity" hint="A scan tool showing multiple modules offline indicates bus break, not individual module failure." />
            <FrameItem label="Module voltage" hint="Confirms power + ground are intact at the affected module before suspecting the module itself." />
          </>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Most OBD-II Bluetooth scanners ($20–$60) read freeze frame data. Pro-level tools
        (Autel, Launch, Foxwell) add bi-directional control and live graphing — usually
        needed to actually verify the fix.
      </p>
    </section>
  );
}

function FrameItem({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <div className="text-sm font-semibold text-gray-900">{label}</div>
      <div className="mt-0.5 text-xs text-gray-600 leading-snug">{hint}</div>
    </div>
  );
}
