import Image from "next/image";
import HoverPicture from "@/public/Picture-Hover.svg";
const CardContent: React.FC = () => {
  return (
    <button className="relative w-[150px] h-[80px] lg:min-w-[413px] lg:min-h-[275px] rounded-box overflow-hidden group transition-all">
      <Image
        width={500}
        height={500}
        src={HoverPicture}
        className="w-full h-full object-cover group-hover:scale-110 duration-300"
        alt="captivad"
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-end group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:from-50% group-hover:to-black/50 duration-300 p-[5%]">
        <h4 className="hidden group-hover:block transition-all duration-400 text-left">
          Avian collobarating with Cinta Laura
        </h4>
      </div>
    </button>
  );
};

export default CardContent;
