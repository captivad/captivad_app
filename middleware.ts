import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ResponseUnauthorized } from "./helpers/exception.helper";
import { HOME, LOGIN, router } from "./utils/router";

function authorizedApi(pathname: string) {
  return pathname.startsWith("/api/admin");
}

export default async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;
  console.log(pathname, "pathname");

  if (pathname == "/") {
    return NextResponse.redirect(new URL(HOME, req.nextUrl));
  }

  const token = await getToken({ req, secret: process.env.SECRET_KEY });

  if (
    router.some((item) => item.authenticated && item.path == pathname) &&
    !token
  ) {
    return NextResponse.redirect(new URL(LOGIN, req.nextUrl));
  }

  if (authorizedApi(pathname)) {
    if (token == null) {
      return ResponseUnauthorized("Unauthorized");
    }
  }

  return NextResponse.next();
}
// export const config = {
//   matcher: [
//     `${MANAGE_COMPANY}/:path*`,
//     `${SETTING}/:path*`,
//     `${MANAGE_POST}/:path*`,
//   ],
// };
