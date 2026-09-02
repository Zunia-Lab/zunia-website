"use client";

import { useEffect, useState } from "react";
import { Amount, Mark, Progress, cn } from "@zunialab/ui";
import { PhoneFrame } from "@/components/site/Frames";
import { CHAINS } from "@/content/site";
import { ChainMark, chainTicker } from "@/components/mocks/ChainMark";
import { usePrefersReducedMotion } from "@/components/mocks/MockQr";

/**
 * Product mocks rendered from the design system rather than screenshots, so they
 * cannot drift from the shipped UI and they stay sharp at any density.
 */

function MicroLabel({ children }: { children: string }) {
  return (
    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-fg-dim">{children}</div>
  );
}

function AssetLine({
  name,
  balance,
  value,
  delta,
  positive = true,
  active,
  chain,
}: {
  name: string;
  balance: string;
  value: string;
  delta?: string;
  positive?: boolean;
  active?: boolean;
  chain?: (typeof CHAINS)[number];
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-[12px] p-2 transition-colors duration-500",
        active && "bg-[var(--z-state-selected)]",
      )}
    >
      {chain ? (
        <ChainMark chain={chain} size={26} />
      ) : (
        <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-fg text-bg">
          <Mark size={13} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11.5px] font-medium leading-tight text-fg">
          {name}
        </span>
        <span className="mt-0.5 block font-mono text-[9px] text-fg-dim">{balance}</span>
      </span>
      <span className="text-right">
        <span className="block text-[11.5px] font-medium leading-tight tabular-nums text-fg">
          {value}
        </span>
        {delta ? (
          <span
            className={cn(
              "mt-0.5 block font-mono text-[9px] tabular-nums",
              positive ? "text-[var(--z-success)]" : "text-[var(--z-danger)]",
            )}
          >
            {delta}
          </span>
        ) : null}
      </span>
    </div>
  );
}

const QUICK_ACTIONS = [
  { label: "Send", glyph: "↑", primary: true },
  { label: "Receive", glyph: "↓" },
  { label: "Swap", glyph: "⇄" },
  { label: "Stake", glyph: "◆" },
];

const PHONE_TABS = ["Home", "Earn", "Swap", "Missions", "dApps"];

