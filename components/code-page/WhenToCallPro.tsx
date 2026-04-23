interface WhenToCallProProps {
  text: string;
}

export default function WhenToCallPro({ text }: WhenToCallProProps) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        When to call a professional
      </h2>
      <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <svg className="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 leading-relaxed">{text}</p>
            <p className="mt-3 text-xs text-gray-500">
              A professional typically has diagnostic tools, parts inventory, and the experience
              to rule out less-obvious causes faster than a DIY approach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
