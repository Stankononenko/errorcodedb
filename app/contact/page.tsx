import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE_NAME} for questions, feedback, or corrections.`,
  alternates: { canonical: getCanonicalUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
        <p>
          Have a question, feedback, or found an error? We want to hear from you.
        </p>

        <h2>Report an Error</h2>
        <p>
          If you notice incorrect information on any error code page — whether it is a wrong
          description, missing cause, incorrect fix step, or outdated cost estimate — please
          let us know so we can correct it. Accuracy is our top priority.
        </p>

        <h2>Suggest a Code</h2>
        <p>
          Can&apos;t find the error code you are looking for? Let us know and we will add it to
          our database.
        </p>

        <h2>General Inquiries</h2>
        <p>
          For general questions, partnership inquiries, or advertising questions, please reach
          out to us. We aim to respond within 48 hours.
        </p>

        <h2>Get in Touch</h2>
        <p>
          Email: <strong>contact@errorcodedb.com</strong>
        </p>
      </div>
    </div>
  );
}
