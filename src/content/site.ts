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
  domain: "zunialab.com",
  url: "https://zunialab.com",
  tagline: "Hold, send, stake, across every chain.",
  description:
    "Zunia is a multi-chain wallet for the Cosmos ecosystem, running as a browser extension and a mobile app on the same keys.",
  /** Search and link-preview copy. Longer than the hero line, still the same claims. */
  metaDescription:
    "Self-custody wallet for the Cosmos ecosystem. Hold, send, and stake from a browser extension and a phone that share the same keys. No account, no token.",
  /** Date the factual claims below were last reviewed. Shown next to the stats. */
  claimsReviewedAt: "2026-10-07",
  releaseChannel: "1.0 release candidate",
} as const;

/**
 * Public docs host. Pages live under `/docs/` (Docusaurus). Paths are the
 * current pages, not the old addresses that now redirect. The host answers a
 * page path without its trailing slash with a 301, so the links carry it.
 */
const DOCS_HOME = "https://docs.zunialab.com";
const DOCS = `${DOCS_HOME}/docs`;

/**
 * Every destination the site can send a reader to, so a dead one is corrected
 * in one place. Each entry was resolved before it was written down; a host that
 * does not exist yet is absent from this list rather than present and broken.
 */
export const LINKS = {
  docs: DOCS_HOME,
  docsChains: `${DOCS}/chain-registry/overview/`,
  docsIntegrate: `${DOCS}/integrate/extension/`,
  /* Backing up and restoring a phrase is the keys page. */
  docsRecovery: `${DOCS}/use-wallet/keys/`,
  /* Network fees are a section of the networks page. */
  docsFees: `${DOCS}/use-wallet/networks/`,
  docsReproducible: `${DOCS}/developers/reproducible-builds/`,
  /* Custom RPC endpoints are explained on the networks page. */
  docsRpc: `${DOCS}/use-wallet/networks/`,
  github: "https://github.com/Zunia-Lab",
  x: "https://x.com/ZuniaLab",
  githubExtension: "https://github.com/Zunia-Lab/zunia-extension",
  chromeWebStore:
    "https://chromewebstore.google.com/detail/zunia/ngokakoekdogobjmokipglbcclelgajk",
  githubMobile: "https://github.com/Zunia-Lab/zunia-mobile",
  githubRegistry: "https://github.com/Zunia-Lab/zunia-chain-registry",
  githubUi: "https://github.com/Zunia-Lab/zunia-ui",
  /* The web dashboard. app.zunialab.com is its only address;
     wallet.zunialab.com, where it ran before launch, and dashboard.zunialab.com
     answer with a permanent redirect to the same path here. */
  app: "https://app.zunialab.com",
  /* Opens the dashboard's Connect wallet list on arrival, with the Zunia
     extension first on a computer. The dashboard drops the parameter once it
     has acted on it. */
  appConnect: "https://app.zunialab.com/?connect=wallets",
  appOverview: "https://app.zunialab.com/overview",
  githubDashboard: "https://github.com/Zunia-Lab/zunia-dashboard",
  githubIssues: "https://github.com/Zunia-Lab/zunia-extension/issues",
  brand: "https://github.com/Zunia-Lab/zunia-brand",
  brandPage: "/brand",
  supportPage: "/support",
  securityPage: "/security",
  disclosure: "/legal/disclosure",
  license: "https://github.com/Zunia-Lab/zunia-extension/blob/main/LICENSE",
  securityPolicy: "https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md",
  securityTxt: "/.well-known/security.txt",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  mapZone: "https://ibcmap.zunialab.com",
  updates: "https://updates.zunialab.com",
  updatesVersions: "https://updates.zunialab.com/versions",
  updatesRequests: "https://updates.zunialab.com/requests",
  updatesReport: "https://updates.zunialab.com/requests/new",
  supportEmail: "mailto:dev@zunialab.com",
  gmail: "mailto:zunialab@gmail.com",
} as const;

