import { NextRequest } from "next/server";
import { IPayloadForgotPassword } from "./forgot-password.interface";
import { HttpException } from "@/utils/HttpException";
import { captivadPrisma } from "@/prisma/prisma";
import moment from "moment";
import nodemailer from "nodemailer";
import { templateOtp } from "@/utils/template/email";
import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as IPayloadForgotPassword;
    if (!body.email) throw new HttpException(400, "Email is required");

    const emailVerify = await captivadPrisma.users.findUnique({
      where: { username: body.email, deleted_dt: null },
    });

    if (!emailVerify) throw new HttpException(404, "Email not found");

    const randomOtp = Math.floor(Math.random() * 10000);
    const otp = randomOtp.toString().padStart(4, "0");

    await captivadPrisma.users.update({
      where: { username: body.email },
      data: { otp_code: otp, updated_dt: moment().toDate() },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.BREVO_SMTP_USERNAME,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    const userMailResponse = await transporter.sendMail({
      from: `Captivad <${process.env.BREVO_EMAIL_AUTH}>`,
      to: body.email,
      subject: `Verifikasi email Captivad`,
      text: `Kode verifikasi Captivad: ${otp}`,
      html: templateOtp({
        fullname: emailVerify.name,
        otp: otp,
        expiredTime: 5,
      }),
    });
    console.log("User email sent:", userMailResponse.response);

    return ResponseSuccess("Otp has been sent to your email");
  } catch (error: any) {
    console.log(error);
    return ResponseError(error.status, error.message);
  }
}
