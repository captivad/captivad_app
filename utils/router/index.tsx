import {
  BookOpen,
  BriefcaseBusiness,
  Globe,
  HandHelping,
  Headset,
  Home,
  Images,
} from "lucide-react";

export const HOME = "/home";
export const OUR_SERVICES = "/our-services";
export const OUR_WORK = "/our-works";
export const CONTACT_US = "/contact-us";
export const WHO_WE_ARE = "/who-we-are";
export const BLOG = "/blog";
export const MEDIA = "/media";

//admin
export const LOGIN = "/admin/login";

interface IRouter {
  path: string;
  label: string;
  icon: React.ReactNode;
  authenticated: boolean;
}

export const router: IRouter[] = [
  { path: HOME, label: "Home", icon: <Home size={20} />, authenticated: false },
  {
    path: WHO_WE_ARE,
    label: "Who We Are",
    icon: <BookOpen size={20} />,
    authenticated: false,
  },
  {
    path: OUR_SERVICES,
    label: "Our Services",
    icon: <HandHelping size={20} />,
    authenticated: false,
  },
  {
    path: OUR_WORK,
    label: "Our Work",
    icon: <BriefcaseBusiness size={20} />,
    authenticated: false,
  },
  {
    path: BLOG,
    label: "Blog",
    icon: <Globe size={20} />,
    authenticated: false,
  },
  {
    path: CONTACT_US,
    label: "Contact Us",
    icon: <Headset size={20} />,
    authenticated: false,
  },
  {
    path: MEDIA,
    label: "Media",
    icon: <Images size={20} />,
    authenticated: true,
  },
];
