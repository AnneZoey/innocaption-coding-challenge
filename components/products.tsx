"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { fetchProducts } from "@/lib/data";
import { fetchByCategory } from "@/lib/data";
import { useCartStore } from "@/lib/store";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/types";
import { use, useEffect, useState } from "react";

export default function Products({
  searchTerm,
  currentPage,
  category,
}: {
  searchTerm?: string;
  currentPage?: string;
  category?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const page = parseInt(currentPage || "1", 10);
  const zustandProducts = useCartStore((state) => state.products);

  useEffect(() => {
    const fetchProductsData = async () => {
      let fetchedProducts = await fetchProducts(page, searchTerm);
      if (category) {
        fetchedProducts = await fetchByCategory(category);
      }
      setProducts(fetchedProducts);
    };

    fetchProductsData();
  }, [searchTerm, currentPage, category]);

  useEffect(() => {
    console.log("Products in cart:", zustandProducts);
  }, [zustandProducts]);

  if (!products || products.length === 0) return <div>No products found</div>;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <Card className="w-80 lg:max-w-60 lg:w-auto relative overflow-hidden flex flex-col justify-between">
      <CardContent className="mt-6">
        <div className="flex flex-col space-y-4">
          <Card className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0]}
              layout="fill"
              objectFit="cover"
              alt={product.title}
              sizes="100%"
            />
            <Badge className="absolute bottom-0 right-0 rounded-br-none  rounded-tr-none">
              ${product.price}
            </Badge>
          </Card>
          <div>
            <CardTitle className="h-12">
              <div className="line-clamp-2">{product.title}</div>
            </CardTitle>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {product.rating > 0 && (
          <div className="text-sm flex items-center space-x-1">
            <FaStar />
            <span>{product.rating}</span>
          </div>
        )}
        <Button
          className="gap-x-2"
          onClick={() => addProduct(parseInt(product.id), 1)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
