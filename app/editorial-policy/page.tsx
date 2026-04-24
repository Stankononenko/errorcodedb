import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: `How ${SITE_NAME} compiles, verifies, and updates error code information. Our methodology, sourcing standards, and correction process.`,
  alternates: { canonical: getCanonicalUrl("/editorial-policy") },
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 sm:px-6">
      <header className="border-b border-gray-200 pb-6 mb-8">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
          Editorial Policy
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          How we build the {SITE_NAME} database
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Transparency about sources, review, and how we handle mistakes.
        </p>
      </header>

      <div className="prose prose-gray max-w-none text-gray-700 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-3">Who writes this</h2>
          <p>
            {SITE_NAME} is compiled and maintained by the {SITE_NAME} editorial team — a small
            group of technical writers and researchers based in Calgary, Canada. We do not employ
            certified mechanics, HVAC contractors, or sleep technicians directly. We are editors,
            not practitioners, and we&rsquo;re transparent about that.
          </p>
          <p>
            What makes us useful is the aggregation: we read the documentation most people
            don&rsquo;t have access to (service manuals, technical service bulletins, OEM training
            material), combine it with real-world repair reports from public forums and shop
            records, and translate all of it into a consistent format with honest cost and
            difficulty estimates.
          </p>
          <p>
            Where we have a subject-matter reviewer on retainer, that reviewer&rsquo;s name and
            credential appears on their specific pages. Where we don&rsquo;t, the page is
            attributed to the editorial team. We do not invent author personas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Where the data comes from</h2>
          <p>Every code entry draws from a mix of the following, in rough order of priority:</p>
          <ol className="mt-3 list-decimal pl-5 space-y-2">
            <li>
              <strong>Manufacturer service documentation</strong> — service manuals, technical
              service bulletins (TSBs), and OEM training materials are the authoritative source
              for appliance, HVAC, printer, and vehicle-specific codes.
            </li>
            <li>
              <strong>Industry standards</strong> — OBD-II generic codes (P0XXX, B0XXX, C0XXX,
              U0XXX) follow the SAE J2012 standard. We reference the current published edition.
            </li>
            <li>
              <strong>Aggregated repair reports</strong> — independent shop records and
              technician forum threads inform our &ldquo;most likely cause&rdquo; rankings, since
              real-world frequency often differs from the theoretical cause list in the manual.
            </li>
            <li>
              <strong>Regional pricing data</strong> — repair cost estimates reflect mid-2020s US
              and Canadian shop rates, sampled from public pricing pages and quote surveys.
              International readers should treat dollar figures as directional.
            </li>
          </ol>
          <p className="mt-4">
            We do <strong>not</strong> scrape or republish other websites&rsquo; content. Every
            page is an original compilation. When a code has multiple competing explanations in
            source material, we note the disagreement rather than pick one silently.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Review process</h2>
          <p>Before a code page goes live:</p>
          <ol className="mt-3 list-decimal pl-5 space-y-2">
            <li>A draft is generated from our source library, cross-referenced across at least two independent references where possible.</li>
            <li>The editorial team checks the draft for factual accuracy, voice consistency, and completeness (all required sections filled: causes, fix steps, cost, FAQ, safety).</li>
            <li>Safety-critical content (high-voltage EV, gas appliances, refrigerants, airbags) receives an additional safety-banner review. We err aggressively toward recommending a professional when there&rsquo;s any doubt.</li>
            <li>The page is published with the current date as its &ldquo;last reviewed&rdquo; timestamp.</li>
          </ol>
          <p className="mt-4">
            Pages are flagged for re-review every 12 months, or sooner when we receive a
            correction, a TSB is issued, or a manufacturer updates a service procedure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">AI disclosure</h2>
          <p>
            We use large language models as tools in the drafting and compilation process. We do
            not publish unreviewed AI output. Every sentence on the site has been read and
            edited by a human before publication. We treat AI-generated drafts the same way a
            newsroom treats a stringer&rsquo;s notes: a useful starting point that still needs
            editorial judgement before it&rsquo;s fit to print.
          </p>
          <p>
            Where an AI model hallucinates a part number, a repair step, or a cost — and that
            slips past review — it is an editorial failure we own. Please{" "}
            <Link href="/corrections" className="text-brand-primary font-medium hover:underline">
              report it
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Correction policy</h2>
          <p>
            When we make a mistake, we fix it and log it publicly on our{" "}
            <Link href="/corrections" className="text-brand-primary font-medium hover:underline">
              corrections page
            </Link>
            . We don&rsquo;t silently edit and pretend nothing happened. A visible correction log
            is a stronger trust signal than a clean-looking site that quietly rewrites history.
          </p>
          <p>
            If you spot an error, email{" "}
            <a href="mailto:contact@errorcodedb.com" className="text-brand-primary font-medium hover:underline">
              contact@errorcodedb.com
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="text-brand-primary font-medium hover:underline">
              contact form
            </Link>
            . Include the page URL and, if possible, a link or reference for the correct
            information. We aim to acknowledge within 48 hours and publish a fix within a week.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Independence &amp; funding</h2>
          <p>
            {SITE_NAME} is an independent project. We do not sell parts, repair services, or
            referrals. We do not accept payment from manufacturers, aftermarket part brands, or
            repair shops to modify our content. We do not run sponsored content or native
            advertising.
          </p>
          <p>
            The site is funded by Google AdSense display advertising. Ad content is served by
            Google&rsquo;s ad network and does not reflect an endorsement from us. If you see an
            ad that seems off-topic or misleading, you can{" "}
            <Link href="/contact" className="text-brand-primary font-medium hover:underline">
              report it
            </Link>{" "}
            — we can block specific advertisers from our inventory.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Safety stance</h2>
          <p>
            Many error codes — especially those on gas appliances, high-voltage systems,
            refrigerant circuits, and electric vehicles — involve real hazards. On every page
            covering such systems we mark the safety warnings prominently and clearly call out
            when a repair should only be attempted by a licensed professional.
          </p>
          <p>
            <strong>When in doubt, call a pro.</strong> A hospital visit or a house fire costs
            more than any service call. We would rather lose a page view than contribute to an
            injury.
          </p>
        </section>

        <section className="border-t border-gray-200 pt-6 text-sm text-gray-600">
          <p>
            See also:{" "}
            <Link href="/about" className="text-brand-primary hover:underline">About</Link>
            {" · "}
            <Link href="/corrections" className="text-brand-primary hover:underline">Corrections</Link>
            {" · "}
            <Link href="/disclaimer" className="text-brand-primary hover:underline">Disclaimer</Link>
            {" · "}
            <Link href="/contact" className="text-brand-primary hover:underline">Contact</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