function PhoneTabBar({ active }: { active: string }) {
  return (
    <div className="relative mx-3 mb-3 flex items-center justify-between rounded-full border border-[var(--z-line)] bg-[var(--z-glass)] px-3 py-2">
      {PHONE_TABS.map((tab) => (
        <span
          key={tab}
          className={cn(
            "font-mono text-[8px] uppercase tracking-[0.08em]",
            tab === active
              ? "rounded-full bg-fg px-2.5 py-1.5 text-bg"
              : "text-fg-dim",
          )}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

const HUB = CHAINS.find((c) => c.chainId === "cosmoshub-4");
const OSMO = CHAINS.find((c) => c.chainId === "osmosis-1");
const SAFRO = CHAINS.find((c) => c.home) ?? CHAINS[0];

/** Mobile home: total balance, quick actions, staking prompt, asset list. */
export function PhoneHome({ caption }: { caption?: string }) {
  const reduced = usePrefersReducedMotion();
  const [worth, setWorth] = useState(12408.2);
  const [activeAsset, setActiveAsset] = useState(0);
  const [actionIndex, setActionIndex] = useState(0);
  const [delta, setDelta] = useState(3.4);

  useEffect(() => {
    if (reduced) return;
    const tick = window.setInterval(() => {
      setWorth((value) => value + (Math.random() * 14 - 4));
      setDelta((value) => Math.max(0.4, Math.min(6.8, value + (Math.random() * 0.4 - 0.15))));
    }, 1400);
    const highlight = window.setInterval(() => {
      setActiveAsset((value) => (value + 1) % 3);
    }, 2800);
    const action = window.setInterval(() => {
      setActionIndex((value) => (value + 1) % QUICK_ACTIONS.length);
    }, 3200);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(highlight);
      window.clearInterval(action);
    };
  }, [reduced]);

  const dollars = Math.floor(worth);
  const cents = (worth - dollars).toFixed(2).slice(1);

  const assets = [
    {
      name: "Cosmos Hub",
      balance: `612.40 ${chainTicker("cosmoshub-4")}`,
      value: "$4,102",
      delta: `+${delta.toFixed(1)}%`,
      positive: true,
      chain: HUB,
    },
    {
      name: "Osmosis",
      balance: `1,204.8 ${chainTicker("osmosis-1")}`,
      value: "$3,880",
      delta: "-1.2%",
      positive: false,
      chain: OSMO,
    },
    {
      name: "Safrochain",
      balance: `1,250.00 ${chainTicker("safrochain-1")}`,
      value: "$2,410",
      delta: "+8.1%",
      positive: true,
      chain: SAFRO,
    },
  ];

  return (
    <PhoneFrame caption={caption}>
      <div className="relative flex items-center gap-2 px-3.5 pt-3.5">
        <span className="flex items-center gap-2 rounded-full bg-[var(--z-glass-2)] py-1.5 pl-1.5 pr-3">
          <span className="flex size-[18px] items-center justify-center rounded-full bg-fg font-mono text-[8px] text-bg">
            M
          </span>
          <span className="text-[11px] font-medium text-fg">Main</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-[var(--z-glass-2)] px-2.5 py-2 font-mono text-[9px] text-fg-muted">
          <span aria-hidden className="zw-mock-pulse size-1.5 rounded-full bg-[var(--z-success)]" />
          Mainnet 5
        </span>
      </div>

      <div className="relative px-4 pt-4">
        <MicroLabel>Total balance</MicroLabel>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-[30px] font-medium leading-none tracking-[-0.04em] tabular-nums text-fg">
            ${dollars.toLocaleString("en-US")}
            <span className="text-fg-dim">{cents}</span>
          </span>
          <span className="pb-1 font-mono text-[10px] text-[var(--z-success)]">
            +{delta.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="relative mx-4 mt-4 flex gap-1.5">
        {QUICK_ACTIONS.map((action, index) => (
          <span
            key={action.label}
            className={cn(
              "flex h-10 flex-1 flex-col items-center justify-center gap-0.5 rounded-[12px] font-mono text-[8px] uppercase transition-all duration-300",
              action.primary || index === actionIndex
                ? "bg-accent text-accent-fg"
                : "bg-[var(--z-glass-2)] text-fg-muted",
              index === actionIndex && "zw-mock-action",
            )}
          >
            <span aria-hidden className="font-sans text-[12px]">
              {action.glyph}
            </span>
            {action.label}
          </span>
        ))}
      </div>

      <div className="relative mx-4 mt-3.5 rounded-[14px] border border-[var(--z-line-strong)] bg-[var(--z-state-selected)] p-3">
        <div className="text-[13px] font-medium leading-tight text-fg">Earn 18.4% staking</div>
        <div className="mt-1 text-[10px] leading-snug text-fg-muted">
          Claim across chains in one signature.
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-1 overflow-hidden px-4 pt-3">
        {assets.map((asset, index) => (
          <AssetLine
            key={asset.name}
            name={asset.name}
            balance={asset.balance}
            value={asset.value}
            delta={asset.delta}
            positive={asset.positive}
            active={index === activeAsset}
            chain={asset.chain}
          />
        ))}
      </div>

      <PhoneTabBar active="Home" />
    </PhoneFrame>
  );
}

const MISSIONS = [
  { title: "First IBC transfer", xp: 120 },
  { title: "Delegate on 2 chains", xp: 200 },
  { title: "Vote on a proposal", xp: 150 },
  { title: "Swap in a dApp", xp: 150 },
];

/** Missions: seasonal XP progress and the week's tasks. */
export function PhoneMissions({ caption }: { caption?: string }) {
  const reduced = usePrefersReducedMotion();
  const [xp, setXp] = useState(780);
  const [doneCount, setDoneCount] = useState(2);
  const [claimPulse, setClaimPulse] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setXp((value) => {
        if (value >= 1000) return 640;
        const next = value + 8;
        if (next >= 900 && value < 900) setDoneCount(3);
        if (next >= 1000) {
          setDoneCount(4);
          setClaimPulse(true);
          window.setTimeout(() => setClaimPulse(false), 900);
          return 1000;
        }
        return next;
      });
    }, 220);
    return () => window.clearInterval(id);
  }, [reduced]);

  const progress = Math.min(100, Math.round((xp / 1000) * 100));
  const claimable = Math.min(320, Math.max(80, Math.round((xp - 460) / 2)));

  return (
    <PhoneFrame caption={caption}>
      <div className="relative flex items-center gap-2.5 px-4 pt-4">
        <span className="text-[15px] font-medium tracking-tight text-fg">Missions</span>
        <span className="ml-auto rounded-full bg-[var(--z-glass-2)] px-2.5 py-1.5 font-mono text-[9px] text-fg-muted">
          Season 2
        </span>
      </div>

      <div className="relative mx-4 mt-3 rounded-[16px] border border-[var(--z-line-strong)] bg-[var(--z-state-selected)] p-3.5">
        <div className="flex items-baseline">
          <MicroLabel>Your progress</MicroLabel>
          <span className="ml-auto font-mono text-[9px] tabular-nums text-fg-muted">
            {xp} / 1000 XP
          </span>
        </div>
        <div className="mt-2 text-[26px] font-medium leading-none tracking-[-0.035em] text-fg">
          Level <span className="text-fg-dim">{xp >= 1000 ? 5 : 4}</span>
        </div>
        <Progress
          value={progress}
          className="mt-3"
          aria-label={`${progress} percent to next level`}
        />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-1 overflow-hidden px-4 pt-3.5">
        <MicroLabel>This week</MicroLabel>
        {MISSIONS.map((mission, index) => {
          const done = index < doneCount;
          const active = index === doneCount;
          return (
            <div
              key={mission.title}
              className={cn(
                "flex items-center gap-2.5 rounded-[12px] p-2 transition-colors duration-500",
                done && "bg-[var(--z-state-selected)]",
                active && "ring-1 ring-inset ring-[rgba(var(--zw-cobalt-bright),0.45)]",
              )}
            >
              <span
                className={cn(
                  "flex size-[26px] shrink-0 items-center justify-center rounded-[9px] text-[11px] transition-colors duration-500",
                  done ? "bg-fg text-bg" : "bg-[var(--z-glass-2)] text-fg-muted",
                )}
                aria-hidden
              >
                {done ? "✓" : active ? "◎" : "◇"}
              </span>
              <span className="min-w-0 flex-1 text-[11.5px] font-medium leading-tight text-fg">
                {mission.title}
              </span>
              <span className="font-mono text-[9px] tabular-nums text-fg-dim">
                {done ? `+${mission.xp} XP` : active ? "in progress" : `+${mission.xp}`}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative mx-4 mb-3">
        <span
          className={cn(
            "flex h-[42px] items-center justify-center rounded-full bg-accent text-[12.5px] font-medium text-accent-fg",
            claimPulse ? "zw-mock-glow" : "zw-mock-action",
          )}
        >
          Claim {claimable} XP
        </span>
      </div>
    </PhoneFrame>
  );
}

/** Hero device: portfolio total, seven-day bars, two primary actions. */
export function HeroPhone() {
  const reduced = usePrefersReducedMotion();
  const [bars, setBars] = useState([36, 52, 44, 66, 58, 82, 70, 94]);
  const [worth, setWorth] = useState(12408.2);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setBars((prev) =>
        prev.map((height, index) => {
          const next = height + (Math.random() * 10 - 5);
          const floor = index === 5 || index === 7 ? 62 : 28;
          return Math.max(floor, Math.min(98, next));
        }),
      );
      setWorth((value) => value + (Math.random() * 16 - 5));
    }, 1800);
    return () => window.clearInterval(id);
  }, [reduced]);

  const dollars = Math.floor(worth);
  const cents = (worth - dollars).toFixed(2).slice(1);

  return (
    <div className="relative mx-auto mt-14 w-[288px] max-w-full">
      <div
        className={cn(
          "rounded-[42px] p-[9px]",
          "bg-[linear-gradient(180deg,rgba(244,245,247,0.28),rgba(244,245,247,0.06))]",
          "shadow-[0_50px_90px_var(--z-shadow)]",
        )}
      >
        <div
          className="relative overflow-hidden rounded-[34px] px-4 pb-9 pt-4"
          style={{
            background: "linear-gradient(172deg, #16255C 0%, #0B1230 52%, #060A18 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[60px] -top-[40px] size-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--zw-cobalt),.55) 0%, rgba(var(--zw-cobalt),0) 68%)",
            }}
          />
          <div className="relative flex items-center justify-between font-mono text-[12px] font-medium text-fg">
            <span>9:41</span>
            <span
              aria-hidden
              className="absolute left-1/2 top-[-6px] h-[22px] w-[72px] -translate-x-1/2 rounded-full bg-[var(--z-n0)]"
            />
            <span aria-hidden className="tracking-[0.1em]">
              ●●●
            </span>
          </div>

          <div className="relative mt-10">
            <MicroLabel>Portfolio</MicroLabel>
            <div className="mt-2.5 text-[34px] font-medium leading-none tracking-[-0.035em] tabular-nums text-fg">
              ${dollars.toLocaleString("en-US")}
              <span className="text-fg-dim">{cents}</span>
            </div>
          </div>

          <div aria-hidden className="relative mt-6 flex h-24 items-end gap-[5px]">
            {bars.map((height, index) => (
              <span
                key={index}
                className={cn(
                  "flex-1 rounded-t-[4px] transition-[height] duration-700 ease-out",
                  index === 5 || index === 7
                    ? "bg-[rgb(var(--zw-cobalt))]"
                    : "bg-[var(--z-glass-2)]",
                )}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <div className="relative mt-6 flex gap-2">
            <span className="zw-mock-action flex h-10 flex-1 items-center justify-center rounded-full bg-accent text-[13px] font-medium text-accent-fg">
              Send
            </span>
            <span className="flex h-10 flex-1 items-center justify-center rounded-full border border-[var(--z-line-strong)] text-[13px] font-medium text-fg">
              Stake
            </span>
          </div>
        </div>
      </div>

      {/* Floating asset cards. Absolute on wide viewports, stacked below the
          device once there is no room beside it. */}
      <div className="mt-6 flex flex-col gap-3.5 lg:mt-0 lg:block">
        <FloatCard
          className="zw-float-a lg:absolute lg:-left-[152px] lg:top-[158px] lg:w-[262px]"
          chain={HUB}
          logo="ATOM"
          name="Cosmos Hub"
          denom="ATOM"
          value="$4,102.40"
          meta="+ 3.4%"
          metaTone="success"
        />
        <FloatCard
          className="zw-float-b lg:absolute lg:-right-[158px] lg:top-[336px] lg:w-[262px]"
          chain={SAFRO}
          logo="mark"
          name="Safrochain"
          denom="SAF"
          value="$2,410.00"
          meta="1,250 SAF"
        />
      </div>
    </div>
  );
}

function FloatCard({
  logo,
  name,
  denom,
  value,
  meta,
  metaTone,
  className,
  chain,
}: {
  logo: string;
  name: string;
  denom: string;
  value: string;
  meta: string;
  metaTone?: "success";
  className?: string;
  chain?: (typeof CHAINS)[number];
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] p-px",
        "bg-[linear-gradient(140deg,rgba(244,245,247,0.4),rgba(244,245,247,0.08))]",
        "shadow-[0_26px_50px_var(--z-shadow)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 rounded-[19px] bg-[rgba(7,11,26,0.92)] px-4 py-3.5 backdrop-blur-xl">
        {chain ? (
          <ChainMark chain={chain} size={34} />
        ) : (
          <span
            className={cn(
              "flex size-[34px] shrink-0 items-center justify-center rounded-full font-mono text-[10px]",
              logo === "mark"
                ? "bg-fg text-bg"
                : "border border-[var(--z-line-strong)] bg-[var(--z-glass-2)] text-fg",
            )}
          >
            {logo === "mark" ? <Mark size={16} /> : logo.slice(0, 2)}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-medium leading-tight text-fg">{name}</span>
          <span className="mt-0.5 block font-mono text-[11px] text-fg-dim">{denom}</span>
        </span>
        <span className="text-right">
          <Amount value={value} size="sm" className="block leading-tight" />
          <span
            className={cn(
              "mt-0.5 block font-mono text-[11px] tabular-nums",
              metaTone === "success" ? "text-[var(--z-success)]" : "text-fg-dim",
            )}
          >
            {meta}
          </span>
        </span>
      </div>
    </div>
  );
}
