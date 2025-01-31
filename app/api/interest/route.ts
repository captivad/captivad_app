import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { captivadPrisma } from "@/prisma/prisma";

export async function GET() {
  try {
    const interest = await captivadPrisma.interest.findMany({
      where: {
        deleted_dt: null,
      },
    });

    return ResponseSuccess(interest);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
