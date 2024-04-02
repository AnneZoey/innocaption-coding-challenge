import { Product } from "./types";

export async function fetchProducts(page: number, searchTerms?: string) {
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
