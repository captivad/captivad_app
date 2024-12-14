import { captivadPrisma } from "@/prisma/prisma";
import { StatusContent } from "@/prisma/prisma/client";
import { HttpException } from "@/utils/HttpException";
import { IOurWork, IResponseListCategoryWork } from "./our-work.interface";

export const getListOurWork = async () => {
  try {
    const services = await captivadPrisma.portfolio.findMany({
      where: { deleted_dt: null, status: StatusContent.publish },
      orderBy: { created_dt: "asc" },
    });

    return services;
  } catch (error: any) {
    console.log(error);
    throw new HttpException(500, error.message);
  }
};

export const getListOurWorkCategory = async () => {
  try {
    const category = await captivadPrisma.category.findMany({
      where: { deleted_dt: null },
      orderBy: { name: "asc" },
    });

    const portfolioCategory = await captivadPrisma.portfolioCategory.findMany({
      where: { deleted_dt: null },
      orderBy: { created_dt: "asc" },
      include: {
        portfolio: true,
      },
    });

    const categoryMap = new Map();
    category.forEach((item) => {
      categoryMap.set(item.id, item.name as string);
    });

    const categoryPortfolioMap = new Map();
    portfolioCategory.forEach((item) => {
      if (categoryPortfolioMap.has(item.category_id)) {
        categoryPortfolioMap.get(item.category_id).push(item.portfolio);
      } else {
        categoryPortfolioMap.set(item.category_id, [item.portfolio]);
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
