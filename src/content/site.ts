/**
 * Single source of truth for every claim rendered on the marketing site.
 *
 * Anything factual on the page must be traceable to this file so a claim can be
 * reviewed, dated and corrected in one place. Values that are not yet published
 * carry `status: "planned"` rather than a placeholder, because an unverifiable
 * number on a wallet site is worse than an honest "not yet".
 *
 * The one exception is the chain list, which is generated from the registry so
 * it cannot be edited into something the wallet does not support.
 */

import { CHAINS, REGISTRY_STATS } from "./chains.generated";

export const SITE = {
  name: "Zunia",
  legalName: "Zunia Lab",
  domain: "zuniawallet.com",
  url: "https://zuniawallet.com",
  tagline: "Hold, send, stake, across every chain.",
  description:
    "Zunia is a multi-chain wallet for the Cosmos ecosystem, running as a browser extension and a mobile app on the same keys.",
  /** Date the factual claims below were last reviewed. Shown next to the stats. */
  claimsReviewedAt: "2026-08-31",
  releaseChannel: "1.0 release candidate",
} as const;

export const LINKS = {
  docs: "https://docs.zuniawallet.com",
  docsChains: "https://docs.zuniawallet.com/chains",
  docsIntegrate: "https://docs.zuniawallet.com/connect/sdk",
  docsRecovery: "https://docs.zuniawallet.com/wallet/recovery",
  docsFees: "https://docs.zuniawallet.com/wallet/fees",
  docsReproducible: "https://docs.zuniawallet.com/security/reproducible-builds",
  docsRpc: "https://docs.zuniawallet.com/security/endpoints",
  dashboard: "https://wallet.zuniawallet.com",
  status: "https://status.zuniawallet.com",
  github: "https://github.com/Zunia-Lab",
  githubExtension: "https://github.com/Zunia-Lab/zunia-extension",
  githubMobile: "https://github.com/Zunia-Lab/zunia-mobile",
  githubRegistry: "https://github.com/Zunia-Lab/zunia-chain-registry",
  githubUi: "https://github.com/Zunia-Lab/zunia-ui",
  githubIssues: "https://github.com/Zunia-Lab/zunia-extension/issues",
  brand: "https://github.com/Zunia-Lab/zunia-brand",
  license: "https://github.com/Zunia-Lab/zunia-extension/blob/main/LICENSE",
  securityPolicy: "https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md",
  securityTxt: "/.well-known/security.txt",
  privacy: "/privacy",
  terms: "/terms",
  disclosures: "/disclosures",
  supportEmail: "mailto:support@zuniawallet.com",
  securityEmail: "mailto:security@zuniawallet.com",
  brandEmail: "mailto:brand@zuniawallet.com",
  x: "https://x.com/zuniawallet",
} as const;

export const NAV = [
  { label: "Wallet", href: "#wallet" },
  { label: "Chains", href: "#chains" },
  { label: "Platforms", href: "#platforms" },
  { label: "Security", href: "#security" },
  { label: "Developers", href: "#developers" },
  { label: "FAQ", href: "#faq" },
] as const;

/* -------------------------------------------------------------------------- */
/* Hero and downloads                                                         */
/* -------------------------------------------------------------------------- */

/**
 * `development` sits between the other two on purpose: something being built
 * right now is a different promise from something merely on the roadmap, and
 * the page has surfaces in both states.
 */
export type Availability = "available" | "review" | "development" | "planned";

export interface DownloadTarget {
  id: string;
  label: string;
  href: string;
  availability: Availability;
  /** Browser extension vs mobile store; the hero groups them visually. */
  kind: "browser" | "store";
  /** Short answer to "will this work on my machine". */
  requirement: string;
  /** Same answer, condensed for the single-line summary under the hero. */
  requirementShort: string;
}

/**
 * One button per install surface. The Chromium build covers Chrome, Brave and
 * Edge today; Firefox is listed separately because it ships as its own add-on
 * and is still planned. Labels stay short so six buttons still fit the hero.
 */
