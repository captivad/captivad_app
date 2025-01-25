"use client";
import { useSearchParams } from "next/navigation";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  return (
    <>
      {params.get("search") && (
        <p className="text-[1em]">
          Result search of:{" "}
          <span className="italic font-bold">{params.get("search")}</span>
        </p>
      )}
    </>
  );
};

export default SearchResult;
