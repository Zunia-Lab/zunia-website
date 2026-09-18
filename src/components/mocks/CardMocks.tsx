"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Callout,
  FeeSummary,
  MessageDecodeList,
  Progress,
  QrFrame,
  cn,
} from "@zunialab/ui";
import { BrowserFrame } from "@/components/site/Frames";
import { CHAINS } from "@/content/site";
import { ChainMark, chainTicker } from "@/components/mocks/ChainMark";
import { MockQr, usePrefersReducedMotion } from "@/components/mocks/MockQr";

const SAFRO = CHAINS.find((chain) => chain.home) ?? CHAINS[0];
const FROM_POOL = CHAINS.filter((chain) => chain.chainId !== SAFRO.chainId);

/**
 * Read-only twin of the `Segmented` primitive. The real control needs a change
 * handler, which cannot cross the server boundary, and a mock has nothing to
 * change anyway.
 */
function StaticSegmented({
  options,
  value,
  className,
}: {
  options: string[];
  value: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "inline-flex gap-0.5 rounded-full border border-[var(--z-line)] p-[3px]",
        className,
      )}
    >
      {options.map((option) => (
        <span
          key={option}
          className={cn(
            "rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors duration-[var(--z-duration-slow)]",
            option === value ? "bg-accent text-accent-fg" : "text-fg-muted",
          )}
        >
          {option}
        </span>
      ))}
    </div>
  );
}

function CardShell({
  title,
  aside,
  children,
  className,
}: {
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-[var(--z-line)] bg-[var(--z-glass)] p-[18px]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-[14px] font-medium text-fg">{title}</span>
        {aside ? <span className="ml-auto">{aside}</span> : null}
      </div>
      {children}
    </div>
  );
}

function MicroRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success";
}) {
  return (
    <div className="flex justify-between font-mono text-[10px]">
      <span className="text-fg-dim">{label}</span>
      <span
        className={cn("tabular-nums text-fg", tone === "success" && "text-[var(--z-success)]")}
      >
        {value}
      </span>
    </div>
  );
}

/** IBC transfer: the route, channel and fee resolved before signing. */
export function IbcTransferCard() {
  const reduced = usePrefersReducedMotion();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setPulse((value) => (value + 1) % 100), 40);
    return () => window.clearInterval(id);
  }, [reduced]);

  const from = CHAINS.find((chain) => chain.chainId === "cosmoshub-4") ?? FROM_POOL[0];
  const to = SAFRO;

  return (
    <CardShell title="IBC transfer" className="h-full w-full">
      <div className="mt-3.5 rounded-[14px] border border-[var(--z-line)] bg-[var(--z-glass)] p-3.5">
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-dim">Route</div>
        <div className="mt-3.5 flex items-center gap-2.5">
          <span className="flex-1 text-center">
            <span className="mx-auto flex size-8 items-center justify-center">
              <ChainMark chain={from} size={32} />
            </span>
            <span className="mt-2 block font-mono text-[9px] leading-tight text-fg-muted">
              {from.chainId}
            </span>
          </span>
          <span aria-hidden className="relative h-px flex-1 overflow-visible bg-[var(--z-line-strong)]">
            <span
              className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-[rgb(var(--zw-cobalt-bright))] shadow-[0_0_8px_rgba(var(--zw-cobalt-bright),0.35)]"
              style={{
                left: `${reduced ? 50 : pulse}%`,
                transition: reduced ? undefined : "left 40ms linear",
              }}
            />
          </span>
          <span className="flex-1 text-center">
            <span className="mx-auto flex size-8 items-center justify-center">
              <ChainMark chain={to} size={32} />
            </span>
            <span className="mt-2 block font-mono text-[9px] leading-tight text-fg-muted">
              {to.chainId}
            </span>
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          <MicroRow label="Channel" value="channel-141" />
          <MicroRow label="Est. time" value="~4.2s" tone="success" />
          <MicroRow
            label="Fees"
            value={`0.003 ${chainTicker(from.chainId)} + 0.001 ${chainTicker(to.chainId)}`}
          />
        </div>
      </div>
      <Callout tone="info" className="mt-3.5">
        Channel, fees and route resolved before you sign.
      </Callout>
    </CardShell>
  );
}

