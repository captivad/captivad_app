import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { captivadPrisma } from "@/prisma/prisma";
import { StatusContent } from "@/prisma/prisma/client";
import { HttpException } from "@/utils/HttpException";
import { NextRequest } from "next/server";
import { IBlogPost } from "../blog.interface";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const uuid = params.id;

    if (!uuid) throw new HttpException(400, "article uuid is required");

    const response = await captivadPrisma.blog.findFirst({
      where: { uuid, deleted_dt: null },
      include: {
        blog_category: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!response) throw new HttpException(404, "Article not found");

    const payload: IBlogPost = {
      uuid: response.uuid,
      title: response.title,
      thumbnail_url: response.thumbnail_url,
      author: response.author,
      main_content: response.main_content,
      created_dt: response.created_dt,
      updated_dt: response.updated_dt,
      deleted_dt: response.deleted_dt,
      status: response.status,
      categories: response.blog_category.map((item) => item.category.name),
    };

    return ResponseSuccess(payload);
  } catch (error: any) {
    return ResponseError(500, error.message);
  }
}
