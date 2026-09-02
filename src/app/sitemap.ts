import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(SITE.claimsReviewedAt),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
