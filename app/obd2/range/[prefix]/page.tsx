import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllOBDCodes } from "@/lib/data-loader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  getCanonicalUrl,
  buildOgMetadata,
} from "@/lib/seo-helpers";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ prefix: string }>;
}

interface RangeInfo {
  slug: string;
  label: string;
  description: string;
  intro: string;
  /** Match function — does the code belong to this range? */
  match: (code: string) => boolean;
}

// Each range is a pillar hub page. Copy is unique so we don't get
// duplicate-content penalties.
const RANGES: RangeInfo[] = [
  {
    slug: "p0xxx",
    label: "P0XXX Generic Powertrain",
    description:
      "Generic powertrain diagnostic trouble codes defined by the SAE J2012 standard. These codes are used by every OBD-II-compliant vehicle sold in North America since 1996 and cover fuel/air metering, ignition, auxiliary emissions, vehicle speed, computer outputs, and transmission systems.",
    intro:
      "P0XXX codes are the backbone of OBD-II diagnostics. Because they are standardized across manufacturers, any scan tool — from a $30 Bluetooth dongle to a dealer-level tablet — can read them without a make-specific enhanced module. The trade-off: the code alone only tells you the system, not the exact failed component. Narrowing to the root cause still requires freeze-frame analysis and live-data testing.",
    match: (c) => /^P0[0-9]{3}/i.test(c),
  },
  {
    slug: "p1xxx",
    label: "P1XXX Manufacturer-Specific Powertrain",
    description:
      "Manufacturer-specific powertrain codes. Every major automaker (Toyota, Honda, Ford, GM, Chrysler, VW/Audi, BMW, Mercedes, Nissan, Hyundai/Kia, Subaru, Mazda, and luxury/exotic brands) uses the P1XXX range to report faults unique to their own emissions and engine management strategies.",
    intro:
      "Because P1XXX codes are defined by the manufacturer — not SAE — the same code number can mean different things on different vehicles. A P1133 on a Toyota points to a bank-1 air/fuel sensor, while the same number on a Ford refers to an O2 sensor heater circuit. Always confirm the make and model before applying a fix. We list P1 codes with explicit manufacturer prefixes so there's no ambiguity.",
    match: (c) => /^P1[0-9A-F]{3}/i.test(c),
  },
  {
    slug: "p2xxx",
    label: "P2XXX Generic Powertrain",
    description:
      "Generic powertrain codes in the P2XXX range cover fuel/air metering and injection, auxiliary inputs, transmission, exhaust aftertreatment (catalyst, DPF, SCR, DEF), and manufacturer controlled functions.",
    intro:
      "P2XXX codes tend to show up on vehicles built from 2005 onward as emissions systems grew more complex. Diesel trucks in particular live in the P204X-P207F range (DPF pressure, SCR efficiency, DEF quality). Most P2XXX faults require specific cleaning procedures, regeneration cycles, or module resets after the underlying mechanical issue is fixed.",
    match: (c) => /^P2[0-9A-F]{3}/i.test(c),
  },
  {
    slug: "p3xxx",
    label: "P3XXX Hybrid/EV & Cylinder Deactivation",
    description:
      "P3XXX codes cover hybrid electric vehicle battery and drive systems, electric vehicle HV traction components, and cylinder deactivation systems (GM Active Fuel Management / AFM, Chrysler MDS, Honda VCM).",
    intro:
      "The P3XXX range grew dramatically with the shift to hybrid and fully electric vehicles. Faults in this range often involve high-voltage safety systems (400–800 V DC) and should only be serviced by technicians with high-voltage certification. Tesla, Rivian, Lucid, Ford F-150 Lightning, and Hyundai E-GMP platforms all set codes here.",
    match: (c) => /^P3[0-9A-F]{3}/i.test(c),
  },
  {
    slug: "bxxxx",
    label: "BXXXX Body Codes",
    description:
      "Body codes cover lighting, airbags (SRS), body control modules (BCM), power windows, seats, climate control, anti-theft, keyless entry, and infotainment. B0XXX are generic SAE codes; B1XXX-B3XXX are manufacturer-specific.",
    intro:
      "Body codes won't trigger a check-engine light — they live in the BCM and typically surface as a dash warning lamp (airbag, ABS, traction control). Diagnosis requires an enhanced scan tool that reads body-module codes, not a basic OBD-II reader. Airbag codes in particular demand extra caution: the modules contain pyrotechnic charges that can deploy unexpectedly.",
    match: (c) => /^B[0-9A-F]{4}/i.test(c),
  },
  {
    slug: "cxxxx",
    label: "CXXXX Chassis Codes",
    description:
      "Chassis codes cover ABS, electronic stability control (ESC/ESP), traction control, tire pressure monitoring (TPMS), steering angle sensors, electric power steering (EPS), adaptive cruise control, lane-keep assist, and automatic parking brakes.",
    intro:
      "Chassis codes control safety-critical systems. Never ignore them — a disabled ABS module means braking falls back to standard hydraulic, which can mask a deeper problem in wet or winter conditions. Many modern C-codes require a scan-tool-initiated calibration after sensor replacement (steering angle zero, yaw rate learn).",
    match: (c) => /^C[0-9A-F]{4}/i.test(c),
  },
  {
    slug: "uxxxx",
    label: "UXXXX Network Communication",
    description:
      "U-codes report loss of communication between control modules over the vehicle's CAN, MOST, or LIN bus. They point to wiring harness problems, module failures, or bus configuration mismatches far more often than to a failed sensor.",
    intro:
      "A single U-code often triggers cascading faults across unrelated modules, because those modules can no longer receive the data they expect. Start diagnosis at the network level — check bus voltage, termination resistors, and gateway module — before condemning individual modules. Replacing a module that couldn't phone home doesn't fix the wiring that caused the silence.",
    match: (c) => /^U[0-9A-F]{4}/i.test(c),
  },
];

