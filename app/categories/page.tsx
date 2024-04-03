import Products from "@/components/products";
import { Suspense } from "react";
import DropDown from "@/components/ui/dropdown";
import { fetchCategories } from "@/lib/data";
import ProductLoading from "@/components/loading skeletons/productLoading";

export default async function Page({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const cagetoryTerm = searchParams?.category || "smartphones";
  const categories = await fetchCategories();
  return (
    <main className="mt-16 p-10 flex flex-col justify-center items-center">
      <DropDown options={categories} />
      <Suspense fallback={<ProductLoading />}>
        <Products category={cagetoryTerm} />
      </Suspense>
    </main>
  );
}
