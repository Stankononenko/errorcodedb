import { AppliancePart } from "@/lib/types";

interface PartsNeededProps {
  parts: AppliancePart[];
}

export default function PartsNeeded({ parts }: PartsNeededProps) {
  if (parts.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Parts You May Need</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-2 font-semibold text-gray-900">Part</th>
              <th className="pb-2 font-semibold text-gray-900">Part Number</th>
              <th className="pb-2 font-semibold text-gray-900">Est. Cost</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2 text-gray-800">{part.part}</td>
                <td className="py-2 font-mono text-gray-600">{part.partNumber}</td>
                <td className="py-2 text-gray-800">
                  ${part.estimatedCost.min}–${part.estimatedCost.max}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
