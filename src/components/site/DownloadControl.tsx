import { Button, cn } from "@zunialab/ui";
import { CHANNEL_ICONS } from "@/components/site/Icons";
import { ComingSoonButton } from "@/components/site/ComingSoon";
import { AVAILABILITY_LABEL, type DownloadTarget } from "@/content/site";

/** A live install opens the store. Everything else stays a coming-soon dialog. */
export function DownloadControl({ target }: { target: DownloadTarget }) {
  const Icon = CHANNEL_ICONS[target.id as keyof typeof CHANNEL_ICONS];
  const variant = target.id === "chrome" ? "primary" : "secondary";
  const className = "h-[54px] px-5 sm:px-6";

  if (target.availability === "available") {
    return (
      <Button asChild size="lg" variant={variant} className={className}>
        <a href={target.href} rel="noreferrer">
          {Icon ? <Icon size={18} /> : null}
          {target.label}
        </a>
      </Button>
    );
  }

  const status = AVAILABILITY_LABEL[target.availability];

  return (
    <ComingSoonButton
      size="lg"
      variant="ghost"
      className={cn(
        "h-11 px-4 text-fg-dim",
        "border border-dashed border-[var(--z-line-strong)] bg-transparent shadow-none",
        "hover:text-fg",
      )}
      label={target.label}
      description={`${target.label} is ${status.toLowerCase()}. The button opens when that listing is live.`}
      aria-label={`${target.label}, ${status}`}
    >
      {Icon ? <Icon size={16} /> : null}
      {target.label}
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-fg-dim">
        {status}
      </span>
    </ComingSoonButton>
  );
}
