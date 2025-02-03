import {
  IPayloadAddCompanyMember,
  IPayloadEditCompanyMember,
} from "@/app/api/admin/company-member/comapny-member.interface";
import { IBaseResponse, IFetchStatus } from "@/helpers/general.helper";
import { CompanyMember } from "@/prisma/prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useGetMember() {
  return useQuery({
    queryKey: ["company-member"],
    queryFn: async () => {
      const response = await axios<IBaseResponse<CompanyMember[]>>({
        method: "GET",
        url: "/api/company-member",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },
  });
}

export function useAddMember({ onSuccess }: IFetchStatus) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: IPayloadAddCompanyMember) => {
      const response = await axios<IBaseResponse<CompanyMember>>({
        method: "POST",
        url: "/api/admin/company-member",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      });
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["company-member"],
      });
      toast.success("Add Member Success");
      onSuccess && onSuccess(data);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios<IBaseResponse<CompanyMember>>({
        method: "DELETE",
        url: "/api/admin/company-member/" + id,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["company-member"],
      });
      toast.success("Delete Member Success");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useUpdateMember({ onSuccess }: IFetchStatus) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: IPayloadEditCompanyMember) => {
      const response = await axios<IBaseResponse<CompanyMember>>({
        method: "PUT",
        url: "/api/admin/company-member/" + payload.uuid,
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      });
      return response;
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["company-member"],
      });
      toast.success("Update Member Success");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}
