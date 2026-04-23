interface Props {
  category: string;
  brand?: string;
}

/**
 * Sources & disclaimer block shown at end of every code page.
 * Builds E-E-A-T signals without fabricating fake references.
 */
export default function Sources({ category, brand }: Props) {
  const isOBD = category === "obd2";

  return (
    <section aria-labelledby="sources-heading" className="mt-8 border-t border-gray-200 pt-6">
      <h2 id="sources-heading" className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
        Sources &amp; methodology
      </h2>
      <div className="mt-3 space-y-2 text-sm text-gray-600 leading-relaxed">
        <p>
          Information on this page is compiled from{" "}
          {brand ? (
            <>
              <strong className="text-gray-900">{brand}</strong> service documentation,{" "}
            </>
          ) : null}
          {isOBD ? (
            <>
              the SAE J2012 OBD-II diagnostic standard, manufacturer technical service
              bulletins, and aggregated real-world repair data from independent shops.
            </>
          ) : (
            <>
              manufacturer service manuals, technical service bulletins, and aggregated
              real-world repair data from service technicians and homeowners.
            </>
          )}{" "}
          Cost estimates reflect typical US pricing in 2026 and vary by region and shop.
        </p>
        <p className="text-xs text-gray-500 italic">
          This information is provided for educational purposes only.
          Always consult a qualified technician before attempting repairs that involve
          high voltage, natural gas, refrigerants, or safety-critical systems.
          We cannot be held responsible for damage, injury, or financial loss arising
          from following these instructions.
        </p>
      </div>
    </section>
  );
}
