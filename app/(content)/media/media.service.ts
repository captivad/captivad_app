import {
  ICloudinaryAssetResponse,
  IGetCloudinaryAssetParams,
  IResponseLoadMore,
} from "@/app/api/upload-file/upload-file.interface";
import { IBaseResponse } from "@/helpers/general.helper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook: Nama dimulai dengan "use"
export function useMedia(params: IGetCloudinaryAssetParams) {
  return useQuery({
    queryKey: ["media", params],
    queryFn: async () => {
      console.log(params);

      const response = await axios<
        IBaseResponse<IResponseLoadMore<ICloudinaryAssetResponse[]>>
      >("/api/upload-file", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params,
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}
