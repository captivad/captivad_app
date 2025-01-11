export interface IOurWorkCategory {
  category_id: number;
  category_name: string;
}

export interface IOurWorkService {
  service_uuid: string;
  service_name: string;
}

export interface IOurWork {
  uuid: string;
  title: string;
  description: string;
  objectiv_content: string;
  key_result_content: string;
  thumbnail_url: string;
  video_image_url: string;
  status: string;
  portfolio_category: IOurWorkCategory[];
  portfolio_service: IOurWorkService[];
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

export interface IResponseOurWorkDetail {
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
