import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Untuk membuat accessToken
import { ILoginPayload, IUserSession } from "./route";
import { HttpException } from "@/utils/HttpException";
import { captivadPrisma } from "@/prisma/prisma";
import { Status } from "@/prisma/prisma/client";

export async function login({
  email,
  password,
}: ILoginPayload): Promise<IUserSession> {
  const user = await captivadPrisma.users.findFirst({
    where: { username: email, deleted_dt: null },
  });

  if (!user) {
    throw new HttpException(401, "Email not registered");
  }

  if (user.status !== Status.enable) {
    throw new HttpException(403, "Account is disabled");
  }

  // Verifikasi password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.hash_password || ""
  );
  if (!isPasswordValid) {
    throw new HttpException(401, "Invalid Email or Password");
  }

  const accessToken = jwt.sign(
    {
      id: user.uuid,
      email: user.username,
      roleId: user.role_id,
    },
    process.env.SECRET_KEY || "default_secret",
    { expiresIn: "1d" } // Token berlaku selama 1 hari
  );

  return {
    id: user.uuid,
    email: user.username,
    roleId: user.role_id,
    accessToken,
  };
}
