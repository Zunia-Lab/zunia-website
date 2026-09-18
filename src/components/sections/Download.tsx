import { Mark } from "@zunialab/ui";
import { Container, Glow, Section } from "@/components/site/Layout";
import { AvailabilityBadge } from "@/components/site/Frames";
import { CHANNEL_ICONS } from "@/components/site/Icons";
import { ComingSoonButton } from "@/components/site/ComingSoon";
import { Reveal } from "@/components/site/Reveal";
import { DOWNLOADS, LINKS, SITE } from "@/content/site";

export function Download() {
  return (
    <Section id="download" label="Download Zunia" className="py-28 text-center lg:py-36">
      <Glow className="bottom-[-680px] left-1/2 -ml-[560px]" size={1120} strength={0.4} />

      <Container className="relative max-w-[900px]">
        <span className="mx-auto flex w-fit text-fg">
          <Mark size={66} />
        </span>
        <Reveal className="mt-8">
          <h2 className="m-0 text-[clamp(36px,4.8vw,66px)] font-medium leading-[1.04] tracking-[-0.045em] text-fg">
            Hold, send, stake,
            <br />
            <span className="text-fg-dim">across every chain.</span>
          </h2>
        </Reveal>
        <p className="mx-auto mt-6 max-w-[460px] text-pretty text-[16px] leading-[1.6] text-fg-muted">
          Install the extension, then pair your phone. Two minutes, one recovery phrase.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {DOWNLOADS.map((target) => {
            const Icon = CHANNEL_ICONS[target.id as keyof typeof CHANNEL_ICONS];
            const variant = target.id === "chrome" ? "primary" : "secondary";
            return (
              <ComingSoonButton
                key={target.id}
                size="lg"
                variant={variant}
                className="h-[54px] px-5 sm:px-6"
                label={target.label}
                aria-label={
                  target.availability === "planned"
                    ? `${target.label}, planned`
                    : target.label
                }
              >
                {Icon ? <Icon size={18} /> : null}
                {target.label}
              </ComingSoonButton>
            );
          })}
        </div>

        {/* System requirements belong next to the download, not in a support
            article the reader finds after the install fails. */}
        <div className="mx-auto mt-12 max-w-[760px] overflow-hidden rounded-[20px] border border-[var(--z-line)] bg-[var(--z-glass)] text-left">
          <div className="border-b border-[var(--z-line)] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim">
            Before you install
          </div>
          <ul className="m-0 list-none p-0">
            {DOWNLOADS.map((target, index) => (
              <li
                key={target.id}
                className={[
                  "flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4",
                  index < DOWNLOADS.length - 1 ? "border-b border-[var(--z-line)]" : "",
                ].join(" ")}
              >
                <span className="text-[13px] font-medium text-fg">{target.label}</span>
                <span className="font-mono text-[11.5px] text-fg-muted">
                  {target.requirement}
                </span>
                <AvailabilityBadge status={target.availability} className="ml-auto" />
              </li>
            ))}
          </ul>
          <p className="m-0 border-t border-[var(--z-line)] px-5 py-4 text-[12.5px] leading-relaxed text-fg-muted">
            Write your recovery phrase on paper before you move funds in. There is no reset,
            because there is no account. The{" "}
            <a
              href={LINKS.docsRecovery}
              rel="noreferrer"
              className="text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
            >
              recovery guide
            </a>{" "}
            walks through it, and{" "}
            <a
              href="#verify"
              className="text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
            >
              verify your install
            </a>{" "}
            lists the identifiers to check first.
          </p>
        </div>

        <p className="m-0 mt-6 font-mono text-[10.5px] text-fg-dim">
          {SITE.releaseChannel} · claims reviewed {SITE.claimsReviewedAt}
        </p>
      </Container>
    </Section>
  );
}
