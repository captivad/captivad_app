import {
  IPayloadCreateOurWork,
  IPayloadEditOurWork,
  IPayloadEditOurWorkFormik,
} from "@/app/api/admin/our-work/our-work.interface";
import { ICategoryService } from "@/app/api/category/category.interface";
import {
  IResponseListCategoryWork,
  IResponseOurWorkDetail,
} from "@/app/api/our-work/our-work.interface";
import { SuccessResponse } from "@/helpers/exception.helper";
import { IFetchStatus } from "@/helpers/general.helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { param } from "framer-motion/m";
import toast from "react-hot-toast";

export function useGetOurWork() {
  return useQuery({
    queryKey: ["list-our-work"],
    queryFn: async () => {
      try {
        const response = await axios<
          SuccessResponse<IResponseListCategoryWork[]>
        >({
          url: "/api/our-work",
          method: "GET",
          params: {
            action: "category-work",
          },
        });
        return response.data.payload;
      } catch (error) {
        toast.error("Get our services failed!");
      }
    },
  });
}
export function useGetOurWorkDetailById({ id }: { id: string }) {
  return useQuery({
    queryKey: ["list-our-work", [id]],
    queryFn: async () => {
      try {
        const response = await axios<
          SuccessResponse<IResponseListCategoryWork[]>
        >({
          url: "/api/our-work/" + id,
          method: "GET",
          params: {
            action: "category-work",
          },
        });
        return response.data.payload;
      } catch (error) {
        toast.error("Get our services failed!");
      }
    },
    refetchOnWindowFocus: false,
  });
}

export function useCreateOurWork({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async (payload: IPayloadCreateOurWork) => {
      const response = await axios.post("/api/admin/our-work", payload);
      return response;
    },
    onSuccess,
    onError: (e) => {
      toast.error(e.message);
    },
  });
}
export function useEditOurWork({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IPayloadEditOurWorkFormik;
    }) => {
      const dataPayload: IPayloadEditOurWork = {
        title: payload.title,
        description: payload.description,
        objective: payload.objective,
        keyResult: payload.keyResult,
        thumbnailUrl: payload.thumbnailUrl,
        videoImageUrl: payload.videoImageUrl,
        serviceIds: payload.serviceIds
          .map((item) => item.value)
          .join(",")
          .trim(),
        categoryIds: payload.categoryIds
          .map((item) => item.value)
          .join(",")
          .trim(),
      };
      const response = await axios.put(
        "/api/admin/our-work/" + id,
        dataPayload,
        { params: { action: "edit-data" } }
      );
      return response;
    },
    onSuccess,
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useDeleteOurWork({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete("/api/admin/our-work/" + id);
      return response;
    },
    onSuccess,
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useGetCategory() {
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

export function useEditStatusOurWork({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.put(
        "/api/admin/our-work/" + id,
        {} as IPayloadEditOurWork,
        {
          params: {
            action: "edit-status",
          },
        }
      );
      return response;
    },
    onSuccess,
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

//API
export async function fetchDataDetailWorkById(
  id: string
): Promise<IResponseOurWorkDetail | null> {
  const response = await axios.get<SuccessResponse<IResponseOurWorkDetail>>(
    process.env.NEXTAUTH_URL + "/api/our-work/" + id
  );
  if (response.data.statusCode !== 200) {
    return null;
  }
  return response.data.payload;
}
