import {
  IGetServicDetail,
  IListGetService,
} from "@/app/api/admin/our-services/our-service.interface";
import { SuccessResponse } from "@/helpers/exception.helper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useGetListService() {
  return useQuery({
    queryKey: ["list-service"],
    queryFn: async () => {
      try {
        const response = await axios<SuccessResponse<IListGetService[]>>({
          url: "/api/admin/our-services",
          method: "GET",
          params: {
            action: "list",
            id: "",
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
export async function fetchDataDetailServiceById(
  id: string
): Promise<IGetServicDetail | null> {
  const response = await axios.get<SuccessResponse<IGetServicDetail>>(
    process.env.NEXTAUTH_URL + "/api/admin/our-services",
    {
      params: { id, action: "detail" },
    }
  );
  if (response.data.statusCode !== 200) {
    return null;
  }
  return response.data.payload;
}
