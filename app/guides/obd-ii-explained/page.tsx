import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl, buildOgMetadata } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "OBD-II explained — what your check-engine light really knows",
  description:
    "How on-board diagnostics actually work: what the ECM monitors, why codes set, what freeze frame captures, and how cheap scanners read any 1996+ vehicle.",
  alternates: { canonical: getCanonicalUrl("/guides/obd-ii-explained") },
  ...buildOgMetadata(
    "OBD-II explained",
    "How on-board diagnostics really work — the 10-minute primer.",
    "obd2",
  ),
};

export default function ObdIIExplainedPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "OBD-II Explained", href: "/guides/obd-ii-explained" },
        ]}
      />

      <header className="mt-6 border-b border-gray-200 pb-6">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
          Automotive · 10 min read
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          OBD-II explained — what your check-engine light really knows
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          The 10-minute primer on how on-board diagnostics work — what the ECM monitors,
          why codes set, and how a cheap scanner lets you in on the conversation.
        </p>
      </header>

      <div className="prose prose-gray max-w-none text-gray-700 mt-8 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-3">Why every car has it</h2>
          <p>
            On-Board Diagnostics, second generation (OBD-II), became mandatory on every
            gasoline vehicle sold in the United States starting with the 1996 model year. The
            reason was environmental: regulators needed a way to catch emissions-related
            malfunctions in the field, not just on the test bench. Congress built it into the
            Clean Air Act amendments of 1990, and manufacturers had six years to comply.
          </p>
          <p>
            The standard itself — SAE J1979 for the protocol, SAE J2012 for the code
            definitions, ISO 15765-4 for the physical CAN layer — specifies that any
            compliant scan tool can read a common set of codes and data parameters (PIDs) from
            any compliant vehicle. That&rsquo;s why a $30 scanner you buy today can read the
            2002 Camry your neighbor is selling.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What the ECM actually does</h2>
          <p>
            The Engine Control Module (ECM, sometimes PCM for powertrain control module on
            integrated units) runs a realtime control loop several hundred times per second.
            It reads sensor inputs, compares them to an expected model, and commands actuator
            outputs — fuel injectors, ignition coils, throttle motor, EGR solenoid, and so on.
          </p>
          <p>When a sensor reading lands outside the expected window for long enough — and the fault
            persists across a specified number of drive cycles — the ECM sets a diagnostic
            trouble code (DTC) and, depending on severity, triggers the malfunction indicator
            lamp (MIL) on your dashboard. That&rsquo;s the check engine light.
          </p>
          <p>
            &ldquo;Long enough&rdquo; and &ldquo;specified number of drive cycles&rdquo; are
            key. A one-time blip doesn&rsquo;t set a code. The ECM tolerates transient
            anomalies, knowing that rough pavement or a cold start can cause momentary sensor
            noise. Codes that survive this filtering represent real, repeatable problems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Code format — what the letters and numbers mean</h2>
          <p>Every OBD-II code follows the same five-character structure:</p>
          <ul className="mt-3 space-y-2">
            <li>
              <strong>First letter</strong> identifies the system:
              <ul className="mt-1 ml-4 list-disc pl-5 space-y-1 text-sm">
                <li><span className="font-mono font-semibold">P</span> — Powertrain (engine, transmission, emissions)</li>
                <li><span className="font-mono font-semibold">B</span> — Body (airbags, lighting, climate, BCM)</li>
                <li><span className="font-mono font-semibold">C</span> — Chassis (ABS, TPMS, steering, suspension)</li>
                <li><span className="font-mono font-semibold">U</span> — Network (CAN bus communication faults)</li>
              </ul>
            </li>
            <li>
              <strong>First digit</strong> tells you if it&rsquo;s a generic (0) or
              manufacturer-specific (1) code.
            </li>
            <li>
              <strong>Second digit</strong> identifies the subsystem — fuel/air metering,
              ignition, misfire, emissions, vehicle speed, computer output, or transmission.
            </li>
            <li>
              <strong>Last two digits</strong> point to the specific fault within the subsystem.
            </li>
          </ul>
          <p className="mt-3">
            So <span className="font-mono">P0420</span> breaks down as Powertrain (P) /
            Generic (0) / Auxiliary Emissions (4) / Catalyst System Efficiency Below Threshold
            (20). Once you know the format, the code tells you most of the story before you
            even look it up.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Freeze frame data — the crime-scene photo</h2>
          <p>
            When a code sets, the ECM also saves a snapshot of key engine parameters at that
            moment. This is called freeze frame data and it&rsquo;s the most underused feature
            of OBD-II. A fault that only appears at idle is a completely different fix from
            one that only appears at 70 mph under load, and freeze frame tells you which one
            you&rsquo;re looking at.
          </p>
          <p>
            Every compliant scanner — even the cheap ones — reads freeze frame. Pay attention
            to RPM, vehicle speed, coolant temp, intake air temp, short-term fuel trim
            (STFT), long-term fuel trim (LTFT), and throttle position. These six numbers
            narrow a lot of searches.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Readiness monitors — why your car failed inspection</h2>
          <p>
            After a code is cleared (or a new battery is installed), the ECM needs time to
            re-run its internal self-tests before it can declare everything &ldquo;ready.&rdquo;
            These are called readiness monitors. You&rsquo;ll see them listed as catalyst, O2
            sensor, EGR, evaporative system, etc., each flagged complete or incomplete.
          </p>
          <p>
            A state inspection station will fail your vehicle if too many monitors are
            incomplete — even if no check engine light is on. Most monitors run during normal
            driving over a few days; the evap monitor in particular wants a specific fuel
            level and cold start pattern. Clearing codes just before an inspection is the
            classic mistake.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The OBD-II port</h2>
          <p>
            Every OBD-II vehicle has a standardized 16-pin connector within about three feet
            of the steering wheel. It&rsquo;s usually under the dash on the driver&rsquo;s side,
            sometimes behind a flip-down panel. Scan tools plug into this port and communicate
            with the ECM over CAN (controller area network) for anything 2008 and newer, or
            one of several legacy protocols (ISO-9141, PWM, VPW) for older vehicles.
          </p>
          <p>
            Modern Bluetooth dongles like the OBDLink MX+, BlueDriver, or the FIXD tree of
            knock-offs bridge the port to your phone. That&rsquo;s usually sufficient for
            reading codes, live data, and freeze frame. Bi-directional control — the ability
            to command actuators for testing — requires a more capable tool like an Autel
            MaxiCOM or Launch X431.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What OBD-II doesn&rsquo;t cover</h2>
          <p>OBD-II was designed for emissions compliance, and that scope shapes what it can
          and can&rsquo;t tell you.</p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Diesel engines have their own OBD-II extension but share the same protocols.</li>
            <li>Hybrid battery and high-voltage systems use manufacturer-specific P3XXX codes that basic scanners often can&rsquo;t read.</li>
            <li>Airbags (SRS), ABS, transmission (in some cases), infotainment, and comfort systems require &ldquo;enhanced&rdquo; scan tools that support proprietary codes beyond the OBD-II spec.</li>
            <li>Electric vehicles have OBD-II ports but use them mostly for emissions self-reporting (zero, by definition) — detailed HV diagnostics live in manufacturer tools.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Where to go from here</h2>
          <p>
            If you know your code, look it up on{" "}
            <Link href="/obd2" className="text-brand-primary font-medium hover:underline">
              our full OBD-II index
            </Link>{" "}
            or drop it into{" "}
            <Link href="/search" className="text-brand-primary font-medium hover:underline">
              site search
            </Link>
            . Browse by range at{" "}
            <Link href="/obd2/range/p0xxx" className="text-brand-primary font-medium hover:underline">
              /obd2/range/p0xxx
            </Link>{" "}
            for generic powertrain codes, or{" "}
            <Link href="/obd2/range/p1xxx" className="text-brand-primary font-medium hover:underline">
              /obd2/range/p1xxx
            </Link>{" "}
            for manufacturer-specific.
          </p>
          <p>
            Not sure whether to fix it yourself?{" "}
            <Link href="/guides/diy-vs-mechanic" className="text-brand-primary font-medium hover:underline">
              Our DIY vs. mechanic guide
            </Link>{" "}
            walks through the decision. Never used a scan tool?{" "}
            <Link href="/guides/reading-check-engine-codes" className="text-brand-primary font-medium hover:underline">
              The step-by-step reading guide
            </Link>{" "}
            covers plugging in for the first time.
          </p>
        </section>
      </div>
    </article>
  );
}
