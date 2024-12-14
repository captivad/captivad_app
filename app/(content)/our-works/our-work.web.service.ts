import {
  IOurWork,
  IResponseListCategoryWork,
  IResponseOurWork,
} from "@/app/api/admin/our-work/our-work.interface";
import { SuccessResponse } from "@/helpers/exception.helper";
import { useQuery } from "@tanstack/react-query";
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
          url: "/api/admin/our-work",
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
          url: "/api/admin/our-work/" + id,
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

//API
export async function fetchDataDetailWorkById(
  id: string
): Promise<IResponseOurWork | null> {
  const response = await axios.get<SuccessResponse<IResponseOurWork>>(
    process.env.NEXTAUTH_URL + "/api/admin/our-work/" + id
  );
  if (response.data.statusCode !== 200) {
    return null;
  }
  return response.data.payload;
}
