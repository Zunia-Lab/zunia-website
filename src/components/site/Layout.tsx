import type { CSSProperties, ReactNode } from "react";
import { cn } from "@zunialab/ui";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-[1240px]", className)}>{children}</div>;
}

export function Section({
  id,
  children,
  className,
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Accessible name for the section landmark. */
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        // Offsets the sticky header so an anchor jump does not hide the heading.
        "relative scroll-mt-24 overflow-hidden px-5 sm:px-8 lg:px-11",
        className ?? "py-24 lg:py-32",
      )}
    >
      {children}
    </section>
  );
}

/**
 * Accent bloom used across the landing page. Strength is the peak opacity of
 * `rgba(255,27,12)`, matching the warm accent washes rather than a monochrome tint.
 */
export function Glow({
  className,
  size = 900,
  strength = 0.34,
  breathe = false,
  style,
}: {
  className?: string;
  size?: number;
  strength?: number;
  breathe?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", breathe && "zw-breathe", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(var(--zw-cobalt), ${strength}) 0%, rgba(var(--zw-cobalt), 0) 68%)`,
        filter: "blur(28px)",
        ...style,
      }}
    />
  );
}

/** Horizontal hairline that fades at both ends, used between sections. */
export function Rule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto h-px w-[calc(100%-40px)] max-w-[1240px]",
        "bg-[linear-gradient(90deg,transparent,var(--z-line-strong),transparent)]",
        className,
      )}
    />
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-[var(--z-line-strong)] px-4 py-2.5",
        "font-mono text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Section heading. The mockup separated the two lines with a colour accent; in a
 * monochrome system the same hierarchy comes from luminance, so the second line
 * drops to the dimmer foreground.
 */
export function SectionTitle({
  lead,
  trail,
  className,
  as: Comp = "h2",
}: {
  lead: string;
  trail?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Comp className={cn("zw-section-title m-0 font-medium text-fg", className)}>
      {lead}
      {trail ? (
        <>
          <br />
          <span className="text-fg-dim">{trail}</span>
        </>
      ) : null}
    </Comp>
  );
}

/** Small centred label above a supporting block, e.g. "BRIDGE & IBC". */
export function BlockLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-center font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-fg-dim",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("m-0 max-w-[520px] text-[16.5px] leading-[1.7] text-fg-muted", className)}>
      {children}
    </p>
  );
}

/** Circular icon link used next to "read the docs" style captions. */
export function ArrowLink({
  href,
  caption,
  className,
}: {
  href: string;
  caption: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <a
        href={href}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-[10px] bg-accent text-[15px] text-accent-fg",
          "transition-[transform,opacity] duration-[var(--z-duration-base)] ease-[var(--z-ease)]",
          "hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 active:opacity-80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
        )}
      >
        <span aria-hidden>↗</span>
        <span className="sr-only">{caption}</span>
      </a>
      <span className="font-mono text-[14px] text-fg-dim">{caption}</span>
    </div>
  );
}
