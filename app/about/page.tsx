import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: `About ${SITE_NAME}`,
  description: `${SITE_NAME} is a free, comprehensive error code database covering 7,000+ codes across cars, appliances, HVAC, printers, and computers.`,
  alternates: { canonical: getCanonicalUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 sm:px-6">
      {/* Hero */}
      <header className="border-b border-gray-200 pb-8 mb-8">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
          About {SITE_NAME}
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Making every error code fixable.
        </h1>
        <p className="mt-3 text-lg text-gray-600 leading-relaxed">
          When a warning light turns on or a cryptic code flashes on a display, people shouldn&rsquo;t have
          to dig through forums and paywalls to understand what it means. {SITE_NAME} exists to be
          the clear, complete, always-free reference for every error code worth fixing.
        </p>
      </header>

      <div className="prose prose-gray max-w-none text-gray-700 space-y-6 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-3">What we cover</h2>
          <p>
            {SITE_NAME} currently indexes <strong>7,000+ error codes</strong> across five major
            categories and <strong>100+ brands</strong>. Every code page includes plain-language
            explanations, likely causes ranked by frequency, step-by-step repair instructions,
            DIY vs. professional cost estimates, and answers to the questions readers actually ask.
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>
              <strong>OBD-II Automotive</strong> — 2,000+ P/B/C/U diagnostic trouble codes covering
              every vehicle 1996 and newer, including generic SAE J2012 codes and manufacturer-specific
              codes for 40+ makes from Toyota to Ferrari.
            </li>
            <li>
              <strong>Appliances</strong> — Error codes for washers, dryers, dishwashers,
              refrigerators, ovens, microwaves, cooktops, freezers, range hoods, and more
              from Samsung, LG, Whirlpool, Bosch, Miele, GE, Frigidaire, Maytag, Electrolux,
              and dozens of other brands.
            </li>
            <li>
              <strong>HVAC</strong> — Furnace LED blink codes, air conditioner errors,
              heat pumps, mini-splits, thermostats, and water heaters from Carrier, Lennox,
              Trane, Goodman, Rheem, Daikin, Mitsubishi, Fujitsu, Navien, Rinnai, and more.
            </li>
            <li>
              <strong>Printers</strong> — HP, Canon, Epson, Brother, Xerox, Lexmark — paper jams,
              ink cartridge errors, hardware faults, connectivity issues.
            </li>
            <li>
              <strong>Windows PCs</strong> — BSOD stop codes, Windows Update errors, system
              errors, and browser/network error codes (Chrome, Edge, Firefox).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">How we build the data</h2>
          <p>
            We compile code definitions from multiple sources to ensure accuracy:
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>
              <strong>Manufacturer service documentation</strong> — Official service manuals
              and technical service bulletins are the authoritative source for appliance,
              HVAC, and printer codes.
            </li>
            <li>
              <strong>Industry standards</strong> — OBD-II codes follow the SAE J2012 standard,
              which defines the generic P0XXX, B0XXX, C0XXX, and U0XXX ranges shared across all
              vehicles. Manufacturer-specific codes (P1XXX, etc.) are documented per make.
            </li>
            <li>
              <strong>Field reports</strong> — Repair technicians and power users frequently
              encounter codes that don&rsquo;t appear in official documentation. Real-world
              frequency data informs our &ldquo;most likely cause&rdquo; rankings.
            </li>
            <li>
              <strong>Continuous review</strong> — Every code page is reviewed by the
              {SITE_NAME} editorial team for clarity, accuracy, and completeness.
            </li>
          </ul>
          <p className="mt-3">
            Cost estimates reflect typical US pricing in 2026 and will vary by region, shop,
            and complexity. We list both DIY and professional ranges so readers can make
            informed decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Who we are</h2>
          <p>
            {SITE_NAME} is an independent project built by a small editorial team based in
            Calgary, Canada. We don&rsquo;t sell parts, services, or referrals, and we don&rsquo;t
            accept payment from manufacturers to influence our content. The site is funded by
            display advertising, which lets us keep everything free and unlocked for readers.
          </p>
          <p>
            Founded in 2026 by Stanislav Kononenko.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Safety first</h2>
          <p>
            Many error codes — especially those on gas appliances, high-voltage systems,
            refrigerant circuits, and electric vehicles — involve real hazards. We mark these
            with safety warnings and clearly call out when a repair should only be attempted
            by a licensed professional. When in doubt, call a pro. A hospital visit or house
            fire costs more than any service call.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Found a mistake?</h2>
          <p>
            We&rsquo;re always improving. If you spot an incorrect cause, a step that doesn&rsquo;t
            work, or a code that needs better coverage, please{" "}
            <Link href="/contact" className="text-brand-primary font-medium hover:underline">
              let us know
            </Link>
            . Every correction makes the site better for the next person who types the
            same code into Google.
          </p>
        </section>

        <section className="border-t border-gray-200 pt-6 text-sm text-gray-600">
          <p>
            See also:{" "}
            <Link href="/disclaimer" className="text-brand-primary hover:underline">Disclaimer</Link>
            {" · "}
            <Link href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</Link>
            {" · "}
            <Link href="/terms" className="text-brand-primary hover:underline">Terms of Service</Link>
            {" · "}
            <Link href="/contact" className="text-brand-primary hover:underline">Contact</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
