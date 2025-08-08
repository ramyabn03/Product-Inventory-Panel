import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  addProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products], // add to top
        })),
    }),
    {
      name: "product-store",
    }
  )
);
