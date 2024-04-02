"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import Image from "next/image";
import { fetchProducts, fetchTopProducts } from "@/lib/data";
import { fetchByCategory } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

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
  mostRated,
}: {
  searchTerm?: string;
  currentPage?: string;
  category?: string;
  mostRated?: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const page = parseInt(currentPage || "1", 10);
  // const zustandProducts = useCartStore((state) => state.products);

  useEffect(() => {
    const fetchProductsData = async () => {
      let fetchedProducts = await fetchProducts(page, searchTerm);
      if (category) {
        fetchedProducts = await fetchByCategory(category);
      }
      if (mostRated) {
        fetchedProducts = await fetchTopProducts();
      }
      setProducts(fetchedProducts);
    };

    fetchProductsData();
  }, [searchTerm, currentPage, category]);

  // useEffect(() => {
  //   console.log("Products in cart:", zustandProducts);
  // }, [zustandProducts]);

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
  const { toast } = useToast();

  const handleAddProduct = (product: Product) => {
    addProduct(parseInt(product.id), 1);
    toast({
      description: `${product.title} added to cart`,
    });
  };

  return (
    <Card className="w-80 lg:max-w-60 lg:w-auto relative overflow-hidden flex flex-col justify-between">
      <CardContent className="mt-6">
        <div className="flex flex-col space-y-4">
          <Card className="relative aspect-square overflow-hidden">
            <Image
              src={product.thumbnail}
              fill
              objectFit="cover"
              alt={product.title}
            />
            <div className="absolute inset-0 bg-[rgba(217,44,44,0.61)] opacity-0 hover:opacity-100 flex items-center justify-center transition-all">
              <Link href={`/products/${product.id}`}>
                <FaEye className="text-white text-2xl" size={30} />
              </Link>
            </div>
            <Badge className="absolute bottom-0 right-0 rounded-br-none  rounded-tr-none">
              ${product.price}
            </Badge>
          </Card>
          <div>
            <Link href={`/products/${product.id}`}>
              <CardTitle className="h-12 hover:text-primary hover:underline hover:underline-offset-2 transition-colors">
                <div className="line-clamp-2">{product.title}</div>
              </CardTitle>
            </Link>
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
        <Button className="gap-x-2" onClick={() => handleAddProduct(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