export async function generateStaticParams() {
  return RANGES.map((r) => ({ prefix: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { prefix } = await params;
  const range = RANGES.find((r) => r.slug === prefix);
  if (!range) return { title: "Not Found" };

  const title = `${range.label} — All Codes with Meanings & Fixes`;
  const description = range.description;
  return {
    title,
    description,
    alternates: { canonical: getCanonicalUrl(`/obd2/range/${range.slug}`) },
    ...buildOgMetadata(title, description, "obd2"),
  };
}

export default async function OBDRangePage({ params }: PageProps) {
  const { prefix } = await params;
  const range = RANGES.find((r) => r.slug === prefix);
  if (!range) notFound();

  const allCodes = getAllOBDCodes();
  const codes = allCodes.filter((c) => range.match(c.code));

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "OBD-II Codes", url: `${SITE_URL}/obd2` },
    { name: range.label, url: `${SITE_URL}/obd2/range/${range.slug}` },
  ]);

  // Group by first 3 characters for navigation within the range
  const buckets: Record<string, typeof codes> = {};
  for (const c of codes) {
    const bucket = c.code.substring(0, 3).toUpperCase();
    if (!buckets[bucket]) buckets[bucket] = [];
    buckets[bucket].push(c);
  }
  const bucketKeys = Object.keys(buckets).sort();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "OBD-II Codes", href: "/obd2" },
            { label: range.label, href: `/obd2/range/${range.slug}` },
          ]}
        />

        <header className="mt-6 border-b border-gray-200 pb-6">
          <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
            {codes.length.toLocaleString()} codes
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {range.label}
          </h1>
          <p className="mt-3 text-lg text-gray-600 leading-relaxed">
            {range.description}
          </p>
        </header>

        <section className="mt-6 prose prose-gray max-w-none text-gray-700">
          <p className="text-base leading-relaxed">{range.intro}</p>
        </section>

        {/* Quick jump by bucket */}
        {bucketKeys.length > 1 && (
          <nav aria-label="Jump to bucket" className="mt-6 flex flex-wrap gap-1.5">
            {bucketKeys.map((k) => (
              <a
                key={k}
                href={`#bucket-${k}`}
                className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-mono font-medium text-gray-700 hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                {k}XX
              </a>
            ))}
          </nav>
        )}

        <div className="mt-8 space-y-8">
          {bucketKeys.map((bucket) => (
            <section key={bucket} id={`bucket-${bucket}`} className="scroll-mt-20">
              <h2 className="text-lg font-bold text-gray-900 mb-3 font-mono">
                {bucket}XX
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {buckets[bucket]
                  .sort((a, b) => a.code.localeCompare(b.code))
                  .map((code) => (
                    <li key={code.code}>
                      <Link
                        href={`/obd2/${code.code.toLowerCase()}`}
                        className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:border-brand-primary hover:bg-blue-50 transition-colors"
                      >
                        <span className="font-mono font-semibold text-brand-primary shrink-0 text-sm">
                          {code.code}
                        </span>
                        <span className="text-sm text-gray-700 truncate">
                          {code.title}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Not seeing the code you&rsquo;re looking for?
          </h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            Try the{" "}
            <Link href="/search" className="font-medium text-brand-primary hover:underline">
              full-database search
            </Link>
            {" "}— it indexes all 7,000+ codes across OBD-II, appliances, HVAC, printers, and
            Windows. If a code should be here but isn&rsquo;t yet, please{" "}
            <Link href="/contact" className="font-medium text-brand-primary hover:underline">
              let us know
            </Link>
            {" "}and we&rsquo;ll add it.
          </p>
        </section>
      </div>
    </>
  );
}
