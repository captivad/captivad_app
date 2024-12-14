"use client";

import ButtonNavigation from "@/components/button-navigation";
import { ChevronDown, Plus } from "lucide-react";
import { useGetOurWork } from "../our-work.web.service";
import React from "react";
import { IResponseListCategoryWork } from "@/app/api/admin/our-work/our-work.interface";
import { motion } from "framer-motion";
import CardContent from "@/components/card-content";
import SkeletonWorkCard from "./skeleton-work-card";

const OurWorkList = () => {
  const { data, isLoading } = useGetOurWork();
  const [showMore, setShowMore] = React.useState<Map<number, number>>(
    new Map()
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

  return (
    <>
      {/* ###########################  section-2  ############################ */}
      <section className="px-[10%] pb-20 lg:px-20 w-full h-full flex flex-col gap-20">
        <ButtonNavigation
          redirect={"/blog"}
          className=" md:max-w-60 rounden-box"
        >
          <Plus size={25} />
          Add Portfolio
        </ButtonNavigation>
        {isLoading && <SkeletonWorkCard />}
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
                <h3 className="w-full text-center">{category.category_name}</h3>
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
      </section>
    </>
  );
};

export default OurWorkList;
