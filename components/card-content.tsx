import Image from "next/image";
import HoverPicture from "@/public/Picture-Hover.svg";
import Link from "next/link";
import { OUR_WORK } from "@/utils/router";
const CardContent: React.FC = () => {
  return (
    <Link
      href={`${OUR_WORK}/avian-1`}
      className="relative w-[400px] h-[230px] sm:min-w-[413px] sm:min-h-[275px] rounded-box overflow-hidden group transition-all"
    >
      <Image
        fill
        src={HoverPicture}
        className="w-full h-full object-cover group-hover:scale-110 duration-300"
        alt="captivad"
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-end group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:from-50% group-hover:to-black/50 duration-300 p-[5%]">
        <label className="hidden group-hover:block transition-all duration-400 text-left">
          Avian collobarating with Cinta Laura
        </label>
      </div>
    </Link>
  );
};

export default CardContent;
