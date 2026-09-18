import type { SVGProps } from "react";
import {
  siAppstore,
  siBrave,
  siFirefoxbrowser,
  siGithub,
  siGooglechrome,
  siGoogleplay,
  siX,
  type SimpleIcon,
} from "simple-icons";

/**
 * Icons are inline SVG, never fetched from a CDN, so the privacy claim on the
 * page stays true.
 *
 * Vendor marks come from Simple Icons, the same set the landing mockup already
 * pointed at via cdn.simpleicons.org. Paths are read from the package at build
 * time rather than invented here. Edge has no mark: Simple Icons removed every
 * Microsoft brand after trademark guidance, and the mockup already rendered
 * Edge as text-only for that reason.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className="block shrink-0"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Neutral browser window, kept for non-brand uses. */
export function IconBrowser(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18" />
      <circle cx="6.2" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8.4" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
      <path d="M10.5 5.2h3" />
      <path d="M10.8 18.6h2.4" />
    </Svg>
  );
}

export function IconPackage(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" />
      <path d="M4 7.2l8 4.2 8-4.2" />
      <path d="M12 11.4V21" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Vendor marks from Simple Icons                                             */
/* -------------------------------------------------------------------------- */

function BrandIcon({
  icon,
  size = 18,
  title,
  ...props
}: IconProps & { icon: SimpleIcon; title: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className="block shrink-0"
      fill="currentColor"
      {...props}
    >
      <title>{title}</title>
      <path d={icon.path} />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return <BrandIcon icon={siX} title="X" {...props} />;
}

export function IconGitHub(props: IconProps) {
  return <BrandIcon icon={siGithub} title="GitHub" {...props} />;
}

export function IconChrome(props: IconProps) {
  return <BrandIcon icon={siGooglechrome} title="Google Chrome" {...props} />;
}

export function IconBrave(props: IconProps) {
  return <BrandIcon icon={siBrave} title="Brave" {...props} />;
}

export function IconFirefox(props: IconProps) {
  return <BrandIcon icon={siFirefoxbrowser} title="Firefox" {...props} />;
}

export function IconAppStore(props: IconProps) {
  return <BrandIcon icon={siAppstore} title="App Store" {...props} />;
}

export function IconPlayStore(props: IconProps) {
  return <BrandIcon icon={siGoogleplay} title="Google Play" {...props} />;
}

/* -------------------------------------------------------------------------- */
/* Capability glyphs, drawn at a larger optical size                          */
/* -------------------------------------------------------------------------- */

function Glyph({ size = 48, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className="block shrink-0"
      {...props}
    >
      {children}
    </svg>
  );
}

export function GlyphHold(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3 8h18v11H3z" />
      <path d="M3 8l3-4h12l3 4" />
      <circle cx="16" cy="13.5" r="1.6" />
    </Glyph>
  );
}

export function GlyphTransfer(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 9h13l-3-3" />
      <path d="M20 15H7l3 3" />
    </Glyph>
  );
}

export function GlyphStake(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M12 8l4 2.2v4.6L12 17l-4-2.2v-4.6z" />
    </Glyph>
  );
}

export function GlyphConnect(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="12" r="3" />
      <path d="M10 12h4" />
    </Glyph>
  );
}

export function GlyphSecure(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
      <path d="M9.5 12.5l1.8 1.8 3.4-3.6" />
    </Glyph>
  );
}

export function GlyphDashboard(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3 4.5h18v15H3z" />
      <path d="M3 9.5h18" />
      <path d="M9 9.5v10" />
    </Glyph>
  );
}

export const CAPABILITY_GLYPHS = {
  hold: GlyphHold,
  transfer: GlyphTransfer,
  stake: GlyphStake,
  connect: GlyphConnect,
  secure: GlyphSecure,
  dashboard: GlyphDashboard,
} as const;

/**
 * Edge is intentionally absent: Simple Icons no longer ships a Microsoft Edge
 * mark, and the mockup already showed Edge as a text-only chip.
 */
export const CHANNEL_ICONS = {
  chrome: IconChrome,
  brave: IconBrave,
  firefox: IconFirefox,
  ios: IconAppStore,
  android: IconPlayStore,
  apk: IconPackage,
} as const;
