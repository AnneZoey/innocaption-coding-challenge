import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Products from "@/components/products";

export default async function Home({
  searchParams,
}: {
  searchParams?: { search?: string; category?: string };
}) {
  const searchTerm = searchParams?.search || "";

  return (
    <main className="mt-16 p-10 flex flex-col justify-center items-center space-y-6">
      <div className="bg-muted md:max-w-6xl md:max-h-6xl flex justify-center items-center">
        <Image
          src="/mocku-hero.png"
          alt="Custom Mockup Hero"
          width={1920}
          height={1080}
          className="rounded-md object-cover"
        />
      </div>
      <h2 className="font-bold text-4xl">Most Popular Products</h2>
      <Products searchTerm={searchTerm} currentPage={"1"} mostRated={true} />
    </main>
  );
}
