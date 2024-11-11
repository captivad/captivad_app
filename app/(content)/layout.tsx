import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full flex justify-between flex-col overflow-scroll">
      <header className="h-20 px-[5%] py-10 items-center sticky w-full top-0 z-50 bg-foreground/20">
        <div className="relative h-16 lg:h-24 flex items-center w-full rounded-full bg-white/10 backdrop-blur-sm border-white border-[1px] border-opacity-30">
          <nav className="flex flex-row-reverse lg:flex-row w-full justify-between px-[5%]">
            <div className="h-12 w-28 lg:w-32 lg:h-28 overflow-hidden">
              <Image
                width={500}
                height={500}
                src="LogoCaptivAd-02.svg"
                className="w-full h-full object-cover"
                alt="captivad"
              />
            </div>
            <div className="hidden lg:flex gap-6 text-foreground items-center">
              <a href="#" className="font-bold text-xl">
                Home
              </a>
              <a href="#" className="text-xl">
                Our Services
              </a>
              <a href="#" className="text-xl">
                Pricing
              </a>
              <a href="#" className="text-xl">
                Our Work
              </a>
              <a href="#" className="text-xl">
                Contact Us
              </a>
            </div>
            <div className="lg:hidden flex items-center">
              {/* <button className="btn btn-square btn-ghost">
                <Menu className="w-6 md:w-12 aspect-square" />
              </button> */}
              <div className=" navbar-center">
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <Menu className="w-6 md:w-12 aspect-square" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-md dropdown-content bg-base-100/90 backdrop-blur-sm rounded-box z-[1] min-w-36 mt-3 p-2 shadow"
                  >
                    <li>
                      <a>Home</a>
                    </li>
                    <li>
                      <a>Our Services</a>
                    </li>
                    <li>
                      <a>Our Work</a>
                    </li>
                    <li>
                      <a>Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className=" h-full w-full bg-foreground px-[5%] py-10 md:px-20">
        <Image
          src="LogoCaptivAd-black.svg"
          alt="logo"
          width={240}
          height={137}
        />
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="text-primary">
            <h6 className=" font-bold">CaptivAd Office</h6>
            <p className="pt-4">
              AD Premier Office Park 9th Floor, Jl. TB Simatupang No.5 Jakarta
              Selatan 12550
            </p>
          </div>
          <div className="flex flex-wrap justify-around w-1/2 items-center">
            <div className="text-primary font-semibold flex flex-col gap-2">
              <Link href={""}>Home</Link>
              <Link href={""}>About</Link>
            </div>
            <div className="text-primary font-semibold flex flex-col gap-2">
              <Link href={""}>Solution</Link>
              <Link href={""}>Contact As</Link>
            </div>
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
