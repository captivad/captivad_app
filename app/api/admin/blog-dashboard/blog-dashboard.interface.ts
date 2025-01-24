import { IMultiselectOption } from "@/components/multi-select";
import { StatusContent } from "@/prisma/prisma/client";

export interface IPayloadGetListPost {
  page: number;
  search: string;
  status: StatusContent;
}

export interface IPayloadCreatePost {
  title: string;
  thumbnailUrl: string;
  author: string;
  mainContent: string;
  categoryIds: string;
  optionalContent: string;
  status: StatusContent;
}

export interface IPayloadCreatePostFormik {
  title: string;
  thumbnailUrl: string;
  author: string;
  mainContent: string;
  categoryIds: IMultiselectOption[];
  optionalContent: string;
  status: StatusContent;
}

export interface IPayloadEditPost extends IPayloadCreatePost {}

export interface IPayloadUpdatePostFormik extends IPayloadCreatePostFormik {}

export interface IPostCategory {
  id: number;
  name: string;
}

export interface IPostDetail {
  uuid: string;
  title: string;
  thumbnailUrl: string;
  author: string;
  mainContent: string;
  optionalContent: string;
  status: StatusContent;
  categories: IPostCategory[];
}

export interface IPayloadUpdateStatusPost {
  uuids: string[];
  status: StatusContent;
}
