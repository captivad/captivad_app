import { StatusContent } from "@/prisma/prisma/client";
import { string } from "yup";

export interface IPayloadCreateOurService {
  nameService: string;
  descriptionService: string;
  detailTitle: string;
  mainContatent: string;
}

export interface IPayloadUpdateOurService extends IPayloadCreateOurService {}

export interface IPayloadUpdateStatusContent {
  status: StatusContent;
}

export interface IPayloadGetServiceParams {
  action: "list" | "detail";
  serviceId?: string;
}

export interface IListGetService {
  uuid: string;
  name_service: string;
  description_service: string;
  detail_title: string;
  main_content: string;
}

export interface IPorfolios {
  uuid: string;
  title: string;
  thumbnail_url: string;
}
export interface IGetServicDetail extends IListGetService {
  uuid: string;
  name_service: string;
  description_service: string;
  detail_title: string;
  main_content: string;
  portfolios: IPorfolios[];
}
