import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { captivadPrisma } from "@/prisma/prisma";
import { StatusContent } from "@/prisma/prisma/client";
import { HttpException } from "@/utils/HttpException";

export async function getListService() {
  try {
    const services = await captivadPrisma.service.findMany({
      where: { deleted_dt: null, status: StatusContent.publish },
      orderBy: { created_dt: "asc" },
    });

    return services;
  } catch (error: any) {
    console.log(error);
    throw new HttpException(500, error.message);
  }
}

export async function getDetailServiceById(serviceId: string) {
  try {
    const service = await captivadPrisma.service.findUnique({
      where: {
        uuid: serviceId,
        deleted_dt: null,
        status: StatusContent.publish,
      },
      include: {
        portfolio_service: {
          include: {
            portfolio: {
              select: {
                uuid: true,
                thumbnail_url: true,
                title: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!service) {
      throw new HttpException(404, "Service not found");
    }

    const payloadResult = {
      uuid: service.uuid,
      name_service: service.name_service,
      description_service: service.description_service,
      detail_title: service.detail_title,
      main_content: service.main_content,
      portfolios: service.portfolio_service
        .map((item) => ({
          uuid: item.portfolio.uuid,
          title: item.portfolio.title,
          thumbnail_url: item.portfolio.thumbnail_url,
          status: item.portfolio.status,
        }))
        .filter((item) => item.status === StatusContent.publish),
    };

    return payloadResult;
  } catch (error: any) {
    console.log(error);
    throw new HttpException(500, error.message);
  }
}

export async function getDetailServiceBySlug(slug: string) {
  try {
    const service = await captivadPrisma.service.findFirst({
      where: {
        name_service: slug.split("%20").join(" "),
        deleted_dt: null,
        status: StatusContent.publish,
      },
      include: {
        portfolio_service: {
          include: {
            portfolio: {
              select: {
                uuid: true,
                thumbnail_url: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!service) {
      throw new HttpException(404, "Service not found");
    }

    const payloadResult = {
      uuid: service.uuid,
      name_service: service.name_service,
      description_service: service.description_service,
      detail_title: service.detail_title,
      main_content: service.main_content,
      portfolios: service.portfolio_service.map((item) => ({
        uuid: item.portfolio.uuid,
        title: item.portfolio.title,
        thumbnail_url: item.portfolio.thumbnail_url,
      })),
    };

    return payloadResult;
  } catch (error: any) {
    console.log(error);
    throw new HttpException(500, error.message);
  }
}
