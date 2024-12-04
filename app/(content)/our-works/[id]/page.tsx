"use client";
import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bgSectionContent from "@/public/Picture-Hover.svg";
import Contentlaptop from "@/public/content-laptop.svg";
export default function OurWorksDetail() {
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
        className="relative w-full h-auto xl:min-h-[75vh] bg-background flex pt-40 md:pt-52 xl:pt-44 md:items-center"
      >
        <Image
          fill
          objectFit="cover"
          src={bgSectionContent}
          alt="bg-detail-section1"
          className="absolute z-0 top-0 left-0 w-full"
        />
        <div className="z-20 w-full px-[10%] lg:px-20 flex flex-col md:flex-row justify-between">
          <div className="flex justify-start mb-6 w-20">
            <button
              onClick={() => navigate.back()}
              className="btn btn-circle btn-outline"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="flex justify-center flex-1"
          >
            <div className="flex flex-col w-full md:w-[65%] text-center">
              <div className="flex flex-col lg:gap-4 mb-[10%]">
                <h1 className="text-left">
                  Avian Collaborating with Cinta Laura
                </h1>
                <h5 className="my-6 text-left">
                  As one of the leading home improvements product, Avian is
                  partnering with ID Ads to boost their brand awareness.
                </h5>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-left">Industry</h3>
                <h5 className="text-left">Home Improvement</h5>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background via-black/60 to-background z-10"></div>
      </motion.section>

      {/* ###########################  section-2  ############################ */}
      <motion.section className="p-[10%] xl:pt-0 xl:pb-20 lg:px-20 w-full h-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="w-full col-span-1 flex items-center justify-center">
          <div className="relative w-[450px] scale-100 sm:min-w-[571px] rounded-box overflow-hidden">
            <motion.img
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0.4,
              }}
              src={Contentlaptop.src}
              alt="picture-content"
              // fill
              // objectFit="cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full col-span-1 flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.4 + 2 / 5,
            }}
            className="flex flex-col gap-4"
          >
            <h3>Objective</h3>
            <h5>
              To enhance brand recognition and drive consumer interest in Avian
              Brands products through engaging and visually appealing Video,
              Display & Rich media banner
            </h5>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.4 + 3 / 5,
            }}
            className="flex flex-col gap-4"
          >
            <h3>Key Result</h3>
            <h5>
              Key Result ID Ads managed to deliver the 81.89% completed views
              rate. KPI spread among 6 of their products along with managing the
              engagement rate for various ad formats. achieved an average CTR of
              1.20%
            </h5>
          </motion.div>
        </div>
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
