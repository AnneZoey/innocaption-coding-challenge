import Products from "@/components/products";
import SearchBar from "@/components/searchBar";
import { Suspense } from "react";
import ProductLoading from "@/components/ui/productLoading";

export default async function Page({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string };
}) {
  const searchTerm = searchParams?.search || "";
  const currentPage = searchParams?.page || "1";

  return (
    <main className="mt-16 p-10 flex flex-col justify-center items-center">
      <SearchBar />
      <Products searchTerm={searchTerm} currentPage={currentPage} />
    </main>
  );
}
