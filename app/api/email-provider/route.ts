import { NextRequest } from "next/server";
import {
  IPayloadCreateContact,
  IPayloadSendEmail,
} from "./email-provider.interface";
import { ResponseError, ResponseSuccess } from "@/helpers/exception.helper";
import { HttpException } from "@/utils/HttpException";
import nodemailer from "nodemailer";
import axios from "axios";
import { templateGreating } from "@/utils/template/email";

export async function POST(req: NextRequest) {
  try {
    const body: IPayloadSendEmail = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.BREVO_SMTP_USERNAME,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    // Transactional operation wrapper
    const transaction = async () => {
      try {
        // Step 1: Send email to user
        const userMailResponse = await transporter.sendMail({
          from: `Captivad <${process.env.BREVO_EMAIL_AUTH}>`,
          to: body.email,
          subject: `Terima kasih telah berlangganan Captivad, ${body.name}!`,
          text: `Terimakasih atas kunjungan anda, kami akan segera membalas email anda`,
          html: templateGreating(),
        });
        console.log("User email sent:", userMailResponse.response);

        // Step 2: Send email to admin
        const adminMailResponse = await transporter.sendMail({
          from: `Captivad Customer <${process.env.BREVO_EMAIL_AUTH}>`,
          replyTo: body.email,
          to: "captivad.sp@gmail.com",
          // cc: ["captivad5@gmail.com"],
          subject: "Hallo Captivad admin, can you please help me?",
          text: body.message,
          html: `<p>${body.message}</p>`,
        });
        console.log("Admin email sent:", adminMailResponse.response);

        // Step 3: Create contact in Brevo
        const firstname = body.name.split(" ")[0];
        const lastname = body.name.split(" ").slice(1).join(" ");
        const payload: IPayloadCreateContact = {
          email: body.email,
          attributes: {
            FIRSTNAME: firstname,
            LASTNAME: lastname,
            INTEREST: body.interests,
          },
          emailBlacklisted: false,
          smsBlacklisted: false,
          listIds: [4],
          updateEnabled: false,
          smtpBlacklistSender: ["info@sendinblue.com"],
        };
        const contactResponse = await axios.post(
          `${process.env.BREVO_BASE_API}/contacts`,
          payload,
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              "api-key": process.env.BREVO_API_KEY,
            },
          }
        );
        console.log("Contact created:", contactResponse.data);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new HttpException(500, error.message);
      }
    };

    // Execute transaction
    await transaction();

    return ResponseSuccess("Email sent successfully!");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return ResponseError(error.statusCode, error.message);
  }
}
