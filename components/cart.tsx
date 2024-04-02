"use client";
import { FaTrash } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { fetchCart } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

export default function Cart() {
  const addedProducts = useCartStore((state) => state.products);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const modifyQuantity = useCartStore((state) => state.modifyQuantity);
  const [cart, setCart] = useState({ products: [], total: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const fetchCartData = async () => {
      const fetchedCart = await fetchCart(addedProducts);
      setCart(fetchedCart);
    };
    fetchCartData();
  }, [addedProducts]);

  const handleChange = useDebouncedCallback(
    (value: string, id: string) => {
      const quantity = parseInt(value, 10);
      modifyQuantity(parseInt(id), quantity);
    },
    300 // delay in ms
  );

  const products = cart.products;
  const addedProductIds = addedProducts.map((product) => product.id);
  const filteredProducts = products.filter((product: Product) =>
    addedProductIds.includes(parseInt(product.id))
  );
  return (
    <Table className="max-w-[500px]">
      <TableCaption>All transactions are final</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-[100px]">Item </TableHead>
          <TableHead className="md:w-[200px]">Description </TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product: Product) => (
          <TableRow key={product.title}>
            <TableCell className="">
              <div className=" aspect-square flex justify-center items-center bg-black overflow-hidden">
                <Image
                  src={product.thumbnail}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="object-cover"
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell className="text-center">
              <Input
                type="number"
                id="quantity"
                min="1"
                placeholder="Quantity"
                onChange={(e) => handleChange(e.target.value, product.id)}
                defaultValue={product.quantity.toString() || ""}
              />
            </TableCell>
            <TableCell className="text-right">{`$${product.total}`}</TableCell>
            <TableCell className="text-center">
              <Button
                onClick={() => {
                  removeProduct(parseInt(product.id));
                  toast({
                    description: `${product.title} removed from cart`,
                  });
                }}
                variant="ghost"
                size="icon"
                className="w-full"
              >
                <FaTrash className="md:h-4 md:w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{`$${cart.total - 315}`}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
