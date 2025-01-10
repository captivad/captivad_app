import { IPayloadCreateOurWork } from "@/app/api/admin/our-work/our-work.interface";
import { ICategoryService } from "@/app/api/category/category.interface";
import {
  IResponseListCategoryWork,
  IResponseOurWork,
} from "@/app/api/our-work/our-work.interface";
import { SuccessResponse } from "@/helpers/exception.helper";
import { IFetchStatus } from "@/helpers/general.helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
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

//API
export async function fetchDataDetailWorkById(
  id: string
): Promise<IResponseOurWork | null> {
  const response = await axios.get<SuccessResponse<IResponseOurWork>>(
    process.env.NEXTAUTH_URL + "/api/our-work/" + id
  );
  if (response.data.statusCode !== 200) {
    return null;
  }
  return response.data.payload;
}
