import { Reveal } from "@/components/site/Reveal";
import { Container, Eyebrow, Lede, Section, SectionTitle } from "@/components/site/Layout";
import { SpecList } from "@/components/site/Frames";
import { PairingCard } from "@/components/mocks/CardMocks";
import { PRIVACY_POINTS, SECURITY_SPECS } from "@/content/site";

/** The argument: keys stay on the device. The proof lives in the next section. */
export function Security() {
  return (
    <Section id="security" label="Security">
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.7fr)] lg:gap-20">
          <div>
            <Eyebrow>Security</Eyebrow>
            <Reveal className="mt-6">
              <SectionTitle lead="Self-custody that does not" trail="ask you to trust us." />
            </Reveal>
            <Lede className="mt-6">
              Keys are generated on your device and encrypted there. Zunia runs no server that can
              hold them, freeze an account or reverse a transfer. The client is open source, so the
              claim is checkable rather than promised.
            </Lede>
          </div>
          <Reveal className="flex justify-center lg:justify-end">
            <PairingCard />
          </Reveal>
        </div>

        <dl className="m-0 mt-20 grid gap-10 border-t border-[var(--z-line)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PRIVACY_POINTS.map((point) => (
            <div key={point.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg">
                {point.label}
              </dt>
              <dd className="m-0 mt-3 text-[14.5px] leading-relaxed text-fg-muted">{point.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
            How the key is kept
          </p>
          <SpecList rows={SECURITY_SPECS} />
        </div>
      </Container>
    </Section>
  );
}
