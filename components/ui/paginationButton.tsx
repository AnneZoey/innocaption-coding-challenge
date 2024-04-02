import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function nextPage(totalPage: number) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleNextPage = () => {
    let currentPage = parseInt(searchParams.get("page") || "1");
    if (currentPage < totalPage) {
      const params = new URLSearchParams(searchParams);
      params.set("page", `${currentPage + 1}`);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return <Button onClick={handleNextPage}>{`>`}</Button>;
}

export function prevPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePrevPage = () => {
    let currentPage = parseInt(searchParams.get("page") || "1");
    if (currentPage > 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", `${currentPage - 1}`);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return <Button onClick={handlePrevPage}>{`<`}</Button>;
}
