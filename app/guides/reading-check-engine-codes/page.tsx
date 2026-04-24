import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl, buildOgMetadata } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "How to read a check-engine code without a dealer visit",
  description:
    "Step-by-step: buy or borrow a scanner, plug into the OBD port, pull codes, read freeze frame, and clear safely. Works on every car 1996 and newer.",
  alternates: { canonical: getCanonicalUrl("/guides/reading-check-engine-codes") },
  ...buildOgMetadata(
    "How to read OBD-II codes",
    "Plug in, pull codes, read freeze frame — step by step.",
    "obd2",
  ),
};

export default function ReadingCodesGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "How to read codes", href: "/guides/reading-check-engine-codes" },
        ]}
      />

      <header className="mt-6 border-b border-gray-200 pb-6">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
          How-to · 12 min read
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          How to read a check-engine code without a dealer visit
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Step-by-step: get a scanner, plug into the OBD port, pull codes, read freeze frame,
          interpret the result, and clear safely. Works on every car 1996 and newer.
        </p>
      </header>

      <div className="prose prose-gray max-w-none text-gray-700 mt-8 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-3">Step 1 — Get access to a scanner</h2>
          <p>You have three options, in rough cost order:</p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>
              <strong>Free:</strong> AutoZone, O&rsquo;Reilly, and Advance Auto Parts all offer
              free code scans in the US. You drive to the store, an associate plugs in their
              handheld, and you walk out with a printed code and a basic definition. The
              catch: they also try to sell you the part they think fixes it, which is often
              wrong.
            </li>
            <li>
              <strong>$30–$80 one-time purchase:</strong> A Bluetooth dongle like OBDLink LX
              (~$60) paired with the free OBDLink app, or a standalone handheld like the
              ANCEL AD410 (~$40), gives you unlimited scans for years. For most DIYers this
              is the right pick.
            </li>
            <li>
              <strong>$110–$150:</strong> BlueDriver is the consumer gold standard — cloud-
              backed repair reports, enhanced codes for major brands, clean app. This is what
              we&rsquo;d recommend if you want one tool to keep in the glovebox.
            </li>
          </ul>
          <p>
            If the car has a manufacturer-specific code (P1XXX), cheap generic scanners
            sometimes won&rsquo;t show the full definition. BlueDriver and most handhelds
            ANCEL, Foxwell, Autel handle this correctly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 2 — Find the port</h2>
          <p>
            The OBD-II Data Link Connector (DLC) is a standardized 16-pin trapezoidal socket.
            It is always within three feet of the steering wheel, usually under the dash on
            the driver side. Look for:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Driver-side under-dash (most common)</li>
            <li>Behind a small flip-down panel just below the steering column</li>
            <li>Inside the center console or armrest (European cars)</li>
            <li>Behind the ashtray (older Volkswagens)</li>
          </ul>
          <p>
            If you can&rsquo;t find it, Google &ldquo;OBD port location [year make model].&rdquo;
            Every car has one — the port is mandatory.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 3 — Plug in and connect</h2>
          <p>
            Turn the key to &ldquo;on&rdquo; but don&rsquo;t start the engine (Key-On-Engine-Off,
            or KOEO). Plug the scanner into the port. If it&rsquo;s a Bluetooth dongle,
            pair with your phone from the scanner app — not from Settings &gt; Bluetooth.
            Most dongles require a PIN the first time: try 1234 or 0000.
          </p>
          <p>
            Start the engine if the scanner asks you to. Some live-data PIDs only stream with
            the engine running. Reading codes and freeze frame works in KOEO.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 4 — Pull the codes</h2>
          <p>
            In your scanner app or handheld, find &ldquo;Read Codes&rdquo; or &ldquo;Trouble
            Codes.&rdquo; It will return one of four categories:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            <li>
              <strong>Stored (confirmed) codes</strong> — the real ones that triggered the MIL.
              These are your action list.
            </li>
            <li>
              <strong>Pending codes</strong> — the ECM has seen something anomalous but hasn&rsquo;t
              seen it enough times to promote it to stored. Worth noting but not urgent.
            </li>
            <li>
              <strong>Permanent codes</strong> — stored codes that must self-clear via a drive
              cycle after the fix. You can&rsquo;t clear these manually — they prevent people
              from just clearing codes before an emissions inspection.
            </li>
            <li>
              <strong>History codes</strong> — codes that were active before and have since
              self-cleared. Informational.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 5 — Read freeze frame</h2>
          <p>
            For each stored code, dig into the freeze frame data. You&rsquo;ll see engine
            RPM, vehicle speed, coolant temp, intake air temp, MAP or MAF reading, throttle
            position, short-term and long-term fuel trim, and O2 sensor voltage at the moment
            the code set. These numbers are gold for diagnosis — a P0420 with freeze frame
            at 2,200 RPM and 45 mph suggests cruise conditions, which points at the cat; a
            P0420 at idle points somewhere else entirely.
          </p>
          <p>
            Write the freeze-frame numbers down or screenshot the app. You&rsquo;ll need them
            in the next step.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 6 — Look up the code</h2>
          <p>
            Take your code — say <span className="font-mono">P0420</span> — and search it on{" "}
            <Link href="/" className="text-brand-primary font-medium hover:underline">
              ErrorCodeDB
            </Link>
            . Every page has a Quick Answer up top, a ranked causes list, a step-by-step fix
            sequence, cost estimates for DIY vs. shop, and most importantly a{" "}
            <em>common misdiagnoses</em> section that tells you which parts people throw
            money at that usually aren&rsquo;t the problem.
          </p>
          <p>
            Read the whole page before buying a single part. Most DIY repair failures are
            &ldquo;I saw it was the cat, so I replaced the cat&rdquo; — without checking the
            O2 sensors, exhaust leaks, or fuel trim first.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 7 — Fix the problem</h2>
          <p>
            Follow the fix-step sequence in order. Don&rsquo;t skip to step 5 because it
            looks easier — the steps are ordered from cheapest/most-likely to most-expensive/
            last-resort. Each completed step narrows the search.
          </p>
          <p>
            Take photos before disassembly. A phone shot of the wiring or hose routing before
            you tear it apart saves 20 minutes of &ldquo;where does this go?&rdquo; at
            reassembly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 8 — Clear and drive</h2>
          <p>
            After the repair, clear the code using your scanner&rsquo;s &ldquo;Erase&rdquo;
            or &ldquo;Clear Codes&rdquo; function. This also erases freeze frame and resets
            readiness monitors.
          </p>
          <p>
            Important caveat: clearing codes resets readiness monitors to &ldquo;not
            ready.&rdquo; If you have an emissions inspection due in the next week, don&rsquo;t
            clear — wait until after the inspection if the fix is done. Monitors need 50–300
            miles of varied driving to self-complete.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 9 — Verify the fix</h2>
          <p>
            Drive normally for a few days. Check codes again — if the same code returns, your
            fix didn&rsquo;t work (or wasn&rsquo;t the root cause). If no code returns and
            readiness monitors complete, you&rsquo;re done.
          </p>
          <p>
            If a different code appears, it&rsquo;s sometimes a related downstream issue
            (fixing one code reveals another that was masked). Look those up individually and
            don&rsquo;t assume your fix broke something new.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">When to stop and call a pro</h2>
          <p>If any of the following happen, stop and get help:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>The same code returns after your best fix attempt</li>
            <li>The code involves a system listed in our{" "}
              <Link href="/guides/diy-vs-mechanic" className="text-brand-primary font-medium hover:underline">
                Tier 4 call-a-pro list
              </Link></li>
            <li>You can&rsquo;t interpret the live data or freeze frame</li>
            <li>The car is unsafe to drive (stalling, smoke, no brakes, no steering)</li>
          </ul>
          <p>
            Paying a shop after a failed DIY attempt isn&rsquo;t a loss — you&rsquo;ve already
            narrowed what it isn&rsquo;t, and a good tech will credit you for that in the
            diagnostic time.
          </p>
        </section>
      </div>
    </article>
  );
}
