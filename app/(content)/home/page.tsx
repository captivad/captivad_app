"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CardValueCount } from "@/components/card-value-count";
import React from "react";
import Image from "next/image";
import "./style.css";
import FormCustomer from "@/components/form-customer";
import HeroGift from "@/public/Hero.gif";

export default function Home() {
  const [visibleSections, setVisibleSections] = React.useState({
    intro: false,
    testimony: false,
    brand: false,
    greeting: false,
    transform: false,
    form: false,
  });

  const [mediaQuery, setMediaQuery] = React.useState(
    typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches
      ? true
      : false
  );

  const sectionRefs = React.useMemo(
    () => ({
      intro: React.createRef<HTMLDivElement>(),
      testimony: React.createRef<HTMLDivElement>(),
      brand: React.createRef<HTMLDivElement>(),
      greeting: React.createRef<HTMLDivElement>(),
      transform: React.createRef<HTMLDivElement>(),
      form: React.createRef<HTMLDivElement>(),
    }),
    []
  );

  // useEffect untuk menangani resize
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setMediaQuery(window.matchMedia("(min-width: 768px)").matches);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

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
      {/* ###########################  section-intro  ############################ */}
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
        className="relative w-full h-dvh bg-background flex justify-center pt-44 md:pt-0 md:items-center"
      >
        <Image
          width={500}
          height={500}
          src={HeroGift}
          alt="Hero"
          className="absolute z-0 top-0 left-0 w-full h-dvh object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="w-full text-center z-10 px-[10%] md:px-0"
        >
          <h1>
            Transform How You
            <br />
            Reach Your Audience
          </h1>
          <h4 className="my-6">
            Providing advanced targeting solutions
            <br />
            to reach addressable audiences at scale.
          </h4>
          <div className="w-full flex flex-col sm:flex-row justify-center gap-4 px-10 md:px-0 mt-10">
            <button className="md:h-16 min-w-56 p-4 bg-foreground rounded-full text-primary md:text-xl font-semibold flex gap-1 items-center justify-center hover:opacity-50 transition-all duration-100">
              Get Started
              <ArrowRight size={25} />
            </button>
            <button className="md:h-16 min-w-40 p-4 border-2 border-foreground rounded-full text-foreground md:text-xl font-semibold hover:bg-foreground hover:text-primary hover:opacity-50 transition-all duration-100">
              Learn More
            </button>
          </div>
        </motion.div>
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-background to-transparent z-10"></div>
      </motion.section>

      {/* ###########################  section-testimony  ############################ */}
      <motion.section
        id="section-testimony"
        ref={sectionRefs.testimony}
        className="relative w-full h-[400px] lg:h-full overflow-hidden bg-background lg:pt-40"
      >
        {visibleSections.testimony && (
          <>
            <div className="absolute z-10 left-[7%] lg:left-[15%] top-10 lg:top-60 w-full flex flex-col gap-4 lg:gap-10">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <CardValueCount
                  value={22123021}
                  description="Impressions"
                  icon="thumb_up.svg" //svg path in public
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <CardValueCount
                  className="ml-10"
                  value={1203}
                  description="Live Campaigns"
                  icon="campaign.svg" //svg path in public
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <CardValueCount
                  className="ml-20"
                  value={5223}
                  description="Live Creative"
                  icon="emoji_objects.svg" //svg path in public
                />
              </motion.div>
            </div>
            <div className="relative h-full scale-100 overflow-hidden lg:pl-96">
              <motion.img
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                src="home-section-3.svg"
                alt=""
                className="z-0 w-full h-full object-fill"
              />
              <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background from-30% lg:from-20%  to-transparent z-10"></div>
            </div>
          </>
        )}
      </motion.section>

      {/* ###########################  section-brand  ############################ */}
      <motion.section
        ref={sectionRefs.brand}
        id="landing-brand"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="w-full h-[380px] flex flex-col gap-10 lg:my-20 items-center justify-center"
      >
        {visibleSections.brand && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="w-full text-center px-[10%] md:px-0"
            >
              Trusted by Our Leading Brands
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="relative image-slider-wrapper"
            >
              <div className="image-slider">
                {/* side 1 */}
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="FrameWuling.svg"
                    alt="FrameWuling"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="Tempra.svg"
                    alt="Tempra"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="chery.svg"
                    alt="chery"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="citroen.svg"
                    alt="citroen"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="wrp.svg"
                    alt="wrp"
                  />
                </div>

                {/* side 2 */}
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="FrameWuling.svg"
                    alt="FrameWuling"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="Tempra.svg"
                    alt="Tempra"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="chery.svg"
                    alt="chery"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="citroen.svg"
                    alt="citroen"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="wrp.svg"
                    alt="wrp"
                  />
                </div>

                {/* side 3 */}
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="Tempra.svg"
                    alt="Tempra"
                  />
                </div>
                <div>
                  <Image
                    width={mediaQuery ? 240 : 200}
                    height={mediaQuery ? 143 : 100}
                    src="chery.svg"
                    alt="chery"
                  />
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-[143px] w-full bg-gradient-to-r from-background via-transparent to-background"></div>
            </motion.div>
          </>
        )}
      </motion.section>

      {/* ###########################  section-greeting  ############################ */}
      <motion.section
        id="section-greting"
        ref={sectionRefs.greeting}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="relative h-[400px] lg:h-[600px] w-full bg-foreground px-[10%] lg:px-0 overflow-hidden lg:overflow-visible"
      >
        {visibleSections.greeting && (
          <>
            <div className="w-full lg:w-[52%] h-full flex justify-center flex-col gap-10 lg:pl-20 text-primary">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="font-bold"
              >
                Welcome to CaptivAd
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="text-[14px] lg:text-[24px]"
              >
                is your ultimate partner for dynamic advertising success. With
                cutting-edge tools and expert media guidance, we handle daily ad
                operations, navigate the evolving media landscape, and turn data
                insights into actionable strategies. Let us help you build a
                nimble digital marketing infrastructure that ensures your brand
                not only survives but thrives in the competitive world of
                advertising.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="absolute -right-10 lg:right-20 -bottom-20 md:top-0 lg:-top-16 overflow-hidden rounded-3xl"
            >
              <Image
                // width={602}
                width={mediaQuery ? 602 : 602}
                height={mediaQuery ? 602 : 602}
                src="img-person.svg"
                alt="Image-Person"
                className="opacity-20 lg:opacity-100"
              />
            </motion.div>
          </>
        )}
      </motion.section>

      {/* ###########################  section-transform  ############################ */}
      <motion.section
        id="section-transform"
        ref={sectionRefs.transform}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="relative h-[400px] md:h-[600px] w-full bg-background flex overflow-hidden"
      >
        {visibleSections.transform && (
          <>
            <div className="z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10 p-[10%] lg:p-20 text-foreground">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="font-bold text-[28px] md:text-[60px] lg:text-[92px] w-full"
              >
                Transform How You Reach Your Audience
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="text-[14px] md:text-[18px] lg:text-[24px] w-full h-full flex items-start lg:items-end"
              >
                That’s why we offer tailored support to meet your unique needs.
                Our team sails alongside you, exploring the uncharted waters of
                your challenges and opportunities to develop bespoke solutions.
              </motion.p>
            </div>
            <div className="z-0 absolute -right-44 lg:right-0 top-0 lg:-top-36 overflow-hidden opacity-30">
              <Image
                width={891}
                height={891}
                src="/SectionRotation.gif"
                alt="Image-Person"
              />
            </div>
          </>
        )}
      </motion.section>

      {/* ###########################  form  ############################ */}
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
