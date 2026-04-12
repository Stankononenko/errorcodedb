interface AdUnitProps {
  position: "leaderboard" | "in-content-1" | "in-content-2" | "sidebar";
  className?: string;
}

const AD_SIZES: Record<AdUnitProps["position"], string> = {
  leaderboard: "h-[90px]",
  "in-content-1": "h-[250px]",
  "in-content-2": "h-[250px]",
  sidebar: "h-[250px] w-[300px]",
};

export default function AdUnit({ position, className = "" }: AdUnitProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

  if (isEnabled) {
    // Real AdSense will go here once approved
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded text-xs text-gray-400 ${AD_SIZES[position]} ${className}`}
      aria-hidden="true"
    >
      Ad Placeholder [{position}]
    </div>
  );
}
