// src/store/filterStore.ts
import { create } from "zustand";

type SortField = "price" | "stock" | null;

interface FilterState {
  search: string;
  category: string;
  sortField: SortField;
  sortOrder: "asc" | "desc";
  currentPage: number;
  setSearch: (val: string) => void;
  setCategory: (val: string) => void;
  toggleSort: (field: "price" | "stock") => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  search: "",
  category: "all",
  sortField: null,
  sortOrder: "asc",
  currentPage: 1,
  setSearch: (search) => set({ search, currentPage: 1 }),
  setCategory: (category) => set({ category, currentPage: 1 }),
  toggleSort: (field) =>
    set((state) => {
      let newSortOrder = "asc";
      if (state.sortField === field) {
        newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      }
      return { sortField: field, sortOrder: newSortOrder, currentPage: 1 };
    }),
  setPage: (page) => set({ currentPage: page }),
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPage: () =>
    set((state) => ({
      currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1,
    })),
}));
