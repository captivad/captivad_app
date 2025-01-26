"use client";

import { IResponsePagination } from "@/helpers/general.helper";
import { FC } from "react";

interface IProps {
  data: IResponsePagination<any>;
  setCurrentPage: (e: number) => void;
}
const PaginationButton: FC<IProps> = ({ data, setCurrentPage }) => {
  if (!data) return null;

  const { currentPage, totalPage } = data;
  const buttons = [];

  // First page and previous
  if (currentPage > 1) {
    buttons.push(
      <button
        key="prev"
        className="join-item btn"
        onClick={() => setCurrentPage(currentPage - 1)}
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
          page === currentPage ? "btn-active bg-foreground text-background" : ""
        }`}
        onClick={() => setCurrentPage(page)}
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
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        »
      </button>
    );
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="join flex justify-center mt-4">{buttons}</div>
      {/* <span className="mt-4 text-[1.2em]">
        Page {currentPage} of {totalPage}
      </span> */}
    </div>
  );
};

export default PaginationButton;
