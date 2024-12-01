import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";
import { ICloudinaryAssetResponse } from "./upload-file.interface";
import { usePagination } from "@/helpers/general.helper";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const page = params.get("page") || "1";
    const size = params.get("size") || "10";
    const type = params.get("type") as "image" | "video";

    const { limit, offset } = usePagination(Number(page), Number(size));

    const { resources } = await cloudinary.api.resources({
      resource_type: type === "video" ? "video" : "image",
    });

    return ResponseSuccess({
      pagination: {
        currentPage: Number(page),
        totalPage: Math.ceil(resources.length / limit),
        totalData: resources.length,
        rows: resources.slice(
          offset,
          offset + limit
        ) as ICloudinaryAssetResponse[],
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return ResponseError(500, error.message);
  }
}
