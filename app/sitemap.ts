import { router } from "@/utils/router";
import { useGetBlogPost } from "./(content)/blog/blog.web.service";
import axios from "axios";
import { IBaseResponse, IResponsePagination } from "@/helpers/general.helper";
import { Blog } from "@/prisma/prisma/client";
import { IPayloadGetBlogPost } from "./api/blog/blog.interface";

export default async function sitemap() {
  const bashUrl = process.env.NEXT_PUBLIC_BASE_URL;

  let allArticles = [];

  try {
    const response = await axios<IBaseResponse<IResponsePagination<Blog[]>>>({
      url: `${bashUrl}/api/blog`,
      method: "GET",
      params: {},
    });

    console.log(response, "response");

    if (response) {
      const articles = response.data.payload?.rows.map((item) => {
        return {
          url: `${bashUrl}/blog/${item.title}`,
          lastModified: new Date(),
        };
      });
      if (articles) allArticles.push(...articles);
    }
  } catch (error) {
    console.log(error);
  }

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
    ...allArticles,
  ];
}
