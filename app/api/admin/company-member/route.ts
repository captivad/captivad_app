import { NextRequest } from "next/server";
import { IPayloadAddCompanyMember } from "./comapny-member.interface";
import { captivadPrisma } from "@/prisma/prisma";
import moment from "moment";
import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as IPayloadAddCompanyMember;

    const response = await captivadPrisma.companyMember.create({
      data: {
        uuid: uuidv4(),
        fullname: body.fullname,
        image_url: body.imageUrl,
        position: body.position,
        created_dt: moment().toISOString(),
        updated_dt: moment().toISOString(),
      },
    });

    return ResponseSuccess(response);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
