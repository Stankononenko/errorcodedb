"use client";

import { useState } from "react";
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
  // Track which steps the user has checked off (localStorage per code)
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  if (steps.length === 0) return null;

  const totalMinutes = steps.reduce((acc, s) => acc + (s.timeMinutes || 0), 0);

  function toggle(step: number) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  }

  const progress = Math.round((completed.size / steps.length) * 100);

  return (
    <section id="fix-steps" className="scroll-mt-20">
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            How to Fix <span className="font-mono text-brand-primary">{codeDisplay}</span>
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {steps.length} step{steps.length === 1 ? "" : "s"}
            {totalMinutes > 0 ? ` · ~${totalMinutes} min total` : ""}
          </p>
        </div>
        {completed.size > 0 && (
          <button
            type="button"
            onClick={() => setCompleted(new Set())}
            className="shrink-0 text-xs font-medium text-gray-500 hover:text-gray-900"
          >
            Reset
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>
            {completed.size} of {steps.length} completed
          </span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-brand-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ol className="space-y-3">
        {steps.map((step) => {
          const isDone = completed.has(step.step);
          return (
            <li
              key={step.step}
              className={`rounded-lg border transition-colors ${
                isDone
                  ? "border-emerald-200 bg-emerald-50/40"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggle(step.step)}
                    aria-label={isDone ? `Mark step ${step.step} incomplete` : `Mark step ${step.step} complete`}
                    className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : "bg-brand-primary text-white hover:bg-brand-secondary"
                    }`}
                  >
                    {isDone ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.step
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`font-semibold text-gray-900 leading-tight ${
                          isDone ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {step.title}
                      </h3>
                      <DifficultyBadge difficulty={step.difficulty} />
                      {step.timeMinutes && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {step.timeMinutes} min
                        </span>
                      )}
                    </div>

                    <p className={`mt-2 text-gray-700 leading-relaxed ${isDone ? "opacity-60" : ""}`}>
                      {step.instruction}
                    </p>

                    {step.tools.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-medium text-gray-500">Tools:</span>
                        {step.tools.map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
