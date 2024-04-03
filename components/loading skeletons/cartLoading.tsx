import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <Skeleton className="min-w-[300px] max-w-[500px] h-[400px]"></Skeleton>
  );
}
