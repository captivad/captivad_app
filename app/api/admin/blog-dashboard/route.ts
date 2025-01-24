import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import {
  IPayloadCreatePost,
  IPayloadUpdateStatusPost,
} from "./blog-dashboard.interface";
import { captivadPrisma } from "@/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { Blog, Prisma, Status, StatusContent } from "@/prisma/prisma/client";
import { IResponsePagination, usePagination } from "@/helpers/general.helper";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as IPayloadCreatePost;

    await captivadPrisma.$transaction(async (tx) => {
      const blogUuid = uuidv4();
      await tx.blog.create({
        data: {
          uuid: blogUuid,
          title: body.title,
          thumbnail_url: body.thumbnailUrl,
          author: body.author,
          main_content: body.mainContent,
          optional_content: body.optionalContent,
          created_dt: moment().toDate(),
          updated_dt: moment().toDate(),
          status: body.status,
          like_count: 0,
          comment_count: 0,
          like_active: Status.disable,
          comment_active: Status.disable,
        },
      });

      if (body.categoryIds) {
        const categoryIds = body.categoryIds.split(",");
        await Promise.all(
          categoryIds.map(async (categoryId) => {
            const category = await tx.category.findUnique({
              where: { id: Number(categoryId), deleted_dt: null },
            });

            if (category) {
              await tx.blogCategory.create({
                data: {
                  uuid: uuidv4(),
                  blog_uuid: blogUuid,
                  category_id: Number(categoryId),
                  created_dt: moment().toDate(),
                  updated_dt: moment().toDate(),
                },
              });
            }
          })
        );
      }
    });

    return ResponseSuccess("Create post success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function GET(req: NextRequest) {
  try {
    const urlParams = req.nextUrl.searchParams;
    const search = urlParams.get("search");
    const status = urlParams.get("status") || StatusContent.publish;
    const page = urlParams.get("page"); // ?page=1

    const { limit, offset } = usePagination(Number(page), 10);

    const whereCondition: Prisma.BlogWhereInput = {
      AND: [
        {
          OR: [
            { title: { contains: search ? search : "", mode: "insensitive" } },
          ],
        },
      ],
      status: status as StatusContent,
      deleted_dt: null,
    };

    const responseList = await captivadPrisma.blog.findMany({
      where: whereCondition,
      orderBy: {
        created_dt: "desc",
      },
      skip: offset,
      take: limit,
    });

    const count = await captivadPrisma.blog.count({
      where: whereCondition,
    });

    const payload: IResponsePagination<Blog[]> = {
      currentPage: page ? Number(page) : 1,
      totalPage: Math.ceil(count / 10),
      totalData: count,
      rows: responseList,
    };
    return ResponseSuccess(payload);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as IPayloadUpdateStatusPost;
    await captivadPrisma.$transaction(async (tx) => {
      await tx.blog.updateMany({
        where: {
          uuid: {
            in: body.uuids,
          },
          deleted_dt: null,
        },
        data: {
          status: body.status,
          updated_dt: moment().toISOString(),
        },
      });
    });

    return ResponseSuccess("Update status success");
  } catch (error: any) {
    return ResponseError(500, error.message);
  }
}
