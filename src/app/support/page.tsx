import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SupportCenter } from "@/app/support/SupportCenter";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Guides for Zunia keys, the Safari extension, and transactions, plus the only support and security addresses.",
  alternates: { canonical: "/support" },
  robots: { index: true, follow: true },
};

export default function SupportPage() {
  return (
    <>
      <a
        href="#main"
        className="zw-skip rounded-full bg-accent px-5 py-3 text-[13px] font-medium text-accent-fg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <SupportCenter />
      </main>
      <SiteFooter />
    </>
  );
}
