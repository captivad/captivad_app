import {
  IOurWork,
  IResponseListCategoryWork,
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
