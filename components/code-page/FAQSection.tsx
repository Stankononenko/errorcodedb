import { FAQ } from "@/lib/types";

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        Frequently asked questions
      </h2>
      <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden">
        {faqs.map((faq, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer items-start gap-3 p-4 hover:bg-gray-50 transition-colors list-none">
              <svg
                className="h-5 w-5 text-gray-400 shrink-0 mt-0.5 transition-transform group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-semibold text-gray-900 leading-snug">
                {faq.q}
              </span>
            </summary>
            <div className="pl-12 pr-4 pb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
