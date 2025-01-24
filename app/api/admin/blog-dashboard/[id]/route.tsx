import { captivadPrisma } from "@/prisma/prisma";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { IPayloadEditPost, IPostDetail } from "../blog-dashboard.interface";
import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { HttpException } from "@/utils/HttpException";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = (await req.json()) as IPayloadEditPost;

    await captivadPrisma.$transaction(async (tx) => {
      const validatayionPost = await tx.blog.findUnique({
        where: { uuid: params.id, deleted_dt: null },
      });

      if (!validatayionPost) throw new HttpException(404, "Post not found");

      validatayionPost.title = body.title;
      validatayionPost.thumbnail_url = body.thumbnailUrl;
      validatayionPost.author = body.author;
      validatayionPost.main_content = body.mainContent;
      validatayionPost.optional_content = body.optionalContent;
      validatayionPost.status = body.status;
      validatayionPost.updated_dt = moment().toDate();

      await tx.blog.update({
        data: { ...validatayionPost },
        where: { uuid: validatayionPost.uuid },
      });

      if (body.categoryIds) {
        const categoryIds = body.categoryIds.split(",");

        await tx.blogCategory.deleteMany({
          where: { blog_uuid: validatayionPost.uuid },
        });

        await Promise.all(
          categoryIds.map(async (categoryId) => {
            const category = await tx.category.findUnique({
              where: { id: Number(categoryId), deleted_dt: null },
            });

            if (category) {
              await tx.blogCategory.create({
                data: {
                  uuid: uuidv4(),
                  blog_uuid: validatayionPost.uuid,
                  category_id: Number(categoryId),
                  created_dt: moment().toISOString(),
                  updated_dt: moment().toISOString(),
                },
              });
            }
          })
        );
      }
    });

    return ResponseSuccess("Edit post success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogUuids = params.id.split(",") as string[];

    await captivadPrisma.$transaction(async (tx) => {
      await tx.blog.updateMany({
        where: {
          uuid: {
            in: blogUuids,
          },
          deleted_dt: null,
        },
        data: {
          status: "draft",
          updated_dt: moment().toISOString(),
          deleted_dt: moment().toISOString(),
        },
      });
    });
    return ResponseSuccess("Request delete blog success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const blogId = params.id as string;
    const responseDetailBlog = await captivadPrisma.blog.findUnique({
      where: { uuid: blogId, deleted_dt: null },
      include: {
        blog_category: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!responseDetailBlog) {
      throw new HttpException(404, "Blog not found");
    }

    const payload: IPostDetail = {
      uuid: responseDetailBlog.uuid,
      title: responseDetailBlog.title,
      thumbnailUrl: responseDetailBlog.thumbnail_url,
      author: responseDetailBlog.author,
      mainContent: responseDetailBlog.main_content,
      optionalContent: responseDetailBlog.optional_content,
      status: responseDetailBlog.status,
      categories: responseDetailBlog.blog_category.map((item) => {
        return {
          id: item.category.id,
          name: item.category.name,
        };
      }),
    };
    return ResponseSuccess(payload);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
