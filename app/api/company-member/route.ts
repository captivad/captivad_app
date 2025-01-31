import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { captivadPrisma } from "@/prisma/prisma";

export async function GET() {
  try {
    const response = await captivadPrisma.companyMember.findMany({
      where: {
        deleted_dt: null,
      },
      orderBy: { created_dt: "asc" },
    });
    return ResponseSuccess(response);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
