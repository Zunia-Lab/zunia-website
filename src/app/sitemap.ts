import type { MetadataRoute } from "next";
import { LINKS, SITE } from "@/content/site";

const reviewed = new Date("2026-09-19");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: LINKS.privacy, priority: 0.4, changeFrequency: "yearly" as const },
    { path: LINKS.terms, priority: 0.4, changeFrequency: "yearly" as const },
    { path: LINKS.securityPage, priority: 0.6, changeFrequency: "monthly" as const },
    { path: LINKS.disclosure, priority: 0.5, changeFrequency: "yearly" as const },
    { path: LINKS.brandPage, priority: 0.4, changeFrequency: "monthly" as const },
  ];

  return pages.map((page) => ({
    url: `${SITE.url}${page.path}`,
    lastModified: page.path === "" ? new Date(SITE.claimsReviewedAt) : reviewed,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
