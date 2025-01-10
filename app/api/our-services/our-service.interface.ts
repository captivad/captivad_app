import { StatusContent } from "@/prisma/prisma/client";
import { IOurWork } from "../our-work/our-work.interface";
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
  status: StatusContent;
}

export interface IPorfolios extends IOurWork {}

export interface IGetServicDetail extends IListGetService {
  uuid: string;
  name_service: string;
  description_service: string;
  detail_title: string;
  main_content: string;
  portfolios: IPorfolios[];
}
