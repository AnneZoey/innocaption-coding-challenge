import { unstable_noStore as noStore } from "next/cache";
import { Product } from "./types";

export async function fetchProducts(page: number, searchTerms?: string) {
  // console.log("Fetching revenue data...");
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  noStore();
  const skip = (page - 1) * 8;
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${
        searchTerms || ""
      }&skip=${skip}&limit=8`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("An error occurred while fetching the products:", error);
    throw error;
  }
}

export async function fetchSearchProducts(searchTerms: string) {
  noStore();
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchTerms}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("An error occurred while fetching the products:", error);
    throw error;
  }
}

export async function fetchTopProducts() {
  noStore();
  try {
    const products = await fetchProducts(1);
    const topProducts = products
      .filter((product: Product) => product.rating && product.rating >= 4) // Filter products with rating >= 4
      .sort((a: Product, b: Product) => b.rating - a.rating) // Sort by rating (descending)
      .slice(0, 4); // Get the top 4 products
    return topProducts;
  } catch (error) {
    console.error("An error occurred while fetching the products:", error);
    throw error;
  }
}

export async function fetchProductById(id: number) {
  noStore();
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the product:", error);
    throw error;
  }
}

export async function fetchByCategory(category: string) {
  noStore();
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("An error occurred while fetching the products:", error);
    throw error;
  }
}

export async function fetchCategories() {
  noStore();
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the categories:", error);
    throw error;
  }
}

export async function fetchSimilarCategory(category: string) {
  noStore();
  try {
    const products = await fetchByCategory(category);
    const topProducts = products
      .filter((product: Product) => product.rating && product.rating >= 4) // Filter products with rating >= 4
      .sort((a: Product, b: Product) => b.rating - a.rating) // Sort by rating (descending)
      .slice(0, 4); // Get the top 4 products
    return topProducts;
  } catch (error) {
    console.error("An error occurred while fetching the products:", error);
    throw error;
  }
}

interface cartProduct {
  id: number;
  quantity: number;
}

export async function fetchCart(cartProducts?: cartProduct[]) {
  noStore();
  const mergeProducts = cartProducts || [];
  try {
    console.log("Fetching cart data...");
    // Just use id 1 for now
    // console.log("Fetching revenue data...");
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await fetch("https://dummyjson.com/carts/20", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merge: true,
        products: mergeProducts,
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the cart:", error);
    throw error;
  }
}