/** Bridge: a live IBC hop into Safrochain, with relay progress. */
export function BridgeCard() {
  const reduced = usePrefersReducedMotion();
  const [fromIndex, setFromIndex] = useState(0);
  const [progress, setProgress] = useState(18);
  const [modeIndex, setModeIndex] = useState(0);
  const modes = ["IBC", "EVM", "Solana"] as const;
  const modeCount = modes.length;

  useEffect(() => {
    if (reduced) return;
    const hop = window.setInterval(() => {
      setFromIndex((value) => (value + 1) % FROM_POOL.length);
      setProgress(12 + Math.floor(Math.random() * 18));
    }, 4200);
    const tick = window.setInterval(() => {
      setProgress((value) => (value >= 96 ? 14 : value + 1));
    }, 90);
    const mode = window.setInterval(() => {
      setModeIndex((value) => (value + 1) % modeCount);
    }, 6800);
    return () => {
      window.clearInterval(hop);
      window.clearInterval(tick);
      window.clearInterval(mode);
    };
  }, [reduced, modeCount]);

  const from = FROM_POOL[fromIndex] ?? FROM_POOL[0];
  const to = SAFRO;
  const fromTicker = chainTicker(from.chainId);
  const toTicker = chainTicker(to.chainId);
  const step = Math.min(3, Math.max(1, Math.ceil(progress / 34)));
  const eta = Math.max(1, Math.round((100 - progress) / 8));

  return (
    <CardShell
      title="Bridge"
      className="h-full w-full"
      aside={<StaticSegmented options={[...modes]} value={modes[modeIndex]} />}
    >
      <div
        key={`from-${from.chainId}`}
        className="zw-mock-swap mt-3.5 rounded-[14px] border border-[var(--z-line)] bg-[var(--z-glass)] p-3.5"
      >
        <div className="flex justify-between font-mono text-[9px] text-fg-dim">
          <span>FROM {from.name.toUpperCase()}</span>
          <span className="tabular-nums">
            {(1.2 + (fromIndex % 5) * 0.08).toFixed(3)} {fromTicker}
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="flex items-center gap-2 rounded-full bg-[var(--z-glass-2)] py-1.5 pl-1.5 pr-3">
            <ChainMark chain={from} size={20} />
            <span className="text-[11px] font-medium text-fg">{fromTicker}</span>
          </span>
          <span className="ml-auto text-[22px] font-medium leading-none tracking-[-0.03em] tabular-nums text-fg">
            0.500
          </span>
        </div>
      </div>

      <div className="my-2.5 flex justify-center">
        <span
          aria-hidden
          className="zw-mock-bounce flex size-[30px] items-center justify-center rounded-[10px] bg-[rgb(var(--zw-cobalt))] text-[13px] text-fg"
        >
          ↓
        </span>
      </div>

      <div className="rounded-[14px] border border-[var(--z-line)] bg-[var(--z-glass)] p-3.5">
        <div className="flex justify-between font-mono text-[9px] text-fg-dim">
          <span>TO {to.name.toUpperCase()}</span>
          <span>safro1q9f…7k2d</span>
        </div>
        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="flex items-center gap-2 rounded-full bg-[var(--z-glass-2)] py-1.5 pl-1.5 pr-3">
            <ChainMark chain={to} size={20} />
            <span className="text-[11px] font-medium text-fg">{toTicker}</span>
          </span>
          <span className="ml-auto text-[22px] font-medium leading-none tracking-[-0.03em] tabular-nums text-fg-muted">
            0.4982
          </span>
        </div>
      </div>

      <div className="mt-3.5 rounded-[14px] border border-[var(--z-line-strong)] bg-[var(--z-state-selected)] p-3.5">
        <div className="flex items-center gap-2 font-mono text-[9.5px] text-fg-muted">
          <span className="zw-mock-pulse inline-flex size-1.5 rounded-full bg-[rgb(var(--zw-cobalt-bright))]" />
          relaying via IBC
          <span className="ml-auto text-fg">
            {step} of 3 · ~{eta} min
          </span>
        </div>
        <Progress
          value={progress}
          className="mt-2.5"
          aria-label={`Relay ${progress} percent complete`}
        />
      </div>

      <div className="mt-3.5 flex flex-col gap-2.5">
        <MicroRow label="Bridge fee" value={`0.0018 ${fromTicker}`} />
        <MicroRow label="Arrival" value={`~${eta + 2} min`} />
      </div>

      <span className="mt-3.5 flex h-[42px] items-center justify-center rounded-full bg-accent text-[13px] font-medium text-accent-fg">
        Review bridge
      </span>
    </CardShell>
  );
}

