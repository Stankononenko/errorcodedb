import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getCanonicalUrl, buildOgMetadata } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "DIY vs. mechanic — a framework for deciding",
  description:
    "A clear decision matrix for deciding which car, appliance, and HVAC repairs make sense to tackle yourself — and which ones are worth paying a shop to do right.",
  alternates: { canonical: getCanonicalUrl("/guides/diy-vs-mechanic") },
  ...buildOgMetadata(
    "DIY vs. mechanic — deciding framework",
    "When to fix it yourself and when to pay a pro.",
    "default",
  ),
};

export default function DiyVsMechanicPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: "DIY vs. mechanic", href: "/guides/diy-vs-mechanic" },
        ]}
      />

      <header className="mt-6 border-b border-gray-200 pb-6">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
          Decision · 8 min read
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          DIY vs. mechanic — a framework for deciding
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          A clear way to decide which repairs make financial and safety sense to tackle
          yourself, and which ones are worth paying a shop to do right.
        </p>
      </header>

      <div className="prose prose-gray max-w-none text-gray-700 mt-8 space-y-6 leading-relaxed">
        <section>
          <p>
            The internet is full of &ldquo;you can do it yourself&rdquo; videos and full of
            &ldquo;always call a professional&rdquo; warnings. The truth is neither of those
            blanket answers is right. Some repairs save hundreds of dollars and an hour of
            your time. Others are expensive traps that damage your car, appliance, or body if
            you get them wrong. The goal of this guide is to give you a framework for knowing
            which is which.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Five questions that decide it</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
            1. What&rsquo;s the safety risk if you get it wrong?
          </h3>
          <p>
            This is the first filter. Some systems will kill you — or someone else — if they
            fail after a botched repair. The short list:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Brakes and steering (direct loss of control)</li>
            <li>Airbags and SRS (uncommanded deployment can cause serious injury)</li>
            <li>High-voltage EV systems (400–800 V DC is fatal on contact)</li>
            <li>Gas appliances and gas lines (CO poisoning, explosion)</li>
            <li>Refrigerant circuits (EPA violation + 300+ PSI + frostbite)</li>
            <li>Roof-mounted structural work (falls)</li>
          </ul>
          <p className="mt-2">
            If your repair touches any of these, stop. Either pay a pro or — at minimum — do
            a ton of reading before you buy parts. The savings do not compensate for the risk.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
            2. Do you have the diagnostic capability?
          </h3>
          <p>
            Reading the code is the easy part. Diagnosing which of the 5-8 possible causes is
            actually yours is the hard part. If you can&rsquo;t measure resistance, read live
            sensor data, or perform an actuator test, you&rsquo;re guessing. Parts-cannon
            diagnosis (buying components until the code clears) gets expensive fast. On
            average, three wrong parts costs more than a shop diagnostic fee.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
            3. What specialty tools does it need?
          </h3>
          <p>
            A lot of jobs look simple on YouTube until you realize you need a $300 coolant
            pressure tester, a $200 engine hoist, or a $500 A/C manifold set you&rsquo;ll use
            once. Rental services (AutoZone, O&rsquo;Reilly loaner tool programs) cover many
            cases for free with deposit. But if the tool only makes sense for this one job,
            the shop often still wins on total cost.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
            4. How much shop time does it actually save?
          </h3>
          <p>
            The labor rate in a shop might be $130–$175 per hour. But the shop has the lift,
            the impact gun, the specialty sockets, the parts runner next door. A job flagged
            as 2.5 book hours at a shop might take you 6 hours in your driveway — even if you
            know what you&rsquo;re doing. Calculate your real hourly rate for the job and
            compare honestly.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
            5. What happens if the DIY fix doesn&rsquo;t work?
          </h3>
          <p>
            A shop that fixes the wrong thing usually makes it right (reputable shops have
            labor warranties of 12–24 months). A DIY fix that doesn&rsquo;t work means
            you&rsquo;ve spent the money and the time, and now you need the shop anyway —
            often to undo your previous attempt. Budget for this risk when you compare costs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The tiered framework</h2>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-4 my-4">
            <h3 className="font-bold text-emerald-800 mt-0">Tier 1 — strong DIY candidates</h3>
            <p className="text-sm text-gray-700 mt-2 mb-0">
              Simple consumables and bolt-on parts. Oil and filter changes, air filters, wiper
              blades, cabin filters, spark plugs (modern cars with easy access), brake pads on
              familiar calipers, battery replacement, basic appliance inlet/drain filters,
              printer paper-jam clearing, computer power supply replacement. Cost to tackle
              yourself: $10–$100 in parts plus an hour. Cost to pay a shop: $150–$400.
              Savings are real and the risk of making things worse is low.
            </p>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50/40 p-4 my-4">
            <h3 className="font-bold text-blue-800 mt-0">Tier 2 — DIY if you&rsquo;ve done similar work</h3>
            <p className="text-sm text-gray-700 mt-2 mb-0">
              Modestly complex repairs that require tools and knowledge but not specialty
              equipment. Starter or alternator replacement, thermostat, water pump on
              familiar engines, O2 sensor replacement, washing-machine drain pump, dryer
              heating element. A first-timer might take 3× longer than a tech. Repeat after
              you&rsquo;ve done one successfully and you&rsquo;ll bank the savings every time.
            </p>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-4 my-4">
            <h3 className="font-bold text-amber-800 mt-0">Tier 3 — advanced DIY only, usually shop</h3>
            <p className="text-sm text-gray-700 mt-2 mb-0">
              Jobs requiring lifts, specialty tooling, or computer interaction. Timing belts
              and chains, head gaskets, valve adjustments, transmission fluid service on
              lifetime-fill units, HVAC refrigerant recharge, dishwasher control board, oven
              thermostat calibration. The savings are real ($800–$2,500) but so is the risk
              of a botched repair costing more than the shop job. Tackle only if you have
              experience and appropriate tools.
            </p>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50/40 p-4 my-4">
            <h3 className="font-bold text-red-800 mt-0">Tier 4 — call a professional</h3>
            <p className="text-sm text-gray-700 mt-2 mb-0">
              Safety-critical, specialty-licensed, or warranty-sensitive work. HV battery
              service on any EV, any gas appliance component (not just pilots — gas valves,
              ignitors, burners), refrigerant-side HVAC work, major transmission internal
              work, airbag module replacement, anything involving ECU programming or dealer
              relearn procedures. These jobs require certifications you don&rsquo;t have,
              tools you can&rsquo;t rent, or insurance coverage you need if something goes
              sideways.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">One more factor: time of year</h2>
          <p>
            Shops have busy seasons. Winter tire swaps in November-December, A/C repairs in
            June-August, heating failures in January. If your repair lands in a shop&rsquo;s
            busy season you&rsquo;ll wait longer for an appointment, pay more for rush work,
            and get less attention to detail from an overworked tech. If your timing is
            flexible, DIY at the peak and book pros during the slow months. They&rsquo;ll
            appreciate it and quote sharper.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Final honest word</h2>
          <p>
            Every individual code page on this site includes a DIY vs. shop section tuned to
            that specific repair. Use those as the tactical layer on top of this general
            framework. When in doubt — especially when safety is in question — pay the pro.
            A $200 service call is cheaper than the ambulance.
          </p>
        </section>
      </div>
    </article>
  );
}
