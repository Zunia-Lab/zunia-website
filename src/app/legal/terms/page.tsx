import type { Metadata } from "next";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/site/Layout";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { LINKS } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service (Draft)",
  description: "Draft terms for the Zunia wallet. Not in force. Questions go to dev@zunialab.com.",
  /* The root layout sets `canonical: "/"` and Next merges metadata field by
     field, so without this the page declares itself a duplicate of the home
     page the moment it stops being noindex. */
  alternates: { canonical: "/legal/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
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
        <Section label="Terms of service" className="py-16 lg:py-24">
          <Container className="max-w-[720px]">
            <Eyebrow>Draft, not in force</Eyebrow>
            <SectionTitle as="h1" lead="Terms of Service" className="mt-6" />

            {/* Body copy runs on the foreground tokens rather than raw neutrals:
                the site is dark, and neutral-600 on --z-bg measured 2.5:1. */}
            <div className="mt-8 flex flex-col gap-5 text-[16.5px] leading-[1.7] text-fg-muted">
              <p className="m-0">
                This is a placeholder Terms of Service for Zunia. It is not legal advice and it is
                not binding until counsel review and formal publication.
              </p>
              <p className="m-0">
                Zunia wallet software is intended to be non-custodial. You control your keys, and
                Zunia Lab cannot move, freeze, reverse or recover a transaction on your behalf. The
                responsibilities that follow from that are listed in the risk disclosure in the
                footer of every page.
              </p>
              <p className="m-0">
                The fuller draft will be published at docs.zunialab.com/legal/terms; that host
                does not resolve yet, so the address is printed rather than linked.
              </p>
              <p className="m-0">
                Questions about this draft go to{" "}
                <a
                  href={LINKS.supportEmail}
                  className="rounded-sm text-fg underline underline-offset-4 transition-colors duration-[var(--z-duration-base)] hover:text-fg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]"
                >
                  dev@zunialab.com
                </a>
                .
              </p>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
