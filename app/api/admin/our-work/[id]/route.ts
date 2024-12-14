import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import { getDetailWorkById } from "../our-work.service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workId = params.id as string;
    const responseDetailWork = await getDetailWorkById(workId);
    return ResponseSuccess(responseDetailWork);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
