import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { NextRequest } from "next/server";
import {
  IPayloadOtpVerification,
  IPayloadToken,
} from "./otp-verification.interface";
import { HttpException } from "@/utils/HttpException";
import { captivadPrisma } from "@/prisma/prisma";
import moment from "moment";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = (await req.json()) as IPayloadOtpVerification;
    if (!email && !otp)
      throw new HttpException(400, "Email and otp is required");

    const userVerification = await captivadPrisma.users.findUnique({
      where: { username: email, deleted_dt: null },
    });

    if (!userVerification) throw new HttpException(404, "Email not found");

    const expiredDt = moment(userVerification.updated_dt)
      .add(5, "minutes")
      .toDate();
    const isExpired = moment().isAfter(expiredDt);

    if (isExpired) throw new HttpException(400, "OTP expired");

    if (userVerification.otp_code !== otp)
      throw new HttpException(400, "Wrong OTP");

    const payloadToken: IPayloadToken = {
      email: userVerification.username,
      uuid: userVerification.uuid,
    };

    const token = jwt.sign(payloadToken, process.env.SECRET_KEY as string, {
      expiresIn: "1d",
    });

    const body = {
      accessToken: token,
    };

    return ResponseSuccess(body);
  } catch (error: any) {
    console.log(error);
    return ResponseError(500, error.message);
  }
}
