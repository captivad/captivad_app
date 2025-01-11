import { IMultiselectOption } from "@/components/multi-select";
import { StatusContent } from "@/prisma/prisma/client";

export interface IPayloadCreateOurWork {
  title: string;
  description: string;
  objective: string;
  keyResult: string;
  thumbnailUrl: string;
  videoImageUrl: string;
  serviceIds: string;
  categoryIds: string;
}
export interface IPayloadEditOurWorkFormik {
  title: string;
  description: string;
  objective: string;
  keyResult: string;
  thumbnailUrl: string;
  videoImageUrl: string;
  serviceIds: IMultiselectOption[];
  categoryIds: IMultiselectOption[];
}

export interface IPayloadEditOurWork {
  title: string;
  description: string;
  objective: string;
  keyResult: string;
  thumbnailUrl: string;
  videoImageUrl: string;
  serviceIds: string;
  categoryIds: string;
}

export interface IPayloadUpdateOurWork extends IPayloadCreateOurWork {}

export interface IPayloadUpdateStatusContent {
  status: StatusContent;
}
