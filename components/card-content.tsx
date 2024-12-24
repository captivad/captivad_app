import Link from "next/link";
import { IPorfolios } from "@/app/api/admin/our-services/our-service.interface";
import { CldImage } from "next-cloudinary";

interface IProps extends IPorfolios {
  navigate: string;
  key?: string | number;
}

const CardContent: React.FC<IProps> = ({
  navigate,
  thumbnail_url,
  title,
  key,
}) => {
  return (
    <Link
      key={key}
      href={navigate}
      className="relative w-[300px] h-[190px] lg:min-w-[413px] lg:min-h-[275px] rounded-box overflow-hidden group transition-all"
    >
      <CldImage
        priority
        fill
        src={thumbnail_url}
        className="w-full h-full object-cover group-hover:scale-110 duration-300"
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-end group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:from-50% group-hover:to-black/50 duration-300 p-[5%]">
        <label className="hidden group-hover:block transition-all duration-400 text-left">
          {title}
        </label>
      </div>
    </Link>
  );
};

export default CardContent;
