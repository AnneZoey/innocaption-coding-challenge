import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton
          key={index}
          className="rounded-md w-80 lg:w-60 h-96 lg:h-80"
        />
      ))}
    </div>
  );
}
