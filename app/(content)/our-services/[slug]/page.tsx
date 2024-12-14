import FormCustomer from "@/components/form-customer";
import React from "react";
import BgDetailSection from "@/public/our-service-detail-section1.svg";
import Image from "next/image";
import { fetchDataDetailServiceById } from "../our-service.web.service";
import toast from "react-hot-toast";
import BackButton from "@/components/button-back";
import RelateWork from "../components/relate-work";
import { Metadata } from "next";
import { metadata } from "@/app/layout";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  return {
    ...metadata,
    title: `Our Services | ${params.slug.split("%20").join(" ")}`,
    description: params.slug.split("%20").join(" "),
  };
}

export default async function OurServicesDetail({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams.id;
  if (!id) toast.error("get our services failed!");

  const data = await fetchDataDetailServiceById(id as string);
  if (!data) toast.error("get our services failed!");

  return (
    <>
      {/* ###########################  section-1  ############################ */}
      <section
        id="section-intro"
        className="relative w-full md:h-[50vh] lg:h-dvh bg-background flex justify-center pt-44 md:pt-60"
      >
        <Image
          fill
          objectFit="cover"
          src={BgDetailSection.src}
          alt="bg-detail-section1"
          className="absolute z-0 top-0 left-0 w-full"
        />
        <div className="z-20 px-[10%] lg:px-20">
          <div className="w-full flex justify-start mb-6">
            <BackButton />
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col lg:gap-4 w-full md:w-[70%] text-center">
              <h4 className="text-left">{data && data.name_service}</h4>
              <h1 className="text-left">{data && data.detail_title}</h1>
              <h5 className="my-6 text-left">{data && data.main_content}</h5>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background via-black/50 to-background z-10"></div>
      </section>

      {/* ###########################  section-2  ############################ */}
      {data && data?.portfolios.length > 0 && (
        <RelateWork relateWork={data.portfolios} />
      )}

      {/* ###########################  section-form  ############################ */}
      <section id="form" className="lg:h-full p-[5%] lg:p-20 bg-foreground">
        <FormCustomer />
      </section>
    </>
  );
}
