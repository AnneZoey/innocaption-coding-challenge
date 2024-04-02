"use client";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }, 300);

  return (
    <div className="flex justify-center items-center mb-6 space-x-4 md:w-[400px]">
      <FaMagnifyingGlass />
      <Input
        type="text"
        id="search"
        placeholder="Search Products"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString() || ""}
      />{" "}
    </div>
  );
};

export default SearchBar;
