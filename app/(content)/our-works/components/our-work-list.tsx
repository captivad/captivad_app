"use client";

import ButtonNavigation from "@/components/button-navigation";
import { ChevronDown, Plus } from "lucide-react";
import { useGetOurWork } from "../our-work.web.service";
import React from "react";
import { motion } from "framer-motion";
import CardContent from "@/components/card-content";
import SkeletonWorkCard from "./skeleton-work-card";
import { IResponseListCategoryWork } from "@/app/api/our-work/our-work.interface";
import { useSession } from "next-auth/react";
import ModalAddWork from "./ModalAddWork";
import { CldVideoPlayer } from "next-cloudinary";

const OurWorkList = () => {
  const { status } = useSession();

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
        {status === "authenticated" && (
          <button
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_add_ourwork"
              ) as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              } else {
                console.error("Modal element not found");
              }
            }}
            className="btn md:max-w-60 rounden-box"
          >
            <Plus size={25} />
            Add Portfolio
          </button>
        )}
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
                        navigate={`/our-works/${item.title}?id=${item.uuid}`}
                        key={index}
                        data={item}
                      />
                    ))}
                </div>
                {category.portfolios.length > 2 &&
                  (showMore.get(category.id) || 0) <
                    category.portfolios.length && (
                    <div className="w-full flex justify-center mt-4">
                      <button
                        onClick={() => handleShowMore(category.id)}
                        className="btn btn-md lg:btn-lg rounded-badge bg-foreground text-primary hover:text-white"
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
      <ModalAddWork />
    </>
  );
};

export default OurWorkList;
