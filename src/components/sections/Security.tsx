import { cn } from "@zunialab/ui";
import { Reveal } from "@/components/site/Reveal";
import {
  BlockLabel,
  Container,
  Eyebrow,
  Glow,
  Lede,
  Section,
  SectionTitle,
} from "@/components/site/Layout";
import { AvailabilityBadge, SpecList } from "@/components/site/Frames";
import { PairingCard } from "@/components/mocks/CardMocks";
import { LINKS, PRIVACY_POINTS, SECURITY_SPECS, TRANSPARENCY } from "@/content/site";

export function Security() {
  return (
    <Section id="security" label="Security" className="pb-32 pt-0">
      <Glow className="right-[-300px] top-[-160px]" size={900} strength={0.36} />

      <Container className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
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

          {/* Privacy is a security property, and it is the part of the story the
              mockup left out entirely. */}
          <dl className="m-0 mt-8 grid gap-4 sm:grid-cols-2">
            {PRIVACY_POINTS.map((point) => (
              <div
                key={point.label}
                className="rounded-[14px] border border-[var(--z-line)] bg-[var(--z-glass)] p-4"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg">
                  {point.label}
                </dt>
                <dd className="m-0 mt-2 text-[12.5px] leading-relaxed text-fg-muted">
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <div className="flex justify-center">
            <IbcGlobe />
          </div>
          <Reveal className="mt-8">
            <div className="rounded-[24px] border border-[var(--z-line)] bg-[var(--z-glass)] px-6 py-2">
              <SpecList rows={SECURITY_SPECS} />
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Transparency ledger. "read the audit" with no auditor, scope or date is
          a promise; this is the same promise with its status attached. */}
      <Container className="relative mt-20">
        <BlockLabel>Transparency</BlockLabel>
        <Reveal className="mt-6">
          <ul className="grid list-none gap-3 p-0 lg:grid-cols-2">
            {TRANSPARENCY.map((item) => (
              <li
                key={item.label}
                className="flex flex-col gap-2 rounded-[16px] border border-[var(--z-line)] bg-[var(--z-glass)] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[13.5px] font-medium text-fg">{item.label}</span>
                  <AvailabilityBadge status={item.status} className="ml-auto" />
                </div>
                <p className="m-0 text-[12.5px] leading-relaxed text-fg-muted">{item.value}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    rel="noreferrer"
                    className={cn(
                      "mt-1 inline-flex w-fit items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg",
                      "transition-opacity duration-[var(--z-duration-base)] hover:opacity-70",
                      "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
                    )}
                  >
                    Open
                    <span aria-hidden>↗</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="m-0 mt-6 max-w-[720px] text-[12.5px] leading-relaxed text-fg-dim">
          Found something? Write to{" "}
          <a
            href={LINKS.securityEmail}
            className="text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
          >
            security@zunialab.com
          </a>{" "}
          or read the{" "}
          <a
            href={LINKS.securityPolicy}
            rel="noreferrer"
            className="text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
          >
            disclosure policy
          </a>
          . Machine-readable contact lives at{" "}
          <a
            href={LINKS.securityTxt}
            className="font-mono text-fg underline decoration-[var(--z-line-strong)] underline-offset-4 hover:decoration-current"
          >
            /.well-known/security.txt
          </a>
          .
        </p>
      </Container>

      <Container className="relative mt-16">
        <BlockLabel>Pairing, gated by your passcode</BlockLabel>
        <Reveal className="mt-6 flex justify-center">
          <PairingCard />
        </Reveal>
      </Container>
    </Section>
  );
}

/** Wireframe globe. Pure decoration, hidden from assistive technology. */
function IbcGlobe() {
  return (
    <svg
      viewBox="0 0 240 240"
      width={240}
      height={240}
      fill="none"
      stroke="var(--z-line-strong)"
      strokeWidth={1}
      className="block max-w-full"
      aria-hidden
      focusable="false"
    >
      <circle cx="120" cy="120" r="94" />
      <ellipse cx="120" cy="120" rx="30" ry="94" />
      <ellipse cx="120" cy="120" rx="62" ry="94" />
      <path d="M26 120h188" />
      <path d="M40 76h160" />
      <path d="M40 164h160" />
    </svg>
  );
}