export const DOWNLOADS: DownloadTarget[] = [
  {
    id: "chrome",
    label: "Chrome",
    href: LINKS.githubExtension,
    availability: "review",
    kind: "browser",
    requirement: "Chrome 120 and later",
    requirementShort: "Chrome 120+",
  },
  {
    id: "brave",
    label: "Brave",
    href: LINKS.githubExtension,
    availability: "review",
    kind: "browser",
    requirement: "Brave with Chromium 120+",
    requirementShort: "Brave",
  },
  {
    id: "edge",
    label: "Edge",
    href: LINKS.githubExtension,
    availability: "review",
    kind: "browser",
    requirement: "Edge 120 and later",
    requirementShort: "Edge",
  },
  {
    id: "firefox",
    label: "Firefox",
    href: LINKS.githubExtension,
    availability: "planned",
    kind: "browser",
    requirement: "Firefox 128 and later",
    requirementShort: "Firefox",
  },
  {
    id: "ios",
    label: "App Store",
    href: LINKS.githubMobile,
    availability: "review",
    kind: "store",
    requirement: "iOS 15 and later",
    requirementShort: "iOS 15+",
  },
  {
    id: "android",
    label: "Play Store",
    href: LINKS.githubMobile,
    availability: "review",
    kind: "store",
    requirement: "Android 8.0 and later",
    requirementShort: "Android 8+",
  },
];

/**
 * The dashboard is a fourth surface but not a download, so it sits outside
 * `DOWNLOADS`: the store status and the minimum-version line under the hero
 * describe only things you install. Named the way the docs name it, so the
 * header, the hero and the documentation do not each invent a label.
 */
export const WEB_APP = {
  label: "Web dashboard",
  href: LINKS.dashboard,
  availability: "development" as Availability,
  requirement: "Nothing to install",
  blurb:
    "Balances, activity and staking in the browser. It connects to the extension or the phone over WalletConnect, so the keys never reach it.",
} as const;

/* -------------------------------------------------------------------------- */
/* Stats. Every number carries its own method, because a stat without a        */
/* method is a slogan.                                                        */
/* -------------------------------------------------------------------------- */

export interface SiteStat {
  value: string;
  label: string;
  detail: string;
  /** How the number is produced, shown in the footnote row. */
  method: string;
}

export const STATS: SiteStat[] = [
  {
    value: String(REGISTRY_STATS.mainnet),
    label: "Chains supported",
    detail: "from the Zunia chain registry, updated without an app release",
    method:
      `Mainnet entries in the Zunia chain registry, counted at build time: ${REGISTRY_STATS.cosmos} Cosmos, ` +
      `${REGISTRY_STATS.evm} EVM and ${REGISTRY_STATS.svm} Solana. Testnets and entries hidden in the wallet are excluded.`,
  },
  {
    value: "4.2s",
    label: "Median transfer",
    detail: "end to end across IBC, fee shown on both ends before signing",
    method:
      "Median wall-clock time from signature to destination acknowledgement, measured on Cosmos Hub to Safrochain over channel-141 during internal testing.",
  },
  {
    value: "0",
    label: "Keys held by us",
    detail: "generated and encrypted on your device, never on a server",
    method:
      "Zunia operates no key-custody service. The claim is checkable in the open source client, which contains no key export path to a Zunia endpoint.",
  },
];

/* -------------------------------------------------------------------------- */
/* Capabilities                                                               */
/* -------------------------------------------------------------------------- */

export interface Capability {
  id: string;
  title: string;
  body: string;
  featured?: boolean;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "hold",
    title: "Hold",
    body: "Every balance across every chain in one list.",
  },
  {
    id: "transfer",
    title: "Transfer",
    body: "IBC in one step, channel and fee resolved for you.",
    featured: true,
  },
  {
    id: "stake",
    title: "Stake",
    body: "Delegate, claim and redelegate from one screen.",
  },
  {
    id: "connect",
    title: "Connect",
    body: "Any Cosmos dApp, per-site permissions.",
  },
  {
    id: "secure",
    title: "Secure",
    body: "Ledger, Keystone and QR signing on mobile.",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    body: "Portfolio, rewards and activity for every chain in one view.",
  },
];

/* -------------------------------------------------------------------------- */
/* Chains                                                                     */
/* -------------------------------------------------------------------------- */

export interface ChainEntry {
  chainId: string;
  name: string;
  /** Self-hosted copy of the registry logo, under /public/chains. */
  logo: string;
  /** Home chain gets a persistent highlight in the marquee and the list. */
  home?: boolean;
}

