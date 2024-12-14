import bcrypt from "bcrypt";
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

  if (user && user.status == Status.enable) {
    const verification = await bcrypt.compare(
      password,
      user?.hash_password || ""
    );

    if (user?.username === email && verification) {
      return {
        id: user.uuid,
        email: user.username,
        roleId: user.role_id,
      };
    } else {
      throw new HttpException(401, "Invalid Email or Password");
    }
  } else {
    throw new HttpException(401, "Email not registered");
  }
}