/** Extension approval: two decoded messages, the exact chain and the fee. */
export function ApprovalCard() {
  const osmosis = CHAINS.find((chain) => chain.chainId === "osmosis-1") ?? FROM_POOL[0];

  return (
    <BrowserFrame label="extension popup · approve">
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <ChainMark chain={osmosis} size={32} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium leading-tight text-fg">
              app.osmosis.zone
            </span>
            <span className="mt-0.5 block font-mono text-[9px] text-[var(--z-success)]">
              verified domain
            </span>
          </span>
          <span className="rounded-full bg-[var(--z-glass-2)] px-2.5 py-1.5 font-mono text-[9px] text-fg-dim">
            {osmosis.chainId}
          </span>
        </div>

        <div className="mt-3.5 text-[15px] font-medium tracking-tight text-fg">
          Approve 2 messages
        </div>

        <MessageDecodeList
          className="mt-3"
          messages={[
            {
              type: "MsgSwapExactAmountIn · pool 1441",
              summary: "Swap 50 OSMO for 172.4 SAF",
            },
            {
              type: "MsgTransfer · channel-141",
              summary: "Send 172.4 SAF to safrochain-1",
            },
          ]}
        />

        <FeeSummary
          className="mt-3"
          rows={[
            { label: "Network fee", value: "0.004 OSMO" },
            { label: "Simulation", value: "No errors" },
          ]}
        />

        <div className="mt-3.5 flex gap-2">
          <span className="flex h-10 flex-1 items-center justify-center rounded-full border border-[var(--z-line-strong)] text-[12px] font-medium text-fg">
            Reject
          </span>
          <span className="zw-mock-glow flex h-10 flex-[1.4] items-center justify-center rounded-full bg-accent text-[12px] font-medium text-accent-fg">
            Approve
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}

/** Web portfolio: the read-only view at wallet.zunialab.com. */
export function PortfolioCard() {
  const reduced = usePrefersReducedMotion();
  const [points, setPoints] = useState([18, 26, 23, 39, 34, 51, 46, 63, 58, 74, 78]);
  const [worth, setWorth] = useState(12408.2);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setPoints((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1] ?? 50;
        next.push(Math.max(12, Math.min(92, last + (Math.random() * 10 - 4))));
        return next;
      });
      setWorth((value) => value + (Math.random() * 18 - 6));
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <BrowserFrame label="wallet.zunialab.com · portfolio">
      <div className="flex flex-col gap-2.5 p-3">
        <div className="grid gap-2.5 sm:grid-cols-3">
          {[
            { label: "Net worth", value: `$${worth.toFixed(2)}` },
            { label: "Claimable", value: "$142.80", highlight: true },
            { label: "Avg APR", value: "18.4%" },
          ].map((tile) => (
            <div
              key={tile.label}
              className={cn(
                "rounded-[12px] border p-3",
                tile.highlight
                  ? "border-[var(--z-line-strong)] bg-[var(--z-state-selected)]"
                  : "border-[var(--z-line)] bg-[var(--z-glass)]",
              )}
            >
              <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-fg-dim">
                {tile.label}
              </div>
              <div className="mt-2 text-[17px] font-medium leading-none tracking-[-0.03em] tabular-nums text-fg">
                {tile.value}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[12px] border border-[var(--z-line)] bg-[var(--z-glass)] p-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-medium text-fg">Balance</span>
            <StaticSegmented className="ml-auto" options={["1D", "1W", "1M"]} value="1W" />
          </div>
          <AreaChart className="mt-2.5" points={points} />
        </div>

        {[
          {
            chain: CHAINS.find((c) => c.chainId === "cosmoshub-4")!,
            balance: "612.40",
            value: "$4,102",
          },
          {
            chain: SAFRO,
            balance: "1,250.00",
            value: "$2,410",
          },
        ].map((row, index) => (
          <div
            key={row.chain.chainId}
            className={cn(
              "flex items-center gap-2.5 rounded-[12px] px-2.5 py-2.5",
              index === 0 && "bg-[var(--z-state-selected)]",
            )}
          >
            <ChainMark chain={row.chain} size={26} />
            <span className="min-w-0 flex-1 text-[11.5px] font-medium text-fg">
              {chainTicker(row.chain.chainId)}
            </span>
            <span className="font-mono text-[9.5px] tabular-nums text-fg-muted">{row.balance}</span>
            <span className="w-[62px] text-right text-[11px] font-medium tabular-nums text-fg">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

/** Device pairing: gated by the passcode, then a code with a short life. */
export function PairingCard({ className }: { className?: string } = {}) {
  const reduced = usePrefersReducedMotion();
  const [seconds, setSeconds] = useState(48);
  const [seed, setSeed] = useState(0x5af70);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setSeed((current) => (current + 0x9e3779b9) >>> 0);
          return 60;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const urgent = seconds <= 12;

  return (
    <CardShell title="Pair a device" className={cn("w-[min(300px,100%)]", className)}>
      <QrFrame size={132} className="mt-4">
        <MockQr size={118} seed={seed} className="text-fg" />
      </QrFrame>
      <p className="mt-3.5 m-0 text-[11px] leading-relaxed text-fg-muted">
        Passcode or Face ID first, then a code that expires in 60 seconds. Keys stay on the
        device.
      </p>
      <div
        className={cn(
          "mt-3 inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 font-mono text-[9.5px]",
          urgent
            ? "bg-[var(--z-warning-fill)] text-[var(--z-warning-fg)]"
            : "bg-[var(--z-glass-2)] text-fg-muted",
        )}
      >
        expires in{" "}
        <span className={cn("tabular-nums", urgent ? "text-[var(--z-warning)]" : "text-fg")}>
          {seconds} s
        </span>
      </div>
    </CardShell>
  );
}
