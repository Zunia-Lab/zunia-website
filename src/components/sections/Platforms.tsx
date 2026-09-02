import { cn } from "@zunialab/ui";
import { Reveal } from "@/components/site/Reveal";
import { BlockLabel, Container, Glow, Section } from "@/components/site/Layout";
import { AvailabilityBadge, SpecList } from "@/components/site/Frames";
import { PhoneHome } from "@/components/mocks/PhoneMocks";
import { AVAILABILITY_LABEL, PLATFORMS } from "@/content/site";

export function Platforms() {
  return (
    <Section id="platforms" label="Platforms" className="pb-32 pt-0">
      <Glow className="right-[-260px] top-[-120px]" size={760} strength={0.28} />

      <Container className="relative grid gap-5 lg:grid-cols-2">
        {PLATFORMS.map((platform, index) => (
          <Reveal key={platform.id} delay={index * 0.08}>
            <article
              className={cn(
                "relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[var(--z-line)]",
                "bg-[var(--z-glass)] p-6 sm:p-8",
                "transition-transform duration-[var(--z-duration-slow)] ease-[var(--z-ease)] hover:-translate-y-1.5",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="m-0 text-[24px] font-medium leading-tight tracking-[-0.03em] text-fg">
                  {platform.title}
                </h3>
                <span className="font-mono text-[12px] text-fg-dim">{platform.meta}</span>
              </div>

              <p className="m-0 mt-3.5 text-pretty text-[15.5px] leading-[1.65] text-fg-muted">
                {platform.body}
              </p>

              {/* Per-target availability. The mockup listed Chrome, Brave, Edge
                  and Firefox as equals; Firefox is not shipped. */}
              <ul className="mt-7 flex list-none flex-wrap gap-2.5 p-0">
                {platform.targets.map((target) => (
                  <li
                    key={target.label}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[12px]",
                      target.availability === "planned"
                        ? "border-[var(--z-line)] text-fg-dim"
                        : "border-[var(--z-line-strong)] bg-[var(--z-glass)] text-fg",
                    )}
                    title={`${target.label}: ${AVAILABILITY_LABEL[target.availability]}`}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-1.5 rounded-full",
                        target.availability === "available" && "bg-[var(--z-success)]",
                        target.availability === "review" && "bg-[var(--z-warning)]",
                        target.availability === "planned" && "bg-[var(--z-fg-faint)]",
                      )}
                    />
                    {target.label}
                    <span className="sr-only">
                      {" "}
                      {AVAILABILITY_LABEL[target.availability]}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-[var(--z-line)] pt-1">
                <SpecList rows={platform.specs} />
              </div>

              <div className="mt-auto flex items-center gap-4 pt-6">
                <AvailabilityBadge status={platform.availability} />
                <a
                  href={platform.href}
                  rel="noreferrer"
                  className={cn(
                    "ml-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg",
                    "transition-opacity duration-[var(--z-duration-base)] hover:opacity-70",
                    "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
                  )}
                >
                  Source
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </Container>

      <Container className="relative mt-16">
        <BlockLabel>The phone, for real</BlockLabel>
        <Reveal className="mt-6 flex justify-center">
          <PhoneHome caption="Mobile · home" />
        </Reveal>
      </Container>
    </Section>
  );
}
