"use client";
import { fetchProductById } from "@/lib/data";
import { Product } from "@/lib/types";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { formatCategory } from "@/lib/utils";
import Products from "@/components/products";

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const changeImage = (index: number) => {
    setCurrentImage(index);
  };

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
    <main className="mt-16 p-10 flex flex-col justify-center items-center space-y-4">
      {product ? (
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col justify-center items-center">
            <Card className="bg-slate-200 relative flex justify-center items-center overflow-hidden aspect-square min-w-[300px] max-w-[350px]">
              <Image
                src={product.images[currentImage]}
                alt={product.title}
                width={600}
                height={600}
                className="object-cover"
              />
            </Card>
            {product.images.length > 1 && (
              <CardFooter className="flex space-x-2 mt-2">
                {product.images.map((image, index) => (
                  <Button
                    variant="ghost"
                    className="relative overflow-hidden flex aspect-square w-16 h-16"
                    key={index}
                    onClick={() => changeImage(index)}
                  >
                    <Image
                      src={image}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </Button>
                ))}
              </CardFooter>
            )}
          </div>
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
                  <FaShoppingCart /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <Link
        className="self-center hover:text-primary transition-colors"
        href={{
          pathname: "/categories",
          query: { category: product?.category },
        }}
      >
        <h2 className="font-bold text-4xl">
          Shop More in {formatCategory(product?.category || "")}
        </h2>
      </Link>
      <Products
        searchTerm={""}
        currentPage={"1"}
        category={product?.category || ""}
        similarCategory={true}
      />
    </main>
  );
}
