"use client";

import { useEffect, useState } from "react";
import { cn } from "@zunialab/ui";
import { Eyebrow, Lede } from "@/components/site/Layout";
import { usePrefersReducedMotion } from "@/components/mocks/MockQr";

const STEPS = [
  {
    verb: "Propose",
    surface: "Extension",
    title: "The browser asks",
    body: "A dApp requests a signature. The popup decodes every message first: chain, fee, and destination, in plain language.",
    exchange: "osmosis-1 · 2 messages · fee shown before you sign",
  },
  {
    verb: "Confirm",
    surface: "Phone",
    title: "The phone answers",
    body: "Scan the code. Passcode or Face ID first. The signature is made on the phone and returned. The key never leaves it.",
    exchange: "QR · expires in 60s · nothing exported",
  },
  {
    verb: "Read",
    surface: "Web",
    title: "The web only watches",
    body: "Balances and activity update in the dashboard. It connects over WalletConnect, so it can show the result and cannot move funds.",
    exchange: "Read only · in development",
    quiet: true,
  },
] as const;

/**
 * How the three clients share one key. The extension starts a signature, the
 * phone can finish it, and the web view is not allowed to sign.
 */
export function PlatformFlow() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % STEPS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="mt-20 border-t border-[var(--z-line)] pt-20">
      <div className="max-w-[640px]">
        <Eyebrow>Across devices</Eyebrow>
        <h3 className="zw-block-title m-0 mt-6 font-medium text-fg">
          One key.
          <br />
          <span className="text-fg-dim">Three different jobs.</span>
        </h3>
        <Lede className="mt-6">
          Pair once, by QR or with the same recovery phrase. The extension starts a transaction,
          the phone can confirm it, and the web dashboard is only allowed to look.
        </Lede>
      </div>

      <div className="relative mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute top-7 right-[12%] left-[12%] hidden lg:block"
        >
          <div className="h-px bg-[var(--z-line-strong)]" />
          <span
            className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-accent transition-[left] duration-700 ease-[var(--z-ease)]"
            style={{ left: `${step * 50}%` }}
          />
        </div>

        <ol className="relative grid list-none gap-4 p-0 lg:grid-cols-3">
          {STEPS.map((item, index) => {
            const active = index === step;
            return (
              <li key={item.surface}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStep(index)}
                  className={cn(
                    "flex h-full w-full flex-col rounded-[28px] border bg-[var(--z-surface)] p-7 text-left sm:p-8",
                    "transition-[border-color,background-color,transform] duration-500 ease-[var(--z-ease)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
                    active
                      ? "border-[color-mix(in_srgb,var(--z-accent)_50%,transparent)] bg-[var(--z-surface-raised)]"
                      : "border-[var(--z-line)] hover:border-[var(--z-line-strong)]",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[12px] tabular-nums text-fg-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]",
                        "transition-colors duration-500",
                        active ? "bg-accent text-accent-fg" : "bg-[var(--z-glass-2)] text-fg-muted",
                      )}
                    >
                      {item.verb}
                    </span>
                    {"quiet" in item && item.quiet ? (
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-fg-dim">
                        Soon
                      </span>
                    ) : null}
                  </span>

                  <span className="mt-10 block font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
                    {item.surface}
                  </span>
                  <span className="mt-2 block text-[26px] font-medium leading-tight tracking-[-0.03em] text-fg">
                    {item.title}
                  </span>
                  <span className="mt-3 block text-[14.5px] leading-[1.6] text-fg-muted">
                    {item.body}
                  </span>
                  <span className="mt-8 block border-t border-[var(--z-line)] pt-4 font-mono text-[11px] leading-relaxed text-fg-dim">
                    {item.exchange}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
