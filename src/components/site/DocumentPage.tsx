import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { cn } from "@zunialab/ui";

export function DocumentPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="zw-skip rounded-full bg-accent px-5 py-3 text-[13px] font-medium text-accent-fg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <article className="mx-auto w-full max-w-[760px] px-5 py-20 sm:px-8 lg:py-28">
          <p className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg-dim">
            {eyebrow}
          </p>
          <h1 className="m-0 mt-5 text-[40px] font-medium leading-[1.05] tracking-[-0.04em] text-fg sm:text-[52px]">
            {title}
          </h1>
          <p className="m-0 mt-4 font-mono text-[12px] text-fg-dim">Updated {updated}</p>
          <div className="mt-10 flex flex-col gap-5 text-[16.5px] leading-[1.75] text-fg-muted">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="m-0 mt-12 text-[26px] font-medium tracking-[-0.03em] text-fg">{children}</h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="m-0 mt-8 text-[18px] font-medium text-fg">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="m-0">{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="m-0 flex list-disc flex-col gap-2 pl-5">{children}</ul>;
}

export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "m-0 rounded-[16px] border border-[var(--z-line)] bg-[var(--z-glass)] px-5 py-4 text-[15px] leading-relaxed text-fg",
        className,
      )}
    >
      {children}
    </p>
  );
}
