import { Button } from "@zunialab/ui";
import { Reveal } from "@/components/site/Reveal";
import { Container, Eyebrow, Glow, Section } from "@/components/site/Layout";
import { LINKS } from "@/content/site";

/**
 * IBC Map Cosmos is live at ibcmap.zunialab.com. It watches public IBC traffic.
 * It does not hold keys, so the section says so.
 */
export function MapZone() {
  return (
    <Section id="map" label="IBC Map Cosmos">
      <Glow className="right-[-180px] top-[-200px]" size={720} strength={0.3} />

      <Container className="relative max-w-[820px] text-center">
        <Eyebrow>Live</Eyebrow>
        <Reveal className="mt-6">
          <h2 className="zw-block-title m-0 font-medium text-fg">IBC Map Cosmos</h2>
        </Reveal>
        <p className="mx-auto mt-6 max-w-[560px] text-pretty text-[16px] leading-[1.65] text-fg-muted">
          Watch IBC transfers move between Cosmos zones. Volumes and relay health come from
          public chain data. The map does not hold keys, and it cannot sign.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="h-[54px] px-6">
            <a href={LINKS.mapZone} rel="noreferrer">
              Open IBC Map
              <span aria-hidden className="text-[13px] opacity-80">
                ↗
              </span>
            </a>
          </Button>
        </div>
        <p className="m-0 mt-4 font-mono text-[12px] text-fg-dim">ibcmap.zunialab.com</p>
      </Container>
    </Section>
  );
}
