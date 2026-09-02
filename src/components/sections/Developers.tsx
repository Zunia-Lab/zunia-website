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
import { ApprovalCard, PortfolioCard } from "@/components/mocks/CardMocks";
import {
  CONNECT_SNIPPET,
  DEVELOPER_POINTS,
  LINKS,
  type CodeTokenKind,
} from "@/content/site";

const TOKEN_CLASS: Record<CodeTokenKind, string> = {
  plain: "text-[var(--zw-code-plain)]",
  comment: "italic text-[var(--zw-code-comment)]",
  keyword: "text-[var(--zw-code-keyword)]",
  string: "text-[var(--zw-code-string)]",
  punct: "text-[var(--zw-code-punct)]",
  call: "text-[var(--zw-code-call)]",
};

export function Developers() {
  return (
    <Section id="developers" label="Developers" className="pb-32 pt-0">
      <Glow className="left-[-260px] top-[60px]" size={820} strength={0.32} />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Developers</Eyebrow>
            <Reveal className="mt-6">
              <SectionTitle lead="One interface," trail="both platforms." />
            </Reveal>
            <Lede className="mt-6 max-w-[500px]">
              Zunia implements the standard Cosmos wallet interface, so an existing integration
              works unchanged. On mobile the same calls arrive over WalletConnect.
            </Lede>

            <ol className="m-0 mt-8 flex list-none flex-col gap-3.5 p-0">
              {DEVELOPER_POINTS.map((point, index) => (
                <li
                  key={point}
                  className="flex gap-3.5 border-t border-[var(--z-line)] pt-3.5 text-[15px] leading-[1.5] text-fg-muted"
                >
                  <span className="shrink-0 font-mono text-[12px] leading-[1.6] text-fg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {point}
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <DevLink href={LINKS.docsIntegrate}>Integration guide</DevLink>
              <DevLink href={LINKS.github}>Source on GitHub</DevLink>
            </div>
          </div>

          <Reveal>
            <div className="zw-code rounded-[26px] border border-[var(--z-line-strong)] bg-[var(--z-surface)]">
              <div className="flex items-center gap-3 border-b border-[var(--z-line)] px-6 py-4">
                <span aria-hidden className="flex gap-1.5">
                  <span className="size-[9px] rounded-full bg-[var(--z-glass-2)]" />
                  <span className="size-[9px] rounded-full bg-[var(--z-glass-2)]" />
                  <span className="size-[9px] rounded-full bg-[var(--z-fg-faint)]" />
                </span>
                <span className="font-mono text-[12px] text-fg-muted">connect.ts</span>
                <span className="ml-auto rounded-full border border-[var(--z-line)] px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-fg-dim">
                  TypeScript
                </span>
              </div>
              <pre className="m-0 overflow-x-auto px-4 py-6 sm:px-6" tabIndex={0}>
                <code className="block font-mono text-[13.5px] leading-[1.95] text-[var(--zw-code-plain)]">
                  {CONNECT_SNIPPET.map((line) => (
                    <span key={line.n} className="flex gap-5">
                      <span
                        aria-hidden
                        className="w-3.5 shrink-0 select-none text-right text-[var(--zw-code-gutter)]"
                      >
                        {line.n}
                      </span>
                      <span className="min-w-0 whitespace-pre">
                        {line.tokens.length === 0
                          ? " "
                          : line.tokens.map((token, index) => (
                              <span
                                key={`${line.n}-${index}`}
                                className={TOKEN_CLASS[token.k ?? "plain"]}
                              >
                                {token.t}
                              </span>
                            ))}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="relative mt-16">
        <BlockLabel>Extension approval and web portfolio</BlockLabel>
        <Reveal className="mt-6 flex flex-wrap items-start justify-center gap-6">
          <div className="w-[min(340px,100%)]">
            <ApprovalCard />
          </div>
          <div className="w-[min(400px,100%)]">
            <PortfolioCard />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function DevLink({ href, children }: { href: string; children: string }) {
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
