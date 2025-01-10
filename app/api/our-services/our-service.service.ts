import { captivadPrisma } from "@/prisma/prisma";
import { StatusContent } from "@/prisma/prisma/client";
import { HttpException } from "@/utils/HttpException";
import { video } from "framer-motion/client";

export async function getListService(token: any) {
  try {
    let whereCondition: any = { deleted_dt: null };
    if (!token) {
      whereCondition = { deleted_dt: null, status: StatusContent.publish };
    }
    const services = await captivadPrisma.service.findMany({
      where: whereCondition,
      orderBy: { created_dt: "desc" },
    });

    return services;
  } catch (error: any) {
    console.log(error);
    throw new HttpException(500, error.message);
  }
}

export async function getDetailServiceById(serviceId: string) {
  try {
    const whereCondition: any = { deleted_dt: null, uuid: serviceId };
    const service = await captivadPrisma.service.findUnique({
      where: whereCondition,
      include: {
        portfolio_service: {
          include: {
            portfolio: true,
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
          video_image_url: item.portfolio.video_image_url,
          objectiv_content: item.portfolio.objectiv_content,
          key_result_content: item.portfolio.key_result_content,
          description: item.portfolio.description,
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
