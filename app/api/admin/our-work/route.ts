import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import { captivadPrisma } from "@/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { StatusContent } from "@/prisma/prisma/client";
import { IPayloadCreateOurWork } from "./our-work.interface";
import { getListOurWork, getListOurWorkCategory } from "./our-work.service";
import { HttpException } from "@/utils/HttpException";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as IPayloadCreateOurWork;
    await captivadPrisma.$transaction(async (tx) => {
      const portfolioId = uuidv4();
      await tx.portfolio.create({
        data: {
          uuid: portfolioId,
          title: body.title,
          description: body.description,
          objectiv_content: body.objective,
          key_result_content: body.keyResult,
          thumbnail_url: body.thumbnailUrl,
          video_image_url: body.videoImageUrl,
          created_dt: moment().toISOString(),
          updated_dt: moment().toISOString(),
          status: StatusContent.draft,
        },
      });

      //create portfolio service
      if (body.serviceIds) {
        const serviceIds = body.serviceIds.split(",");
        await Promise.all(
          serviceIds.map(async (serviceId) => {
            const service = await tx.service.findUnique({
              where: { uuid: serviceId, deleted_dt: null },
            });

            const portfolioServiceValidation =
              await tx.portfolioService.findFirst({
                where: {
                  portfolio_uuid: portfolioId,
                  service_uuid: serviceId,
                  deleted_dt: null,
                },
              });

            if (service && !portfolioServiceValidation) {
              await tx.portfolioService.create({
                data: {
                  uuid: uuidv4(),
                  portfolio_uuid: portfolioId,
                  service_uuid: serviceId,
                  created_dt: moment().toISOString(),
                  updated_dt: moment().toISOString(),
                },
              });
            }
          })
        );
      }

      //create portfolio category
      if (body.categoryIds) {
        const categoryIds = body.categoryIds.split(",");
        await Promise.all(
          categoryIds.map(async (categoryId) => {
            const category = await tx.category.findUnique({
              where: { id: Number(categoryId), deleted_dt: null },
            });

            const portfolioCategoryValidation =
              await tx.portfolioCategory.findFirst({
                where: {
                  portfolio_uuid: portfolioId,
                  category_id: Number(categoryId),
                  deleted_dt: null,
                },
              });
            if (category && !portfolioCategoryValidation) {
              await tx.portfolioCategory.create({
                data: {
                  uuid: uuidv4(),
                  portfolio_uuid: portfolioId,
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

    return ResponseSuccess("Request create portfolio success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function GET(req: NextRequest) {
  try {
    const urlParams = req.nextUrl.searchParams;
    const acction = urlParams.get("action");

    switch (acction) {
      case "list":
        const responseList = await getListOurWork();
        return ResponseSuccess(responseList);
      case "category-work":
        const responseCategoryWork = await getListOurWorkCategory();
        return ResponseSuccess(responseCategoryWork);
      default:
        throw new HttpException(400, "Bad Request");
    }
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
