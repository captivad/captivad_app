"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const SearchBlog: React.FC<IProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [value, setValue] = React.useState(search || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ambil nilai pencarian dari form
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    // Buat parameter pencarian baru
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      setValue("");
      params.delete("search"); // Hapus jika kosong
    }
    router.push(`?${params.toString()}`);
  };

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    setValue("");
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className={`flex w-full items-center rounded-xl border-2 ${className}`}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full flex items-center gap-2"
      >
        <button type="submit" className="btn btn-ghost rounded-lg">
          <Search />
        </button>
        <input
          type="text"
          name="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter for search"
          id="search"
          className="bg-transparent outline-none"
        />
      </form>
      <button onClick={handleClearSearch} className="btn btn-ghost rounded-lg">
        <X />
      </button>
    </div>
  );
};

export default SearchBlog;
