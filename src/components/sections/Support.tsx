import { cn } from "@zunialab/ui";
import { Container, Eyebrow, Section } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SUPPORT_CHANNELS } from "@/content/site";

/**
 * Where to get help. The mockup offered no contact route at all, which is a
 * problem for a wallet: a user who cannot reach real support is the user who
 * answers a stranger in a group chat.
 */
export function Support() {
  return (
    <Section label="Support">
      <Container className="relative">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>Support</Eyebrow>
            <h2 className="m-0 mt-6 text-[clamp(26px,2.8vw,36px)] font-medium leading-tight tracking-[-0.035em] text-fg">
              Reach a human, not a group chat
            </h2>
          </div>
          <p className="m-0 max-w-[420px] text-[14px] leading-relaxed text-fg-muted md:ml-auto md:text-right">
            These are the only channels we operate. We never open a conversation with you and we
            never ask for a recovery phrase.
          </p>
        </div>

        <Reveal className="mt-10">
          <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_CHANNELS.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  rel="noreferrer"
                  className={cn(
                    "flex h-full flex-col gap-2 rounded-[16px] border border-[var(--z-line)] bg-[var(--z-glass)] p-5",
                    "transition-[transform,border-color,background-color] duration-[var(--z-duration-slow)] ease-[var(--z-ease)]",
                    "hover:-translate-y-1 hover:border-[var(--z-line-strong)] hover:bg-[var(--z-state-hover)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]",
                  )}
                >
                  <span className="flex items-center gap-2 text-[13.5px] font-medium text-fg">
                    {channel.label}
                    <span aria-hidden className="ml-auto text-fg-dim">
                      ↗
                    </span>
                  </span>
                  <span className="text-[12.5px] leading-relaxed text-fg-muted">
                    {channel.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
