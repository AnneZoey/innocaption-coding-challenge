import Products from "@/components/products";
import SearchBar from "@/components/searchBar";
import { PrevPage, NextPage } from "@/components/ui/paginationButton";

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
      {!searchTerm && (
        <div className="mb-6 flex justify-center items-center space-x-2">
          <PrevPage />
          <div>{`Page ${currentPage} of 13`}</div>
          <NextPage totalPage={13} />
        </div>
      )}
      <Products searchTerm={searchTerm} currentPage={currentPage} />
    </main>
  );
}
