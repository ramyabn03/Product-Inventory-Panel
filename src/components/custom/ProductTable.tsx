// src/components/ProductTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUpDown, ArrowUp } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import ProductRow from "./ProductRow";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
}

interface Props {
  products: Product[];
  isLoading: boolean;
}

export default function ProductTable({ products, isLoading }: Props) {
  const { sortField, sortOrder, toggleSort } = useFilterStore();

  return (
    <div className="border shadow-sm rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 flex items-center gap-1"
                onClick={() => toggleSort("price")}
              >
                Price
                {sortField === "price" &&
                  (sortOrder === "asc" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  ))}
                {sortField !== "price" && <ArrowUpDown className="w-4 h-4" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 flex items-center gap-1"
                onClick={() => toggleSort("stock")}
              >
                Stock
                {sortField === "stock" &&
                  (sortOrder === "asc" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  ))}
                {sortField !== "stock" && <ArrowUpDown className="w-4 h-4" />}
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
