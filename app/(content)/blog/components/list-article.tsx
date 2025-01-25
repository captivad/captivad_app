"use client";

import { FC, useState } from "react";
import CardBlog from "./card-blog";
import { useGetBlogPost } from "../blog.web.service";
import { useSearchParams } from "next/navigation";

const ListArticle: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { data: listArticle, isLoading } = useGetBlogPost({
    page: currentPage,
    search: params.get("search") || "",
    category: params.get("category") || "",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    if (!listArticle) return null;

    const { currentPage, totalPage } = listArticle;
    const buttons = [];

    // First page and previous
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          className="join-item btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </button>
      );
    }

    // Page number buttons
    const visiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPage, startPage + visiblePages - 1);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          className={`join-item btn ${
            page === currentPage ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    // Next page
    if (currentPage < totalPage) {
      buttons.push(
        <button
          key="next"
          className="join-item btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </button>
      );
    }

    return buttons;
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-2 md:gap-6 w-full justify-center py-[5%] pt-4">
        {!isLoading &&
          listArticle?.rows.map((item, index) => {
            if (index === 0 || index === 1) {
              return (
                <CardBlog
                  key={index}
                  content={item}
                  className="col-span-6 md:col-span-2"
                />
              );
            }

            return (
              <CardBlog
                key={index}
                content={item}
                className="col-span-6 md:col-span-2"
              />
            );
          })}
        {isLoading && (
          <div className="col-span-6 h-32 flex justify-center items-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        )}
      </div>
      {listArticle && listArticle.totalPage > 1 && (
        <div className="join flex justify-center mt-4">
          {renderPaginationButtons()}
        </div>
      )}
    </div>
  );
};

export default ListArticle;
