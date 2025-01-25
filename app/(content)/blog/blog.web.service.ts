import { IBlogPost, IPayloadGetBlogPost } from "@/app/api/blog/blog.interface";
import { ICategoryService } from "@/app/api/category/category.interface";
import { SuccessResponse } from "@/helpers/exception.helper";
import {
  IBaseResponse,
  IFetchStatus,
  IResponsePagination,
} from "@/helpers/general.helper";
import { Blog } from "@/prisma/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useGetCategoryBlog() {
  return useQuery({
    queryKey: ["category-service"],
    queryFn: async () => {
      try {
        const response = await axios<IBaseResponse<ICategoryService[]>>({
          url: "/api/category",
          method: "GET",
        });
        return response.data.payload;
      } catch (error) {
        toast.error("Get category failed!");
      }
    },
    refetchOnWindowFocus: false,
  });
}

export function useGetBlogPost(params: IPayloadGetBlogPost) {
  return useQuery({
    queryKey: ["blog", params],
    queryFn: async () => {
      try {
        const response = await axios<
          IBaseResponse<IResponsePagination<Blog[]>>
        >({
          url: "/api/blog",
          method: "GET",
          params,
        });
        return response.data.payload;
      } catch (error) {
        toast.error("Get Article failed!");
      }
    },
    refetchOnWindowFocus: false,
  });
}

//API
export async function fetchDetailArticle(
  id: string
): Promise<IBlogPost | null> {
  const response = await axios.get<SuccessResponse<IBlogPost>>(
    process.env.NEXTAUTH_URL + "/api/blog/" + id
  );
  if (response.data.statusCode !== 200) {
    return null;
  }
  return response.data.payload;
}
