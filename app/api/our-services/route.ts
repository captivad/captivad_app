import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import { HttpException } from "@/utils/HttpException";
import { getToken } from "next-auth/jwt";
import { getDetailServiceById, getListService } from "./our-service.service";

export async function GET(req: NextRequest) {
  try {
    const urlParams = req.nextUrl.searchParams;
    const action = urlParams.get("action");
    const serviceId = urlParams.get("id");

    const token = await getToken({ req, secret: process.env.SECRET_KEY });

    switch (action) {
      case "list":
        const responseList = await getListService(token);
        return ResponseSuccess(responseList);
      case "detail":
        if (!serviceId) {
          throw new HttpException(
            400,
            "Service ID is required for detail action"
          );
        }
        console.log(serviceId, "serviceId");
        console.log(token, "token");

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
