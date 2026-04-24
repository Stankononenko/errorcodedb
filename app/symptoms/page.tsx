import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl, buildOgMetadata } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Diagnose by symptom — no code needed",
  description: `Find the likely error code when you only know the symptom. Car won't start, washer won't drain, furnace won't ignite, PC blue screens — ${SITE_NAME} symptom finder.`,
  alternates: { canonical: getCanonicalUrl("/symptoms") },
  ...buildOgMetadata(
    "Diagnose by symptom",
    "Start with what's broken, not with a code.",
    "default",
  ),
};

interface SymptomGroup {
  label: string;
  href: string;
  category: string;
  description: string;
}

const SYMPTOMS: SymptomGroup[] = [
  // Automotive
  {
    label: "Check engine light is on",
    href: "/symptoms/check-engine-light",
    category: "Automotive",
    description: "MIL / service engine soon lamp on the dashboard",
  },
  {
    label: "Car won't start",
    href: "/symptoms/car-wont-start",
    category: "Automotive",
    description: "No crank, crank but no start, intermittent start",
  },
  {
    label: "Car stalls / hesitates",
    href: "/symptoms/car-stalls",
    category: "Automotive",
    description: "Idle dies, hesitation under load, surging",
  },
  {
    label: "Car is misfiring",
    href: "/symptoms/car-misfiring",
    category: "Automotive",
    description: "Rough idle, shaking, P03XX codes",
  },
  {
    label: "Transmission shifts rough",
    href: "/symptoms/transmission-rough-shift",
    category: "Automotive",
    description: "Hard/slipping shifts, stuck in gear, slamming",
  },

  // Appliance
  {
    label: "Washer won't drain",
    href: "/symptoms/washer-wont-drain",
    category: "Appliance",
    description: "Water left in drum, drain pump issues",
  },
  {
    label: "Washer won't spin",
    href: "/symptoms/washer-wont-spin",
    category: "Appliance",
    description: "No spin cycle, clothes still wet",
  },
  {
    label: "Dryer not heating",
    href: "/symptoms/dryer-not-heating",
    category: "Appliance",
    description: "Runs but clothes stay damp, no hot air",
  },
  {
    label: "Dishwasher not draining",
    href: "/symptoms/dishwasher-not-draining",
    category: "Appliance",
    description: "Standing water, clog, drain pump faults",
  },
  {
    label: "Fridge not cooling",
    href: "/symptoms/fridge-not-cooling",
    category: "Appliance",
    description: "Warm fridge, freezer warm, compressor issues",
  },

  // HVAC
  {
    label: "Furnace won't ignite",
    href: "/symptoms/furnace-wont-ignite",
    category: "HVAC",
    description: "No heat, pilot won't stay lit, ignitor fault",
  },
  {
    label: "AC not cooling",
    href: "/symptoms/ac-not-cooling",
    category: "HVAC",
    description: "AC runs but no cool air, frozen coil",
  },

  // Windows
  {
    label: "PC won't boot / BSOD",
    href: "/symptoms/pc-wont-boot",
    category: "Windows",
    description: "Blue screen, boot loop, stuck at startup",
  },
  {
    label: "Windows Update fails",
    href: "/symptoms/windows-update-fails",
    category: "Windows",
    description: "Update stuck, rollback, error codes",
  },

  // Printer
  {
    label: "Printer paper jam",
    href: "/symptoms/printer-paper-jam",
    category: "Printer",
    description: "Recurring jams, phantom jams, feed issues",
  },
  {
    label: "Printer won't print",
    href: "/symptoms/printer-wont-print",
    category: "Printer",
    description: "Offline, queue stuck, communication errors",
  },
];

const CATEGORIES = ["Automotive", "Appliance", "HVAC", "Windows", "Printer"] as const;

export default function SymptomsIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Diagnose by symptom", href: "/symptoms" }]} />

      <header className="mt-6 border-b border-gray-200 pb-6">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
          Symptom finder
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Don&rsquo;t know the code? Start with the symptom.
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Pick what&rsquo;s happening and we&rsquo;ll show the error codes most likely behind it,
          with fix guides for each.
        </p>
      </header>

      <div className="mt-8 space-y-8">
        {CATEGORIES.map((cat) => {
          const items = SYMPTOMS.filter((s) => s.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{cat}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="block rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-brand-primary hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-semibold text-gray-900">{s.label}</div>
                      <div className="mt-0.5 text-xs text-gray-600">{s.description}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
