import { captivadPrisma } from "@/prisma/prisma";
import { StatusContent } from "@/prisma/prisma/client";
import { HttpException } from "@/utils/HttpException";

export async function getListService(token: any) {
  try {
    let whereCondition: any = { deleted_dt: null };
    if (!token) {
      whereCondition = { deleted_dt: null, status: StatusContent.publish };
    }
    const services = await captivadPrisma.service.findMany({
      where: whereCondition,
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
    const whereCondition: any = { deleted_dt: null, uuid: serviceId };
    const service = await captivadPrisma.service.findUnique({
      where: whereCondition,
      include: {
        portfolio_service: {
          include: {
            portfolio: {
              include: {
                portfolio_category: {
                  include: {
                    category: true,
                  },
                },
                portfolio_service: {
                  include: {
                    service: true,
                  },
                },
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
          ...item.portfolio,
          portfolio_category: item.portfolio.portfolio_category.map((item) => ({
            category_id: item.category.id,
            category_name: item.category.name,
          })),
          portfolio_service: item.portfolio.portfolio_service.map((item) => ({
            service_uuid: item.service.uuid,
            service_name: item.service.name_service,
          })),
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
