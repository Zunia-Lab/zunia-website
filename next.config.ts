import path from "node:path";
import type { NextConfig } from "next";

// @zunialab/* is symlinked into ../zunia-ui while the npm scope is private.
// Turbopack refuses CSS urls that escape the project root unless the root is
// the parent checkout. Drop this once the packages are published.
const workspaceRoot = path.join(process.cwd(), "..");

/*
 * Sent with every response. No Strict-Transport-Security: Cloudflare sets it
 * for every zunialab.com host, and a second copy here would drift from it.
 *
 * The CSP holds only what cannot break a page: no framing (with the older
 * X-Frame-Options for browsers that ignore frame-ancestors), no plugins, no
 * <base> rewrite. A script-src allowlist waits until Cloudflare stops
 * injecting its Web Analytics beacon, which such a policy would block on
 * every page.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@zunialab/ui", "@zunialab/tokens", "@zunialab/fonts"],
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Apple requires application/json (no file extension on this path)
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/.well-known/security.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
