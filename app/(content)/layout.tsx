import Image from "next/image";
import Link from "next/link";
import CaptivadLogoFooter from "@/public/LogoCaptivAd-black.svg";
import { Accessibility } from "lucide-react";
import Header from "@/components/header";
import { CONTACT_US, HOME, OUR_SERVICES } from "@/utils/router";

export default function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full flex justify-between flex-col overflow-scroll">
      <Header />

      <main className="h-full">{children}</main>
      <footer className=" h-full w-full bg-foreground px-[10%] py-10 md:px-20">
        <Image src={CaptivadLogoFooter} alt="logo" width={240} height={137} />
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-center gap-4">
          <div className="text-primary col-span-1 lg:col-span-2">
            <h6 className=" font-bold">CaptivAd Office</h6>
            <p className="pt-4">
              AD Premier Office Park 9th Floor, Jl. TB Simatupang No.5 Jakarta
              Selatan 12550
            </p>
          </div>
          <div className="gap-4 grid grid-cols-2 justify-around items-center col-span-1">
            <div className="col-span-1 text-primary font-semibold flex flex-col gap-2">
              <Link href={HOME}>
                <h5>Home</h5>
              </Link>
              <Link href={OUR_SERVICES}>
                <h5>Our Services</h5>
              </Link>
            </div>
            <div className="col-span-1 text-primary font-semibold flex flex-col gap-2">
              <Link href={""}>
                <h5>Our Work</h5>
              </Link>
              <Link href={CONTACT_US}>
                <h5>Contact Us</h5>
              </Link>
            </div>
          </div>
        </div>
        <div className="social media w-full justify-end grid grid-cols-1 lg:grid-cols-3 py-10 gap-2">
          <div className="col-span-2"></div>
          <div className="flex gap-4">
            <Accessibility size={30} className="text-black" />
            <Accessibility size={30} className="text-black" />
            <Accessibility size={30} className="text-black" />
          </div>
        </div>
        <div className="flex gap-4 text-gray-500 py-10">
          <span>© 2024 CaptivAd. All rights reserved.</span>
          <span>Privacy Policy</span>
          <span>Terms & Condition</span>
        </div>
      </footer>
    </div>
  );
}
