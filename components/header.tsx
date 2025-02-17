"use client";

import Link from "next/link";
import Image from "next/image";
import CaptivadLogo from "@/public/LogoCaptivAd-02.svg";
import { ChevronsRight, Menu } from "lucide-react";
import React from "react";
import { HOME } from "@/utils/router";
import { Navbar } from "./navbar";
import { LogoCaptivadWhite } from "@/public";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="">
      <header className="h-20 px-[5%] py-4 lg:py-6 xl:py-10 items-center fixed w-full top-0 z-50">
        <div className="relative h-14 lg:h-20 xl:h-24 flex items-center w-full rounded-full bg-black/40 backdrop-blur-md border-white border-[1px] border-opacity-30">
          <nav className="flex flex-row lg:flex-row w-full justify-between px-[5%]">
            <Link
              href={HOME}
              className="h-12 w-20 lg:w-32 lg:h-28 overflow-hidden cursor-pointer"
            >
              <Image
                width={500}
                height={500}
                src={LogoCaptivadWhite}
                className="w-full h-full object-contain"
                alt="captivad"
              />
            </Link>
            <div className="hidden xl:flex gap-6 text-foreground items-center">
              <Navbar open={setOpen} mediaQuery="desktop" />
            </div>
            <div className=" xl:hidden flex items-center overflow-y-scroll">
              {/* Drawer */}
              <div className="drawer drawer-end">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                  checked={open}
                  onChange={(e) => setOpen(e.target.checked)}
                />
                <div className="drawer-content">
                  <label
                    htmlFor="my-drawer-4"
                    className="btn btn-ghost btn-circle"
                  >
                    <Menu size={25} className="w-6 md:w-12 aspect-square" />
                  </label>
                </div>
                <div className="drawer-side w-screen -my-4 lg:-my-8">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-base-200 text-base-content min-h-full w-[350px] py-4 lg:py-6 ">
                    <div className="flex justify-between w-full items-center pr-10">
                      <label
                        onClick={() => setOpen(false)}
                        className="btn btn-ghost btn-circle hover:translate-x-1"
                      >
                        <ChevronsRight
                          size={25}
                          className="w-6 md:w-12 aspect-square"
                        />
                      </label>
                      <div className="h-12 w-20 lg:w-32 lg:h-16 xl:w-32 xl:h-28 overflow-hidden">
                        <Image
                          width={500}
                          height={500}
                          src={LogoCaptivadWhite}
                          className="w-full h-full object-contain"
                          alt="captivad"
                        />
                      </div>
                    </div>
                    <hr className="my-2 md:my-4" />
                    <Navbar open={setOpen} mediaQuery="mobile" />
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
