"use client";

import { fetchProductById } from "@/lib/data";
import { Product } from "@/lib/types";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { formatCategory } from "@/lib/utils";

{
  /* <Link
              href={{
                pathname: "/categories",
                query: { category: product.category },
              }}
            ></Link> */
}

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await fetchProductById(parseInt(params.id));
      setProduct(result);
    };

    fetchProduct();
  }, [params.id]);

  const addProduct = useCartStore((state) => state.addProduct);
  const { toast } = useToast();

  const handleAddProduct = (product: Product) => {
    addProduct(parseInt(product.id), 1);
    toast({
      description: `${product.title} added to cart`,
    });
  };

  return (
    <main className="mt-16 p-10 flex justify-center items-center">
      {product ? (
        <div className="flex flex-col md:flex-row">
          <Card className="bg-slate-200 relative flex justify-center items-center overflow-hidden aspect-square min-w-[300px] max-w-[400px]">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={600}
              height={600}
              className="object-contain"
            />
          </Card>

          <div className="p-6 flex flex-col space-y-3 min-w-[300px] max-w-[400px]">
            <div>
              <CardTitle>{product.title}</CardTitle>
              <div className="flex space-x-1 mt-1">
                <Badge>{product.stock > 0 ? "In Stock" : "Out of Stock"}</Badge>
                {product.rating > 0 && (
                  <div className="text-sm flex items-center space-x-1">
                    <FaStar />
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>
            </div>

            <CardDescription>{product.description}</CardDescription>
            <Separator />
            <div>
              <div className="flex font-bold text-lg">${product.price}</div>
              <div className="flex flex-col md:flex-row space-x-2">
                <Button
                  className="gap-x-2"
                  onClick={() => handleAddProduct(product)}
                >
                  Add to Cart
                </Button>
                <Link
                  className="self-center mt-2 md:self-end"
                  href={{
                    pathname: "/categories",
                    query: { category: product.category },
                  }}
                >
                  <CardDescription className="hover:text-primary transition-colors">
                    Shop more in {formatCategory(product.category)}
                  </CardDescription>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
