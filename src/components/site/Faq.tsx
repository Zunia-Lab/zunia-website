"use client";

import { useId, useState } from "react";
import { cn } from "@zunialab/ui";
import type { FaqItem } from "@/content/site";

/**
 * Disclosure list.
 *
 * Built on a real button with `aria-expanded` rather than `details`/`summary`,
 * so the open state can animate and so the trigger keeps a predictable focus
 * ring across browsers. Only one panel is open at a time, which keeps the
 * section scannable on a phone.
 */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.q}
            className={cn(
              "rounded-[18px] border bg-[var(--z-glass)] transition-colors duration-[var(--z-duration-base)]",
              isOpen ? "border-[var(--z-line-strong)]" : "border-[var(--z-line)]",
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  "flex w-full items-center justify-between gap-5 rounded-[18px] px-5 py-5 text-left sm:px-6",
                  "text-[17.5px] font-medium leading-[1.35] text-fg",
                  "transition-colors duration-[var(--z-duration-base)] hover:bg-[var(--z-state-hover)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
                )}
              >
                {item.q}
                <span
                  aria-hidden
                  className={cn(
                    "shrink-0 font-mono text-[20px] leading-none text-fg-dim",
                    "transition-transform duration-[var(--z-duration-slow)] ease-[var(--z-ease)]",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <p className="m-0 max-w-[62ch] text-[15.5px] leading-[1.65] text-fg-muted">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
