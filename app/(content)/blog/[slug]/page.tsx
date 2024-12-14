"use client";
import BackButton from "@/components/button-back";
import { contentBlog1, latestBlog1 } from "@/utils/dami-data/blog-content-1";
import { dateRange } from "@/utils/general";
import moment from "moment";
import { CldImage } from "next-cloudinary";
import Markdown from "react-markdown";

export default function BlogDetails({ params }: { params: { slug: string } }) {
  console.log(params);

  return (
    <>
      <article>
        <div className="relative w-full h-full xl:min-h-[80vh] bg-background flex justify-center pt-44 pb-20 md:pt-60">
          <CldImage
            className="absolute z-0 top-0 left-0 w-full object-cover"
            priority
            fill
            src="https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472837/Frame_45_h4dojr.png"
            alt=""
          />
          <div className="z-20 w-full px-[10%] lg:px-20 flex flex-col">
            <div className="flex justify-start mb-6 w-20">
              <BackButton />
            </div>
            <div className="flex justify-start flex-1 lg:mt-10">
              <div className="flex flex-col w-full md:w-[80%] text-center">
                <div className="flex flex-col lg:gap-4 mb-[10%]">
                  <h1 className="text-left">
                    A/B Testing Adalah: Pengertian, Fungsi, dan Pentingnya Dalam
                    Digital Marketing
                  </h1>
                </div>
                <div className="flex gap-6 lg:gap-10 xl:gap-20 w-full justify-start">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-left">Category</h4>
                    <h6 className="text-left">Marketing</h6>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-left">Author</h4>
                    <h6 className="text-left">Captivad</h6>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-left">Date</h4>
                    <h6 className="text-left">
                      {dateRange({
                        createdDt: moment().subtract(5, "days").toISOString(),
                      })}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background from-20% via-black/60 to-background z-10"></div>
        </div>

        <div className="w-full grid grid-cols-7 gap-10 px-[10%] lg:px-20 pb-20">
          <div className="col-span-7 md:col-span-5">
            <Markdown className={"text-justify flex flex-col gap-4 lg:gap-10"}>
              {contentBlog1}
            </Markdown>
          </div>
          <hr className="col-span-7 border-t-2 md:hidden" />
          <div className="col-span-7 md:col-span-2">
            <Markdown className={"text-justify flex flex-col gap-4 lg:gap-10"}>
              {latestBlog1}
            </Markdown>
          </div>
        </div>
      </article>
    </>
  );
}
