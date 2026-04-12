import { FAQ } from "@/lib/types";

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group border border-gray-200 rounded-lg">
            <summary className="cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50">
              {faq.q}
            </summary>
            <div className="px-4 pb-4 text-gray-700 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
