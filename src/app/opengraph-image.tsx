import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";
import { BrandMark, BRAND_BG, BRAND_FG, BRAND_MUTED, BRAND_RED } from "@/lib/brand-mark";

export const alt = "Zunia, a self-custody multi-chain Cosmos wallet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(file: string) {
  try {
    return await readFile(path.join(process.cwd(), "node_modules/@zunialab/fonts/files", file));
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const [medium, mono] = await Promise.all([
    loadFont("SpaceGrotesk-Medium.ttf"),
    loadFont("JetBrainsMono-Regular.ttf"),
  ]);

  const fonts = [
    medium && {
      name: "Space Grotesk",
      data: medium,
      weight: 500 as const,
      style: "normal" as const,
    },
    mono && {
      name: "JetBrains Mono",
      data: mono,
      weight: 400 as const,
      style: "normal" as const,
    },
  ].filter(Boolean) as {
    name: string;
    data: Buffer;
    weight: 500 | 400;
    style: "normal";
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND_BG,
          color: BRAND_FG,
          fontFamily: "Space Grotesk",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <BrandMark size={56} color={BRAND_RED} />
          <span
            style={{
              fontSize: 52,
              letterSpacing: "-0.055em",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            zunia
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
            }}
          >
            {SITE.tagline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.35,
              color: BRAND_MUTED,
              maxWidth: 820,
            }}
          >
            Self-custody Cosmos wallet. The extension and the phone share the same keys.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: fonts.length > 1 ? "JetBrains Mono" : "Space Grotesk",
            fontSize: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: BRAND_MUTED,
          }}
        >
          <span>No account · No token</span>
          <span>{SITE.domain}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
