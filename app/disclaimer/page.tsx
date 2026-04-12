import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${SITE_NAME}. Important information about the use of error code repair guides.`,
  alternates: { canonical: getCanonicalUrl("/disclaimer") },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
      <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
        <p>
          The information provided on {SITE_NAME} is for general informational and educational
          purposes only. It is not intended as a substitute for professional advice, diagnosis,
          or repair services.
        </p>

        <h2>No Warranty</h2>
        <p>
          The error code descriptions, causes, symptoms, repair steps, cost estimates, and other
          information on this Site are provided &quot;as is&quot; without any warranty of any kind,
          express or implied. We do not warrant that the information is accurate, complete, reliable,
          current, or error-free.
        </p>

        <h2>Professional Advice</h2>
        <p>
          Always consult a qualified professional before attempting repairs on vehicles, appliances,
          HVAC systems, electrical systems, gas appliances, or any other equipment. Improper repairs
          can result in personal injury, property damage, fire, or death.
        </p>

        <h2>Assumption of Risk</h2>
        <p>
          By using the information on this Site, you acknowledge and agree that you assume all risks
          associated with performing any repairs or maintenance. You are solely responsible for
          determining whether a repair is within your skill level and for taking appropriate safety
          precautions.
        </p>

        <h2>Cost Estimates</h2>
        <p>
          Repair cost estimates provided on this Site are approximations based on general market data.
          Actual costs may vary significantly based on your location, the specific model of your
          device, parts availability, labor rates, and other factors.
        </p>

        <h2>Trademarks</h2>
        <p>
          All brand names, product names, and trademarks mentioned on this Site are the property of
          their respective owners. {SITE_NAME} is not affiliated with, endorsed by, or sponsored by
          any of the brands or manufacturers mentioned on the Site.
        </p>

        <h2>External Links</h2>
        <p>
          This Site may contain links to external websites. We are not responsible for the content,
          accuracy, or practices of any linked sites.
        </p>
      </div>
    </div>
  );
}
