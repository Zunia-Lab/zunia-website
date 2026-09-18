import { cn } from "@zunialab/ui";
import { IconGitHub, IconX } from "@/components/site/Icons";
import { LINKS } from "@/content/site";

const itemClass =
  "flex size-11 items-center justify-center rounded-xl border border-[var(--z-line-strong)] text-fg transition-colors duration-[var(--z-duration-base)] hover:bg-[var(--z-state-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--z-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--z-bg)]";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a href={LINKS.x} aria-label="Zunia Lab on X" rel="noreferrer" className={itemClass}>
        <IconX size={16} />
      </a>
      <a href={LINKS.github} aria-label="Zunia Lab on GitHub" rel="noreferrer" className={itemClass}>
        <IconGitHub size={16} />
      </a>
    </div>
  );
}