/**
 * The featured list, the logos and the counts all come from the chain registry
 * through `pnpm sync:chains`, so the site cannot advertise a chain the wallet
 * does not ship. Stargaze used to sit in this list with no registry entry
 * behind it.
 */
export { CHAINS, REGISTRY_STATS };

export const CHAIN_COVERAGE = {
  total: String(REGISTRY_STATS.mainnet),
  note: "Chain metadata is read from the registry at runtime, so a new chain does not require an app release. Custom and testnet chains can be added by RPC endpoint.",
  breakdown: `${REGISTRY_STATS.cosmos} Cosmos chains, ${REGISTRY_STATS.evm} EVM chains and ${REGISTRY_STATS.svm} Solana chain.`,
  registryHref: LINKS.githubRegistry,
  listHref: LINKS.docsChains,
} as const;

/* -------------------------------------------------------------------------- */
/* Platforms                                                                  */
/* -------------------------------------------------------------------------- */

export interface PlatformSpec {
  label: string;
  value: string;
}

export interface Platform {
  id: string;
  title: string;
  meta: string;
  body: string;
  availability: Availability;
  targets: { label: string; availability: Availability }[];
  specs: PlatformSpec[];
  href: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: "extension",
    title: "Browser extension",
    meta: "Manifest V3",
    body: "Signs where you work. Every transaction is decoded into plain language before you approve it, with the exact chain, fee and destination.",
    availability: "review",
    targets: [
      { label: "Chrome", availability: "review" },
      { label: "Brave", availability: "review" },
      { label: "Edge", availability: "review" },
      { label: "Firefox", availability: "planned" },
    ],
    specs: [
      { label: "Minimum browser", value: "Chrome 120 or Chromium equivalent" },
      { label: "Permissions", value: "Storage and active tab, per-site approval" },
      { label: "Package", value: "Reproducible build, checksum published per release" },
    ],
    href: LINKS.githubExtension,
  },
  {
    id: "mobile",
    title: "Mobile wallet",
    meta: "iOS and Android",
    body: "The same accounts in your pocket, unlocked with Face ID or fingerprint. Scan a QR code to approve a desktop transaction without exporting anything.",
    availability: "review",
    targets: [
      { label: "App Store", availability: "review" },
      { label: "Google Play", availability: "review" },
      { label: "Direct APK", availability: "available" },
    ],
    specs: [
      { label: "Minimum OS", value: "iOS 15, Android 8.0" },
      { label: "Unlock", value: "Face ID, Touch ID, fingerprint or passcode" },
      { label: "Air-gapped signing", value: "QR approval, no key ever leaves the phone" },
    ],
    href: LINKS.githubMobile,
  },
];

/* -------------------------------------------------------------------------- */
/* Security                                                                   */
/* -------------------------------------------------------------------------- */

export const SECURITY_SPECS: PlatformSpec[] = [
  { label: "Key generation", value: "On device, BIP39" },
  { label: "Derivation", value: "BIP44, coin type per chain" },
  { label: "Storage", value: "AES-256, OS keystore" },
  { label: "Unlock", value: "Passphrase or biometric" },
  { label: "Hardware", value: "Ledger Nano S Plus, Nano X, Stax, Keystone 3" },
  { label: "Telemetry", value: "None by default" },
  { label: "Licence", value: "Apache 2.0" },
];

export interface TransparencyItem {
  label: string;
  value: string;
  status: Availability;
  href?: string;
}

/**
 * The mockup says "read the audit" without naming an auditor, a scope or a date.
 * Until a report exists, the commitment is stated rather than implied.
 */
export const TRANSPARENCY: TransparencyItem[] = [
  {
    label: "Third-party audit",
    value: "Scoped for the 1.0 release. Auditor, scope and full report published here, unredacted.",
    status: "planned",
  },
  {
    label: "Source code",
    value: "Extension, mobile app, SDK and chain registry, Apache 2.0.",
    status: "available",
    href: LINKS.github,
  },
  {
    label: "Reproducible builds",
    value: "Build the extension from a tag and compare the checksum with the published store package.",
    status: "planned",
    href: LINKS.docsReproducible,
  },
  {
    label: "Responsible disclosure",
    value: "security@zuniawallet.com, 90-day coordinated window, acknowledgements page.",
    status: "available",
    href: LINKS.securityPolicy,
  },
  {
    label: "Bug bounty",
    value: "Opens with the audited 1.0 build. Key extraction and unauthorised signing rank highest.",
    status: "planned",
  },
];

