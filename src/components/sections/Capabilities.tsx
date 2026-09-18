import { cn } from "@zunialab/ui";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Container, Eyebrow, Glow, Section } from "@/components/site/Layout";
import { CAPABILITY_GLYPHS } from "@/components/site/Icons";
import { PlatformFlow } from "@/components/sections/PlatformFlow";
import { CAPABILITIES } from "@/content/site";

/** Asymmetric bento. Stake spans two rows so the bottom-right card sits beside it. */
const BENTO: Record<string, string> = {
  hold: "lg:col-span-5 min-h-[260px]",
  transfer: "lg:col-span-7 min-h-[260px]",
  stake: "lg:col-span-4 lg:row-span-2 min-h-[480px]",
  connect: "lg:col-span-4 min-h-[220px]",
  secure: "lg:col-span-4 min-h-[220px]",
  dashboard: "sm:col-span-2 lg:col-span-8 min-h-[240px]",
};

function CapabilityFace({
  id,
  title,
  body,
  children,
}: {
  id: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  if (id === "hold") {
    return (
      <>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] text-fg-muted">
          <span className="size-1.5 rounded-full bg-accent" />
          On device
        </span>
        <span className="mt-10 block">
          <span className="block text-[40px] font-medium leading-none tracking-[-0.04em] text-fg">
            {title}
          </span>
          <span className="mt-4 block max-w-[28ch] text-[15px] leading-[1.55] text-fg-muted">
            {body}
          </span>
        </span>
      </>
    );
  }

  if (id === "stake") {
    return (
      <>
        <span className="flex flex-1 items-center">{children}</span>
        <span className="mt-8 block">
          <span className="block text-[32px] font-medium leading-none tracking-[-0.04em] text-fg">
            {title}
          </span>
          <span className="mt-3 block text-[15px] leading-[1.55] text-fg-muted">{body}</span>
        </span>
      </>
    );
  }

  if (id === "dashboard") {
    return (
      <span className="flex h-full flex-col justify-between gap-10 sm:flex-row sm:items-end">
        <span>
          <span className="block text-[32px] font-medium leading-none tracking-[-0.04em] text-fg">
            {title}
          </span>
          <span className="mt-4 block max-w-[36ch] text-[15px] leading-[1.55] text-fg-muted">
            {body}
          </span>
        </span>
        <span className="text-fg-dim sm:mb-1">{children}</span>
      </span>
    );
  }

  return (
    <>
      <span className="flex items-start justify-between gap-6">
        <span className="block text-[32px] font-medium leading-none tracking-[-0.04em] text-fg">
          {title}
        </span>
        <span className="text-fg-dim">{children}</span>
      </span>
      <span className="mt-8 block max-w-[34ch] text-[15px] leading-[1.55] text-fg-muted">{body}</span>
    </>
  );
}

export function Capabilities() {
  return (
    <Section label="What you can do">
      <Glow className="bottom-[-520px] left-1/2 -ml-[520px]" size={1040} strength={0.4} />

      <Container className="relative">
        <div className="max-w-[640px]">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 className="zw-block-title m-0 mt-6 font-medium text-fg">What you can do</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {CAPABILITIES.map((capability, index) => {
            const Glyph = CAPABILITY_GLYPHS[capability.id as keyof typeof CAPABILITY_GLYPHS];
            return (
              <Reveal
                key={capability.id}
                delay={(index % 3) * 0.08}
                className={cn("h-full", BENTO[capability.id])}
              >
                <article
                  className={cn(
                    "flex h-full flex-col justify-between rounded-[32px] border border-white/[0.06]",
                    "bg-[var(--z-surface)] p-8 sm:p-10",
                    "transition-colors duration-300 hover:bg-[var(--z-surface-raised)]",
                  )}
                >
                  <CapabilityFace id={capability.id} title={capability.title} body={capability.body}>
                    {Glyph ? (
                      <Glyph
                        size={capability.id === "stake" ? 112 : capability.id === "dashboard" ? 96 : 28}
                        className="block shrink-0 text-fg-dim"
                      />
                    ) : null}
                  </CapabilityFace>
                </article>
              </Reveal>
            );
          })}
        </div>

        <PlatformFlow />
      </Container>
    </Section>
  );
}
