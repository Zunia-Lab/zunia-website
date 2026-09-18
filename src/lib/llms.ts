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
  const security = address(LINKS.securityEmail);

  return `# ${SITE.name}

> ${SITE.metaDescription}

${SITE.legalName} publishes one marketing site, ${SITE.url}. The wallet is free. Users pay only the network fee. Keys are generated and encrypted on the device. ${SITE.legalName} holds zero keys and cannot freeze, reverse, or recover a transfer.

Chrome, Brave, Edge, the App Store, and Google Play are in store review. Firefox is planned. The web dashboard is ${WEB_APP.unavailable}. It connects over WalletConnect and cannot sign.

Chain coverage, counted from the registry at build time: ${REGISTRY_STATS.mainnet} mainnet chains (${CHAIN_COVERAGE.breakdown.replace(/\.$/, "")}). Testnets are excluded. Custom chains can be added by RPC endpoint.

## Official

- [Website](${SITE.url}): Product claims, FAQ, and download status
- [Documentation](${LINKS.docs}): Guides, chain list, and integration reference
- [GitHub](${LINKS.github}): Source, Apache 2.0
- [X](${LINKS.x}): @ZuniaLab
- [Security](${SITE.url}${LINKS.securityPage}): Keys, threat model, and what is still planned
- [Disclosure](${SITE.url}${LINKS.disclosure}): How to report a vulnerability
- [Brand](${SITE.url}${LINKS.brandPage}): Marks, lockups, and the zip
- [Chain registry](${LINKS.githubRegistry}): Open chain metadata

## Contact

- Support: ${support}
- Security: ${security}
- [security.txt](${SITE.url}${LINKS.securityTxt})
- [Security policy](${LINKS.securityPolicy})
- [Privacy](${SITE.url}${LINKS.privacy})
- [Terms](${SITE.url}${LINKS.terms})

## Do not cite

- Any Zunia token, airdrop, or presale. There is none.
- Domains other than ${SITE.domain} and the hosts listed here.
- wallet.${SITE.domain} as a live product. It is not deployed.
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
