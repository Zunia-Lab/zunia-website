"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@zunialab/ui";
import { GA_HOSTS, GA_MEASUREMENT_ID } from "@/config/analytics";
import { createAnalytics, readChoice, type Env } from "@/lib/analytics";

const REOPEN_EVENT = "zunia:analytics-settings";

/** Analytics may run only in a production build, with an ID, on a production host. */
function eligible(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    GA_MEASUREMENT_ID !== "" &&
    (GA_HOSTS as readonly string[]).includes(window.location.hostname)
  );
}

let instance: ReturnType<typeof createAnalytics> | null = null;
function analytics() {
  instance ??= createAnalytics(GA_MEASUREMENT_ID, {
    getStorage: () => window.localStorage,
    window,
    document,
  } as unknown as Env);
  return instance;
}

const buttonClass = cn(
  "inline-flex min-h-10 items-center justify-center rounded-full border border-[var(--z-line-strong)] bg-[var(--z-glass-2)] px-5 text-[13px] font-medium text-fg",
  "transition-colors duration-[var(--z-duration-base)] hover:bg-[var(--z-state-hover)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
);

/**
 * The consent bar and the page-view reporter. Nothing is loaded or sent until
 * the visitor presses "Allow analytics"; see src/lib/analytics.ts.
 */
export function Analytics() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [granted, setGranted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const reopened = useRef(false);

  /* eslint-disable react-hooks/set-state-in-effect -- browser-only state read after hydration */
  useEffect(() => {
    if (!eligible()) return;
    const choice = readChoice({ getStorage: () => window.localStorage });
    if (choice === "granted") {
      analytics().allow();
      setGranted(true);
    }
    setOpen(choice === null);
    setReady(true);
    const reopen = () => {
      reopened.current = true;
      setOpen(true);
    };
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // One page_view per route, after the new title has been applied.
  useEffect(() => {
    if (!ready || !granted) return;
    const timer = window.setTimeout(() => analytics().pageView(), 0);
    return () => window.clearTimeout(timer);
  }, [pathname, ready, granted]);

  useEffect(() => {
    if (open && reopened.current) {
      reopened.current = false;
      barRef.current?.querySelector("button")?.focus();
    }
  }, [open]);

  const choose = useCallback((allow: boolean) => {
    if (allow) analytics().allow();
    else analytics().deny();
    setGranted(allow);
    setOpen(false);
  }, []);

  if (!ready || !open) return null;

  return (
    <div
      ref={barRef}
      role="region"
      aria-label="Analytics choice"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[760px] rounded-[18px] border border-[var(--z-line-strong)] bg-[var(--z-surface-raised)] p-5 shadow-2xl sm:inset-x-6 sm:bottom-6"
    >
      <p className="m-0 text-[13px] leading-relaxed text-fg-muted">
        May we use Google Analytics to count which pages are read? Addresses and hashes are removed
        from what is sent, advertising features stay off, and the wallet apps are not affected. You
        can change this later in the footer.{" "}
        <Link href="/legal/privacy" className="text-fg underline underline-offset-2">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className={buttonClass} onClick={() => choose(true)}>
          Allow analytics
        </button>
        <button type="button" className={buttonClass} onClick={() => choose(false)}>
          No thanks
        </button>
      </div>
    </div>
  );
}

/** Footer entry that reopens the bar. Renders nothing when analytics is off. */
export function AnalyticsSettingsLink({ className }: { className?: string }) {
  const [show, setShow] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only check after hydration
  useEffect(() => setShow(eligible()), []);
  if (!show) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
    >
      Analytics settings
    </button>
  );
}
