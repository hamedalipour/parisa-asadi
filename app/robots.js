import { WEBSITE } from "./config";

// تولید خودکار robots.txt برای سئو
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${WEBSITE}/sitemap.xml`,
    host: WEBSITE,
  };
}
