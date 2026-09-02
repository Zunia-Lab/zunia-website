/**
 * Pulls the featured chain list, its logos and the coverage counts out of the
 * chain registry and into this repo.
 *
 * The site used to hard-code both the chain names and the "chains supported"
 * number, which let the page drift away from what the wallet actually reads at
 * runtime. Deriving them means a chain we do not ship can no longer be
 * advertised: an unknown chain id fails the build of this file instead.
 *
 * Logos are copied in rather than hot-linked to raw.githubusercontent.com. The
 * page already self-hosts its fonts to keep the privacy claim true, and the
 * same rule has to apply to sixteen images above the fold.
 *
 * Usage:  node scripts/sync-chains.mjs
 * Registry location:  $ZUNIA_CHAIN_REGISTRY, or the sibling checkout.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { copyFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = resolve(HERE, "..");
const OUT_DIR = join(SITE_ROOT, "public", "chains");
const OUT_MODULE = join(SITE_ROOT, "src", "content", "chains.generated.ts");

/** Chain ids shown in the marquee, in display order. */
const FEATURED = [
  { chainId: "safrochain-1", home: true },
  { chainId: "cosmoshub-4" },
  { chainId: "osmosis-1" },
  { chainId: "celestia" },
  { chainId: "neutron-1" },
  { chainId: "injective-1" },
  { chainId: "dydx-mainnet-1" },
  { chainId: "stride-1" },
  { chainId: "juno-1" },
  { chainId: "akashnet-2" },
  { chainId: "noble-1" },
  { chainId: "axelar-dojo-1" },
  { chainId: "kaiyo-1" },
  { chainId: "phoenix-1" },
  { chainId: "pacific-1" },
  { chainId: "archway-1" },
];

const FAMILIES = ["cosmos", "evm", "svm"];
const IMAGE_URL_PREFIX =
  "https://raw.githubusercontent.com/Zunia-Lab/zunia-chain-registry/main/images/";

function looksLikeRegistry(dir) {
  return FAMILIES.every((family) => existsSync(join(dir, family)));
}

function findRegistry() {
  // An explicit path that turns out to be wrong is a mistake worth reporting,
  // not something to quietly paper over with the sibling checkout.
  const fromEnv = process.env.ZUNIA_CHAIN_REGISTRY;
  if (fromEnv) {
    if (!looksLikeRegistry(fromEnv)) {
      throw new Error(
        `ZUNIA_CHAIN_REGISTRY is set to ${resolve(fromEnv)}, which has no ` +
          `${FAMILIES.join("/")} directories in it.`,
      );
    }
    return resolve(fromEnv);
  }

  const sibling = resolve(SITE_ROOT, "..", "zunia-chain-registry");
  if (looksLikeRegistry(sibling)) return sibling;

  throw new Error(
    `Chain registry not found at ${sibling}.\n` +
      `Clone Zunia-Lab/zunia-chain-registry next to this repo, or set ZUNIA_CHAIN_REGISTRY.`,
  );
}

/** Every registry entry, keyed by chain id, plus the mainnet counts per family. */
function readRegistry(registryRoot) {
  const byChainId = new Map();
  const counts = {};

  for (const family of FAMILIES) {
    const dir = join(registryRoot, family);
    let mainnet = 0;

    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".json")) continue;

      const entry = JSON.parse(readFileSync(join(dir, file), "utf8"));
      if (!entry.chainId) continue;

      byChainId.set(entry.chainId, entry);
      // A hidden or testnet entry ships in the registry but is not something
      // the site can count as a supported chain.
      if (!entry.hideInUI && !entry.isTestnet) mainnet += 1;
    }

    counts[family] = mainnet;
  }

  return { byChainId, counts };
}

/** Repo-relative path of a chain logo, validated against the published prefix. */
function logoSourcePath(entry) {
  const url = entry.chainSymbolImageUrl;
  if (!url) {
    throw new Error(`${entry.chainId} has no chainSymbolImageUrl in the registry.`);
  }
  if (!url.startsWith(IMAGE_URL_PREFIX)) {
    throw new Error(
      `${entry.chainId} points its logo outside the registry:\n  ${url}\n` +
        `Expected it to start with ${IMAGE_URL_PREFIX}`,
    );
  }
  return join("images", url.slice(IMAGE_URL_PREFIX.length));
}

async function main() {
  const registryRoot = findRegistry();
  const { byChainId, counts } = readRegistry(registryRoot);

  const missing = FEATURED.filter((chain) => !byChainId.has(chain.chainId));
  if (missing.length > 0) {
    throw new Error(
      `These chains are featured on the site but absent from the registry:\n` +
        missing.map((chain) => `  ${chain.chainId}`).join("\n") +
        `\nAdd them to the registry or drop them from FEATURED.`,
    );
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const resolved = [];
  for (const chain of FEATURED) {
    const entry = byChainId.get(chain.chainId);
    const source = join(registryRoot, logoSourcePath(entry));
    if (!existsSync(source)) {
      throw new Error(
        `${chain.chainId} logo is declared but not committed:\n  ${source}`,
      );
    }

    const file = `${chain.chainId}.png`;
    await copyFile(source, join(OUT_DIR, file));
    resolved.push({
      chainId: chain.chainId,
      name: entry.chainName,
      logo: `/chains/${file}`,
      home: chain.home,
    });
  }

  // Drop logos left behind by a chain that is no longer featured.
  const keep = new Set(resolved.map((chain) => `${chain.chainId}.png`));
  for (const file of readdirSync(OUT_DIR)) {
    if (!keep.has(file)) rmSync(join(OUT_DIR, file));
  }

  const mainnet = FAMILIES.reduce((total, family) => total + counts[family], 0);

  const body = resolved
    .map((chain) => {
      const fields = [
        `chainId: ${JSON.stringify(chain.chainId)}`,
        `name: ${JSON.stringify(chain.name)}`,
        `logo: ${JSON.stringify(chain.logo)}`,
        chain.home ? "home: true" : null,
      ].filter(Boolean);
      return `  { ${fields.join(", ")} },`;
    })
    .join("\n");

  const generated = `/**
 * Generated by scripts/sync-chains.mjs. Do not edit by hand.
 *
 * Run \`pnpm sync:chains\` against a checkout of Zunia-Lab/zunia-chain-registry
 * to refresh the names, the logos in public/chains and the counts below.
 */

import type { ChainEntry } from "./site";

export const CHAINS: ChainEntry[] = [
${body}
];

/** Mainnet entries in the registry, excluding testnets and hidden chains. */
export const REGISTRY_STATS = {
  cosmos: ${counts.cosmos},
  evm: ${counts.evm},
  svm: ${counts.svm},
  mainnet: ${mainnet},
} as const;
`;

  writeFileSync(OUT_MODULE, generated);

  console.log(
    `Synced ${resolved.length} featured logos into public/chains ` +
      `and ${mainnet} mainnet chains (${counts.cosmos} Cosmos, ${counts.evm} EVM, ` +
      `${counts.svm} SVM) from ${registryRoot}`,
  );
}

main().catch((error) => {
  console.error(`\nsync-chains failed.\n\n${error.message}\n`);
  process.exit(1);
});
