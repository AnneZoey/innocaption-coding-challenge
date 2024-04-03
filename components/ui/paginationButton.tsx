"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export function NextPage({ totalPage }: { totalPage: number }) {
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

  return (
    <Button variant="outline" onClick={handleNextPage} size="icon">
      <MdNavigateNext className="w-4 h-4" />
    </Button>
  );
}

export function PrevPage() {
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

  return (
    <Button variant="outline" onClick={handlePrevPage} size="icon">
      <MdNavigateBefore className="w-4 h-4" />
    </Button>
  );
}
