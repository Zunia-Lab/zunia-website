import { Reveal } from "@/components/site/Reveal";
import {
  Container,
  Eyebrow,
  Glow,
  Lede,
  Section,
  SectionTitle,
} from "@/components/site/Layout";
import { AvailabilityBadge } from "@/components/site/Frames";
import { PROVENANCE, PROVENANCE_WARNINGS } from "@/content/site";

/**
 * Install provenance.
 *
 * The most common way to lose funds with a self-custody wallet is installing a
 * counterfeit of it, so the identifiers a user can check belong on the landing
 * page rather than three clicks into the docs. The mockup had no equivalent.
 */
export function Verify() {
  return (
    <Section id="verify" label="Verify your install">
      <Glow className="left-[-260px] top-[-100px]" size={820} strength={0.3} />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div>
            <Eyebrow>Verify</Eyebrow>
            <Reveal className="mt-6">
              <SectionTitle lead="Check that you installed" trail="the real Zunia." />
            </Reveal>
            <Lede className="mt-6">
              A counterfeit wallet looks identical and behaves identically until it drains an
              account. These are the only identifiers we publish. If what you installed does not
              match one of them, uninstall it and start again from this page.
            </Lede>

            <ul className="mt-8 flex list-none flex-col gap-3 p-0">
              {PROVENANCE_WARNINGS.map((warning) => (
                <li
                  key={warning}
                  className="flex gap-3 rounded-[14px] border border-[var(--z-warning-line)] bg-[var(--z-warning-fill)] p-4"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--z-warning)]"
                  />
                  <span className="text-[12.5px] leading-relaxed text-[var(--z-warning-fg)]">
                    {warning}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <dl className="m-0 overflow-hidden rounded-[20px] border border-[var(--z-line)] bg-[var(--z-glass)]">
              {PROVENANCE.map((item, index) => (
                <div
                  key={item.label}
                  className={[
                    "flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4",
                    index < PROVENANCE.length - 1 ? "border-b border-[var(--z-line)]" : "",
                  ].join(" ")}
                >
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
                    {item.label}
                  </dt>
                  <dd className="m-0 ml-auto flex items-center gap-3">
                    {item.status === "planned" ? (
                      <AvailabilityBadge status="planned" />
                    ) : null}
                    <span
                      className={
                        item.mono
                          ? "break-all font-mono text-[12.5px] text-fg"
                          : "text-right text-[12.5px] text-fg-muted"
                      }
                    >
                      {item.value}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
