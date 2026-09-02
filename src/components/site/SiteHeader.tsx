"use client";

import { useEffect, useState } from "react";
import { Button, Mark, cn } from "@zunialab/ui";
import { NAV, WEB_APP } from "@/content/site";

/**
 * Top bar.
 *
 * The wordmark is centred on wide viewports to match the mockup, and collapses
 * to the left edge with a disclosure menu below 1180px, which is where the six
 * nav items stop fitting alongside the primary call to action.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-[var(--z-duration-slow)]",
        scrolled && "border-b border-[var(--z-line)] bg-[var(--z-bg)]/85 backdrop-blur-xl",
      )}
    >
      <div className="relative mx-auto flex w-full max-w-[1240px] items-center gap-4 px-5 py-6 sm:px-8 lg:px-11">
        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "whitespace-nowrap text-[15px] text-fg transition-colors duration-[var(--z-duration-base)]",
                "hover:text-fg-muted",
                "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--z-bg)]",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          aria-label="Zunia, back to top"
          className={cn(
            "flex items-center gap-3 xl:absolute xl:left-1/2 xl:-translate-x-1/2",
            "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--z-bg)]",
          )}
        >
          <Mark size={32} />
          <span className="text-[25px] font-medium leading-none tracking-[-0.055em] text-fg">
            zunia
          </span>
        </a>

        <div className="ml-auto flex items-center gap-3">
          <Button asChild size="sm" className="h-11 px-6 text-[15px]">
            <a href={WEB_APP.href} rel="noreferrer">
              Open
            </a>
          </Button>

          <div className="relative xl:hidden">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                "flex size-11 items-center justify-center rounded-xl border border-[var(--z-line-strong)] bg-[var(--z-glass)]",
                "transition-colors duration-[var(--z-duration-base)] hover:bg-[var(--z-state-hover)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
              )}
            >
              <span aria-hidden className="flex w-[18px] flex-col gap-1">
                <i
                  className={cn(
                    "block h-[1.5px] rounded bg-fg transition-transform duration-[var(--z-duration-slow)]",
                    menuOpen && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <i
                  className={cn(
                    "block h-[1.5px] rounded bg-fg transition-opacity duration-[var(--z-duration-slow)]",
                    menuOpen && "opacity-0",
                  )}
                />
                <i
                  className={cn(
                    "block h-[1.5px] rounded bg-fg transition-transform duration-[var(--z-duration-slow)]",
                    menuOpen && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>

            <div
              id="site-menu"
              hidden={!menuOpen}
              className={cn(
                "absolute right-0 top-[calc(100%+12px)] z-50 flex min-w-[220px] flex-col gap-0.5 p-2.5",
                "rounded-[18px] border border-[var(--z-line)] bg-[var(--z-surface)] shadow-[0_26px_60px_var(--z-shadow)]",
              )}
            >
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-[11px] px-3.5 py-3 text-[15px] text-fg",
                    "transition-colors duration-[var(--z-duration-base)] hover:bg-[var(--z-state-hover)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-inset",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={WEB_APP.href}
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "mt-1.5 border-t border-[var(--z-line)] rounded-[11px] px-3.5 pb-3 pt-4 text-[15px] text-fg",
                  "transition-colors duration-[var(--z-duration-base)] hover:bg-[var(--z-state-hover)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-inset",
                )}
              >
                Open {WEB_APP.label.toLowerCase()}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
