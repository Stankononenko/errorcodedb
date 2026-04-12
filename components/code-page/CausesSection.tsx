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
      <h2 className="text-xl font-bold text-gray-900 mb-4">Common Causes</h2>
      <div className="space-y-3">
        {sorted.map((c, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-50 rounded-md p-3">
            <span className="text-gray-800">{c.cause}</span>
            <LikelihoodBadge likelihood={c.likelihood} />
          </div>
        ))}
      </div>
    </section>
  );
}
