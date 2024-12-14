import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import { IPayloadCreateOurService } from "./our-service.interface";
import { captivadPrisma } from "@/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { StatusContent } from "@/prisma/prisma/client";
import {
  getDetailServiceById,
  getListService,
  getDetailServiceBySlug,
} from "./our-service.service";
import { HttpException } from "@/utils/HttpException";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as IPayloadCreateOurService;

    await captivadPrisma.service.create({
      data: {
        uuid: uuidv4(),
        name_service: body.nameService,
        description_service: body.descriptionService,
        detail_title: body.detailTitle,
        main_content: body.mainContatent,
        created_dt: moment().toISOString(),
        updated_dt: moment().toISOString(),
        status: StatusContent.draft,
      },
    });

    return ResponseSuccess("Request success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function GET(req: NextRequest) {
  try {
    const urlParams = req.nextUrl.searchParams;
    const action = urlParams.get("action");
    const serviceId = urlParams.get("id");

    switch (action) {
      case "list":
        const responseList = await getListService();
        return ResponseSuccess(responseList);
      case "detail":
        if (!serviceId) {
          throw new HttpException(
            400,
            "Service ID is required for detail action"
          );
        }
        const responseDetail = await getDetailServiceById(serviceId as string);
        return ResponseSuccess(responseDetail);
      default:
        throw new HttpException(400, "Bad Request");
    }
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
