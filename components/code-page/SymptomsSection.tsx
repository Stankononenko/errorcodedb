interface SymptomsSectionProps {
  symptoms: string[];
}

export default function SymptomsSection({ symptoms }: SymptomsSectionProps) {
  if (symptoms.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Symptoms you may notice</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {symptoms.map((symptom, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 rounded-lg bg-blue-50/60 border border-blue-100 px-3 py-2.5 text-sm text-gray-800"
          >
            <svg
              className="h-4 w-4 text-brand-accent mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="leading-snug">{symptom}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
