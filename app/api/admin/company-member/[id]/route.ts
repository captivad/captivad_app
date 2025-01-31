import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import { IPayloadEditCompanyMember } from "../comapny-member.interface";
import { captivadPrisma } from "@/prisma/prisma";
import { HttpException } from "@/utils/HttpException";
import moment from "moment";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = (await req.json()) as IPayloadEditCompanyMember;
    const memberVerify = await captivadPrisma.companyMember.findUnique({
      where: { uuid: params.id, deleted_dt: null },
    });

    if (!memberVerify) throw new HttpException(404, "Member not found");

    const response = await captivadPrisma.companyMember.update({
      where: { uuid: params.id },
      data: {
        fullname: body.fullname,
        image_url: body.imageUrl,
        position: body.position,
        updated_dt: moment().toISOString(),
      },
    });

    return ResponseSuccess(response);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberVerify = await captivadPrisma.companyMember.findUnique({
      where: { uuid: params.id, deleted_dt: null },
    });

    if (!memberVerify) throw new HttpException(404, "Member not found");

    const response = await captivadPrisma.companyMember.update({
      where: { uuid: params.id },
      data: {
        deleted_dt: moment().toISOString(),
      },
    });

    return ResponseSuccess(response);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
