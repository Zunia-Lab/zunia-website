import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-20">
        <h1 className="text-[32px] font-medium tracking-[-0.04em]">This page is not on the site.</h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg-muted">
          The address does not match a page. The rest of the site is unchanged.
        </p>
        <a href="/" className="mt-6 text-[15px] underline underline-offset-4">
          Back to Zunia
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
