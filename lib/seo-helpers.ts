import { SITE_NAME, SITE_URL } from "./constants";
import { CodeCategory, UnifiedCode } from "./types";

export function getCodePageTitle(code: UnifiedCode): string {
  switch (code.category) {
    case "obd2":
      return `${code.displayCode} Code — ${code.title} | Meaning, Causes & Fix`;
    case "appliance":
      return `${code.brand} ${code.deviceType} Error Code ${code.displayCode} — ${code.title}`;
    case "hvac":
      return `${code.brand} ${code.deviceType} Error ${code.displayCode} — ${code.title}`;
    case "printer":
      return `${code.brand} Printer Error ${code.displayCode} — ${code.title}`;
    case "windows":
      return `${code.displayCode} — ${code.title} | Fix Guide`;
    default:
      return `${code.displayCode} — ${code.title} | ${SITE_NAME}`;
  }
}

export function getCodePageDescription(code: UnifiedCode): string {
  switch (code.category) {
    case "obd2":
      return `What does OBD-II code ${code.displayCode} mean? ${code.shortDescription} Learn the causes, symptoms, and step-by-step fix guide.`;
    case "appliance":
      return `Fix ${code.brand} ${code.deviceType} error code ${code.displayCode}: ${code.shortDescription} Step-by-step repair guide with costs.`;
    case "hvac":
      return `${code.brand} ${code.deviceType} error ${code.displayCode}: ${code.shortDescription} Troubleshooting guide with repair steps.`;
    case "printer":
      return `Fix ${code.brand} printer error ${code.displayCode}: ${code.shortDescription} Complete troubleshooting guide.`;
    case "windows":
      return `How to fix ${code.displayCode}: ${code.shortDescription} Step-by-step guide for Windows users.`;
    default:
      return code.shortDescription;
  }
}

export function getCategoryTitle(category: CodeCategory): string {
  switch (category) {
    case "obd2":
      return "OBD-II Error Codes";
    case "appliance":
      return "Appliance Error Codes";
    case "hvac":
      return "HVAC Error Codes";
    case "printer":
      return "Printer Error Codes";
    case "windows":
      return "Windows Error Codes";
  }
}

export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFaqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function buildHowToJsonLd(
  name: string,
  steps: { title: string; instruction: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.instruction,
    })),
  };
}

export function buildTechArticleJsonLd(code: UnifiedCode, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: getCodePageTitle(code),
    description: getCodePageDescription(code),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: url,
  };
}
