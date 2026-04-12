interface SymptomsSectionProps {
  symptoms: string[];
}

export default function SymptomsSection({ symptoms }: SymptomsSectionProps) {
  if (symptoms.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Symptoms</h2>
      <ul className="space-y-2">
        {symptoms.map((symptom, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-700">
            <span className="text-brand-accent mt-0.5" aria-hidden="true">&#10003;</span>
            {symptom}
          </li>
        ))}
      </ul>
    </section>
  );
}
