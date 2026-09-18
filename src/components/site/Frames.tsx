import type { ReactNode } from "react";
import { cn } from "@zunialab/ui";
import { AVAILABILITY_LABEL, type Availability } from "@/content/site";

/** Device shell for the product mocks. Fixed 268px so the inner mock can be laid
 *  out against the real popup and phone metrics from the design system. */
export function PhoneFrame({
  children,
  caption,
  className,
  height = 530,
}: {
  children: ReactNode;
  caption?: string;
  className?: string;
  height?: number;
}) {
  return (
    <div className={cn("w-[268px] shrink-0", className)}>
      <div
        className={cn(
          "rounded-[36px] p-[7px]",
          "bg-[linear-gradient(180deg,rgba(244,245,247,0.24),rgba(244,245,247,0.05))]",
          "shadow-[0_34px_66px_var(--z-shadow)]",
        )}
      >
        <div
          className="relative flex flex-col overflow-hidden rounded-[30px]"
          style={{
            height,
            background: "linear-gradient(176deg, #0B1330 0%, #05091C 48%, #02040C 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[60px] top-[60px] size-[250px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--zw-cobalt-bright),.14) 0%, rgba(var(--zw-cobalt),0) 68%)",
            }}
          />
          <div className="relative flex items-center justify-between px-4 pt-3 font-mono text-[10px] text-fg">
            <span>9:41</span>
            <span
              aria-hidden
              className="absolute left-1/2 top-[-4px] h-[17px] w-16 -translate-x-1/2 rounded-full bg-[var(--z-n0)]"
            />
            <span aria-hidden className="tracking-[0.14em]">
              ●●●
            </span>
          </div>
          {children}
        </div>
      </div>
      {caption ? (
        <div className="mt-3.5 text-center font-mono text-[11px] text-fg-dim">{caption}</div>
      ) : null}
    </div>
  );
}

/** Window chrome for the extension popup and web app mocks. */
export function BrowserFrame({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[16px] border border-[var(--z-line)] bg-[var(--z-surface)]",
        "shadow-[0_26px_52px_var(--z-shadow)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[var(--z-line)] bg-[var(--z-glass)] px-3 py-2.5">
        <span aria-hidden className="flex gap-[5px]">
          <span className="size-[7px] rounded-full bg-[var(--z-glass-2)]" />
          <span className="size-[7px] rounded-full bg-[var(--z-glass-2)]" />
          <span className="size-[7px] rounded-full bg-[var(--z-glass-2)]" />
        </span>
        <span className="ml-auto font-mono text-[9px] text-fg-dim">{label}</span>
      </div>
      {children}
    </div>
  );
}

/**
 * Availability of a download channel. Colour is reserved for status in this
 * design system, so this is the one place on the page a hue appears.
 */
export function AvailabilityBadge({
  status,
  className,
}: {
  status: Availability;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em]",
        status === "available" && "text-[var(--z-success)]",
        status === "review" && "text-[var(--z-warning)]",
        status === "development" && "text-fg-muted",
        status === "planned" && "text-fg-dim",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          status === "available" && "bg-[var(--z-success)]",
          status === "review" && "bg-[var(--z-warning)]",
          status === "development" && "bg-[var(--z-fg-dim)]",
          status === "planned" && "bg-[var(--z-fg-faint)]",
        )}
      />
      {AVAILABILITY_LABEL[status]}
    </span>
  );
}

/** Bordered spec list used by the security, platform and provenance blocks. */
export function SpecList({
  rows,
  className,
}: {
  rows: { label: string; value: ReactNode; mono?: boolean }[];
  className?: string;
}) {
  return (
    <dl className={cn("m-0", className)}>
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={cn(
            "flex justify-between gap-6 py-4 font-mono text-[13px] leading-[1.5]",
            index < rows.length - 1 && "border-b border-[var(--z-line)]",
          )}
        >
          <dt className="text-fg-dim">{row.label}</dt>
          <dd className={cn("m-0 text-right text-fg", row.mono && "break-all")}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
