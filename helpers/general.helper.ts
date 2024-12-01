import { HttpException } from "@/utils/HttpException";

export interface IResponseStatus {
  onError?: (error: HttpException) => void;
  onSuccess?: (data: any) => void;
}

export interface IBaseResponse<T = undefined> {
  statusCode: number;
  status: boolean;
  message: string;
  payload?: T;
}

export interface IPayloadPaginationParams {
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface IResponsePagination<T = undefined> {
  currentPage: number;
  totalPage: number;
  totalData: number;
  rows: T[];
}

export const usePagination = (
  page: number | undefined,
  size: number | undefined
) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};
