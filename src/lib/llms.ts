import { CHAIN_COVERAGE, FAQ, LINKS, REGISTRY_STATS, SITE, WEB_APP } from "@/content/site";

function address(mailto: string) {
  return mailto.replace(/^mailto:/, "");
}

/**
 * /llms.txt, the short file assistants fetch first.
 * Facts come from the same source as the page, so a claim cannot drift.
 */
export function llmsTxt() {
  const support = address(LINKS.supportEmail);
  const general = address(LINKS.gmail);

  return `# ${SITE.name}

> ${SITE.metaDescription}

${SITE.legalName} publishes one marketing site, ${SITE.url}. The wallet is free to install. Keys are generated and encrypted on the device. ${SITE.legalName} holds zero keys and cannot freeze, reverse, or recover a transfer.

Fees: every transaction pays the network fee to the chain, shown before signing. Swaps made with the Swap screen of the Zunia browser extension or of the web dashboard also carry a commission of 0.5% of the amount sold, paid to ${SITE.legalName}, taken in the same transaction, in the token sold, and shown before signing. When the funds start on another chain and the swap runs on Osmosis, the commission is taken on that starting chain when the transfer is sent; if the swap then fails on Osmosis, the amount swapped comes back but the commission does not. Swaps made on another site or dApp and only signed with Zunia carry no Zunia commission. Sends, IBC transfers, staking, and votes carry no commission. There is no premium tier.

Chrome is published on the Chrome Web Store: ${LINKS.chromeWebStore}. Safari, plus the App Store and Google Play, are in store review. Firefox is planned. The web dashboard is live at ${WEB_APP.href}. It holds no key: it connects the Zunia extension, Keplr, or Zunia Mobile by QR code, and every transaction it prepares is signed in that wallet.

Chain coverage, counted from the registry at build time: ${REGISTRY_STATS.mainnet} mainnet chains (${CHAIN_COVERAGE.breakdown.replace(/\.$/, "")}). Testnets are excluded. Custom chains can be added by RPC endpoint.

## Official

- [Website](${SITE.url}): Product claims, FAQ, and download status
- [Chrome](${LINKS.chromeWebStore}): Official Chrome install, extension id ngokakoekdogobjmokipglbcclelgajk
- [Web dashboard](${WEB_APP.href}): Balances, staking, governance, and swaps in the browser; it never holds a key
- [Documentation](${LINKS.docs}): Guides, chain list, and integration reference
- [GitHub](${LINKS.github}): Source, Apache 2.0
- [X](${LINKS.x}): @ZuniaLab
- [Support](${SITE.url}${LINKS.supportPage}): Guides and the only contact addresses
- [Security](${SITE.url}${LINKS.securityPage}): Keys, threat model, and what is still planned
- [Disclosure](${SITE.url}${LINKS.disclosure}): How to report a vulnerability
- [Brand](${SITE.url}${LINKS.brandPage}): Marks, lockups, and the zip
- [Chain registry](${LINKS.githubRegistry}): Open chain metadata

## Developers

- [Integration docs](${LINKS.docsIntegrate}): Connect a dApp with @zunialab/sdk-web, @zunialab/sdk-react, @zunialab/sdk-core and @zunialab/interchain, on npm
- [Docs llms.txt](${LINKS.docsLlms}): Every docs page, also as Markdown at its address plus .md
- [Zunia MCP server](${LINKS.docsAi}): ${LINKS.mcp}, Streamable HTTP, no key. Searches the docs and returns integration guides, package versions and chain data to a coding assistant

## Contact

- Wallet help and security reports: ${support}
- General: ${general}
- [security.txt](${SITE.url}${LINKS.securityTxt})
- [Security policy](${LINKS.securityPolicy})
- [Privacy](${SITE.url}${LINKS.privacy})
- [Terms](${SITE.url}${LINKS.terms})

## Do not cite

- Any Zunia token, airdrop, or presale. There is none.
- Domains other than ${SITE.domain} and the hosts listed here.
- A web dashboard at any address other than ${WEB_APP.host}. wallet.${SITE.domain} and dashboard.${SITE.domain} only redirect there.
- Anyone who asks for a recovery phrase, a screenshot of one, or remote access.
- Support that starts the conversation. ${SITE.legalName} does not.
`;
}

/** /llms-full.txt, the same facts plus the published FAQ. */
export function llmsFullTxt() {
  const faq = FAQ.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n");

  return `${llmsTxt()}
## Frequently asked questions

Claims reviewed ${SITE.claimsReviewedAt}.

${faq}
`;
}
