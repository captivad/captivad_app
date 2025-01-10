import Link from "next/link";
import { CldImage } from "next-cloudinary";
import CardContentAction from "./card-content-action";
import { IOurWork } from "@/app/api/our-work/our-work.interface";

interface IProps {
  navigate: string;
  key?: string | number;
  data?: IOurWork;
}

const CardContent: React.FC<IProps> = ({ navigate, key, data }) => {
  console.log(data, "data");

  return (
    <div className="relative w-[300px] h-[190px] lg:min-w-[413px] lg:min-h-[275px] rounded-box overflow-hidden group transition-all">
      <CardContentAction data={data} />
      <Link key={key} href={navigate} className="">
        <CldImage
          priority
          fill
          src={data?.thumbnail_url || ""}
          className="w-full h-full object-cover group-hover:scale-110 duration-300"
          alt={data?.title || ""}
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-end group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:from-50% group-hover:to-black/50 duration-300 p-[5%]">
          <label className="hidden group-hover:block transition-all duration-400 text-left">
            {data?.title}
          </label>
        </div>
      </Link>
    </div>
  );
};

export default CardContent;
