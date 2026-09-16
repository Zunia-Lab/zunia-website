import { Rule } from "@/components/site/Layout";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { Chains } from "@/components/sections/Chains";
import { Capabilities } from "@/components/sections/Capabilities";
import { Platforms } from "@/components/sections/Platforms";
import { Security } from "@/components/sections/Security";
import { Verify } from "@/components/sections/Verify";
import { Developers } from "@/components/sections/Developers";
import { FaqSection } from "@/components/sections/Faq";
import { Support } from "@/components/sections/Support";
import { Download } from "@/components/sections/Download";
import { FAQ, LINKS, SITE } from "@/content/site";

/**
 * Structured data. The FAQ and the application entry are the two things search
 * engines and assistants can surface directly, and both were absent before.
 */
function StructuredData() {
  const logoUrl = `${SITE.url}/icon`;
  const imageUrl = `${SITE.url}/opengraph-image`;

  const organization = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    sameAs: [LINKS.github],
    email: "support@zunialab.com",
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      {
        "@type": "SoftwareApplication",
        name: SITE.name,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Chrome, Brave, Edge, Firefox, iOS 15+, Android 8+",
        url: SITE.url,
        description: SITE.description,
        image: imageUrl,
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is a literal object built above, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <a
        href="#main"
        className="zw-skip rounded-full bg-accent px-5 py-3 text-[13px] font-medium text-accent-fg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Overview />
        <Rule />
        <Chains />
        <Rule />
        <Capabilities />
        <Platforms />
        <Security />
        <Verify />
        <Developers />
        <Rule />
        <FaqSection />
        <Support />
        <Rule />
        <Download />
      </main>
      <SiteFooter />
    </>
  );
}
