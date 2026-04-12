import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getCanonicalUrl } from "@/lib/seo-helpers";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your information.`,
  alternates: { canonical: getCanonicalUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>
      <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
        <p>
          This Privacy Policy describes how {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and
          shares information when you visit {SITE_URL} (the &quot;Site&quot;).
        </p>

        <h2>Information We Collect</h2>
        <p>
          We do not collect personal information unless you voluntarily provide it (for example,
          by contacting us via email). We may collect non-personal information automatically,
          including your IP address, browser type, operating system, referring URLs, and pages
          viewed on the Site.
        </p>

        <h2>Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies to analyze site traffic and usage patterns.
          Third-party services, including Google Analytics and Google AdSense, may use cookies
          to serve ads based on your prior visits to our Site or other websites. You can opt out
          of personalized advertising by visiting Google&apos;s Ads Settings.
        </p>

        <h2>Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements on our Site. Google AdSense uses
          cookies to serve ads based on your visit to our Site and other sites on the internet.
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based
          on your visit to our Site and/or other sites on the internet.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our Site may contain links to third-party websites. We are not responsible for the
          privacy practices or content of those sites. We encourage you to read the privacy
          policies of any third-party sites you visit.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable measures to protect information collected through the Site. However,
          no method of transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our Site is not directed to children under the age of 13. We do not knowingly collect
          personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post any changes on this
          page and update the &quot;Last updated&quot; date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please visit our{" "}
          <a href="/contact" className="text-brand-primary hover:underline">Contact</a> page.
        </p>
      </div>
    </div>
  );
}
