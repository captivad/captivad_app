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
