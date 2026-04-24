import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1e40af",
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Find & Fix Any Error Code`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Find & Fix Any Error Code`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og/default.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Find & Fix Any Error Code`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Find & Fix Any Error Code`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og/default.svg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Prefetch search index so first Ctrl+K / / keypress is instant. */}
        <link rel="prefetch" href="/search-index.json" as="fetch" crossOrigin="anonymous" />
        {/* DNS prefetch for when AdSense is enabled (no-op otherwise). */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagservices.com" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 pb-14 md:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
