import { cn } from "@zunialab/ui";
import { Reveal } from "@/components/site/Reveal";
import { Container, Eyebrow, Lede, Section, SectionTitle } from "@/components/site/Layout";
import { AvailabilityBadge } from "@/components/site/Frames";
import { LINKS, TRANSPARENCY } from "@/content/site";

/** The record. A ledger, not another set of cards. */
export function Transparency() {
  return (
    <Section id="transparency" label="Transparency">
      <Container className="relative grid gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div>
          <Eyebrow>Transparency</Eyebrow>
          <Reveal className="mt-6">
            <SectionTitle lead="Check it." trail="Do not take our word." />
          </Reveal>
          <Lede className="mt-6">
            Anything not finished is marked planned. The links are the ones we actually publish.
          </Lede>
          <p className="m-0 mt-8 text-[14px] leading-relaxed text-fg-dim">
            Found something? Write to{" "}
            <a
              href={LINKS.securityEmail}
              className="text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
            >
              security@zunialab.com
            </a>
            , or read the{" "}
            <a
              href={LINKS.securityPolicy}
              rel="noreferrer"
              className="text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
            >
              disclosure policy
            </a>
            . The machine-readable contact is{" "}
            <a
              href={LINKS.securityTxt}
              className="font-mono text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
            >
              security.txt
            </a>
            .
          </p>
        </div>

        <ol className="m-0 list-none border-t border-[var(--z-line)] p-0">
          {TRANSPARENCY.map((item) => (
            <li key={item.label}>
              <Reveal>
                <div className="grid gap-3 border-b border-[var(--z-line)] py-6 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8">
                  <AvailabilityBadge status={item.status} className="sm:mt-1" />
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="m-0 text-[18px] font-medium tracking-[-0.02em] text-fg">
                        {item.label}
                      </h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          rel="noreferrer"
                          className={cn(
                            "shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-fg",
                            "transition-opacity duration-[var(--z-duration-base)] hover:opacity-70",
                            "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)]",
                          )}
                        >
                          Open
                          <span aria-hidden> ↗</span>
                        </a>
                      ) : null}
                    </div>
                    <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-fg-muted">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
