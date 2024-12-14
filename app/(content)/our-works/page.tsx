import FormCustomer from "@/components/form-customer";
import React from "react";
import Image from "next/image";
import LogoForm from "@/public/logo-no-text.svg";
import OurWorkList from "./components/our-work-list";
import Head from "next/head";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: `Our Works`,
    keywords: [
      "Brand Activation",
      "Rich Media Banner",
      "Brand Lift Survey & Squeeze",
      "In-stream Pre Roll",
    ],
  };
}

export default function OurWorks() {
  return (
    <>
      <Head>
        <title>Our Works</title>
        <meta name="description" content="Learn more about our services" />
      </Head>
      {/* ###########################  section-1  ############################ */}
      <section
        id="section-intro"
        className="relative w-full min-h-[200px] lg:min-h-[50vh] xl:min-h-[60vh] bg-background flex justify-start md:pt-0 md:items-center"
      >
        <div className="h-full w-[50%] overflow-hidden absolute z-0 top-0 bottom-0 -right-20">
          <Image
            src={LogoForm}
            fill
            alt="bg-section1"
            className=" object-contain"
          />
        </div>

        <div className="w-full md:w-[70%] text-center z-20 px-[10%] lg:px-20 pt-24 lg:pt-44">
          <h1 className="text-center md:text-left">
            Every brand faces unique challenges.
          </h1>
          <h4 className="my-6 text-center md:text-left">
            {`That's why our solutions are bespoke. Every time.`}
          </h4>
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background from-10% via-black/80 to-background z-10"></div>
      </section>

      {/* ###########################  section-2  ############################ */}
      <OurWorkList />

      {/* ###########################  section-form  ############################ */}
      <section id="form" className="lg:h-full p-[5%] lg:p-20 bg-foreground">
        <FormCustomer />
      </section>
    </>
  );
}
