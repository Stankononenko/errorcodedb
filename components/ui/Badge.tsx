import { SEVERITY_CONFIG, DIFFICULTY_CONFIG } from "@/lib/constants";
import { Severity, Difficulty, Likelihood } from "@/lib/types";

export function SeverityBadge({ severity }: { severity: Severity }) {
  const config = SEVERITY_CONFIG[severity];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}>
      {config.label} Severity
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const config = DIFFICULTY_CONFIG[difficulty];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}>
      {config.label}
    </span>
  );
}

export function LikelihoodBadge({ likelihood }: { likelihood: Likelihood }) {
  const colors: Record<Likelihood, string> = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[likelihood]}`}>
      {likelihood}
    </span>
  );
}
