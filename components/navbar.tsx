"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  mediaQuery: "mobile" | "tablet" | "desktop";
}

interface IRouter {
  path: string;
  label: string;
}

export const HOME = "/home";
export const OUR_SERVICES = "/our-services";
export const OUR_WORK = "/our-work";
export const CONTACT_US = "/contact-us";

const router: IRouter[] = [
  { path: HOME, label: "Home" },
  { path: OUR_SERVICES, label: "Our Services" },
  { path: OUR_WORK, label: "Our Work" },
  { path: CONTACT_US, label: "Contact Us" },
];

export const Navbar = ({ mediaQuery }: IProps) => {
  const path = usePathname();
  console.log("/" + path.split("/")[1]);

  return router.map((item) => {
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
          className={`${path.split("/")[1] === item.path ? "font-bold" : ""}`}
        >
          <Link href={item.path}>{item.label}</Link>
        </li>
      );
    }
  });
};
