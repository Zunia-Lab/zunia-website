import { Mark, cn } from "@zunialab/ui";
import { CHANNEL_ICONS } from "@/components/site/Icons";
import { ComingSoonButton } from "@/components/site/ComingSoon";
import { HeroPhone } from "@/components/mocks/PhoneMocks";
import { DOWNLOADS, SITE, WEB_APP, type DownloadTarget } from "@/content/site";

export function Hero() {
  const browsers = DOWNLOADS.filter((target) => target.kind === "browser");
  const stores = DOWNLOADS.filter((target) => target.kind === "store");

  return (
    <section
      id="top"
      aria-label="Zunia, a multi-chain Cosmos wallet"
      className="relative z-20 overflow-hidden px-5 pb-14 sm:px-8 lg:min-h-[980px] lg:px-11 lg:pb-0"
    >
      <HeroAura />

      <div className="relative z-30 px-1 pt-12 text-center sm:pt-16">
        <h1 className="zw-rise zw-hero-title mx-auto m-0 max-w-[780px] font-medium text-fg">
          Hold, send, stake,
          <br />
          across every chain.
        </h1>
        <p
          className="zw-rise mx-auto mt-6 max-w-[520px] text-pretty text-[16px] leading-[1.6] text-fg-muted"
          style={{ animationDelay: "0.1s" }}
        >
          {SITE.description}
        </p>

        <div
          className="zw-rise mt-9 flex flex-col items-center gap-3"
          style={{ animationDelay: "0.18s" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {browsers.map((target) => (
              <DownloadButton key={target.id} target={target} />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {stores.map((target) => (
              <DownloadButton key={target.id} target={target} />
            ))}
            <ComingSoonButton
              size="lg"
              variant="secondary"
              className="h-[54px] px-6"
              label={WEB_APP.label}
            >
              <Mark size={17} />
              {WEB_APP.label}
              <span aria-hidden className="text-[13px] opacity-70">
                ↗
              </span>
            </ComingSoonButton>
          </div>
        </div>
      </div>

      {/* Same placement rule as the mockup: behind the phone at the bottom on
          wide screens, pinned near the headline on narrow ones. Opacity is a
          touch higher than the mockup's 0.1 on mobile so the mark still reads
          on our darker page background. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 z-[1] text-center",
          "bottom-[-2%] opacity-[0.97]",
          "max-[900px]:bottom-auto max-[900px]:top-16 max-[900px]:opacity-[0.22]",
        )}
      >
        <span className="zw-wordmark block font-medium text-fg">zunia</span>
      </div>

      <div className="relative z-[2]">
        <HeroPhone />
      </div>
    </section>
  );
}

/**
 * Cobalt aurora from the landing mockup. Ring and dark core share one centre
 * above the headline so the wash reads as a single arc, not two side blobs.
 */
function HeroAura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="zw-breathe absolute left-1/2 top-0 aspect-square w-[min(1400px,175vw)] -translate-x-1/2 -translate-y-[55%] rounded-full blur-[22px]"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--zw-cobalt),0) 42%, rgba(var(--zw-cobalt),.16) 54%, rgba(var(--zw-cobalt-bright),.28) 62%, rgba(var(--zw-cobalt),.12) 72%, rgba(var(--zw-void),.1) 82%, rgba(var(--zw-void),0) 90%)",
        }}
      />
      <div
        className="absolute left-1/2 top-0 aspect-square w-[min(860px,115vw)] -translate-x-1/2 -translate-y-[55%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--zw-void),.94) 46%, rgba(var(--zw-cobalt),.08) 64%, rgba(var(--zw-void),0) 78%)",
        }}
      />
      <div
        className="absolute right-[-12%] top-[-8%] aspect-square w-[min(640px,80vw)] rounded-full blur-[30px]"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--zw-cobalt),.12) 0%, rgba(var(--zw-cobalt),0) 66%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[260px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(var(--zw-void),0) 0%, rgba(var(--zw-void),.3) 46%, rgba(var(--zw-void),.82) 100%)",
        }}
      />
    </div>
  );
}

function DownloadButton({ target }: { target: DownloadTarget }) {
  const Icon = CHANNEL_ICONS[target.id as keyof typeof CHANNEL_ICONS];
  const variant = target.id === "chrome" ? "primary" : "secondary";

  return (
    <ComingSoonButton
      size="lg"
      variant={variant}
      className="h-[54px] px-5 sm:px-6"
      label={target.label}
      aria-label={
        target.availability === "planned"
          ? `${target.label}, planned`
          : target.label
      }
    >
      {Icon ? <Icon size={18} /> : null}
      {target.label}
    </ComingSoonButton>
  );
}
