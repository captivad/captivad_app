import Image from "next/image";
import CaptivadLogo from "@/public/LogoCaptivAd-02.svg";

export default function Loading() {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center">
      <div className="w-[10%] h-[5%] overflow-hidden">
        <Image
          width={500}
          height={500}
          src={CaptivadLogo}
          className="w-full h-full object-cover"
          alt="captivad"
        />
      </div>
      <span className="loading loading-infinity loading-lg text-white"></span>
    </div>
  );
}
