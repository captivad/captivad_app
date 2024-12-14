"use client";

import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import React from "react";
import Image from "next/image";
import BgSection1 from "@/public/our-service-section1.svg";
import { OUR_SERVICES } from "@/utils/router";
import ButtonNavigation from "@/components/button-navigation";
import { IListGetService } from "@/app/api/admin/our-services/our-service.interface";
import { useGetListService } from "./our-service.web.service";
import Link from "next/link";

export default function OurServices() {
  const { data, isLoading } = useGetListService();
  const [visibleSections, setVisibleSections] = React.useState({
    intro: false,
    accordion: false,
    form: false,
  });

  const sectionRefs = React.useMemo(
    () => ({
      intro: React.createRef<HTMLDivElement>(),
      accordion: React.createRef<HTMLDivElement>(),
      form: React.createRef<HTMLDivElement>(),
    }),
    []
  );

  React.useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.2 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionRefs]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && sectionRefs.intro.current) {
      sectionRefs.intro.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sectionRefs.intro]);

  return (
    <>
      {/* ###########################  section-1  ############################ */}
      <motion.section
        ref={sectionRefs.intro}
        id="section-intro"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="relative w-full md:h-[50vh] lg:h-dvh bg-background flex justify-center pt-44 md:pt-0 md:items-center"
      >
        <Image
          // width={500}
          // height={500}
          src={BgSection1}
          fill
          objectFit="cover"
          alt="bg-section1"
          className="absolute z-0 top-0 left-0 w-full h-dvh object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="w-full md:w-[70%] text-center z-20 px-[10%] md:px-0"
        >
          <h1 className="text-[22px] text-center lg:text-6xl md:text-left">
            Complete solutions for your
            <br />
            {` brand's transformation`}
          </h1>
          <h4 className="my-6 text-center md:text-left">
            We care for and encourage the growth or development of knowledge,
            help or encourage the development of knowledge and skills of all
            CaptivAd.
          </h4>
        </motion.div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background via-black/50 to-background z-10"></div>
      </motion.section>

      {/* ###########################  section-2  ############################ */}
      <motion.section
        ref={sectionRefs.accordion}
        id="section-accordion"
        className="w-full h-auto bg-black p-[10%] lg:p-20 flex flex-col justify-center gap-1 md:gap-6"
      >
        <ButtonNavigation
          redirect={"/blog"}
          className=" md:max-w-60 rounden-box"
        >
          <Plus size={25} />
          Add Service
        </ButtonNavigation>
        {visibleSections.accordion &&
          !isLoading &&
          (data as IListGetService[]).map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0.4 + index / 5,
              }}
              key={index}
              className="collapse collapse-arrow "
            >
              <input
                type="radio"
                name="my-accordion-2"
                defaultChecked={index === 0}
              />
              <div className="collapse-title bg-transparent border-b-2 border-white font-bold">
                <h3>{item.name_service}</h3>
              </div>
              <div className="collapse-content flex justify-between py-6 lg:items-center flex-col lg:flex-row gap-6">
                <p className="w-[80%] lg:w-2/3">{item.description_service}</p>
                <div>
                  <Link
                    href={`${OUR_SERVICES}/${item.name_service}?id=${item.uuid}`}
                    className={`btn flex gap-4 bg-white rounded-badge text-background btn-lg max-w-44 lg:btn-lg`}
                  >
                    Explore
                    <ArrowRight size={25} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.section>

      {/* ###########################  section-form  ############################ */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        ref={sectionRefs.form}
        id="form"
        className="lg:h-full p-[5%] lg:p-20 bg-foreground"
      >
        {visibleSections.form && <FormCustomer />}
      </motion.section>
    </>
  );
}
