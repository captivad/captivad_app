"use client";

import React, { useRef, useState, useEffect } from "react";
import { IPorfolios } from "@/app/api/admin/our-services/our-service.interface";
import CardContent from "@/components/card-content";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IProps {
  relateWork: IPorfolios[];
}

const RelateWork: React.FC<IProps> = ({ relateWork }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    setIsAtStart(currentScroll === 0);
    setIsAtEnd(currentScroll >= maxScroll - 1); // Allow for small rounding errors
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth; // Scroll by container width
    const newScrollPosition =
      direction === "right"
        ? Math.min(
            scrollPosition + scrollAmount,
            container.scrollWidth - container.clientWidth
          )
        : Math.max(scrollPosition - scrollAmount, 0);

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });

    setScrollPosition(newScrollPosition);
    checkScrollPosition();
  };

  // Check scroll position on initial render and after content changes
  useEffect(() => {
    checkScrollPosition();
  }, [relateWork]);

  return (
    <>
      <section className="p-[5%] lg:px-20 w-full h-auto flex flex-col gap-4">
        <h3>Relate Work</h3>
        <div className="w-full flex xl:items-center gap-4">
          {relateWork.length > 4 && (
            <button
              onClick={() => handleScroll("left")}
              disabled={isAtStart}
              className={`hidden xl:flex btn btn-circle btn-outline 
                ${
                  isAtStart ? "btn-disabled opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="w-full justify-start overflow-x-scroll hidden xl:flex gap-6 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex gap-6">
              {relateWork.map((item, index) => (
                <CardContent
                  key={index}
                  uuid={item.uuid}
                  navigate={`/our-works/${item.title}?id=${item.uuid}`}
                  thumbnail_url={item.thumbnail_url}
                  title={item.title}
                />
              ))}
            </div>
          </div>

          {/* media-query mobile */}
          <div className="w-full max-h-[500px] shadow-inner border-[1px] py-2 border-gray-100/20 rounded-lg overflow-y-scroll overflow-hidden flex-wrap justify-center flex xl:hidden gap-4">
            {relateWork.map((item, index) => (
              <CardContent
                key={index + item.uuid}
                uuid={item.uuid}
                navigate={`/our-services/${item.title}?id=${item.uuid}`}
                thumbnail_url={item.thumbnail_url}
                title={item.title}
              />
            ))}
          </div>
          {relateWork.length > 4 && (
            <button
              onClick={() => handleScroll("right")}
              disabled={isAtEnd}
              className={`hidden xl:flex btn btn-circle btn-outline 
                ${isAtEnd ? "btn-disabled opacity-50 cursor-not-allowed" : ""}`}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default RelateWork;
