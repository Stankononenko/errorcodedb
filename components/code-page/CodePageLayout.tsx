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
import AnchorAd from "@/components/ads/AnchorAd";
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
import HelpfulFeedback from "./HelpfulFeedback";
import ShareButton from "./ShareButton";
import SaveButton from "./SaveButton";
import TrustBadge from "./TrustBadge";
import Sources from "./Sources";
import RecentView from "./RecentView";
import SafetyBanner from "./SafetyBanner";
import TLDR from "./TLDR";
import FreezeFrameData from "./FreezeFrameData";
import DiagnosticTools from "./DiagnosticTools";
import RegionalCost from "./RegionalCost";
import CommonMisdiagnoses from "./CommonMisdiagnoses";
import DiyVsShopMatrix from "./DiyVsShopMatrix";

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

  const feedbackId = `${code.category}:${code.code}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      {howToJsonLd && <JsonLd data={howToJsonLd} />}

      <RecentView
        code={code.displayCode}
        title={code.title}
        url={canonicalPath}
        category={code.category}
        brand={code.brand}
      />

      {/* Mobile-only sticky anchor ad (appears after 30% scroll) */}
      <AnchorAd />

      {/* Two-column layout on desktop (content + sidebar), single-column on mobile */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0 max-w-4xl">
            <div className="flex items-center justify-between gap-3">
              <Breadcrumbs items={breadcrumbs} />
              <div className="flex items-center gap-2">
                <SaveButton
                  code={code.displayCode}
                  title={code.title}
                  url={canonicalPath}
                  category={code.category}
                  brand={code.brand}
                />
                <ShareButton code={code.displayCode} title={code.title} />
              </div>
            </div>

            <div className="mt-4 space-y-6 sm:space-y-8">
              {/* 1. TLDR — first content, AI-citable block */}
              <TLDR code={code} />

              {/* Hero (the original first paragraph of real content) */}
              <CodeHero code={code} />

              {/* Trust + safety before any ads — better UX, also AdSense policy */}
              <TrustBadge />
              <SafetyBanner code={code} />

              {/* 2. TOP-BANNER — first ad, only after real intro content */}
              <AdUnit position="top-banner" />

              <SymptomsSection symptoms={code.symptoms} />

              <CausesSection causes={code.causes} />

              {/* Technician-grade content: freeze frame (OBD only) */}
              <div className="defer-render">
                <FreezeFrameData code={code} />
              </div>

              {/* 3. AFTER-INTRO — before fix steps */}
              <AdUnit position="after-intro" />

              {/* Which tools actually diagnose this code */}
              <div className="defer-render">
                <DiagnosticTools code={code} />
              </div>

              <FixStepsSection steps={code.fixSteps} codeDisplay={code.displayCode} />

              <HelpfulFeedback codeId={feedbackId} />

              {/* 4. IN-ARTICLE-1 — between fix-steps and cost */}
              <AdUnit position="in-article-1" />

              <CostEstimate diy={code.estimatedCost.diy} professional={code.estimatedCost.professional} />

              {/* Regional cost breakdown — high-intent readers compare locales */}
              <div className="defer-render">
                <RegionalCost code={code} />
              </div>

              {/* DIY vs shop decision matrix */}
              <div className="defer-render">
                <DiyVsShopMatrix code={code} />
              </div>

              {/* Common misdiagnoses — unique high-SEO-value content */}
              <div className="defer-render">
                <CommonMisdiagnoses code={code} />
              </div>

              {/* 5. HIGH-INTENT — right after cost + decision content */}
              <AdUnit position="high-intent" />

              {code.partsNeeded && code.partsNeeded.length > 0 && (
                <PartsNeeded parts={code.partsNeeded} />
              )}

              <AffectedModels
                models={code.affectedModels}
                series={code.affectedSeries}
                versions={code.affectedVersions}
              />

              {code.whenToCallPro && <WhenToCallPro text={code.whenToCallPro} />}

              {/* 6. MATCHED-CONTENT — Google's highest-RPM format */}
              <AdUnit position="matched-content" />

              <div className="defer-render">
                <RelatedCodes
                  codes={code.relatedCodes}
                  category={code.category}
                  brandSlug={code.brandSlug}
                  deviceTypeSlug={code.deviceTypeSlug}
                />
              </div>

              <div className="defer-render">
                <FAQSection faqs={code.faq} />
              </div>

              <div className="defer-render">
                <Sources category={code.category} brand={code.brand} />
              </div>

              {/* 7. BOTTOM-BANNER — last chance impression */}
              <AdUnit position="bottom-banner" />
            </div>
          </div>

          {/* Desktop-only sticky sidebar ad (hidden on mobile, shown lg+) */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-20">
              <AdUnit position="sidebar-sticky" />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
