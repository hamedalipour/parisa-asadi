import { WEBSITE } from "./config";
import { POSTS } from "./blog/posts";

// تولید خودکار sitemap.xml برای سئو
export default function sitemap() {
  return [
    { url: WEBSITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${WEBSITE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${WEBSITE}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${WEBSITE}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${WEBSITE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${WEBSITE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${WEBSITE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...POSTS.map((p) => ({
      url: `${WEBSITE}/blog/${p.id}`,
      lastModified: new Date(p.dateISO),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
