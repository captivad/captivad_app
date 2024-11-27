"use client";
import { BriefcaseBusiness, HandHelping, Headset, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  mediaQuery: "mobile" | "tablet" | "desktop";
}

interface IRouter {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const HOME = "/home";
export const OUR_SERVICES = "/our-services";
export const OUR_WORK = "/our-works";
export const CONTACT_US = "/contact-us";

const router: IRouter[] = [
  { path: HOME, label: "Home", icon: <Home size={20} /> },
  {
    path: OUR_SERVICES,
    label: "Our Services",
    icon: <HandHelping size={20} />,
  },
  { path: OUR_WORK, label: "Our Work", icon: <BriefcaseBusiness size={20} /> },
  { path: CONTACT_US, label: "Contact Us", icon: <Headset size={20} /> },
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
          className={`${
            "/" + path.split("/")[1] === item.path ? "font-bold text-white" : ""
          }`}
        >
          <Link href={item.path} className="flex items-center gap-4">
            {item.icon}
            {item.label}
          </Link>
        </li>
      );
    }
  });
};
