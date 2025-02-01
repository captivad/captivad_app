import { NextRequest } from "next/server";
import { IPayloadResetPassword } from "./reset-password.interface";
import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import jwt from "jsonwebtoken";
import { IPayloadToken } from "../otp-verification/otp-verification.interface";
import { captivadPrisma } from "@/prisma/prisma";
import { HttpException } from "@/utils/HttpException";
import bcrypt from "bcrypt";
import moment from "moment";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = (await req.json()) as IPayloadResetPassword;
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as IPayloadToken;
    console.log(decoded, "decoded");

    const userVerification = await captivadPrisma.users.findUnique({
      where: { uuid: decoded.uuid, deleted_dt: null },
    });

    if (!userVerification)
      throw new HttpException(404, "Make sure you token is valid");

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await captivadPrisma.users.update({
      where: { uuid: decoded.uuid },
      data: { hash_password: hashPassword, updated_dt: moment().toDate() },
    });

    return ResponseSuccess("Password reset successfully");
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
