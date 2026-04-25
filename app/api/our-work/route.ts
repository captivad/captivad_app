import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import { HttpException } from "@/utils/HttpException";
import { getListOurWork, getListOurWorkCategory } from "./our-work.service";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const urlParams = req.nextUrl.searchParams;
    const acction = urlParams.get("action");
    const serviceId = urlParams.get("serviceId");
    const token = await getToken({ req, secret: process.env.SECRET_KEY });

    switch (acction) {
      case "list":
        const responseList = await getListOurWork({
          token,
          serviceId: serviceId || "",
        });
        return ResponseSuccess(responseList);
      case "category-work":
        const responseCategoryWork = await getListOurWorkCategory(token);
        return ResponseSuccess(responseCategoryWork);
      default:
        throw new HttpException(400, "Bad Request");
    }
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
