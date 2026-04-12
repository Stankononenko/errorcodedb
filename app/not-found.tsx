import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Not Found</h2>
      <p className="text-gray-600 mb-8">
        The error code or page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-sm font-medium text-white hover:bg-brand-secondary transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/obd2"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Browse OBD-II Codes
        </Link>
      </div>
    </div>
  );
}
