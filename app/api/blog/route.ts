import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { getPagination, IResponsePagination } from "@/helpers/general.helper";
import { captivadPrisma } from "@/prisma/prisma";
import { Blog, Prisma, StatusContent } from "@/prisma/prisma/client";
import { NextRequest } from "next/server";
import { title } from "process";

export async function GET(req: NextRequest) {
  try {
    const urlParams = req.nextUrl.searchParams;
    const search = urlParams.get("search");
    const page = Number(urlParams.get("page") || 1);
    const category = urlParams.get("category");

    const { limit, offset } = getPagination(Number(page || 1), 20);

    let whereCondition: Prisma.BlogWhereInput = {
      AND: [
        {
          OR: [
            { title: { contains: search ? search : "", mode: "insensitive" } },
            {
              main_content: {
                contains: search ? search : "",
                mode: "insensitive",
              },
            },
          ],
        },
        { status: StatusContent.publish },
        { deleted_dt: null },
      ],
    };

    if (category) {
      const foundCategory = await captivadPrisma.category.findUnique({
        where: { name: category },
      });

      if (foundCategory) {
        whereCondition = {
          ...whereCondition,
          blog_category: {
            some: {
              category_id: foundCategory.id,
            },
          },
        };
      }
    }

    const response = await captivadPrisma.blog.findMany({
      where: whereCondition,
      orderBy: { created_dt: "desc" },
      take: limit,
      skip: offset,
    });

    const count = await captivadPrisma.blog.count({
      where: whereCondition,
    });

    const payload: IResponsePagination<Blog[]> = {
      currentPage: page,
      totalPage: Math.ceil(count / limit),
      totalData: count,
      rows: response,
    };

    return ResponseSuccess(payload);
  } catch (error: any) {
    return ResponseError(500, error.message);
  }
}
