import { UnifiedCode, BreadcrumbItem } from "@/lib/types";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHowToJsonLd,
  buildTechArticleJsonLd,
  getCanonicalUrl,
} from "@/lib/seo-helpers";
import { SITE_URL } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import AdUnit from "@/components/ads/AdUnit";
import CodeHero from "./CodeHero";
import SymptomsSection from "./SymptomsSection";
import CausesSection from "./CausesSection";
import FixStepsSection from "./FixStepsSection";
import CostEstimate from "./CostEstimate";
import WhenToCallPro from "./WhenToCallPro";
import FAQSection from "./FAQSection";
import RelatedCodes from "./RelatedCodes";
import PartsNeeded from "./PartsNeeded";
import AffectedModels from "./AffectedModels";

interface CodePageLayoutProps {
  code: UnifiedCode;
  breadcrumbs: BreadcrumbItem[];
  canonicalPath: string;
}

export default function CodePageLayout({ code, breadcrumbs, canonicalPath }: CodePageLayoutProps) {
  const fullUrl = getCanonicalUrl(canonicalPath);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [{ name: "Home", url: SITE_URL }, ...breadcrumbs.map((b) => ({ name: b.label, url: `${SITE_URL}${b.href}` }))]
  );
  const articleJsonLd = buildTechArticleJsonLd(code, fullUrl);
  const faqJsonLd = code.faq.length > 0 ? buildFaqJsonLd(code.faq) : null;
  const howToJsonLd =
    code.fixSteps.length > 0
      ? buildHowToJsonLd(`How to Fix ${code.displayCode}`, code.fixSteps)
      : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      {howToJsonLd && <JsonLd data={howToJsonLd} />}

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-4 space-y-8">
          <CodeHero code={code} />

          <AdUnit position="leaderboard" className="my-6" />

          <SymptomsSection symptoms={code.symptoms} />

          <CausesSection causes={code.causes} />

          <AdUnit position="in-content-1" className="my-6" />

          <FixStepsSection steps={code.fixSteps} codeDisplay={code.displayCode} />

          <CostEstimate diy={code.estimatedCost.diy} professional={code.estimatedCost.professional} />

          {code.partsNeeded && code.partsNeeded.length > 0 && (
            <PartsNeeded parts={code.partsNeeded} />
          )}

          <AffectedModels
            models={code.affectedModels}
            series={code.affectedSeries}
            versions={code.affectedVersions}
          />

          {code.whenToCallPro && <WhenToCallPro text={code.whenToCallPro} />}

          <AdUnit position="in-content-2" className="my-6" />

          <RelatedCodes
            codes={code.relatedCodes}
            category={code.category}
            brandSlug={code.brandSlug}
            deviceTypeSlug={code.deviceTypeSlug}
          />

          <FAQSection faqs={code.faq} />
        </div>
      </div>
    </>
  );
}
