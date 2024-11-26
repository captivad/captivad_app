"use client";
import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OUR_SERVICES } from "@/components/navbar";
import BgSection1 from "@/public/our-service-section1.svg";

const listAccordion = [
  {
    title: "Media Placement: Rich Media Banner and Place",
    content:
      "Optimize your brand value through the best 360 digital communication strategy carefully designed to pave your way to unparalleled success.",
    navigate: "",
    uuid: "44fab825-ab06-4d84-81a9-89387ebfacca",
  },
  {
    title: "AI Experience",
    content:
      "Optimize your brand value through the best 360 digital communication strategy carefully designed to pave your way to unparalleled success.",
    navigate: "",
    uuid: "ff1b2322-780c-45c0-a973-f5ad754111a3",
  },
  {
    title: "KOL Management",
    content:
      "Optimize your brand value through the best 360 digital communication strategy carefully designed to pave your way to unparalleled success.",
    navigate: "",
    uuid: "67e94b7a-a495-4fba-b419-76a0bfd852ce",
  },
  {
    title: "Performance Specialization",
    content:
      "Optimize your brand value through the best 360 digital communication strategy carefully designed to pave your way to unparalleled success.",
    navigate: "",
    uuid: "527c988e-2689-46c9-8f62-47d1fdcdd23d",
  },
];
export default function OurServices() {
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

  const navigate = useRouter();

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
        className="relative w-full md:h-[40vh] lg:h-dvh bg-background flex justify-center pt-44 md:pt-0 md:items-center"
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
          className="w-full md:w-[70%] text-center z-20 px-[10%] lg:px-20"
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
        {visibleSections.accordion &&
          listAccordion.map((item, index) => (
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
                <h3>{item.title}</h3>
              </div>
              <div className="collapse-content flex justify-between py-6 lg:items-center flex-col md:flex-row gap-6">
                <p className="w-[80%] lg:w-2/3">{item.content}</p>
                <div>
                  <button
                    onClick={() =>
                      navigate.push(OUR_SERVICES + "/" + item.uuid)
                    }
                    className="md:h-14 min-w-44 p-2 lg:p-4 bg-foreground rounded-full text-primary md:text-xl font-semibold flex gap-1 items-center justify-center hover:opacity-50 transition-all duration-100"
                  >
                    <p>Explore</p>
                    <ArrowRight size={25} />
                  </button>
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
        className="lg:h-[851px] p-[5%] lg:p-20 bg-foreground"
      >
        {visibleSections.form && <FormCustomer />}
      </motion.section>
    </>
  );
}
