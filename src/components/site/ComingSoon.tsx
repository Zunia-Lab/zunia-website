"use client";

import { useEffect, useId, useState, type ComponentProps, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button, cn } from "@zunialab/ui";

type ButtonProps = ComponentProps<typeof Button>;

/**
 * Controls that are not live yet. Opens a short modal instead of navigating
 * to a GitHub repo, a missing store listing, or an undeployed product.
 */
export function ComingSoonButton({
  children,
  label,
  description,
  className,
  variant = "secondary",
  size = "lg",
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  /** Optional name shown in the default dialog body. */
  label?: string;
  /** Override the dialog body entirely. */
  description?: string;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const body =
    description ??
    (label
      ? `${label} is not available yet. We will open it the moment it ships.`
      : "This is not available yet. We will open it the moment it ships.");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      <Button
        type="button"
        size={size}
        variant={variant}
        className={className}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      {open
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <button
                type="button"
                aria-label="Dismiss"
                className="absolute inset-0 bg-black/60"
                onClick={() => setOpen(false)}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className={cn(
                  "relative z-[1] w-[min(360px,calc(100%-32px))] rounded-[18px] border border-[var(--z-line)] bg-[var(--z-surface)] p-[18px] text-center",
                  "shadow-[0_24px_48px_rgba(0,0,0,0.55)]",
                )}
              >
                <h2
                  id={titleId}
                  className="m-0 text-[22px] font-medium tracking-[-0.03em] text-fg"
                >
                  Coming very soon
                </h2>
                <p
                  id={descriptionId}
                  className="m-0 mt-3 text-[14.5px] leading-relaxed text-fg-muted"
                >
                  {body}
                </p>
                <div className="mt-6">
                  <Button type="button" size="md" className="w-full" onClick={() => setOpen(false)}>
                    Got it
                  </Button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
