import type { Metadata } from "next";
import { DocumentPage, H2, H3, Note, P, Ul } from "@/components/site/DocumentPage";
import { LINKS, SECURITY_SPECS } from "@/content/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Zunia keeps keys on the device, what the clients can and cannot do, and what is still planned: audit, bounty, reproducible builds.",
  alternates: { canonical: "/security" },
  robots: { index: true, follow: true },
};

export default function SecurityPage() {
  return (
    <DocumentPage eyebrow="Trust" title="Security" updated="19 September 2026">
      <Note>
        The useful security property of Zunia is narrow and concrete: the signing keys are
        created and kept on your device. We cannot sign for you, and we cannot take the keys
        back. Everything else on this page is either a consequence of that design or an honest
        limit of it.
      </Note>

      <H2>Threat model</H2>
      <P>
        Zunia is built against a specific attacker. Someone who phishes a website, someone who
        ships a fake extension, someone who asks for a phrase in a support chat, and someone who
        wants a server-side copy of every user&apos;s keys. The design answers those by refusing to
        hold the secret at all.
      </P>
      <P>
        The design does not answer a different attacker: one who already controls your unlocked
        device, one who watches you write the phrase down, one who convinces you to approve a
        signature you did not read, or one who operates the chain itself. A wallet cannot fix a
        compromised computer. Read the prompt. If the device is not yours, do not unlock the
        wallet on it.
      </P>
      <Ul>
        <li>We defend against collection of keys by Zunia Lab, by a Zunia server, and by a page that only talks to the extension through the approval screen.</li>
        <li>We do not defend against malware on the device, a stolen written phrase, or a signature you approved.</li>
        <li>We do not defend against a chain halt, a validator that double-signs, or an RPC endpoint that lies about state. You can replace the endpoint. You cannot replace the chain.</li>
      </Ul>

      <H2>Where keys live</H2>
      <P>
        A new wallet draws a BIP39 recovery phrase on the device. Accounts are derived with
        BIP44. The phrase is the backup. Private keys used for signing stay in a local keystore
        encrypted with AES-256. On platforms that offer one, the wrapping key sits in the
        operating system keystore. On the phone, a biometric or the device passcode can be
        required before the app unwraps it. The biometric template never comes to us. The
        operating system answers yes or no.
      </P>
      <P>
        The extension and the phone can hold the same phrase. Pairing lets the extension
        propose a transaction and the phone confirm it. The proposal is not the key. The web
        dashboard, still in development and not deployed, is a reader. It asks the extension or
        the phone to sign. The browser that shows it does not receive a signing key.
      </P>
      <H3>Hardware</H3>
      <P>
        Ledger Nano S Plus, Nano X, and Stax connect over USB and WebHID. Keystone 3 connects
        by QR. The seed stays in the hardware. Zunia prepares the unsigned transaction, the
        device signs, and the client broadcasts. A desktop transaction can also be approved by
        scanning it with the phone, so the key does not have to be imported into that computer.
      </P>

      <H2>What the clients do on the network</H2>
      <P>
        Balances and history are public chain data. The client asks an endpoint, caches the
        answer, and shows it. The default endpoints are the ones in our registry. You can
        replace them, and the documentation explains how. The operator of an endpoint sees the
        request. That includes a broadcast transaction and the address it spends from. There is
        no way to broadcast a transaction that the receiving node cannot see. Running your own
        node is the way to choose who sees it.
      </P>
      <P>
        A site that wants a signature talks to the extension. You get a prompt. Nothing is
        signed until you approve it. A page cannot read the phrase through that channel. It can
        still trick you if you approve a prompt you did not understand. The prompt is the
        control. Slow down on it.
      </P>
      <P>
        Price labels are indicative. They come from third-party feeds. A wrong price is a
        display bug or a stale feed, not a rate we guarantee.
      </P>

      <H2>What we will not do</H2>
      <Ul>
        <li>We will not ask for your recovery phrase, by mail, on X, in a document, or in a pull request.</li>
        <li>We will not offer to recover, freeze, or reverse a transaction. We cannot.</li>
        <li>We will not sell a Zunia token, an airdrop, or a presale. A claim that we are doing so is a scam.</li>
        <li>We do not run telemetry in the clients that phones home with your addresses. The website does not embed an analytics product.</li>
      </Ul>
      <P>
        The public X account is <a href={LINKS.x} rel="noreferrer">@ZuniaLab</a>. The GitHub
        organisation is <a href={LINKS.github} rel="noreferrer">Zunia-Lab</a>. Official mail
        uses zunialab.com. Anything else that asks for a secret is not us, even if the avatar
        matches.
      </P>

      <H2>Supply chain</H2>
      <P>
        The clients are open source under Apache 2.0. You can read the repositories. Official
        builds, once a store or a browser listing is live, should match the tag we publish.
        Firefox is planned, not shipped. The phone builds are in store review. The dashboard is
        not deployed. Until a listing exists, a download that claims to be the official store
        build is not one we published.
      </P>
      <P>
        Reproducible builds are planned, so a third party can rebuild a release and compare it
        to the binary. They are not done. Do not treat a commit hash on the site as a
        completed reproducible pipeline. The documentation describes the intended check. The
        site should not be read as saying the check is finished.
      </P>
      <P>
        Dependencies are pinned in the repositories. A review of a release is a review of that
        lockfile as well as the wallet code. If you find a dependency we should not be shipping,
        write to security@zunialab.com.
      </P>

      <H2>What is planned, and not done</H2>
      <P>
        An independent audit is planned. It has not been completed, and this page will not name
        a firm or a date we do not have. A bug bounty is planned. It is not paying rewards
        today. There is no SOC report. Saying otherwise would be a false claim on the one page
        that exists to prevent false claims.
      </P>
      <P>
        Until those programs exist, the way to report a vulnerability is the{" "}
        <a href={LINKS.disclosure}>disclosure policy</a>. We acknowledge reports sent to{" "}
        <a href={LINKS.securityEmail}>security@zunialab.com</a>. We aim to answer inside the
        window that policy describes. We do not pay a bounty we have not published.
      </P>

      <H2>How to check you have the real client</H2>
      <Ul>
        <li>Start from zunialab.com or from a repository under github.com/Zunia-Lab. Do not start from a search ad.</li>
        <li>Confirm the extension id against the listing we publish, once that listing is live. Until then, build from the tagged source if you need a binary.</li>
        <li>Confirm the phone app against the store page we link, once the store has approved it. A sideload from a random file host is not a Zunia release.</li>
        <li>Read the signing prompt. The chain, the amount, the destination, and the payload should match what you meant to do.</li>
      </Ul>
      <P>
        The homepage has a short version of this check. This page is the long version. If the
        two ever disagree, this page and the registry win, and we should be told.
      </P>

      <H2>The properties, in one list</H2>
      <Ul>
        {SECURITY_SPECS.map((spec) => (
          <li key={spec.label}>
            <strong className="font-medium text-fg">{spec.label}.</strong> {spec.value}
          </li>
        ))}
      </Ul>

      <H2>If something goes wrong</H2>
      <P>
        If you approved a bad signature, move remaining funds to a new phrase from a device you
        trust, and assume the old phrase is burned. We cannot do that move for you. If you have
        not approved anything but you suspect the install, remove it, install from a source
        above, and restore on a clean device.
      </P>
      <P>
        If you found a bug that puts other people&apos;s keys at risk, do not post a proof of
        concept in public. Follow the <a href={LINKS.disclosure}>disclosure policy</a>. If you
        lost funds to a scam that used our name, write to{" "}
        <a href={LINKS.supportEmail}>dev@zunialab.com</a> so we can warn others. We still cannot
        reverse the transfer.
      </P>
    </DocumentPage>
  );
}
