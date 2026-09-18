import type { Metadata } from "next";
import { DocumentPage, H2, H3, Note, P, Ul } from "@/components/site/DocumentPage";
import { LINKS } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Zunia handles data. Keys stay on your device. The website does not run analytics, and we do not hold an account for you.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <DocumentPage eyebrow="Privacy" title="Privacy Policy" updated="19 September 2026">
      <Note>
        Zunia is a self-custody wallet. We do not create an account for you, we do not hold your
        keys, and we do not sell data. This policy describes what actually happens when you visit
        zunialab.com or use a Zunia client. It is not a promise that a chain, an RPC provider, or
        a store can also make.
      </Note>

      <H2>Who this covers</H2>
      <P>
        Zunia Lab publishes the website at zunialab.com, the documentation at docs.zunialab.com,
        and the open-source clients: the browser extension, the phone app, and the web dashboard
        that is still in development. Support mail is{" "}
        <a href={LINKS.supportEmail}>dev@zunialab.com</a>. Security reports go to{" "}
        <a href={LINKS.securityEmail}>security@zunialab.com</a>.
      </P>
      <P>
        This policy covers those surfaces. It does not cover a chain you connect to, a validator
        you stake with, a hardware wallet vendor, an app store, or a third party that hosts a
        node you choose. Those parties have their own operators and their own logs.
      </P>

      <H2>The short version</H2>
      <Ul>
        <li>There is no Zunia account, no sign-in, and no profile.</li>
        <li>Your recovery phrase and private keys are generated and stored on your device. They are not sent to us.</li>
        <li>This website does not run third-party analytics, advertising pixels, or a tag manager.</li>
        <li>Fonts, scripts, and images on this site are served from our own origin.</li>
        <li>The clients talk to chain endpoints you can replace. Those endpoints can see the requests your device makes.</li>
        <li>There is no Zunia token, airdrop, or presale. We will never ask for your phrase by email or on X.</li>
      </Ul>

      <H2>Data we do not collect</H2>
      <P>
        We do not ask for a name, an email, a phone number, a government identifier, or a payment
        card to use the wallet. We do not build a customer record. We do not sell, rent, or
        broker personal information, because we do not hold a marketing database to sell.
      </P>
      <P>
        We do not run a hosted wallet. There is no server that can list your addresses, your
        balances, or your transaction history on your behalf. If a page, an extension, or a
        person claims that Zunia Lab can recover a phrase, freeze a transfer, or look up an
        account, that claim is false.
      </P>

      <H2>Keys, phrases, and what never reaches us</H2>
      <P>
        A new wallet creates a BIP39 recovery phrase on the device that is running the client.
        The phrase is the backup. From it the client derives accounts with BIP44 paths. Private
        keys used for signing stay in the local keystore.
      </P>
      <P>
        On the extension and the phone, that keystore is encrypted with AES-256. The wrapping
        key is held by the operating system keystore where the platform provides one, and the
        phone can require a biometric or device passcode before it unwraps it. We do not receive
        that wrapping key, the phrase, or the private keys. A support request cannot include
        them, and we will refuse any message that tries to send them.
      </P>
      <P>
        The web dashboard, when it ships, is a reader. It pairs with the extension or the phone.
        Those devices sign. The browser that shows the dashboard does not receive a signing key.
        The dashboard is not deployed as a public product today. Until it is, the repository is
        the only public artifact, and it is not a place to paste a phrase.
      </P>
      <H3>What you store, and only you can lose</H3>
      <P>
        Because we never see the phrase, we cannot reset it. A lost phrase with no other backup
        means the funds controlled by that phrase are unreachable. Writing the phrase down, and
        keeping that copy away from screenshots, cloud notes, and chat apps, is your
        responsibility. The clients can show the phrase once, at creation or from the backup
        screen, so you can record it. They do not email it.
      </P>

      <H2>What the clients keep on the device</H2>
      <P>
        A working wallet has to remember some things locally, or it would ask you to restore on
        every launch. That local state can include:
      </P>
      <Ul>
        <li>The encrypted keystore and the accounts derived from it.</li>
        <li>The display name you give an account, if you set one.</li>
        <li>Chain preferences, custom RPC or REST endpoints you add, and address-book entries you type.</li>
        <li>A cache of balances, staking positions, and recent activity so the screen can open without waiting on every chain.</li>
        <li>The pairing record between the extension and the phone, so a proposal made on one device can be confirmed on the other.</li>
      </Ul>
      <P>
        That cache is a copy of public chain data plus your own notes. Uninstalling the client,
        or clearing its storage, removes it from that device. It does not remove anything from a
        chain. It also does not remove a phrase you wrote on paper.
      </P>

      <H2>This website</H2>
      <P>
        zunialab.com is a static marketing site. Pages are rendered by our own Next.js process.
        We do not embed analytics scripts, session-replay tools, advertising networks, or fonts
        loaded from a third-party CDN. Icons for stores and social accounts are drawn as inline
        SVG from a library that ships with the site, not fetched at view time.
      </P>
      <P>
        Like any site behind a web server, the origin and the network in front of it can see
        ordinary request logs: IP address, user agent, the path you requested, and the time.
        Those logs exist to keep the site up and to investigate abuse. They are not joined to a
        wallet identity, because the site has none. We do not use them to build a profile of
        which chains you hold.
      </P>
      <P>
        The site sets no tracking cookie and no advertising cookie. A technical cookie or
        similar stored value may appear only if a browser feature or the TLS terminator requires
        it to complete a request. You can use the site with cookies blocked.
      </P>
      <P>
        The documentation site at docs.zunialab.com is the same kind of surface: published
        pages, no account, no analytics product embedded by us.
      </P>

      <H2>What the extension does on the network</H2>
      <P>
        The extension is the place a site asks you to sign. A page that wants a signature talks
        to the extension through the browser. The page does not receive your phrase. You see the
        request and you approve or reject it. A rejected request is not sent.
      </P>
      <P>
        When you broadcast a transaction, the signed bytes go to an endpoint for that chain. The
        default endpoints are the ones published in our chain registry. You can replace them.
        Whoever operates the endpoint can see the request, including the signed transaction and
        the address it spends from. That is how every non-custodial wallet works. Choosing your
        own endpoint, or your own node, is the control we can actually offer.
      </P>
      <P>
        Price displays are indicative. They come from third-party price feeds, they can be
        stale, and they are not a quote. A feed operator can see that some client asked for a
        price. The feed does not receive your phrase.
      </P>

      <H2>What the phone does on the network</H2>
      <P>
        The phone holds the same keys as the extension when you restore the same phrase or pair
        the two. It submits transactions the same way: your device signs, an endpoint broadcasts.
        Biometric unlock stays on the phone. We do not receive the biometric template. The
        operating system does, under its own policy, and only to answer yes or no to the app.
      </P>
      <P>
        Store listings, if a store approves the build, are operated by Apple or Google. A store
        can see the download, the device class, and whatever that store&apos;s own privacy policy
        describes. We do not receive your store account password. The apps are in review. Until
        a store publishes them, there is no store listing to download.
      </P>

      <H2>Hardware wallets</H2>
      <P>
        Ledger Nano S Plus, Nano X, and Stax can connect over USB and WebHID. Keystone 3 can
        connect by QR. In both cases the private key stays in the hardware device. Zunia builds
        the transaction, the device signs it, and Zunia broadcasts the signature. We do not
        receive the hardware seed. The hardware vendor&apos;s own software and firmware are outside
        this policy.
      </P>
      <P>
        The phone can also approve a transaction that was proposed on a computer, by scanning a
        code, so the key never has to be imported into that computer. The code carries the
        proposal, not the phrase.
      </P>

      <H2>Mail you send us</H2>
      <P>
        If you write to dev@zunialab.com or security@zunialab.com, we receive whatever you put
        in the message: your address, the text, and any attachment. We use that to answer the
        request or to investigate a vulnerability. Do not include a recovery phrase, a private
        key, or a password. If you do, delete is the only safe handling, and we still cannot
        promise that a mail provider in the path did not store a copy.
      </P>
      <P>
        We keep security reports for as long as the issue is open and for a reasonable period
        after it is fixed, so we can check a regression. We do not add those addresses to a
        newsletter. There is no newsletter.
      </P>

      <H2>Children</H2>
      <P>
        The wallet is not directed at children. We do not knowingly collect personal information
        from anyone, including children, through an account, because there is no account. If you
        believe a child has sent us a phrase or other sensitive material by email, write to
        dev@zunialab.com and we will delete the message.
      </P>

      <H2>Retention</H2>
      <P>
        Chain data lives on the chains, not in a Zunia database. Local caches live until you
        clear them. Server logs for the website live for the short period our host keeps request
        logs for operations, then they roll off. Mail lives in the mailbox until we delete it.
        We do not run a data lake of wallet activity.
      </P>

      <H2>Requests</H2>
      <P>
        If you want to know what we hold about an email address you used to write to us, or you
        want that correspondence deleted, write to dev@zunialab.com from that address. We can
        act on mail we received. We cannot delete a transaction from a chain, and we cannot
        delete a key that never left your device.
      </P>
      <P>
        We do not claim a particular court, regulator, or transfer mechanism in this policy. The
        practical fact is simpler: the sensitive secret never comes to us, so there is nothing
        to export and nothing to correct on our side.
      </P>

      <H2>Changes</H2>
      <P>
        If we start collecting something this policy says we do not, we will change the policy
        first and change the date at the top. A new analytics tool, a new account system, or a
        new hosted service would be a change of that kind. Adding a sentence to the website is
        not. The date on this page is the date the text was last revised.
      </P>

      <H2>Contact</H2>
      <P>
        Privacy questions: <a href={LINKS.supportEmail}>dev@zunialab.com</a>. Security reports:{" "}
        <a href={LINKS.securityEmail}>security@zunialab.com</a>, under the{" "}
        <a href={LINKS.disclosure}>disclosure policy</a>.
      </P>
    </DocumentPage>
  );
}
