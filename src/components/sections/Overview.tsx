import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLink,
  Container,
  Eyebrow,
  Glow,
  Lede,
  Section,
  SectionTitle,
} from "@/components/site/Layout";
import { LINKS, SITE, STATS } from "@/content/site";

export function Overview() {
  return (
    <Section id="wallet" label="What Zunia does" className="pb-28 pt-32 lg:pb-32 lg:pt-40">
      <Glow className="left-1/2 top-[-420px] -ml-[460px]" size={920} strength={0.34} />
      <Glow className="bottom-[-420px] left-[-320px]" size={1000} strength={0.4} />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>What Zunia does</Eyebrow>
            <Reveal className="mt-6">
              <SectionTitle lead="One wallet for" trail="every Cosmos chain." />
            </Reveal>
          </div>
          <div className="lg:pt-3.5">
            <Lede>
              Zunia holds your keys on your own device and speaks IBC natively. Send between
              chains in one step, stake from the same screen, and connect to any Cosmos dApp from
              the extension or the phone. No custodian, no bridge accounts, no second wallet.
            </Lede>
            <ArrowLink href={LINKS.docs} caption="read the docs" className="mt-7" />
          </div>
        </div>

        <div className="mt-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              className="border-t border-[var(--z-line-strong)] pt-6"
            >
              <div className="zw-stat font-medium tabular-nums text-fg">{stat.value}</div>
              <div className="mt-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-fg">
                {stat.label}
              </div>
              <p className="m-0 mt-2 max-w-[240px] text-[13px] leading-[1.5] text-fg-dim">
                {stat.detail}
              </p>
            </Reveal>
          ))}
        </div>

        {/* A number on a wallet site is only useful if the reader can see how it
            was produced. The mockup shipped the figures without a method. */}
        <details className="group mt-10 rounded-[16px] border border-[var(--z-line)] bg-[var(--z-glass)]">
          <summary
            className={[
              "flex cursor-pointer list-none items-center gap-3 px-5 py-4",
              "font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-dim",
              "transition-colors duration-[var(--z-duration-base)] hover:text-fg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-inset",
            ].join(" ")}
          >
            How these numbers are measured
            <span
              aria-hidden
              className="ml-auto text-[14px] transition-transform duration-[var(--z-duration-slow)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="border-t border-[var(--z-line)] px-5 py-5">
            <dl className="m-0 grid gap-5 md:grid-cols-3">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg">
                    {stat.value} {stat.label}
                  </dt>
                  <dd className="m-0 mt-2 text-[12.5px] leading-relaxed text-fg-muted">
                    {stat.method}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="m-0 mt-5 font-mono text-[10px] text-fg-dim">
              Reviewed {SITE.claimsReviewedAt}. Figures are restated whenever the underlying
              measurement changes.
            </p>
          </div>
        </details>
      </Container>
    </Section>
  );
}
