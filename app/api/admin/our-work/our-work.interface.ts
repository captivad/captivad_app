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

export interface IPayloadUpdateOurWork extends IPayloadCreateOurWork {}

export interface IPayloadUpdateStatusContent {
  status: StatusContent;
}
export interface IOurWork {
  uuid: string;
  title: string;
  thumbnail_url: string;
}

export interface IResponseListCategoryWork {
  id: number;
  category_name: string;
  portfolios: IOurWork[];
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IPortfolioCategory {
  category: ICategory;
}

export interface IResponseOurWork {
  uuid: string;
  title: string;
  description: string;
  objectiv_content: string;
  key_result_content: string;
  thumbnail_url: string;
  video_image_url: string;
  status: "publish" | "draft" | "archived"; // Sesuaikan jika ada status lain
  created_dt: string; // ISO Date String
  created_by: string | null;
  updated_dt: string; // ISO Date String
  updated_by: string | null;
  deleted_dt: string | null;
  deleted_by: string | null;
  portfolio_category: IPortfolioCategory[];
}
