import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: `About ${SITE_NAME}`,
  description: `${SITE_NAME} is a comprehensive error code database providing meanings, causes, and step-by-step repair guides.`,
  alternates: { canonical: getCanonicalUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About {SITE_NAME}</h1>
      <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
        <p>
          {SITE_NAME} is a free, comprehensive error code reference designed to help everyday
          people understand and fix the devices they rely on. From cars to washing machines,
          furnaces to printers, we cover thousands of error codes across all major brands and
          device categories.
        </p>
        <h2>Our Mission</h2>
        <p>
          When an error code appears on your device, you deserve clear, actionable information —
          not forum posts full of guesswork. Our mission is to be the most complete, accurate,
          and useful error code reference on the internet. Every code page tells you exactly what
          the code means, what likely caused it, how to fix it step by step, and when you should
          call a professional instead.
        </p>
        <h2>What We Cover</h2>
        <ul>
          <li><strong>OBD-II Automotive Codes</strong> — All P, B, C, and U diagnostic trouble codes for vehicles 1996 and newer</li>
          <li><strong>Appliance Error Codes</strong> — Samsung, LG, Whirlpool, Bosch, GE, and more across washers, dryers, dishwashers, refrigerators, and other home appliances</li>
          <li><strong>HVAC Error Codes</strong> — Furnace LED blink codes, air conditioner errors, heat pump codes, mini-split systems, and thermostat errors</li>
          <li><strong>Printer Error Codes</strong> — HP, Canon, Epson, Brother, and Xerox printer and scanner errors</li>
          <li><strong>Windows/Computer Errors</strong> — Blue Screen of Death (BSOD) codes, Windows Update errors, and system errors</li>
        </ul>
        <h2>Data Quality</h2>
        <p>
          Every error code in our database includes a minimum of three common causes ranked by
          likelihood, step-by-step fix instructions with difficulty ratings and required tools,
          estimated repair costs for both DIY and professional repair, and frequently asked
          questions with detailed answers.
        </p>
        <h2>Disclaimer</h2>
        <p>
          The information on {SITE_NAME} is provided for educational and informational purposes
          only. Always consult a qualified professional before performing repairs, especially
          those involving gas appliances, electrical systems, or vehicle safety components.
          See our full <a href="/disclaimer" className="text-brand-primary hover:underline">Disclaimer</a> for more details.
        </p>
      </div>
    </div>
  );
}
