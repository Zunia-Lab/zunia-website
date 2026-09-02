import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Zunia, the multi-chain Cosmos wallet",
    template: "%s · Zunia",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Cosmos wallet",
    "IBC wallet",
    "multi-chain wallet",
    "self-custody",
    "browser extension wallet",
    "Safrochain",
    "staking",
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "Zunia, the multi-chain Cosmos wallet",
    description: SITE.description,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zunia, the multi-chain Cosmos wallet",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "finance",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050506",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark">
      <body className="zunia-root flex min-h-full flex-col">{children}</body>
    </html>
  );
}
