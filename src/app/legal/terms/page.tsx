import type { Metadata } from "next";
import { DocumentPage, H2, H3, Note, P, Ul } from "@/components/site/DocumentPage";
import { LINKS } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using Zunia. Self-custody software, no account, no token, and no promise that a transaction can be reversed.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <DocumentPage eyebrow="Terms" title="Terms of Service" updated="19 September 2026">
      <Note>
        These terms cover the website, the documentation, and the Zunia clients published by
        Zunia Lab. They do not make Zunia a custodian, an exchange, or a bank. If you need a
        company that can freeze a transfer, this is the wrong product.
      </Note>

      <H2>The software</H2>
      <P>
        Zunia is self-custody wallet software for the Cosmos ecosystem, with support for chains
        the registry lists, including EVM and Solana networks that the clients know how to
        speak to. The clients that exist today are a browser extension and a phone app that can
        share the same keys. A web dashboard is in development. It is not deployed, and when it
        is, it will read and request signatures. It will not hold the signing key in the browser.
      </P>
      <P>
        The source is published under the Apache License 2.0, except where a file says
        otherwise. The license text in each repository is the license. These terms do not
        replace it. They are the rules for using the published sites and the builds we ship.
      </P>

      <H2>No account, no custody</H2>
      <P>
        You do not register. There is no password to reset and no identity for us to verify.
        When you create a wallet, the recovery phrase is created on your device. You hold it.
        We do not. A transaction you sign is your instruction to a chain. We cannot cancel it,
        reverse it, or force a validator, a relayer, or a counterparty to undo it.
      </P>
      <P>
        Losing the phrase, sending to the wrong address, approving a malicious signature, or
        staking with a validator that is later slashed are losses we cannot repay, because we
        never had the funds. The risk disclosure on the site is part of these terms.
      </P>

      <H2>No token</H2>
      <P>
        There is no Zunia token, no airdrop, and no presale. We do not sell a Zunia coin on
        this site or anywhere else. Anyone who asks you to connect a wallet, pay a fee, or
        reveal a phrase in order to claim a Zunia token is not us. That includes accounts that
        copy the name, the mark, or a lookalike domain.
      </P>
      <P>
        The only public X account we operate for the lab is{" "}
        <a href={LINKS.x} rel="noreferrer">@ZuniaLab</a>. The only GitHub organisation is{" "}
        <a href={LINKS.github} rel="noreferrer">Zunia-Lab</a>. Mail from us about the product
        comes from zunialab.com addresses. We will not ask for your phrase.
      </P>

      <H2>What you may do</H2>
      <P>
        You may install the clients, read the documentation, and use the software to hold,
        send, and stake on chains the client supports, subject to the law that applies to you
        and to the chain. You may fork the Apache-licensed source under that license.
      </P>
      <P>
        You may link to the site and quote short passages. You may use the marks only as the{" "}
        <a href={LINKS.brandPage}>brand page</a> allows. The brand files are for accurate
        reference, not for implying that we operate your product.
      </P>

      <H2>What you may not do</H2>
      <Ul>
        <li>Ask us, or any page that claims to be us, to take custody of a phrase or a key.</li>
        <li>Use the name, the mark, or a confusingly similar domain to phish, to fake a token claim, or to impersonate Zunia Lab.</li>
        <li>Probe the site or the clients except through the disclosure policy, or in a way that degrades the service for others.</li>
        <li>Use the software to violate sanctions, to launder funds, or to attack another person&apos;s keys or machine.</li>
        <li>Present a modified build as an official Zunia release, or strip the license notices from a redistributed build.</li>
      </Ul>
      <P>
        We do not police chains. A chain can censor, halt, or fork. That is the chain&apos;s rule,
        not a feature we sell.
      </P>

      <H2>Stores, browsers, and what is actually shipping</H2>
      <P>
        The extension is the desktop client. Firefox support is planned, not shipped. Mobile
        builds for the Apple App Store and Google Play are in review. Until a store lists
        them, there is no official store download, and a link that claims otherwise is not
        ours. The web dashboard is not a public URL.
      </P>
      <P>
        A store can reject, delay, or remove a build under its own rules. We do not control
        that review. A browser can change an extension API. We will say so on the site rather
        than leave a dead download button up.
      </P>

      <H2>Fees</H2>
      <P>
        Zunia Lab does not charge a wallet fee on this site. Chains charge fees, and staking
        has commission set by the validator you pick. Those amounts are not ours. Fiat prices
        shown in a client are indicative, from third-party feeds, and can be wrong. Nothing on
        the site is a quote, an offer, or investment advice.
      </P>

      <H2>Chains and endpoints</H2>
      <P>
        The chain list is generated from our registry. Counts on the site match that registry
        at the time the claims were reviewed. A chain can be added or removed. An endpoint can
        be slow, dishonest, or down. You can point the client at your own endpoint. We do not
        guarantee inclusion in a block, a particular fee, or that a displayed balance matches
        the chain at the second you look at it.
      </P>

      <H2>Security claims, stated narrowly</H2>
      <P>
        Keys are designed to stay on the device. The keystore uses AES-256, wrapped by the
        operating system where the platform allows it. Hardware wallets keep their own seed.
        That is the design. It is not a completed third-party audit, a SOC report, or a bug
        bounty that is already paying out. An independent audit is planned. A bounty program
        is planned. Reproducible builds are planned. Until those exist, the site says planned.
      </P>
      <P>
        Report vulnerabilities under the <a href={LINKS.disclosure}>disclosure policy</a>. Do
        not open a public issue that includes a working exploit against users.
      </P>

      <H2>Availability</H2>
      <P>
        The website and the documentation are provided as available. We may take them down for
        maintenance, change a page, or stop publishing a build. Open-source tags that already
        exist remain available under their license for as long as the forge hosts them. We do
        not promise a particular uptime number.
      </P>

      <H2>Warranty disclaimer</H2>
      <P>
        The software and the sites are provided as is. To the extent the law allows, we
        disclaim warranties of merchantability, fitness for a particular purpose, title, and
        non-infringement. We do not warrant that the software is free of errors, that a chain
        will accept your transaction, or that a price on screen is the price you will receive
        anywhere else.
      </P>
      <P>
        Some jurisdictions do not allow a disclaimer of this breadth. In those places the
        disclaimer applies to the extent the law allows, and the rest of these terms still
        apply. We are not choosing a court by writing that sentence.
      </P>

      <H2>Limitation of liability</H2>
      <P>
        To the extent the law allows, Zunia Lab is not liable for lost funds, lost profits,
        lost data, failed transactions, slashing, phishing, a compromised device, a malicious
        signature you approved, or an endpoint that misled the client. We are not liable for
        indirect or consequential loss. If a court finds that a limit is not allowed, the limit
        is the smallest one that court will allow.
      </P>
      <P>
        You use a self-custody tool. The cost of a mistake sits with the key holder. That is
        the point of the design, and it is also the point of this clause.
      </P>

      <H2>Indemnity</H2>
      <P>
        If you misuse the marks, ship a trojaned build under our name, or use the software to
        harm someone else, you will cover the resulting claims against Zunia Lab, including
        reasonable legal costs, to the extent the law allows. This does not apply to a claim
        that is only about our own unmodified software being defective.
      </P>

      <H2>Changes to these terms</H2>
      <P>
        We will change these terms by posting a new version on this page and updating the date.
        Continuing to use the site or a build after that date means you accept the new terms
        for that use. If you do not accept them, stop using the builds and the site. Your
        phrase remains yours either way. We cannot switch it off.
      </P>

      <H3>Contact</H3>
      <P>
        Questions about these terms: <a href={LINKS.supportEmail}>dev@zunialab.com</a>. The
        Apache 2.0 license for the extension is <a href={LINKS.license}>in the repository</a>.
      </P>
    </DocumentPage>
  );
}
