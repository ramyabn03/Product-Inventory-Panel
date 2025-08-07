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
  updateStock: (id: number, stock: number) => void;
  addProduct: (product: Product) => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      updateStock: (id, stock) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock } : p
          ),
        })),
      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products], // add to top
        })),
      editingProduct: null,
      setEditingProduct: (product) => set({ editingProduct: product }),
    }),
    {
      name: "product-store", // localStorage key
    }
  )
);
