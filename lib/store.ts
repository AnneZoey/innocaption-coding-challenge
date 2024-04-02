import create from "zustand";

interface CartProduct {
  id: number;
  quantity: number;
}

type CartStore = {
  products: CartProduct[];
  addProduct: (id: number, quantity: number) => void;
  modifyQuantity: (id: number, amount: number) => void;
  removeProduct: (id: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],

  // Add a product to the store. If the product already exists, increase the quantity by 1
  addProduct: (id, quantity) =>
    set((state) => {
      const productExists = state.products.find((product) => product.id === id);

      if (productExists) {
        return {
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      } else {
        return {
          products: [...state.products, { id, quantity }],
        };
      }
    }),

  // set the quantity of a product to a specific amount
  modifyQuantity: (id, amount) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, quantity: amount } : product
      ),
    })),

  // Remove a product is basically setting the quantity to 0
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
