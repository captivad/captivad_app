import { HttpException } from "@/utils/HttpException";

export interface IFetchStatus {
  onError?: (error: HttpException) => void;
  onSuccess?: (data: any) => void;
}

export interface IBaseResponse<T> {
  statusCode: number;
  status: boolean;
  message: string;
  payload?: T;
}

export interface IPayloadPaginationParams {
  page?: string;
  size?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface IResponsePagination<T> {
  currentPage: number;
  totalPage: number;
  totalData: number;
  rows: T;
}

export const usePagination = (
  page: number | undefined,
  size: number | undefined
) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};
