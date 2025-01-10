import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import { IPayloadCreateOurService } from "./our-service.interface";
import { captivadPrisma } from "@/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { StatusContent } from "@/prisma/prisma/client";

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
