import { StatusContent } from "@/prisma/prisma/client";

export interface IPayloadCreateOurService {
  nameService: string;
  descriptionService: string;
  detailTitle: string;
  mainContatent: string;
}

export interface IPayloadUpdateOurService extends IPayloadCreateOurService {
  status: StatusContent;
}

export interface IPayloadUpdateStatusContent {
  status: StatusContent;
}
