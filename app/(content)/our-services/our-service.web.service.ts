import {
  IPayloadCreateOurService,
  IPayloadUpdateOurService,
} from "@/app/api/admin/our-services/our-service.interface";
import {
  IGetServicDetail,
  IListGetService,
} from "@/app/api/our-services/our-service.interface";
import { SuccessResponse } from "@/helpers/exception.helper";
import { IFetchStatus } from "@/helpers/general.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useGetListService() {
  return useQuery({
    queryKey: ["list-service"],
    queryFn: async () => {
      try {
        const response = await axios<SuccessResponse<IListGetService[]>>({
          url: "/api/our-services",
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

export function useCreateService({ onSuccess }: IFetchStatus) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: IPayloadCreateOurService) => {
      const response = await axios.post("/api/admin/our-services", payload);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["list-service"],
      });
      toast.success("Create Our Service Success");
      onSuccess && onSuccess(data);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useEditService({ onSuccess }: IFetchStatus) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: IPayloadUpdateOurService;
      id: string;
    }) => {
      const response = await axios.put(
        `/api/admin/our-services/${id}`,
        payload
      );
      return response;
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["list-service"],
      });
      toast.success("Edit Our Service Success");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/admin/our-services/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list-service"],
      });
      toast.success("Delete Service Success");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

//API
export async function fetchDataDetailServiceById(
  id: string
): Promise<IGetServicDetail | null> {
  const response = await axios.get<SuccessResponse<IGetServicDetail>>(
    process.env.NEXTAUTH_URL + "/api/our-services",
    {
      params: { id, action: "detail" },
    }
  );
  if (response.data.statusCode !== 200) {
    return null;
  }
  return response.data.payload;
}
