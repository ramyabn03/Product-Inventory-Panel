import { useEffect, useMemo, useState } from "react";
import { Outlet } from "@tanstack/react-router";

import ProductFilters from "@/components/custom/ProductFilters";
import ProductTable from "@/components/custom/ProductTable";
import Pagination from "@/components/custom/Pagination";
import { useFilterStore } from "@/store/filterStore";
import { useProductStore } from "@/store/ProductStore";

const PAGE_SIZE = 11;

export default function InventoryTable() {
  const { products: localProducts, setProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch once on mount if not already persisted
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      setProducts(data.products);
      setIsLoading(false);
    };

    if (localProducts.length === 0) {
      fetchProducts();
    }
  }, [localProducts, setProducts]);

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
    if (!localProducts) return [];

    let filtered = localProducts.filter((product) =>
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
  }, [localProducts, search, category, sortField, sortOrder]);

  const uniqueCategories = useMemo(
    () => Array.from(new Set(localProducts?.map((p) => p.category))),
    [localProducts]
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
      <div className="pr-6 pl-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Product Inventory</h1>

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
