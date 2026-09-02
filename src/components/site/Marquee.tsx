import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@zunialab/ui";

/**
 * Infinite horizontal ticker.
 *
 * The track is duplicated to make the loop seamless, and the duplicate is
 * hidden from assistive technology so a screen reader does not read the list
 * twice. Hover or keyboard focus anywhere inside pauses it, which matters for
 * WCAG 2.2.2 since the movement is longer than five seconds.
 */
export function Marquee({
  items,
  reverse,
  className,
}: {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("zw-marquee-track zw-marquee-mask overflow-hidden", className)}>
      <div className={cn("zw-marquee items-center gap-6", reverse && "zw-marquee-reverse")}>
        <div className="flex items-center gap-6">{items}</div>
        <div className="flex items-center gap-6" aria-hidden>
          {items}
        </div>
      </div>
    </div>
  );
}

export function ChainTicker({
  chainId,
  logo,
  home,
}: {
  chainId: string;
  logo: string;
  home?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 whitespace-nowrap font-mono text-[15px]",
        home
          ? "rounded-full border border-[var(--z-line-strong)] bg-[var(--z-state-selected)] px-4 py-2.5 text-fg"
          : // Faint enough to stay texture, but no longer the dimmest step: a
            // logo sitting next to the id turns the row into content.
            "px-1 py-2.5 text-fg-dim",
      )}
    >
      <ChainLogo src={logo} />
      {chainId}
    </span>
  );
}

/**
 * Chain logos keep their own brand colours: they are the one place on the page
 * where the monochrome rule gives way, because a recognisable mark is the point.
 *
 * The plate matters. Some registry logos are transparent marks and some are
 * full circular tiles with their own near-black background, and only a plate
 * behind them keeps the second kind from disappearing into the page.
 */
function ChainLogo({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-[22px] shrink-0 place-items-center overflow-hidden rounded-full",
        "bg-[var(--z-glass)] ring-1 ring-inset ring-[var(--z-line)]",
      )}
    >
      <Image src={src} alt="" width={22} height={22} className="size-full object-contain" />
    </span>
  );
}
