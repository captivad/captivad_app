"use client";

import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import BgSection1 from "@/public/whoweare-section1.svg";
import IconLamp from "@/public/emoji_objects.svg";
import { CldImage } from "next-cloudinary";
interface IOpportunity {
  title: string;
  description: string;
}

const oportunity: IOpportunity[] = [
  {
    title: "Dinamic",
    description:
      "We are agile, flexible, adaptive, versatile, movement, always move forward, adaptable in agile environment, resilience, hands on and open to changes.",
  },
  {
    title: "Nurtune",
    description:
      "We care for and encourage the growth or development of knowledge, help or encourage the development of knowledge and skills of all CaptivAd.",
  },
  {
    title: "Amplify",
    description:
      "We enhance, accelerate our potential performance upgrading our capacity and value in facing dynamic challenges.",
  },
];

const meetTheTeam = [
  {
    name: "Miranti Herwinda",
    role: "Founder and Chief Executive Officer",
    image:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1732983568/profile-1_mznsyp.png",
  },
  // {
  //   name: "Syarief Putra",
  //   role: "Chief operation officer, co-founder",
  //   image:
  //     "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1732983316/profile-2_uca6ib.png",
  // },
  {
    name: "Amelia Yoanita Tham",
    role: "Chief revenue officer, co-founder",
    image:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733135821/image_16_kovfte.png",
  },
];

export default function WhoWeAre() {
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
        className="relative w-full min-h-[300px] lg:min-h-[50vh] xl:min-h-[60vh] bg-background flex justify-center pt-32 md:pt-40 md:items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="w-full md:w-[70%] text-center z-20 px-[10%] md:px-0"
        >
          <h4 className="my-6 text-center md:text-left">We are CaptivAd</h4>
          <h1 className="text-center md:text-left">
            We Shape Digital Brilliance Through Creativity and Innovation
          </h1>
        </motion.div>
      </motion.section>

      <section className="w-full relative min-h-[350px] xl:min-h-[70vh] bg-background overflow-hidden">
        <Image
          src={BgSection1}
          alt="Who We Are"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-20 left-0 right-0 w-full grid grid-cols-1 lg:grid-cols-2 z-20 px-[10%] 2xl:px-[20%] gap-4 lg:gap-10">
          <div className="col-span-1 ">
            <h2 className="w-full text-left">
              Leading The Innovation for The Future
            </h2>
          </div>
          <div className="">
            <h3 className="w-full text-left font-bold pb-4">Our Mission</h3>
            <ul className=" list-disc pl-6">
              <li className="text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px]">
                {`To be a strategic partner that exceeds client's needs with
                holistic digital solutions`}
              </li>
              <li className="text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px]">
                To enhance knowledge and skill for CaptivAd to adapt with
                digital innovation
              </li>
            </ul>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background via-black/50 lg:via-transparent to-background z-10"></div>
      </section>

      <section className="w-full flex flex-wrap justify-center gap-4 lg:gap-10 relative h-full bg-background overflow-hidden p-[10%] lg:p-20 pt-0">
        {oportunity.map((item, index) => (
          <div
            key={index}
            className="max-w-[400px] min-h-[20vh] py-[1px] pr-[2px]  bg-white/30 rounded-box backdrop-blur-sm group"
          >
            <div className="h-full w-full bg-black/80 rounded-l-none rounded-box p-10 flex flex-col justify-start gap-6 z-10">
              <span className="w-[54px] aspect-square rounded-full bg-white flex justify-center items-center">
                <Image
                  src={IconLamp}
                  alt="icons"
                  width={30}
                  height={30}
                  className=" object-contain"
                />
              </span>
              <div className="flex flex-col w-full gap-4">
                <h4 className="font-bold">{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="w-full flex flex-col justify-centerrelative h-full bg-foreground overflow-hidden p-[10%] lg:p-20">
        <h1 className="w-full text-center mb-16 bg-gradient-to-r from-background to-gray-500 bg-clip-text text-transparent">
          Meet The Team
        </h1>
        <div className="w-full h-full flex flex-wrap gap-10 justify-center">
          {meetTheTeam.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 lg:gap-10 group">
              <div className="max-w-[400px] aspect-square bg-white/30 relative rounded-box backdrop-blur-sm">
                <CldImage
                  width="1000"
                  height="1000"
                  src={item.image}
                  //   sizes="100vw"
                  alt={"profile-" + index}
                />
              </div>
              <div>
                <h4 className="font-bold text-background">{item.name}</h4>
                <p className="text-background">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
