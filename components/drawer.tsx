import { Menu } from "lucide-react";
import Image from "next/image";
import { Navbar } from "./navbar";
import CaptivadLogo from "@/public/LogoCaptivAd-02.svg";

const Drawer: React.FC = () => {
  return (
    <>
      <div className="drawer w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
            <Menu className="w-6 md:w-12 aspect-square" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <div className="h-12 w-28 lg:w-32 lg:h-28 overflow-hidden">
              <Image
                width={500}
                height={500}
                src={CaptivadLogo}
                className="w-full h-full object-cover"
                alt="captivad"
              />
            </div>
            <hr className="mb-4" />
            <Navbar mediaQuery="mobile" />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
