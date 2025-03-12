import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { captivadPrisma } from "@/prisma/prisma";
import moment from "moment";
import { NextRequest } from "next/server";
import { IPayloadAddCategory } from "./category.interface";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const catogories = await captivadPrisma.category.findMany({
      where: {
        deleted_dt: null,
      },
    });

    return ResponseSuccess(catogories);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as IPayloadAddCategory;
    await captivadPrisma.category.create({
      data: {
        name: body.name,
        description: body.description,
        created_dt: moment().toISOString(),
        updated_dt: moment().toISOString(),
      },
    });

    return ResponseSuccess("Request success");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
