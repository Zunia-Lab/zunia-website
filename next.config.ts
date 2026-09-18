import path from "node:path";
import type { NextConfig } from "next";

// @zunialab/* is symlinked into ../zunia-ui while the npm scope is private.
// Turbopack refuses CSS urls that escape the project root unless the root is
// the parent checkout. Drop this once the packages are published.
const workspaceRoot = path.join(process.cwd(), "..");

const nextConfig: NextConfig = {
  transpilePackages: ["@zunialab/ui", "@zunialab/tokens", "@zunialab/fonts"],
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
  },
  async headers() {
    return [
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
