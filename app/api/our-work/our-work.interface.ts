export interface IOurWork {
  uuid: string;
  title: string;
  thumbnail_url: string;
  description: string;
  objectiv_content: string;
  key_result_content: string;
  video_image_url: string;
  status: string;
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