/* -------------------------------------------------------------------------- */
/* Install provenance. The single most useful anti-phishing block on a wallet  */
/* site, and the one the mockup omits entirely.                                */
/* -------------------------------------------------------------------------- */

export interface ProvenanceItem {
  label: string;
  value: string;
  status: Availability;
  mono?: boolean;
}

export const PROVENANCE: ProvenanceItem[] = [
  { label: "Only official domain", value: "zuniawallet.com", status: "available", mono: true },
  { label: "Web portfolio", value: "wallet.zuniawallet.com", status: "available", mono: true },
  { label: "Documentation", value: "docs.zuniawallet.com", status: "available", mono: true },
  { label: "Android package", value: "com.zuniawallet.zunia_mobile", status: "available", mono: true },
  { label: "iOS bundle", value: "com.zuniawallet.zuniaMobile", status: "available", mono: true },
  { label: "Firefox add-on id", value: "extension@zuniawallet.com", status: "available", mono: true },
  { label: "Chrome extension id", value: "Published with the store listing", status: "planned" },
  { label: "APK SHA-256", value: "Published in each GitHub release, signed", status: "planned" },
];

export const PROVENANCE_WARNINGS = [
  "Zunia has no token, no airdrop and no presale. Any account offering one is impersonating us.",
  "Support never sends the first message and never asks for a recovery phrase, a screenshot of one, or a remote session.",
  "An extension that asks you to re-enter a recovery phrase after install is not Zunia.",
] as const;

/* -------------------------------------------------------------------------- */
/* Privacy                                                                    */
/* -------------------------------------------------------------------------- */

export const PRIVACY_POINTS = [
  { label: "No account", value: "No email, no sign-up, no profile to leak." },
  { label: "No analytics", value: "No tracking scripts and no cookies on this site." },
  { label: "Self-hosted assets", value: "Fonts and icons are served from our origin, so no third party sees your IP." },
  { label: "Your endpoints", value: "Default RPC endpoints are listed in the docs and every one can be replaced." },
] as const;

/* -------------------------------------------------------------------------- */
/* Developers                                                                 */
/* -------------------------------------------------------------------------- */

export const DEVELOPER_POINTS = [
  "Drop-in support for existing Cosmos dApps",
  "Amino and Direct signing, arbitrary messages",
  "Suggest a chain at runtime, testnets included",
  "WalletConnect v2 for the same calls on mobile",
] as const;

export type CodeTokenKind =
  | "plain"
  | "comment"
  | "keyword"
  | "string"
  | "punct"
  | "call";

export interface CodeToken {
  t: string;
  k?: CodeTokenKind;
}

export interface CodeLine {
  n: number;
  tokens: CodeToken[];
}

/**
 * Tokenised by hand rather than by a highlighter: the snippet is eight lines
 * and the colours have to match the landing mockup, not a theme package.
 */
