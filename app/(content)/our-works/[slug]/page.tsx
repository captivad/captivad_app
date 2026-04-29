import FormCustomer from "@/components/form-customer";
import React from "react";
import Image from "next/image";
import bgSectionContent from "@/public/Picture-Hover.svg";
import BackButton from "@/components/button-back";
import { fetchDataDetailWorkById } from "../our-work.web.service";
import { Metadata } from "next";
import { metadata } from "@/app/layout";
import ImageRender from "../components/image-render";
import VideoComponent from "../components/vIdeo-component";

async function generateStaticData({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const data = await fetchDataDetailWorkById(searchParams.id as string);
  return data;
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  return {
    ...metadata,
    title: `Our Work | ${params.slug.split("%20").join(" ")}`,
    description: params.slug.split("%20").join(" "),
  };
}

export default async function OurWorksDetail({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams.id;
  if (!id) return null;

  const data = await generateStaticData({ searchParams });

  return (
    <>
      {/* ###########################  section-1  ############################ */}
      <section
        id="section-intro"
        className="relative w-full h-auto bg-background flex justify-center pt-44 md:pt-60 mb-[10%]"
      >
        <Image
          fill
          priority
          objectFit="cover"
          src={data?.thumbnail_url || bgSectionContent}
          alt="bg-detail-section1"
          className="absolute z-0 top-0 left-0 w-full"
        />
        <div className="z-20 w-full px-[10%] lg:px-20 flex flex-col justify-between">
          <div className="flex justify-start mb-6 w-20">
            <BackButton />
          </div>
          <div className="flex justify-center flex-1">
            <div className="flex flex-col w-full md:w-[65%] text-center">
              <div className="flex flex-col lg:gap-4 mb-[10%]">
                <h1 className="text-left">{data?.title}</h1>
                <h5 className="my-6 text-left">{data?.description}</h5>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-left">Industry</h3>
                {data?.portfolio_category?.map((item, index) => (
                  <h5 className="text-left" key={index}>
                    {item.category?.name}
                  </h5>
                ))}
                {/* <h5 className="text-left">Home Improvement</h5> */}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background via-black/70 to-background z-10"></div>
      </section>

      {/* ###########################  section-2  ############################ */}
      <section className="p-[10%] xl:pt-0 xl:pb-20 lg:px-20 w-full h-auto grid grid-cols-1 2xl:grid-cols-2 gap-10">
        <div className="w-full col-span-1 flex items-center justify-center">
          <div className="relative w-full aspect-video max-w-xl rounded-box overflow-hidden">
            {data?.video_image_url.includes("image") && (
              <ImageRender src={data?.video_image_url} />
            )}
            {data?.video_image_url.includes("video") && (
              <VideoComponent url={data?.video_image_url} />
            )}
          </div>
        </div>
        <div className="w-full col-span-1 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3>Objective</h3>
            <h5>{data?.objectiv_content}</h5>
          </div>
          <div className="flex flex-col gap-4">
            <h3>Key Result</h3>
            <h5>{data?.key_result_content}</h5>
          </div>
        </div>
      </section>

      {/* ###########################  section-form  ############################ */}
      <section id="form" className="lg:h-full p-[5%] lg:p-20 bg-foreground">
        {<FormCustomer />}
      </section>
    </>
  );
}
