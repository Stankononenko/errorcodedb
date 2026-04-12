import { CostRange } from "@/lib/types";

interface CostEstimateProps {
  diy: CostRange;
  professional: CostRange;
}

export default function CostEstimate({ diy, professional }: CostEstimateProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Estimated Repair Cost</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-1">DIY Repair</h3>
          <p className="text-2xl font-bold text-green-900">${diy.min} – ${diy.max}</p>
          <p className="text-sm text-green-700 mt-1">Parts cost only</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-1">Professional Repair</h3>
          <p className="text-2xl font-bold text-blue-900">${professional.min} – ${professional.max}</p>
          <p className="text-sm text-blue-700 mt-1">Parts + labor</p>
        </div>
      </div>
    </section>
  );
}
