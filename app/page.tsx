import Link from "next/link";
import { getAllOBDCodes } from "@/lib/data-loader";
import { SITE_NAME } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";

const CATEGORIES = [
  {
    title: "OBD-II Codes",
    description: "Check engine light codes for all vehicles 1996+. Powertrain, body, chassis, and network codes.",
    href: "/obd2",
    icon: "\uD83D\uDE97",
    available: true,
  },
  {
    title: "Appliance Error Codes",
    description: "Samsung, LG, Whirlpool, Bosch, GE — washers, dryers, dishwashers, refrigerators, and more.",
    href: "/appliance",
    icon: "\uD83E\uDDFA",
    available: false,
  },
  {
    title: "HVAC Error Codes",
    description: "Furnace blink codes, AC errors, heat pumps, mini-splits, thermostats, and water heaters.",
    href: "/hvac",
    icon: "\u2744\uFE0F",
    available: false,
  },
  {
    title: "Printer Error Codes",
    description: "HP, Canon, Epson, Brother — paper jams, ink errors, hardware faults, and connectivity issues.",
    href: "/printer",
    icon: "\uD83D\uDDA8\uFE0F",
    available: false,
  },
  {
    title: "Windows Error Codes",
    description: "BSOD stop codes, Windows Update errors, system errors, and browser/network errors.",
    href: "/windows",
    icon: "\uD83D\uDCBB",
    available: false,
  },
];

export default function HomePage() {
  const obdCodes = getAllOBDCodes();
  const popularCodes = obdCodes.slice(0, 12);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "The most comprehensive error code database. Find meanings, causes, and step-by-step fixes for error codes on cars, appliances, HVAC systems, printers, and computers.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={websiteJsonLd} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Find &amp; Fix Any Error Code
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            The most comprehensive error code database. OBD-II car codes, appliance errors, HVAC codes, printer errors, and Windows codes — all with step-by-step fix guides.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.available ? cat.href : "#"}
                className={`block border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow ${
                  !cat.available ? "opacity-60 cursor-default" : ""
                }`}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-lg text-gray-900">
                  {cat.title}
                  {!cat.available && (
                    <span className="ml-2 text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">
                      Coming Soon
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Codes */}
      {popularCodes.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Popular Error Codes
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularCodes.map((code) => (
                <Link
                  key={code.code}
                  href={`/obd2/${code.code.toLowerCase()}`}
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <span className="font-mono font-bold text-brand-primary">{code.code}</span>
                  <p className="mt-1 text-sm text-gray-700 line-clamp-2">{code.title}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/obd2"
                className="inline-flex items-center text-brand-primary font-medium hover:underline"
              >
                View all OBD-II codes &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SEO Text */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About {SITE_NAME}
          </h2>
          <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
            <p>
              {SITE_NAME} is a free, comprehensive error code reference for everyday devices.
              Whether your check engine light just came on, your washing machine is showing a
              mysterious error, or your furnace LED is blinking a pattern, we have the answers.
            </p>
            <p>
              Every error code page includes a plain-language explanation of what the code means,
              the most common causes ranked by likelihood, step-by-step repair instructions with
              difficulty ratings and required tools, estimated DIY and professional repair costs,
              and answers to frequently asked questions.
            </p>
            <p>
              Our database covers OBD-II automotive codes (P, B, C, U codes), home appliance
              error codes from major brands like Samsung, LG, Whirlpool, Bosch, and GE, HVAC
              system errors including furnace blink codes and mini-split error codes, printer
              errors from HP, Canon, Epson, and Brother, and Windows computer errors including
              BSOD stop codes and update errors.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
