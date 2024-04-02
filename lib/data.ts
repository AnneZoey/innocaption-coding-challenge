import { unstable_noStore as noStore } from "next/cache";

export async function fetchProducts(page: number, searchTerms?: string) {
  noStore();
  // console.log("Fetching revenue data...");
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const skip = (page - 1) * 12;
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${
        searchTerms || ""
      }&skip=${skip}&limit=0`
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
    const res = await fetch("https://dummyjson.com/carts/1", {
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
