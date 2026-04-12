import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}.`,
  alternates: { canonical: getCanonicalUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>
      <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
        <p>
          By accessing and using {SITE_NAME} ({SITE_URL}), you agree to be bound by these Terms
          of Service. If you do not agree to these terms, please do not use the Site.
        </p>

        <h2>Use of the Site</h2>
        <p>
          The content on {SITE_NAME} is provided for informational and educational purposes only.
          You may use the Site for personal, non-commercial purposes. You may not reproduce,
          distribute, or create derivative works from our content without prior written permission.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          The information on this Site is not a substitute for professional advice. Always consult
          a qualified mechanic, technician, or other professional before performing repairs on
          vehicles, appliances, HVAC systems, or other equipment. We are not responsible for any
          damage, injury, or loss resulting from the use of information on this Site.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          While we strive to provide accurate and up-to-date information, we make no warranties or
          representations about the completeness, accuracy, reliability, or suitability of the
          information on the Site. Error codes, repair procedures, and costs may vary by model,
          year, and region.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE_NAME} and its operators shall not be liable
          for any direct, indirect, incidental, consequential, or punitive damages arising from your
          use of or inability to use the Site, or from any information provided on the Site.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on {SITE_NAME}, including text, graphics, logos, and software, is the property
          of {SITE_NAME} or its content providers and is protected by copyright and other intellectual
          property laws.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be posted
          on this page with an updated date. Continued use of the Site constitutes acceptance of the
          modified terms.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about these Terms, please visit our{" "}
          <a href="/contact" className="text-brand-primary hover:underline">Contact</a> page.
        </p>
      </div>
    </div>
  );
}
