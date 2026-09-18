import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * Open to search and to AI citation crawlers. The named agents repeat the
 * default allow so a reader of this file can see the policy without guessing.
 * Legal pages are indexable. They describe the product that is actually shipped.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = { allow: "/" as const };

  const agents = [
    "*",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Amazonbot",
    "meta-externalagent",
    "DuckAssistBot",
    "cohere-ai",
    "Bytespider",
    "CCBot",
  ];

  return {
    rules: agents.map((userAgent) => ({ userAgent, ...allowAll })),
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.domain,
  };
}
