import { StatusContent } from "@/prisma/prisma/client";

export interface IPayloadGetBlogPost {
  search: string;
  category: string;
  page: number;
}

export interface IBlogPost {
  uuid: string;
  title: string;
  thumbnail_url: string;
  author: string;
  main_content: string;
  created_dt: Date;
  updated_dt: Date;
  deleted_dt: Date | null;
  status: StatusContent;
  categories: string[];
}
