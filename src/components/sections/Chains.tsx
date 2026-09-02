import { cn } from "@zunialab/ui";
import { Reveal } from "@/components/site/Reveal";
import { BlockLabel, Container, Glow, Section } from "@/components/site/Layout";
import { ChainTicker, Marquee } from "@/components/site/Marquee";
import { BridgeCard, IbcTransferCard } from "@/components/mocks/CardMocks";
import { CHAINS, CHAIN_COVERAGE } from "@/content/site";

export function Chains() {
  const half = Math.ceil(CHAINS.length / 2);
  const topRow = CHAINS.slice(0, half);
  const bottomRow = CHAINS.slice(half);

  return (
    <Section id="chains" label="Supported chains" className="py-24">
      <Glow className="left-1/2 top-[-300px] -ml-[400px]" size={800} strength={0.34} />

      <Container className="relative max-w-[1100px] text-center">
        <h2 className="m-0 text-[clamp(22px,2.4vw,30px)] font-medium leading-tight tracking-[-0.03em] text-fg">
          Chains Zunia already speaks
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          <Marquee
            items={topRow.map((chain) => (
              <ChainTicker
                key={chain.chainId}
                chainId={chain.chainId}
                logo={chain.logo}
                home={chain.home}
              />
            ))}
          />
          <Marquee
            reverse
            items={bottomRow.map((chain) => (
              <ChainTicker key={chain.chainId} chainId={chain.chainId} logo={chain.logo} />
            ))}
          />
        </div>

        {/* The mockup ended the marquee on a decorative "+ 27 more" with nowhere
            to go. The real list is a link, and the coverage rule is stated. */}
        <div className="mx-auto mt-10 max-w-[720px]">
          <p className="m-0 text-[14px] leading-relaxed text-fg-muted">
            <span className="font-medium text-fg">{CHAIN_COVERAGE.total} chains today.</span>{" "}
            {CHAIN_COVERAGE.breakdown} {CHAIN_COVERAGE.note}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <ChainLink href={CHAIN_COVERAGE.listHref}>Full chain list</ChainLink>
            <ChainLink href={CHAIN_COVERAGE.registryHref}>Chain registry on GitHub</ChainLink>
          </div>
        </div>
      </Container>

      <Container className="relative mt-16">
        <BlockLabel>Bridge and IBC</BlockLabel>
        <Reveal className="mt-6 flex flex-wrap items-start justify-center gap-6">
          <BridgeCard />
          <IbcTransferCard />
        </Reveal>
      </Container>
    </Section>
  );
}

function ChainLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--z-line-strong)] px-5 py-3",
        "font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg",
        "transition-[transform,background-color] duration-[var(--z-duration-base)] ease-[var(--z-ease)]",
        "hover:-translate-y-0.5 hover:bg-[var(--z-state-hover)] active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
      )}
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
  );
}
