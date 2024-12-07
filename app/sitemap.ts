import { router } from "@/utils/router";

export default async function sitemap() {
  const bashUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const allPage = router.map((item) => {
    return {
      url: `${bashUrl}${item.path}`,
      lastModified: new Date(),
    };
  });
  return [
    {
      url: `${bashUrl}/home`,
      lastModified: new Date(),
    },

    ...allPage,
  ];
}
