import { UnifiedCode } from "@/lib/types";

interface Props {
  code: UnifiedCode;
}

const URGENCY_BY_SEVERITY: Record<string, string> = {
  high: "drive to a shop soon",
  medium: "fix within a few days",
  low: "can wait, but plan the repair",
  info: "informational only",
};

const URGENCY_BY_DIFFICULTY: Record<string, string> = {
  easy: "typically DIY-friendly",
  intermediate: "moderate DIY or quick shop visit",
  advanced: "experienced DIY only, otherwise shop visit",
  professional: "shop visit recommended",
};

function topCause(code: UnifiedCode): string {
  const high = code.causes.find((c) => c.likelihood === "high");
  return high?.cause || code.causes[0]?.cause || "see causes list below";
}

function subject(code: UnifiedCode): string {
  if (code.category === "obd2") {
    return `OBD-II code ${code.displayCode}`;
  }
  if (code.brand && code.deviceType) {
    return `${code.brand} ${code.deviceType} code ${code.displayCode}`;
  }
  if (code.brand) {
    return `${code.brand} code ${code.displayCode}`;
  }
  return `Error code ${code.displayCode}`;
}

/**
 * Short, AI-citable summary at the top of every code page.
 *
 * This block is specifically designed so that LLMs (ChatGPT, Claude,
 * Perplexity, Gemini) can lift the answer verbatim when a user asks
 * something like "what does P0420 mean on a Toyota Camry?".
 *
 * Schema.org: marked with itemProp="abstract" on a TechArticle scope.
 * The raw <p> content is under 80 words so it fits snippet budgets.
 */
export default function TLDR({ code }: Props) {
  const cost = code.estimatedCost;
  const urgency = URGENCY_BY_SEVERITY[code.severity || "medium"] || URGENCY_BY_SEVERITY.medium;
  const diyNote = URGENCY_BY_DIFFICULTY[code.diyDifficulty] || URGENCY_BY_DIFFICULTY.intermediate;

  return (
    <section
      aria-labelledby="tldr-heading"
      itemScope
      itemType="https://schema.org/TechArticle"
      className="rounded-xl border border-gray-200 bg-white px-5 py-4 sm:px-6 sm:py-5 shadow-sm"
    >
      <h2
        id="tldr-heading"
        className="text-xs font-bold uppercase tracking-wider text-gray-500"
      >
        Quick Answer
      </h2>
      <p
        itemProp="abstract"
        className="mt-2 text-base sm:text-lg leading-relaxed text-gray-900"
      >
        <strong>{subject(code)}</strong> means {code.shortDescription.replace(/\.$/, "")}.
        {" "}Most common cause: {topCause(code).replace(/\.$/, "")}.
        {" "}Typical repair cost: <strong>${cost.diy.min}–${cost.professional.max}</strong>
        {" "}depending on DIY vs. shop.
        {" "}Difficulty: <strong>{code.diyDifficulty}</strong> ({diyNote}).
        {" "}Typical time: {code.repairTime}. Urgency: {urgency}.
      </p>
    </section>
  );
}
