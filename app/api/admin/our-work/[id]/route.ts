import { NextRequest } from "next/server";
import { IPayloadEditOurWork } from "../our-work.interface";
import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { captivadPrisma } from "@/prisma/prisma";
import { HttpException } from "@/utils/HttpException";
import moment from "moment";
import { StatusContent } from "@/prisma/prisma/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = (await req.json()) as IPayloadEditOurWork;
    const urlParams = req.nextUrl.searchParams;
    const acction = urlParams.get("action") as "edit-data" | "edit-status";

    switch (acction) {
      case "edit-data":
        const foundPorfolio = await captivadPrisma.portfolio.findUnique({
          where: { uuid: params.id, deleted_dt: null },
        });

        if (!foundPorfolio) {
          throw new HttpException(404, "Portfolio not found");
        }

        const foundPortfolioService =
          await captivadPrisma.portfolioService.findMany({
            where: { portfolio_uuid: foundPorfolio.uuid, deleted_dt: null },
          });

        const foundPortfolioCategory =
          await captivadPrisma.portfolioCategory.findMany({
            where: { portfolio_uuid: foundPorfolio.uuid, deleted_dt: null },
          });

        foundPorfolio.title = body.title || foundPorfolio.title;
        foundPorfolio.description =
          body.description || foundPorfolio.description;
        foundPorfolio.objectiv_content =
          body.objective || foundPorfolio.objectiv_content;
        foundPorfolio.key_result_content =
          body.keyResult || foundPorfolio.key_result_content;
        foundPorfolio.thumbnail_url =
          body.thumbnailUrl || foundPorfolio.thumbnail_url;
        foundPorfolio.video_image_url =
          body.videoImageUrl || foundPorfolio.video_image_url;

        await captivadPrisma.$transaction(async (tx) => {
          await tx.portfolio.update({
            where: { uuid: foundPorfolio.uuid },
            data: {
              ...foundPorfolio,
              updated_dt: moment().toISOString(),
            },
          });

          //create portfolio service
          if (foundPortfolioService.length > 0 && body.serviceIds.length > 0) {
            await tx.portfolioService.deleteMany({
              where: { portfolio_uuid: foundPorfolio.uuid },
            });

            const serviceIds = body.serviceIds.split(",");
            await Promise.all(
              serviceIds.map(async (serviceId) => {
                const service = await tx.service.findUnique({
                  where: { uuid: serviceId, deleted_dt: null },
                });

                if (service) {
                  await tx.portfolioService.create({
                    data: {
                      portfolio_uuid: foundPorfolio.uuid,
                      service_uuid: service.uuid,
                      created_dt: moment().toISOString(),
                      updated_dt: moment().toISOString(),
                    },
                  });
                }
              })
            );
          } else if (
            foundPortfolioService.length === 0 &&
            body.serviceIds.length > 0
          ) {
            const serviceIds = body.serviceIds.split(",");
            await Promise.all(
              serviceIds.map(async (serviceId) => {
                const service = await tx.service.findUnique({
                  where: { uuid: serviceId, deleted_dt: null },
                });

                if (service) {
                  await tx.portfolioService.create({
                    data: {
                      portfolio_uuid: foundPorfolio.uuid,
                      service_uuid: service.uuid,
                      created_dt: moment().toISOString(),
                      updated_dt: moment().toISOString(),
                    },
                  });
                }
              })
            );
          }

          //create portfolio category
          if (
            foundPortfolioCategory.length > 0 &&
            body.categoryIds.length > 0
          ) {
            await tx.portfolioCategory.deleteMany({
              where: { portfolio_uuid: foundPorfolio.uuid },
            });

            const categoryIds = body.categoryIds.split(",");
            await Promise.all(
              categoryIds.map(async (categoryId) => {
                const category = await tx.category.findUnique({
                  where: { id: Number(categoryId), deleted_dt: null },
                });

                if (category) {
                  await tx.portfolioCategory.create({
                    data: {
                      portfolio_uuid: foundPorfolio.uuid,
                      category_id: category.id,
                      created_dt: moment().toISOString(),
                      updated_dt: moment().toISOString(),
                    },
                  });
                }
              })
            );
          } else if (
            foundPortfolioCategory.length === 0 &&
            body.categoryIds.length > 0
          ) {
            const categoryIds = body.categoryIds.split(",");
            await Promise.all(
              categoryIds.map(async (categoryId) => {
                const category = await tx.category.findUnique({
                  where: { id: Number(categoryId), deleted_dt: null },
                });

                if (category) {
                  await tx.portfolioCategory.create({
                    data: {
                      portfolio_uuid: foundPorfolio.uuid,
                      category_id: category.id,
                      created_dt: moment().toISOString(),
                      updated_dt: moment().toISOString(),
                    },
                  });
                }
              })
            );
          }
        });

        return ResponseSuccess("Request update portfolio success");

      case "edit-status":
        const foundPorfolioStatus = await captivadPrisma.portfolio.findUnique({
          where: { uuid: params.id, deleted_dt: null },
        });

        if (!foundPorfolioStatus) {
          throw new HttpException(404, "Portfolio not found");
        }

        const status =
          foundPorfolioStatus.status === StatusContent.draft
            ? StatusContent.publish
            : StatusContent.draft;

        if (!status) {
          throw new HttpException(400, "Status is required");
        }

        await captivadPrisma.portfolio.update({
          where: { uuid: params.id },
          data: {
            status: status,
            updated_dt: moment().toISOString(),
          },
        });

        return ResponseSuccess("Request update portfolio success");
    }
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
    const portfolioUuid = params.id as string;
    const foundPorfolio = await captivadPrisma.portfolio.findUnique({
      where: { uuid: portfolioUuid, deleted_dt: null },
    });

    if (!foundPorfolio) {
      throw new HttpException(404, "Portfolio not found");
    }

    await captivadPrisma.$transaction(async (tx) => {
      await tx.portfolio.update({
        where: { uuid: portfolioUuid },
        data: {
          status: StatusContent.draft,
          updated_dt: moment().toISOString(),
          deleted_dt: moment().toISOString(),
        },
      });
    });

    return ResponseSuccess("Request delete portfolio success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
