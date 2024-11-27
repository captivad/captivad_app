"use client";

import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import LogoForm from "@/public/logo-no-text.svg";
import CardContent from "@/components/card-content";

export default function OurWorks() {
  const [visibleSections, setVisibleSections] = React.useState({
    intro: false,
    category: false,
    form: false,
  });

  const sectionRefs = React.useMemo(
    () => ({
      intro: React.createRef<HTMLDivElement>(),
      category: React.createRef<HTMLDivElement>(),
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
        className="relative w-full md:h-[40vh] lg:h-[70vh] bg-background flex justify-start md:pt-0 md:items-center"
      >
        <div className="h-full w-[50%] overflow-hidden absolute z-0 top-0 bottom-0 -right-20">
          <Image
            src={LogoForm}
            fill
            alt="bg-section1"
            className=" object-contain"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="w-full md:w-[70%] text-center z-20 px-[10%] lg:px-20 pt-24 lg:pt-44"
        >
          <h1 className="text-center md:text-left">
            Every brand faces unique challenges.
          </h1>
          <h4 className="my-6 text-center md:text-left">
            {`That's why our solutions are bespoke. Every time.`}
          </h4>
        </motion.div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background from-10% via-black/80 to-background z-10"></div>
      </motion.section>

      {/* ###########################  section-2  ############################ */}
      <section
        ref={sectionRefs.category}
        className="px-[10%] lg:px-20 w-full h-full flex flex-col gap-20"
      >
        {visibleSections.category && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0.4,
              }}
              className="flex flex-col gap-4 w-full mb-4"
            >
              <h3 className="w-full text-center">Category 1</h3>
              <div className="w-full justify-center flex flex-wrap gap-10 overflow-hidden">
                <CardContent />
                <CardContent />
                <CardContent />
                <CardContent />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0.4,
              }}
              className="flex flex-col gap-4 w-full mb-4"
            >
              <h3 className="w-full text-center">Category 2</h3>

              <div className="w-full justify-center flex flex-wrap gap-10 overflow-hidden">
                <CardContent />
                <CardContent />
                <CardContent />
                <CardContent />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0.4,
              }}
              className="flex flex-col gap-4 w-full mb-4"
            >
              <h3 className="w-full text-center">Category 3</h3>

              <div className="w-full justify-center flex flex-wrap gap-10 overflow-hidden">
                <CardContent />
                <CardContent />
                <CardContent />
                <CardContent />
              </div>
            </motion.div>
          </>
        )}
      </section>

      {/* ###########################  section-form  ############################ */}
      <motion.section
        ref={sectionRefs.form}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        id="form"
        className="lg:h-dvh p-[5%] lg:p-20 bg-background"
      >
        {visibleSections.form && <FormCustomer />}
      </motion.section>
    </>
  );
}
