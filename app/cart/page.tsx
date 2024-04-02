import React from "react";
import Cart from "@/components/cart";

export default function Page() {
  return (
    <div className="mt-16 p-10 flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl mb-6"> Your Cart </h1>
      <div>
        <Cart />
      </div>
    </div>
  );
}
