import { LINKS } from "@/content/site";

export type SupportTopic = "keys" | "chrome" | "safari" | "transactions" | "safety";

export interface SupportArticle {
  id: string;
  topic: SupportTopic;
  title: string;
  summary: string;
  body: string[];
  href?: string;
  linkLabel?: string;
}

export const SUPPORT_TOPICS: { id: SupportTopic | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "keys", label: "Keys" },
  { id: "chrome", label: "Chrome" },
  { id: "safari", label: "Safari" },
  { id: "transactions", label: "Transactions" },
  { id: "safety", label: "Safety" },
];

/**
 * Answers a person can act on without writing in. Every sentence is a claim
 * the product already makes: no account, no token, keys on the device, and
 * the Safari extension living inside the Zunia app.
 */
export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: "chrome-install",
    topic: "chrome",
    title: "Install Zunia in Chrome",
    summary: "The official Chrome build is the Chrome Web Store listing.",
    href: LINKS.chromeWebStore,
    linkLabel: "Add to Chrome",
    body: [
      "Add Zunia from the Chrome Web Store. That listing is the only official Chrome download.",
      "The extension id on the listing is ngokakoekdogobjmokipglbcclelgajk. If an install shows a different id, it is not this release.",
    ],
  },
  {
    id: "phrase",
    topic: "safety",
    title: "We never ask for your recovery phrase",
    summary: "A real message from Zunia Lab does not ask for the phrase, a screenshot of it, or remote access.",
    body: [
      "The recovery phrase is created on your device and never leaves it. Zunia Lab has no copy, so a support reply cannot use one.",
      "We also do not start the conversation. If a message arrives first, in email, in a group chat, or from an account that looks like Zunia, it is not from us.",
      "The only addresses are zunialab@gmail.com and dev@zunialab.com.",
    ],
  },
  {
    id: "lost-phrase",
    topic: "keys",
    title: "The recovery phrase is the only backup",
    summary: "If the phrase is gone, the funds are unreachable. There is no reset.",
    body: [
      "Self-custody has no password reset. Zunia Lab cannot recover a wallet, freeze it, or reverse a transfer.",
      "Write the phrase down offline before you fund the wallet, and keep a second copy in a different place. Do not store it in a screenshot, a cloud note, or a chat.",
    ],
  },
  {
    id: "no-account",
    topic: "keys",
    title: "There is no Zunia account and no Zunia token",
    summary: "Nothing to sign up for, and nothing called a Zunia token, airdrop, or presale.",
    body: [
      "You do not create a Zunia login. The wallet is the keys on your device.",
      "The wallet is free to install. You pay the network fee, shown before you sign. Swaps made with the web dashboard's Swap screen also carry a commission of 0.5% of the amount sold, shown before you sign. Zunia takes no cut of a transfer or of staking rewards.",
      "Anything selling a Zunia token is a scam, whoever it appears to come from.",
    ],
  },
  {
    id: "safari-mac",
    topic: "safari",
    title: "Turn Zunia on in Safari on a Mac",
    summary: "Install the Zunia app, then enable the extension in Safari settings.",
    body: [
      "The Mac app is how Safari gets the extension. Open it once. The window tells you how to turn the extension on. The wallet itself opens from the Safari toolbar.",
      "In Safari, open Settings, then Extensions. Turn Zunia on. When Safari asks which websites it may run on, choose Always Allow on Every Website.",
      "A Cosmos site only sees the wallet on sites you allowed. If you allow a single site, every other site behaves as if Zunia is not installed.",
    ],
  },
  {
    id: "safari-ios",
    topic: "safari",
    title: "Turn Zunia on in Safari on iPhone or iPad",
    summary: "Install the Zunia app, then enable it under Settings, Apps, Safari, Extensions.",
    body: [
      "Open Settings, then Apps, then Safari, then Extensions, and turn Zunia on.",
      "The wallet opens from the Safari toolbar. The Zunia app is the switch that installs that extension. It is not a second wallet.",
    ],
  },
  {
    id: "safari-balances",
    topic: "safari",
    title: "Balances stay empty until Safari allows other websites",
    summary: "Safari does not prompt for this. You allow it in the extension's website settings.",
    body: [
      "On iPhone or iPad: Settings, Apps, Safari, Extensions, Zunia, Other Websites, Allow.",
      "On a Mac: Safari, Settings, Extensions, Zunia, and allow it on every website.",
      "Until that permission is on, the extension cannot read public chain data, so balances and prices stay empty. The keys are still on the device.",
    ],
  },
  {
    id: "approve",
    topic: "transactions",
    title: "A site cannot sign unless you approve it",
    summary: "Connect and signature requests stop on a confirmation screen.",
    body: [
      "A Cosmos site can ask to connect an account or request a signature. Nothing is signed until you confirm that request in Zunia.",
      "Read the prompt. A page cannot read the recovery phrase through the connection, but it can still spend if you approve a transaction you did not mean to sign.",
    ],
  },
  {
    id: "web-dashboard",
    topic: "chrome",
    title: "Connect the extension to the web dashboard",
    summary: "Open app.zunialab.com, choose Connect wallet, then Zunia extension. Every transaction still opens in the extension.",
    href: LINKS.appConnect,
    linkLabel: "Open the web dashboard",
    body: [
      "Open app.zunialab.com in the browser where Zunia is installed. Choose Connect wallet, then Zunia extension, and approve the connection in the extension.",
      "The dashboard sees your addresses, never your recovery phrase or your keys. It reads balances, staking and governance from public chain data.",
      "Anything that moves funds, a send, a swap, a stake or a vote, opens in the extension first. Nothing is signed until you approve it there.",
      "The dashboard also connects Keplr, and Zunia Mobile by QR code. Its only address is app.zunialab.com.",
    ],
  },
  {
    id: "same-keys",
    topic: "keys",
    title: "The same phrase works on the extension and the phone",
    summary: "Import the phrase, or pair the two by QR. The key stays on each device.",
    body: [
      "Importing the same recovery phrase gives you the same accounts. Pairing by QR syncs accounts and names. The signing key is not copied to a server.",
      "A desktop transaction can also be approved by scanning it with the phone, so that computer does not have to hold the key.",
    ],
  },
  {
    id: "hardware",
    topic: "keys",
    title: "Hardware wallets",
    summary: "Ledger over USB, Keystone by QR. The seed stays in the device.",
    body: [
      "Ledger Nano S Plus, Nano X, and Stax connect over USB and WebHID. Keystone 3 connects by QR.",
      "Zunia prepares the unsigned transaction, the device signs, and the client broadcasts.",
    ],
  },
  {
    id: "report",
    topic: "safety",
    title: "Where to write",
    summary: "Two addresses. Wallet help and security reports share one of them.",
    body: [
      "Wallet help and vulnerability reports go to dev@zunialab.com. We aim to answer within one business day. The disclosure page describes the vulnerability process.",
      "Everything else goes to zunialab@gmail.com.",
      "A public bug can also be filed on the extension's GitHub issues.",
    ],
  },
];

export const SUPPORT_CONTACTS = [
  {
    label: "Support",
    value: "dev@zunialab.com",
    detail: "Wallet help and vulnerability reports. We aim to answer within one business day.",
    href: LINKS.supportEmail,
  },
  {
    label: "General",
    value: "zunialab@gmail.com",
    detail: "Everything else, including brand questions.",
    href: LINKS.gmail,
  },
  {
    label: "Documentation",
    value: "docs.zunialab.com",
    detail: "Guides, the chain list, and how to connect a site.",
    href: LINKS.docs,
  },
  {
    label: "Bugs",
    value: "GitHub issues",
    detail: "Public reports on the extension repository.",
    href: LINKS.githubIssues,
  },
] as const;
