import { Rule } from "@/components/site/Layout";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { Chains } from "@/components/sections/Chains";
import { Capabilities } from "@/components/sections/Capabilities";
import { Platforms } from "@/components/sections/Platforms";
import { Security } from "@/components/sections/Security";
import { Transparency } from "@/components/sections/Transparency";
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
  const logoUrl = `${SITE.url}/apple-icon`;
  const imageUrl = `${SITE.url}/opengraph-image`;
  const support = LINKS.supportEmail.replace(/^mailto:/, "");
  const security = LINKS.securityEmail.replace(/^mailto:/, "");

  const organization = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 180,
      height: 180,
    },
    email: support,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: support,
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "security",
        email: security,
        availableLanguage: ["en"],
      },
    ],
    sameAs: [LINKS.github, LINKS.x],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.metaDescription,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: "Zunia, the multi-chain Cosmos wallet",
        description: SITE.metaDescription,
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#app` },
        inLanguage: "en",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.url}/#app`,
        name: SITE.name,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Chrome, Brave, Edge, iOS 15+, Android 8+",
        url: SITE.url,
        description: SITE.metaDescription,
        image: imageUrl,
        featureList: [
          "Hold balances",
          "IBC transfers",
          "Stake",
          "Connect to Cosmos dApps",
          "Hardware wallets: Ledger and Keystone",
          "Keys generated and encrypted on device",
        ],
        isAccessibleForFree: true,
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${SITE.url}/#organization` },
        author: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        url: `${SITE.url}/#faq`,
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
        <Rule />
        <Platforms />
        <Rule />
        <Security />
        <Rule />
        <Transparency />
        <Rule />
        <Verify />
        <Rule />
        <Developers />
        <Rule />
        <FaqSection />
        <Rule />
        <Support />
        <Rule />
        <Download />
      </main>
      <SiteFooter />
    </>
  );
}
