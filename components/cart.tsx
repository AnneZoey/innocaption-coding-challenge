import React from "react";
import { FaTrash } from "react-icons/fa";
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

export default async function Cart() {
  const cart = await fetchCart();
  const products = cart.products;
  return (
    <Table className="min-w-[300px] max-w-[500px]">
      <TableCaption>All transactions are final</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Item Name </TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: Product) => (
          <TableRow key={product.title}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell className="text-center">{product.quantity}</TableCell>
            <TableCell className="text-right">{`$${product.total}`}</TableCell>
            <TableCell className="text-center">
              {" "}
              <Button variant="ghost" size="icon">
                <FaTrash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">{`$${cart.total}`}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
