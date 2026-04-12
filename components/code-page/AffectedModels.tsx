interface AffectedModelsProps {
  models?: string[];
  series?: string[];
  versions?: string[];
}

export default function AffectedModels({ models, series, versions }: AffectedModelsProps) {
  const items = models || series || versions;
  if (!items || items.length === 0) return null;

  const label = models ? "Affected Models" : series ? "Affected Printer Series" : "Affected Windows Versions";

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{label}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded bg-gray-100 px-2.5 py-1 text-sm font-mono text-gray-700"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
