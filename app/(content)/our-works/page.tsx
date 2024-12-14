"use client";

import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import LogoForm from "@/public/logo-no-text.svg";
import CardContent from "@/components/card-content";
import ButtonNavigation from "@/components/button-navigation";
import { ChevronDown, Plus } from "lucide-react";
import { useGetOurWork } from "./our-work.web.service";
import { IResponseListCategoryWork } from "@/app/api/admin/our-work/our-work.interface";

export default function OurWorks() {
  const { data, isLoading } = useGetOurWork();
  const [visibleSections, setVisibleSections] = React.useState({
    intro: false,
    category: false,
    form: false,
  });

  const [showMore, setShowMore] = React.useState<Map<number, number>>(
    new Map()
  );

  const sectionRefs = React.useMemo(
    () => ({
      intro: React.createRef<HTMLDivElement>(),
      category: React.createRef<HTMLDivElement>(),
      form: React.createRef<HTMLDivElement>(),
    }),
    []
  );

  React.useEffect(() => {
    if (data) {
      const initialShowMore = new Map();
      data.forEach((item: IResponseListCategoryWork) => {
        initialShowMore.set(item.id, 3); // Set default show count to 2
      });
      setShowMore(initialShowMore);
    }
  }, [data]);

  const handleShowMore = (categoryId: number) => {
    setShowMore((prev) => {
      const newShowMore = new Map(prev);
      const currentCount = newShowMore.get(categoryId) || 2;
      newShowMore.set(categoryId, currentCount + 2); // Increase show count by 2
      return newShowMore;
    });
  };

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
        className="px-[10%] pb-20 lg:px-20 w-full h-full flex flex-col gap-20"
      >
        <ButtonNavigation
          redirect={"/blog"}
          className=" md:max-w-60 rounden-box"
        >
          <Plus size={25} />
          Add Portfolio
        </ButtonNavigation>
        {visibleSections.category && (
          <>
            {!isLoading &&
              data &&
              data?.length > 0 &&
              data.map((category: IResponseListCategoryWork, index) => {
                if (category.portfolios.length === 0) return null;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: 0.4,
                    }}
                    className="flex flex-col gap-4 w-full mb-6"
                  >
                    <h3 className="w-full text-center">
                      {category.category_name}
                    </h3>
                    <div className="w-full justify-center flex flex-wrap gap-10 overflow-hidden">
                      {category.portfolios
                        .slice(0, showMore.get(category.id) || 2)
                        .map((item, index) => (
                          <CardContent
                            uuid={item.uuid}
                            navigate={`/our-works/${item.title}?id=${item.uuid}`}
                            thumbnail_url={item.thumbnail_url}
                            title={item.title}
                            key={index}
                          />
                        ))}
                    </div>
                    {category.portfolios.length > 2 &&
                      (showMore.get(category.id) || 0) <
                        category.portfolios.length && (
                        <div className="w-full flex justify-center mt-4">
                          <button
                            onClick={() => handleShowMore(category.id)}
                            className="min-w-[200px] text-lg flex items-center justify-center gap-2 bg-foreground h-16 text-background font-semibold rounded-badge"
                          >
                            Show More
                            <ChevronDown />
                          </button>
                        </div>
                      )}
                  </motion.div>
                );
              })}
          </>
        )}
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
