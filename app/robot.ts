import { router } from "@/utils/router";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const bashUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const allPage = router.map((item) => item.path);

  return {
    rules: {
      userAgent: "*",
      allow: ["/", ...allPage],
      disallow: "/admin",
    },
    sitemap: `${bashUrl}/sitemap.xml`,
  };
}
