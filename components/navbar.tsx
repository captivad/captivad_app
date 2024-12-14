import { router } from "@/utils/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ButtonLogout from "./button-logout";

interface IProps {
  mediaQuery: "mobile" | "tablet" | "desktop";
}

export const Navbar = ({ mediaQuery }: IProps) => {
  const path = usePathname();
  console.log("/" + path.split("/")[1]);

  return (
    <>
      {router.map((item) => {
        if (mediaQuery === "desktop") {
          return (
            <Link
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
          return (
            <li
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

  return;
};
