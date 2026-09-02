import { cn } from "@zunialab/ui";
import { Reveal } from "@/components/site/Reveal";
import { BlockLabel, Container, Eyebrow, Glow, Section } from "@/components/site/Layout";
import { CAPABILITY_GLYPHS } from "@/components/site/Icons";
import { PhoneMissions } from "@/components/mocks/PhoneMocks";
import { CAPABILITIES } from "@/content/site";

export function Capabilities() {
  return (
    <Section label="What you can do" className="pb-32 pt-8">
      <Glow className="bottom-[-520px] left-1/2 -ml-[520px]" size={1040} strength={0.4} />

      <Container className="relative">
        <div className="mb-13 text-center">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 className="zw-block-title m-0 mt-6 font-medium text-fg">What you can do</h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability, index) => {
            const Glyph = CAPABILITY_GLYPHS[capability.id as keyof typeof CAPABILITY_GLYPHS];
            return (
              <Reveal key={capability.id} delay={(index % 3) * 0.08}>
                <article
                  className={cn(
                    "flex h-full items-start gap-5 rounded-[20px] border p-6 sm:p-7",
                    "transition-[transform,border-color,background-color] duration-[var(--z-duration-slow)] ease-[var(--z-ease)]",
                    "hover:-translate-y-1.5 hover:border-[var(--z-line-strong)] hover:bg-[var(--z-state-hover)]",
                    capability.featured
                      ? "border-[var(--z-line-strong)] bg-[var(--z-state-selected)]"
                      : "border-[var(--z-line)] bg-[var(--z-glass)]",
                  )}
                >
                  <span className="flex shrink-0 items-center text-fg">
                    {Glyph ? <Glyph size={50} /> : null}
                  </span>
                  <span>
                    <span className="block text-[18px] font-medium leading-tight tracking-[-0.02em] text-fg">
                      {capability.title}
                    </span>
                    <span className="mt-2.5 block text-[14px] leading-[1.55] text-fg-muted">
                      {capability.body}
                    </span>
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container className="relative mt-16">
        <BlockLabel>Missions and mobile</BlockLabel>
        <Reveal className="mt-6 flex flex-wrap items-start justify-center gap-6">
          <div className="w-[min(300px,100%)] rounded-[20px] border border-[var(--z-line)] bg-[var(--z-glass)] p-[18px]">
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-dim">
              Missions
            </div>
            <div className="mt-3 text-[26px] font-medium leading-none tracking-[-0.035em] text-fg">
              Level <span className="text-fg-dim">4</span>
            </div>
            <div
              aria-hidden
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--z-glass-2)]"
            >
              <span className="block h-full w-[78%] rounded-full bg-fg" />
            </div>
            <div className="mt-3 flex justify-between font-mono text-[9.5px] tabular-nums text-fg-muted">
              <span>780 / 1000 XP</span>
              <span>3 of 5 done</span>
            </div>
            <p className="m-0 mt-3.5 text-[11px] leading-[1.55] text-fg-muted">
              Transfers, delegations and votes earn XP. Missions run per season and unlock nothing
              you have to buy.
            </p>
          </div>
          <PhoneMissions caption="Mobile · missions" />
        </Reveal>
      </Container>
    </Section>
  );
}
