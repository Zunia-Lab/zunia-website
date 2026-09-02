import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = "Zunia, the multi-chain Cosmos wallet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Reads the self-hosted typeface so the social card matches the site. Falls back
 * to the platform default if the file cannot be resolved, because a card with
 * the wrong font is better than a build that fails.
 */
async function loadFont(file: string) {
  try {
    return await readFile(
      path.join(process.cwd(), "node_modules/@zunialab/fonts/files", file),
    );
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
    medium && { name: "Space Grotesk", data: medium, weight: 500 as const, style: "normal" as const },
    mono && { name: "JetBrains Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: Buffer; weight: 500 | 400; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0A09",
          color: "#F1F0EE",
          padding: "72px 80px",
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg viewBox="0 0 96 120" width="48" height="60">
            <defs>
              <mask id="gap" maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="120">
                <rect width="96" height="120" fill="#fff" />
                <path
                  d="M26 20 L70 46 L26 72"
                  fill="none"
                  stroke="#000"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>
            </defs>
            <g mask="url(#gap)" fill="none" stroke="#F1F0EE" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M26 48 L70 74 L26 100" />
            </g>
            <path
              d="M26 20 L70 46 L26 72"
              fill="none"
              stroke="#F1F0EE"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 46, letterSpacing: "-0.055em" }}>zunia</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.045em" }}>
            Hold, send, stake,
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              color: "#9A948C",
            }}
          >
            across every chain.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            borderTop: "1px solid rgba(241,240,238,0.16)",
            paddingTop: 28,
            fontFamily: fonts.length > 1 ? "JetBrains Mono" : "Space Grotesk",
            fontSize: 22,
            color: "#C4BFB8",
          }}
        >
          <span>Cosmos multi-chain wallet</span>
          <span>·</span>
          <span>Self-custody</span>
          <span>·</span>
          <span style={{ marginLeft: "auto", color: "#F1F0EE" }}>{SITE.domain}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
