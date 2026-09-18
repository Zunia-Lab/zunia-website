import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SameDocumentFragments } from "./_components/SameDocumentFragments";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Zunia, the multi-chain Cosmos wallet",
    template: "%s · Zunia",
  },
  description: SITE.metaDescription,
  applicationName: SITE.name,
  keywords: [
    "Zunia",
    "Zunia wallet",
    "Cosmos wallet",
    "IBC wallet",
    "multi-chain wallet",
    "self-custody wallet",
    "browser extension wallet",
    "mobile Cosmos wallet",
    "Safrochain wallet",
    "staking",
    "non-custodial",
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM guidance" },
        { url: "/llms-full.txt", title: "LLM guidance, full" },
      ],
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "Zunia, the multi-chain Cosmos wallet",
    description: SITE.metaDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zunia, the multi-chain Cosmos wallet",
    description: SITE.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "finance",
};

/* The site is dark-only for now, so the browser chrome is pinned rather than
   derived from a preference. themeColor tracks --z-bg so the chrome and the
   page are the same black. */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0a09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark">
      <body className="zunia-root flex min-h-full flex-col">
        <SameDocumentFragments />
        {children}
      </body>
    </html>
  );
}
