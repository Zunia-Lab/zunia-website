import type { Metadata } from "next";
import { DocumentPage, H2, H3, Note, P, Ul } from "@/components/site/DocumentPage";
import { LINKS } from "@/content/site";

export const metadata: Metadata = {
  title: "Disclosure policy",
  description:
    "How to report a vulnerability in Zunia. Write to security@zunialab.com. Do not send a recovery phrase. We ask for 90 days before public detail.",
  alternates: { canonical: "/legal/disclosure" },
  robots: { index: true, follow: true },
};

export default function DisclosurePage() {
  return (
    <DocumentPage eyebrow="Trust" title="Disclosure policy" updated="19 September 2026">
      <Note>
        Send vulnerability reports to <a href={LINKS.securityEmail}>security@zunialab.com</a>.
        Do not include a recovery phrase, a private key, or a live exploit against someone
        else&apos;s funds. We would rather have a partial report today than a complete one that
        puts a user at risk.
      </Note>

      <H2>What we want to hear about</H2>
      <P>
        This policy covers the Zunia clients, the websites we operate at zunialab.com and
        docs.zunialab.com, and the repositories under the Zunia-Lab organisation that ship
        those products. A bug that lets a page steal a key, skip an approval, weaken the
        keystore, impersonate a pairing peer, or inject content into the site is in scope.
      </P>
      <P>
        Also in scope: a supply-chain issue in a dependency we ship, a release artifact that
        does not match the tag, and a flaw in the way the extension talks to a page. If you
        are unsure, send it. Sorting is our job.
      </P>

      <H2>What is out of scope</H2>
      <Ul>
        <li>A lost phrase, a mistaken address, or a transaction you approved. We cannot reverse those, and the report will not change that.</li>
        <li>Phishing sites, fake tokens, or social accounts that are not ours. Tell us so we can warn people, but they are not a vulnerability in the client. There is no Zunia token to claim.</li>
        <li>Issues in a chain, a validator, an RPC provider, a hardware wallet, or a store. Report those to their operators.</li>
        <li>Missing headers or best-practice nits that do not show a concrete impact, and reports from automated scanners with no explanation.</li>
        <li>Denial of service against a public endpoint we do not operate.</li>
      </Ul>

      <H2>How to send a report</H2>
      <P>
        Email <a href={LINKS.securityEmail}>security@zunialab.com</a>. Put &quot;vulnerability&quot; in
        the subject. Include:
      </P>
      <Ul>
        <li>The component, the version or commit, and the platform.</li>
        <li>What an attacker can do, and what they already need to have.</li>
        <li>The steps to reproduce, or a proof of concept that does not touch anyone else&apos;s funds.</li>
        <li>Whether you have told anyone else.</li>
        <li>How you want to be credited, if you want credit at all.</li>
      </Ul>
      <P>
        You can encrypt the mail if you have a key for that address published in{" "}
        <a href={LINKS.securityTxt}>security.txt</a> or in the GitHub{" "}
        <a href={LINKS.securityPolicy} rel="noreferrer">SECURITY.md</a>. If you do not, ordinary
        mail is still better than sitting on the bug. Do not open a public GitHub issue for an
        unfixed vulnerability.
      </P>
      <H3>What not to send</H3>
      <P>
        Do not send a recovery phrase to prove you have one. Do not access an account that is
        not yours. Do not run a proof of concept against the production website in a way that
        destroys data or takes the site down. Stop when you have shown impact.
      </P>

      <H2>What we do next</H2>
      <P>
        We acknowledge the report. We aim to do that within three business days, and to give
        you a first assessment within ten. Those are targets, not a contractual service level.
        If your report is clear, the assessment is faster. If it is a scanner dump, it is
        slower.
      </P>
      <P>
        If we confirm the issue, we work on a fix. We ask you to wait 90 days after the report,
        or until a fix is shipped, whichever is sooner, before you publish the details. If a
        fix needs longer because a store review or a coordinated client release is in the way,
        we will say so and agree a date with you. We will not ask for silence past the point
        where users are safer knowing.
      </P>
      <P>
        We credit researchers who want credit, in the release notes or on this site, using the
        name you give us. We do not credit a report we cannot reproduce.
      </P>

      <H2>No bounty yet</H2>
      <P>
        A paid bounty program is planned. It is not open. Sending a report under this policy
        does not create a right to payment. If we later publish a bounty, it will say which
        reports qualify and how they are paid. Until that page exists, assume there is no
        reward other than credit.
      </P>

      <H2>Safe harbour</H2>
      <P>
        If you follow this policy, act in good faith, avoid privacy violations, avoid
        destruction of data, and stop when the issue is shown, we will not bring a legal claim
        against you for that research. This is our statement. It does not bind a chain, a
        store, a hosting provider, or any other person. It does not cover research that targets
        other users&apos; funds or that breaks the law for a reason this policy does not ask for.
      </P>
      <P>
        Good faith includes giving us a chance to fix the issue before you publish, within the
        window above. Publishing a weaponised exploit on day one, against a bug you have not
        reported, is outside this harbour.
      </P>

      <H2>Official channels</H2>
      <P>
        Reports and follow-ups stay on security@zunialab.com. General product questions go to{" "}
        <a href={LINKS.supportEmail}>dev@zunialab.com</a>. We do not take vulnerability reports
        in social-media direct messages. The X account{" "}
        <a href={LINKS.x} rel="noreferrer">@ZuniaLab</a> can point you here. It is not the
        inbox.
      </P>
    </DocumentPage>
  );
}