export const CONNECT_SNIPPET: CodeLine[] = [
  {
    n: 1,
    tokens: [{ t: "// same call in the extension and over WalletConnect", k: "comment" }],
  },
  {
    n: 2,
    tokens: [
      { t: "const", k: "keyword" },
      { t: " chainId " },
      { t: "=", k: "punct" },
      { t: " " },
      { t: '"safrochain-1"', k: "string" },
      { t: ";", k: "punct" },
    ],
  },
  { n: 3, tokens: [] },
  {
    n: 4,
    tokens: [
      { t: "await", k: "keyword" },
      { t: " window" },
      { t: ".", k: "punct" },
      { t: "zunia" },
      { t: ".", k: "punct" },
      { t: "enable", k: "call" },
      { t: "(", k: "punct" },
      { t: "chainId" },
      { t: ");", k: "punct" },
    ],
  },
  {
    n: 5,
    tokens: [
      { t: "const", k: "keyword" },
      { t: " signer " },
      { t: "=", k: "punct" },
      { t: " window" },
      { t: ".", k: "punct" },
      { t: "zunia" },
      { t: ".", k: "punct" },
      { t: "getOfflineSigner", k: "call" },
      { t: "(", k: "punct" },
      { t: "chainId" },
      { t: ");", k: "punct" },
    ],
  },
  {
    n: 6,
    tokens: [
      { t: "const", k: "keyword" },
      { t: " " },
      { t: "[", k: "punct" },
      { t: "account" },
      { t: "]", k: "punct" },
      { t: " " },
      { t: "=", k: "punct" },
      { t: " " },
      { t: "await", k: "keyword" },
      { t: " signer" },
      { t: ".", k: "punct" },
      { t: "getAccounts", k: "call" },
      { t: "();", k: "punct" },
    ],
  },
  { n: 7, tokens: [] },
  {
    n: 8,
    tokens: [{ t: "// account.address -> safro1x...4f9", k: "comment" }],
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: "Does Zunia ever see my recovery phrase?",
    a: "No. The phrase is generated and encrypted on your device. There is no account, no email and no server-side key material, which also means recovery is your responsibility.",
  },
  {
    q: "What happens if I lose my recovery phrase?",
    a: "The funds are unreachable, by us and by anyone else. Self-custody has no password reset, so write the phrase down offline before you fund the wallet, and keep a second copy in a different place.",
  },
  {
    q: "Can I use the same wallet on desktop and phone?",
    a: "Yes. Import the same recovery phrase, or pair the two by QR code. Accounts and names sync; the key itself stays on each device.",
  },
  {
    q: "Which chains are supported?",
    a: "Over forty IBC chains from the Cosmos chain registry, including Safrochain, updated without an app release. Custom chains can be added by RPC endpoint.",
  },
  {
    q: "What does it cost?",
    a: "The wallet is free. You pay only the network fee for each transaction, shown before you sign. Zunia takes no cut of transfers or staking rewards, and there is no premium tier.",
  },
  {
    q: "Is the code public?",
    a: "Yes, Apache 2.0. A third-party audit and reproducible builds for the extension are scoped for the 1.0 release and will be published on this page.",
  },
  {
    q: "Does Zunia have a token?",
    a: "No. There is no Zunia token, no airdrop and no presale. Anything claiming otherwise is a scam, whoever it appears to come from.",
  },
  {
    q: "Do you support hardware wallets?",
    a: "Ledger Nano S Plus, Nano X and Stax over USB and WebHID, and Keystone 3 by QR code. On mobile you can also approve a desktop transaction by scanning it, so the key never touches the computer.",
  },
];

/* -------------------------------------------------------------------------- */
/* Support and legal                                                          */
/* -------------------------------------------------------------------------- */

export const SUPPORT_CHANNELS = [
  { label: "Documentation", value: "Guides, chain list and integration reference", href: LINKS.docs },
  { label: "Support", value: "support@zuniawallet.com, one business day", href: LINKS.supportEmail },
  { label: "Security", value: "security@zuniawallet.com, coordinated disclosure", href: LINKS.securityEmail },
  { label: "Bugs", value: "GitHub issues, public triage", href: LINKS.githubIssues },
  { label: "Network status", value: "Endpoint and indexer availability", href: LINKS.status },
  { label: "Brand", value: "Logo, wordmark and usage rules", href: LINKS.brand },
] as const;

export const RISK_DISCLOSURE = [
  "Zunia is a self-custody wallet. It is not a custodian, an exchange, a broker or a bank, and it cannot freeze, reverse or recover a transaction.",
  "You are responsible for your recovery phrase. Lose it and the funds are unreachable.",
  "Fiat values are indicative, sourced from third-party price feeds, and may be stale or wrong.",
  "Nothing on this site is investment advice. Staking locks funds for an unbonding period and can lose value through slashing.",
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Browser extension", href: "#platforms" },
      { label: "Mobile wallet", href: "#platforms" },
      { label: "Web portfolio", href: LINKS.dashboard },
      { label: "Supported chains", href: "#chains" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: LINKS.docs },
      { label: "Integrate Zunia", href: LINKS.docsIntegrate },
      { label: "Chain registry", href: LINKS.githubRegistry },
      { label: "GitHub", href: LINKS.github },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "#security" },
      { label: "Verify your install", href: "#verify" },
      { label: "Disclosure policy", href: LINKS.securityPolicy },
      { label: "security.txt", href: LINKS.securityTxt },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy", href: LINKS.privacy },
      { label: "Terms", href: LINKS.terms },
      { label: "Disclosures", href: LINKS.disclosures },
      { label: "Brand", href: LINKS.brand },
    ],
  },
] as const;

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: "Available",
  review: "In store review",
  development: "In development",
  planned: "Planned",
};
