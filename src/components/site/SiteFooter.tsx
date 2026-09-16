import { Mark, cn } from "@zunialab/ui";
import { FOOTER_COLUMNS, LINKS, RISK_DISCLOSURE, SITE } from "@/content/site";

function FooterLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(external ? { rel: "noreferrer" } : {})}
      className={cn(
        "text-[13px] text-fg-muted transition-colors duration-[var(--z-duration-base)] hover:text-fg",
        "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
      )}
    >
      {children}
    </a>
  );
}

/**
 * A footer entry whose destination does not exist yet.
 *
 * Rendered as text rather than a link, with the reason next to the label: a
 * navigation item that resolves to nothing is worse than one that says why,
 * and a reader cannot tell a broken link from a slow one until they have
 * already left the page.
 */
function FooterPending({ label, reason }: { label: string; reason: string }) {
  return (
    <span className="text-[13px] text-fg-dim">
      {label}, {reason}
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[var(--z-line)] px-5 pb-14 pt-16 sm:px-8 lg:px-11">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-3 text-fg">
              <Mark size={26} />
              <span className="text-[21px] font-medium leading-none tracking-[-0.055em]">
                zunia
              </span>
            </div>
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-fg-muted">
              A self-custody wallet for the Cosmos ecosystem. Your keys stay on your device.
            </p>
            <p className="mt-4 font-mono text-[11px] text-fg-dim">{SITE.releaseChannel}</p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="m-0 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-fg-dim">
                {column.title}
              </h2>
              <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    ) : (
                      <FooterPending label={link.label} reason={link.pending ?? "not available yet"} />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* The disclosure a wallet site owes its visitors, stated plainly rather
            than buried in a terms page nobody opens. */}
        <section
          aria-label="Risk disclosure"
          className="mt-14 rounded-[18px] border border-[var(--z-line)] bg-[var(--z-glass)] p-6"
        >
          <h2 className="m-0 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-fg-dim">
            What you are responsible for
          </h2>
          <ul className="mt-4 grid list-none gap-3 p-0 md:grid-cols-2">
            {RISK_DISCLOSURE.map((line) => (
              <li key={line} className="flex gap-3 text-[12.5px] leading-relaxed text-fg-muted">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-[var(--z-fg-faint)]" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--z-line)] pt-8 md:flex-row md:items-center">
          <p className="m-0 font-mono text-[12px] leading-relaxed text-fg-dim">
            © {new Date().getFullYear()} {SITE.legalName} · not custodial, not an exchange
          </p>
          <div className="flex flex-wrap gap-5 md:ml-auto">
            <FooterLink href={LINKS.securityEmail}>security@zunialab.com</FooterLink>
            <FooterLink href={LINKS.supportEmail}>support@zunialab.com</FooterLink>
            {/* x.com/zuniawallet is reserved but not published, so the entry
                states that rather than sending the reader to an X 404. */}
            <span className="text-[13px] text-fg-dim">X, account not published yet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