/**
 * Fragments are written root-relative because the header and footer also render
 * on /legal/*, where a bare "#chains" would resolve to nothing.
 *
 * On the home page the browser treats "/#chains" as a same-document jump only
 * while the current URL carries no query string: the HTML navigation algorithm
 * compares the two URLs with fragments excluded, so arriving on
 * "/?utm_source=twitter" and clicking a nav item would otherwise be a full
 * document reload that drops the query. `SameDocumentFragments` in the root
 * layout restores the same-document behaviour for that case.
 */
export const NAV = [
  { label: "Wallet", href: "/#wallet" },
  { label: "Chains", href: "/#chains" },
  { label: "Platforms", href: "/#platforms" },
  { label: "Security", href: "/#security" },
  { label: "Developers", href: "/#developers" },
  { label: "FAQ", href: "/#faq" },
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
 * One button per install surface. Chrome is the Chrome Web Store listing.
 * Safari is the same extension, for macOS and iOS, and is still in review.
 * Firefox ships as its own add-on and is still planned.
 */
export const DOWNLOADS: DownloadTarget[] = [
  {
    id: "chrome",
    label: "Chrome",
    href: LINKS.chromeWebStore,
    availability: "available",
    kind: "browser",
    requirement: "Chrome 120 and later",
    requirementShort: "Chrome 120+",
  },
  {
    id: "safari",
    label: "Safari",
    href: LINKS.githubExtension,
    availability: "review",
    kind: "browser",
    requirement: "Safari on macOS and iOS",
    requirementShort: "Safari",
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
 *
 * It holds no key. It reads public chain data, and anything that moves funds
 * is prepared there and signed in the wallet the visitor connected: the Zunia
 * extension, Keplr, or Zunia Mobile by QR code.
 */
export const WEB_APP = {
  label: "Web dashboard",
  /** The header's call to action. */
  cta: "Launch app",
  href: LINKS.app,
  host: "app.zunialab.com",
  availability: "available" as Availability,
  requirement: "Nothing to install",
  blurb:
    "Balances, staking, governance and swaps for every Cosmos chain, in the browser. It connects the Zunia extension, Keplr, or Zunia Mobile by QR code, and every transaction is signed there, so the keys never reach it.",
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
  /** Where the card leads, for a capability with a page of its own. */
  href?: string;
  linkLabel?: string;
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
    body: "Portfolio, rewards and activity for every Cosmos chain in one view.",
    href: LINKS.appOverview,
    linkLabel: "Open the dashboard",
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
  targets: { label: string; availability: Availability; href?: string }[];
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
      { label: "Chrome", availability: "available", href: LINKS.chromeWebStore },
      { label: "Safari", availability: "review" },
      { label: "Firefox", availability: "planned" },
    ],
    specs: [
      { label: "Minimum browser", value: "Chrome 120, Safari, Firefox" },
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
    value: "dev@zunialab.com, 90-day coordinated window, acknowledgements page.",
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
  /** When set, the value opens this official listing. */
  href?: string;
}

/*
 * The block only protects anyone if the statuses are true. The Firefox add-on
 * is not published and the APK checksum is not posted yet, so they carry the
 * planned badge: an identifier marked available that does not exist teaches
 * the reader to trust whatever turns up at that name first.
 */
export const PROVENANCE: ProvenanceItem[] = [
  { label: "Only official domain", value: "zunialab.com", status: "available", mono: true },
  { label: "Web dashboard", value: "app.zunialab.com", status: "available", mono: true, href: LINKS.app },
  { label: "Documentation", value: "docs.zunialab.com", status: "available", mono: true, href: LINKS.docs },
  { label: "Android package", value: "com.zuniawallet.zunia_mobile", status: "available", mono: true },
  { label: "iOS bundle", value: "com.zuniawallet.zuniaMobile", status: "available", mono: true },
  { label: "Firefox add-on id", value: "wallet@zunialab.com", status: "planned", mono: true },
  {
    label: "Chrome extension id",
    value: "ngokakoekdogobjmokipglbcclelgajk",
    status: "available",
    mono: true,
    href: LINKS.chromeWebStore,
  },
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
    q: "Is there a web version?",
    a: "Yes, the web dashboard at app.zunialab.com. It shows balances, staking, governance and swaps for every Cosmos chain you follow. It holds no key: connect the Zunia extension, Keplr, or Zunia Mobile by QR code, and every transaction it prepares opens in that wallet to be signed.",
  },
  {
    q: "Which chains are supported?",
    a: `${CHAIN_COVERAGE.total} chains from the Zunia chain registry: ${CHAIN_COVERAGE.breakdown.replace(/\.$/, "")}, including Safrochain. The list updates without an app release. Custom chains can be added by RPC endpoint.`,
  },
  {
    q: "What does it cost?",
    a: "The wallet is free to install, and there is no premium tier. You pay the network fee for each transaction, shown before you sign. Swaps made with the Swap screen of the web dashboard also carry a commission of 0.5% of the amount sold, paid to Zunia in the same transaction, in the token you sell, and shown in the swap review before you sign. A swap you make on a dApp and only sign with Zunia carries no Zunia commission. Sends, IBC transfers, staking and votes carry no commission, and Zunia takes no cut of staking rewards.",
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
  { label: "Support", value: "dev@zunialab.com, wallet help and security reports", href: LINKS.supportEmail },
  { label: "General", value: "zunialab@gmail.com", href: LINKS.gmail },
  { label: "Bugs", value: "GitHub issues, public triage", href: LINKS.githubIssues },
  /* There was a "Network status" card here pointing at status.zunialab.com.
     No status page exists on any host, so the card was claiming a channel we do
     not operate on the one section that says these are the only channels we
     operate. Removed rather than repointed. */
  { label: "Chain registry", value: "Request or correct a chain, public repository", href: LINKS.githubRegistry },
  { label: "Brand", value: "Logo, wordmark and usage rules", href: LINKS.brandPage },
] as const;

export const RISK_DISCLOSURE = [
  "Zunia is a self-custody wallet. It is not a custodian, an exchange, a broker or a bank, and it cannot freeze, reverse or recover a transaction.",
  "You are responsible for your recovery phrase. Lose it and the funds are unreachable.",
  "Fiat values are indicative, sourced from third-party price feeds, and may be stale or wrong.",
  "Nothing on this site is investment advice. Staking locks funds for an unbonding period and can lose value through slashing.",
] as const;

/**
 * A footer entry either navigates somewhere that exists or says why it does
 * not. The union enforces that: drop `href` and the compiler demands `pending`,
 * so an entry cannot become a silent dead link the way "Web portfolio" did
 * while it pointed at a host with no DNS record.
 */
export type FooterEntry =
  | { label: string; href: string; pending?: never }
  | { label: string; href?: never; pending: string };

export interface FooterColumn {
  title: string;
  links: FooterEntry[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Chrome", href: LINKS.chromeWebStore },
      { label: "Browser extension", href: "/#platforms" },
      { label: "Mobile wallet", href: "/#platforms" },
      { label: "Web dashboard", href: LINKS.app },
      { label: "Supported chains", href: "/#chains" },
      { label: "Map Zone", href: LINKS.mapZone },
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
      { label: "Security", href: LINKS.securityPage },
      { label: "Verify your install", href: "/#verify" },
      { label: "Disclosure policy", href: LINKS.disclosure },
      { label: "security.txt", href: LINKS.securityTxt },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Support", href: LINKS.supportPage },
      { label: "Privacy", href: LINKS.privacy },
      { label: "Terms", href: LINKS.terms },
      { label: "Brand", href: LINKS.brandPage },
    ],
  },
  {
    title: "Updates",
    links: [
      { label: "Changelog", href: LINKS.updates },
      { label: "Versions", href: LINKS.updatesVersions },
      { label: "Requests", href: LINKS.updatesRequests },
      { label: "Report", href: LINKS.updatesReport },
    ],
  },
];

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: "Available",
  review: "In store review",
  development: "In development",
  planned: "Planned",
};
