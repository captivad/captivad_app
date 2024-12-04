import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";
import { ICloudinaryAssetResponse } from "./upload-file.interface";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const type = params.get("type") as "image" | "video";
    const nextCursor = params.get("nextCursor");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      resource_type: type,
      max_results: 10,
    };

    if (nextCursor) {
      options.next_cursor = nextCursor;
    }

    const { resources, next_cursor } = await cloudinary.api.resources(options);

    return ResponseSuccess({
      nextCursor: next_cursor || null,
      rows: resources as ICloudinaryAssetResponse[],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return ResponseError(500, error.message);
  }
}
