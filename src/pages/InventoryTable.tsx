// src/pages/InventoryTable.tsx
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Outlet } from "@tanstack/react-router";

import ProductFilters from "@/components/custom/ProductFilters";
import ProductTable from "@/components/custom/ProductTable";
import Pagination from "@/components/custom/Pagination";
import { useFilterStore } from "@/store/filterStore";

const PAGE_SIZE = 10;

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  return data.products;
};

export default function InventoryTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const {
    search,
    category,
    sortField,
    sortOrder,
    currentPage,
    setPage,
    nextPage,
    prevPage,
  } = useFilterStore();

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    let filtered = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    return filtered;
  }, [data, search, category, sortField, sortOrder]);

  const uniqueCategories = useMemo(
    () => Array.from(new Set(data?.map((p) => p.category))),
    [data]
  );

  // Calculate pagination
  const pageCount = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  return (
    <>
      <Outlet />
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>

        <ProductFilters categories={uniqueCategories} />

        <ProductTable products={paginatedProducts} isLoading={isLoading} />

        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          setPage={setPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </>
  );
}
