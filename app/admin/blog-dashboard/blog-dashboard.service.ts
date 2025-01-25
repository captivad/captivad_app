import {
  IPayloadCreatePost,
  IPayloadEditPost,
  IPayloadGetListPost,
  IPayloadUpdateStatusPost,
  IPostDetail,
} from "@/app/api/admin/blog-dashboard/blog-dashboard.interface";
import { ICategoryService } from "@/app/api/category/category.interface";
import { SuccessResponse } from "@/helpers/exception.helper";
import {
  IBaseResponse,
  IFetchStatus,
  IResponsePagination,
} from "@/helpers/general.helper";
import { Blog } from "@/prisma/prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export function useGetPostDashboard(params: IPayloadGetListPost) {
  return useQuery({
    queryKey: ["get-post-dashboard", params],
    queryFn: async () => {
      try {
        const response = await axios<
          IBaseResponse<IResponsePagination<Blog[]>>
        >({
          method: "GET",
          url: "/api/admin/blog-dashboard",
          headers: {
            "Content-Type": "application/json",
          },
          params,
        });
        return response.data;
      } catch (error) {
        toast.error("Get post dashboard failed!");
      }
    },
  });
}

export function useDeletePostDashboard({ onSuccess }: IFetchStatus) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios({
        method: "DELETE",
        url: "/api/admin/blog-dashboard/" + id,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["get-post-dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });

      toast.success("Delete post dashboard success!");
      if (typeof window !== "undefined") {
        localStorage.removeItem("editorContent");
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useGetDetailPostId(id: string) {
  return useQuery({
    queryKey: ["get-detail-post", id],
    queryFn: async () => {
      try {
        const response = await axios<IBaseResponse<IPostDetail>>({
          method: "GET",
          url: "/api/admin/blog-dashboard/" + id,
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data.payload;
      } catch (error) {
        toast.error("Get detail post failed!");
      }
    },
  });
}

export function useUpdatePostDashboard(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: IPayloadEditPost) => {
      const response = await axios({
        method: "PUT",
        url: "/api/admin/blog-dashboard/" + id,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-post-dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-detail-post", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
      toast.success("Update post dashboard success!");
      if (typeof window !== "undefined") {
        localStorage.removeItem("editorContent");
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useCreatePostDashboard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: IPayloadCreatePost) => {
      const response = await axios({
        method: "POST",
        url: "/api/admin/blog-dashboard",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-post-dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
      toast.success("Create post dashboard success!");
      if (typeof window !== "undefined") {
        localStorage.removeItem("editorContent");
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useGetCategoryDashboard() {
  return useQuery({
    queryKey: ["category-service"],
    queryFn: async () => {
      try {
        const response = await axios<SuccessResponse<ICategoryService[]>>({
          url: "/api/category",
          method: "GET",
        });
        console.log(response, "response");

        return response.data.payload;
      } catch (error) {
        toast.error("Get our services failed!");
      }
    },
    refetchOnWindowFocus: false,
  });
}

export function useUpdateStatusPostDashboard({ onSuccess }: IFetchStatus) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: IPayloadUpdateStatusPost) => {
      const response = await axios({
        method: "PUT",
        url: "/api/admin/blog-dashboard",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      });
      return response.data;
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["get-post-dashboard"],
      });
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
      toast.success("Update status post dashboard success!");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}
