"use client";

import { IPorfolios } from "@/app/api/admin/our-services/our-service.interface";
import CardContent from "@/components/card-content";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface IProps {
  relateWork: IPorfolios[];
}

const RelateWork: React.FC<IProps> = ({ relateWork }) => {
  return (
    <>
      <section className="p-[5%] lg:px-20 w-full h-auto flex flex-col gap-4">
        <h3>Relate Work</h3>
        <div className="w-full flex xl:items-center gap-4">
          {relateWork.length > 4 && (
            <button className="hidden xl:flex btn btn-circle btn-outline ">
              <ArrowLeft size={24} />
            </button>
          )}
          <div className="w-full justify-start overflow-x-scroll hidden xl:flex gap-6">
            {relateWork.map((item, index) => (
              <CardContent
                key={index}
                uuid={item.uuid}
                navigate={`/our-services/${item.title}?id=${item.uuid}`}
                thumbnail_url={item.thumbnail_url}
                title={item.title}
              />
            ))}
          </div>

          {/* media-query mobile */}
          <div className="w-full max-h-[500px] shadow-inner border-[1px] py-2 border-gray-100/20 rounded-lg overflow-y-scroll overflow-hidden flex-wrap justify-center flex xl:hidden gap-4">
            {relateWork.map((item, index) => (
              <CardContent
                key={index}
                uuid={item.uuid}
                navigate={`/our-services/${item.title}?id=${item.uuid}`}
                thumbnail_url={item.thumbnail_url}
                title={item.title}
              />
            ))}
          </div>
          {relateWork.length > 4 && (
            <button className="hidden xl:flex btn btn-circle btn-outline ">
              <ArrowRight size={24} />
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default RelateWork;
