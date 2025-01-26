"use client";

import { FC } from "react";
import { useGetCategoryBlog } from "../blog.web.service";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const NavbarCategory: FC = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  //list category options
  const { data: listCategory, isLoading } = useGetCategoryBlog();
  const categoryOptions = React.useMemo(() => {
    if (!listCategory) return [];
    return listCategory?.map((item, _i) => ({
      id: _i,
      value: String(item.id),
      label: item.name,
    }));
  }, [listCategory]);

  const handleSelectCategory = (value: string, event: React.MouseEvent) => {
    event.preventDefault();

    params.set("category", value);
    navigate.push(`?${params.toString()}`);
  };

  return (
    <div
      id="category"
      className="flex flex-wrap gap-2 justify-center md:justify-start mb-10 max-h-24 overflow-auto"
    >
      <button
        onClick={(e) => handleSelectCategory("highlights", e)}
        className={`btn btn-ghost btn-sm lg:btn-md ${
          params.get("category") == "highlights" ? "btn-active" : ""
        }`}
      >
        <p>Highlights</p>
      </button>
      <button
        onClick={(e) => handleSelectCategory("all", e)}
        className={`btn btn-ghost btn-sm lg:btn-md ${
          params.get("category") == "all" ? "btn-active" : ""
        }`}
      >
        <p>All</p>
      </button>
      {!isLoading &&
        categoryOptions.map((item) => (
          <button
            key={item.id}
            onClick={(e) => handleSelectCategory(item.label, e)}
            className={`btn btn-ghost btn-sm lg:btn-md ${
              params.get("category") == item.label ? "btn-active" : ""
            }`}
          >
            <p>{item.label}</p>
          </button>
        ))}
    </div>
  );
};

export default NavbarCategory;
