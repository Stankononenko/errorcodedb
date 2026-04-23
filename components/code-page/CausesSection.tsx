import { LikelihoodBadge } from "@/components/ui/Badge";
import { Likelihood } from "@/lib/types";

interface Cause {
  cause: string;
  likelihood: Likelihood;
}

interface CausesSectionProps {
  causes: Cause[];
}

export default function CausesSection({ causes }: CausesSectionProps) {
  if (causes.length === 0) return null;

  const sorted = [...causes].sort((a, b) => {
    const order: Record<Likelihood, number> = { high: 0, medium: 1, low: 2 };
    return order[a.likelihood] - order[b.likelihood];
  });

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Common causes</h2>
      <p className="text-sm text-gray-600 mb-4">
        Ranked by how often each cause shows up in real-world reports. Start with the
        high-likelihood items first.
      </p>
      <ol className="space-y-2">
        {sorted.map((c, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:p-4"
          >
            <span className="shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 text-xs font-bold text-gray-700">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 leading-snug">{c.cause}</p>
            </div>
            <LikelihoodBadge likelihood={c.likelihood} />
          </li>
        ))}
      </ol>
    </section>
  );
}
