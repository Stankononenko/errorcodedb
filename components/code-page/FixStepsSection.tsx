import { DifficultyBadge } from "@/components/ui/Badge";
import { Difficulty } from "@/lib/types";

interface FixStep {
  step: number;
  title: string;
  instruction: string;
  tools: string[];
  difficulty: Difficulty;
  timeMinutes?: number;
}

interface FixStepsSectionProps {
  steps: FixStep[];
  codeDisplay: string;
}

export default function FixStepsSection({ steps, codeDisplay }: FixStepsSectionProps) {
  if (steps.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        How to Fix {codeDisplay}
      </h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.step} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white text-sm font-bold">
                {step.step}
              </span>
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <DifficultyBadge difficulty={step.difficulty} />
              {step.timeMinutes && (
                <span className="text-xs text-gray-500">{step.timeMinutes} min</span>
              )}
            </div>
            <p className="text-gray-700 ml-11 leading-relaxed">{step.instruction}</p>
            {step.tools.length > 0 && (
              <div className="ml-11 mt-2">
                <span className="text-xs text-gray-500">Tools needed: </span>
                <span className="text-xs text-gray-700">{step.tools.join(", ")}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
