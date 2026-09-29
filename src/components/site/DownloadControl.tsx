import { Button } from "@zunialab/ui";
import { CHANNEL_ICONS } from "@/components/site/Icons";
import { ComingSoonButton } from "@/components/site/ComingSoon";
import type { DownloadTarget } from "@/content/site";

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

  return (
    <ComingSoonButton
      size="lg"
      variant={variant}
      className={className}
      label={target.label}
      aria-label={
        target.availability === "planned" ? `${target.label}, planned` : target.label
      }
    >
      {Icon ? <Icon size={18} /> : null}
      {target.label}
    </ComingSoonButton>
  );
}
