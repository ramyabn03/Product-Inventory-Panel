import { useState, type KeyboardEvent } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/ProductStore";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  product: {
    id: number;
    title: string;
    category: string;
    price: number;
    stock: number;
  };
}

export default function ProductRow({ product }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [stockInput, setStockInput] = useState(product.stock.toString());
  const updateStock = useProductStore((s) => s.updateStock);
  const navigate = useNavigate();

  const handleBlur = () => {
    const newStock = Number(stockInput);
    if (!isNaN(newStock)) updateStock(product.id, newStock);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.currentTarget.blur();
  };

  return (
    <TableRow>
      <TableCell>{product.title}</TableCell>
      <TableCell>
        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
      </TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell
        onClick={() => setIsEditing(true)}
        className={cn("cursor-pointer", isEditing && "p-0")}
      >
        {isEditing ? (
          <input
            type="number"
            className="w-full px-2 py-1 border border-gray-300 rounded"
            value={stockInput}
            onChange={(e) => setStockInput(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          product.stock
        )}
      </TableCell>
      <TableCell>
        {product.stock > 0 ? (
          <span className="text-green-600 font-medium">In Stock</span>
        ) : (
          <span className="text-red-500 font-medium">Out of Stock</span>
        )}
      </TableCell>
      <TableCell>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            useProductStore.getState().setEditingProduct(product);
            navigate({ to: "/products/new" });
          }}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}
