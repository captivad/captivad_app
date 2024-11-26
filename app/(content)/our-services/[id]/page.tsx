"use client";
import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import React from "react";
import BgDetailSection from "@/public/our-service-detail-section1.svg";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CardContent from "@/components/card-content";
import Image from "next/image";
export default function OurServicesDetail() {
  const navigate = useRouter();
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
        className="relative w-full h-auto lg:h-[70vh] 2xl:h-dvh bg-background flex justify-center pt-44 md:pt-0 md:items-center"
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
            <button
              onClick={() => navigate.back()}
              className="btn btn-circle btn-outline"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="flex flex-col lg:gap-4 w-full md:w-[70%] text-center">
              <h4 className="text-left">
                Media Placement: Rich Media Banner and Place
              </h4>
              <h1 className="text-left">
                {` Empower Your Brand's Voice: Expert Strategies for Digital
            Communication`}
              </h1>
              <h5 className="my-6 text-left">
                We care for and encourage the growth or development of
                knowledge, help or encourage the development of knowledge and
                skills of all CaptivAd.
              </h5>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background via-black/50 to-background z-10"></div>
      </motion.section>

      {/* ###########################  section-2  ############################ */}
      <section className="p-[5%] lg:px-20 w-full h-[500px] flex flex-col gap-4">
        <h3>Relate Work</h3>
        <div className="w-full flex xl:items-center gap-4">
          <button className="hidden xl:flex btn btn-circle btn-outline ">
            <ArrowLeft size={24} />
          </button>
          <div className="w-full justify-center overflow-x-scroll hidden xl:flex gap-6">
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
          </div>

          {/* media-query mobile */}
          <div className="w-full h-[60%] shadow-inner border-[1px] py-2 border-gray-100/20 rounded-lg overflow-y-scroll overflow-hidden flex-wrap justify-center flex xl:hidden gap-4">
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
            <CardContent />
          </div>
          <button className="hidden xl:flex btn btn-circle btn-outline ">
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* ###########################  section-form  ############################ */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        ref={sectionRefs.form}
        id="form"
        className="lg:h-[851px] p-[5%] lg:p-20 bg-foreground"
      >
        {visibleSections.form && <FormCustomer />}
      </motion.section>
    </>
  );
}
