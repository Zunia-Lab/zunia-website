"use client";

import Image from "next/image";
import { cn } from "@zunialab/ui";
import type { ChainEntry } from "@/content/site";

export function ChainMark({
  chain,
  size = 20,
  className,
}: {
  chain: Pick<ChainEntry, "name" | "logo">;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-full",
        "bg-[var(--z-glass)] ring-1 ring-inset ring-[var(--z-line)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={chain.logo}
        alt=""
        width={size}
        height={size}
        className="size-full object-contain"
      />
    </span>
  );
}

/** Short ticker for mock balances when we only have a chain id. */
export function chainTicker(chainId: string): string {
  const map: Record<string, string> = {
    "safrochain-1": "SAF",
    "cosmoshub-4": "ATOM",
    "osmosis-1": "OSMO",
    celestia: "TIA",
    "neutron-1": "NTRN",
    "injective-1": "INJ",
    "dydx-mainnet-1": "DYDX",
    "stride-1": "STRD",
    "juno-1": "JUNO",
    "akashnet-2": "AKT",
    "noble-1": "USDC",
    "axelar-dojo-1": "AXL",
    "kaiyo-1": "KUJI",
    "phoenix-1": "LUNA",
    "pacific-1": "SEI",
    "archway-1": "ARCH",
  };
  return map[chainId] ?? chainId.slice(0, 4).toUpperCase();
}
