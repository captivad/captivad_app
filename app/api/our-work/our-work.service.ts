import { captivadPrisma } from "@/prisma/prisma";
import { PortfolioCategory, StatusContent } from "@/prisma/prisma/client";
import { HttpException } from "@/utils/HttpException";
import { IResponseListCategoryWork } from "./our-work.interface";

export const getListOurWork = async (token: any) => {
  try {
    const whereCondition = { deleted_dt: null, status: StatusContent.publish };
    const services = await captivadPrisma.portfolio.findMany({
      where: whereCondition,
      orderBy: { created_dt: "asc" },
    });

    return services;
  } catch (error: any) {
    console.log(error);
    throw new HttpException(500, error.message);
  }
};

export const getListOurWorkCategory = async (token: any) => {
  try {
    const category = await captivadPrisma.category.findMany({
      where: { deleted_dt: null },
      orderBy: { name: "asc" },
    });

    let whereCondition: any = {
      deleted_dt: null,
      portfolio: { deleted_dt: null },
    };

    if (!token) {
      whereCondition = {
        deleted_dt: null,
        portfolio: { status: StatusContent.publish },
      };
    }

    const portfolioCategory = await captivadPrisma.portfolioCategory.findMany({
      where: whereCondition,
      orderBy: { portfolio: { created_dt: "desc" } },
      include: {
        portfolio: {
          include: {
            portfolio_category: {
              select: {
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            portfolio_service: {
              select: {
                service: {
                  select: {
                    uuid: true,
                    name_service: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const categoryMap = new Map();
    category.forEach((item) => {
      categoryMap.set(item.id, item.name as string);
    });

    const categoryPortfolioMap = new Map();
    portfolioCategory.forEach((item) => {
      const enrichedPortfolio = {
        ...item.portfolio,
        portfolio_category: item.portfolio.portfolio_category.map((item) => {
          return {
            category_id: item.category.id,
            category_name: item.category.name,
          };
        }),
        portfolio_service: item.portfolio.portfolio_service.map((item) => {
          return {
            service_uuid: item.service.uuid,
            service_name: item.service.name_service,
          };
        }),
      };

      if (categoryPortfolioMap.has(item.category_id)) {
        categoryPortfolioMap.get(item.category_id).push(enrichedPortfolio);
      } else {
        categoryPortfolioMap.set(item.category_id, [enrichedPortfolio]);
      }
    });

    const listCategoryWork: IResponseListCategoryWork[] = [];
    categoryPortfolioMap.forEach((value, key) => {
      categoryMap.get(key) &&
        listCategoryWork.push({
          id: key,
          category_name: categoryMap.get(key) || "",
          portfolios: value,
        });
    });

    return listCategoryWork.filter((item) => item.portfolios.length > 0);
  } catch (error: any) {
    console.log(error);
    throw new HttpException(500, error.message);
  }
};

export const getDetailWorkById = async (workId: string) => {
  try {
    const work = await captivadPrisma.portfolio.findUnique({
      where: {
        uuid: workId,
        deleted_dt: null,
      },
      include: {
        portfolio_category: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!work) {
      throw new HttpException(404, "Work not found");
    }

    return work;
  } catch (error: any) {
    console.log(error);
    throw new HttpException(500, error.message);
  }
};
