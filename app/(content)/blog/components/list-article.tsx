"use client";

import { FC, useState } from "react";
import CardBlog from "./card-blog";
import { useGetBlogPost } from "../blog.web.service";
import { useSearchParams } from "next/navigation";
import { IResponsePagination } from "@/helpers/general.helper";
import PaginationButton from "@/components/PaginationButton";

const ListArticle: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { data: listArticle, isLoading } = useGetBlogPost({
    page: currentPage,
    search: params.get("search") || "",
    category: params.get("category") || "",
    size: 20,
  });

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
        <PaginationButton data={listArticle} setCurrentPage={setCurrentPage} />
      )}
      {listArticle && listArticle.rows.length === 0 && (
        <div className="w-full h-32 flex justify-center items-center">
          <h5>No Article Found</h5>
        </div>
      )}
    </div>
  );
};

export default ListArticle;
