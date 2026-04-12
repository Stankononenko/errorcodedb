interface WhenToCallProProps {
  text: string;
}

export default function WhenToCallPro({ text }: WhenToCallProProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">When to Call a Professional</h2>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-gray-800 leading-relaxed">{text}</p>
      </div>
    </section>
  );
}
