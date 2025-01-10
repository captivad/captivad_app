"use client";

import { router } from "@/utils/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ButtonLogout from "./button-logout";
import { useSession } from "next-auth/react";

interface IProps {
  mediaQuery: "mobile" | "tablet" | "desktop";
  open: (e: boolean) => void;
}

export const Navbar = ({ mediaQuery, open }: IProps) => {
  const path = usePathname();
  console.log("/" + path.split("/")[1]);
  const { data: session } = useSession();

  return (
    <>
      {router.map((item) => {
        const token = session?.user.accessToken;
        if (mediaQuery === "desktop") {
          if (item.authenticated && !token) return null;
          return (
            <Link
              onClick={() => open(false)}
              key={item.path}
              href={item.path}
              className={`${
                "/" + path.split("/")[1] === item.path ? "font-bold" : ""
              } text-xl`}
            >
              {item.label}
            </Link>
          );
        } else {
          if (item.authenticated && !token) return null;
          return (
            <li
              onClick={() => open(false)}
              key={item.path}
              className={`${
                "/" + path.split("/")[1] === item.path
                  ? "font-bold text-white"
                  : ""
              } py-2`}
            >
              <Link href={item.path} className="flex items-center gap-4">
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        }
      })}

      <ButtonLogout />
    </>
  );
};
