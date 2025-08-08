import { TableCell, TableRow } from "@/components/ui/table";
import { useProductStore, type Product } from "@/store/ProductStore";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  product: Product;
  isEditing: boolean;
  onEdit: (id: number) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function ProductRow({
  product,
  isEditing,
  onEdit,
  onCancel,
  onSave,
}: Props) {
  const [editingProduct, setEditingProduct] = useState(product);
  const updateProducts = useProductStore((s) => s.setProducts);
  const products = useProductStore((s) => s.products);

  // Get unique categories dynamically
  const categories = Array.from(new Set(products.map((p) => p.category))).sort(
    (a, b) => a.localeCompare(b)
  );

  const hasChanges = JSON.stringify(editingProduct) !== JSON.stringify(product);

  const handleSave = () => {
    if (!hasChanges) return;
    const updatedList = products.map((p) =>
      p.id === product.id ? editingProduct : p
    );
    updateProducts(updatedList);
    onSave();

    toast.success("Product updated successfully");
  };

  return (
    <TableRow>
      {/* Title */}
      <TableCell>
        {isEditing ? (
          <input
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
          />
        ) : (
          product.title
        )}
      </TableCell>

      {/* Category */}
      <TableCell>
        {isEditing ? (
          <Select
            value={editingProduct.category}
            onValueChange={(value) =>
              setEditingProduct({ ...editingProduct, category: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          product.category.charAt(0).toUpperCase() + product.category.slice(1)
        )}
      </TableCell>

      {/* Price */}
      <TableCell>
        {isEditing ? (
          <input
            type="number"
            step="0.01"
            className="w-full px-2 py-1 border border-gray-300 rounded"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: Number(e.target.value),
              })
            }
          />
        ) : (
          `$${product.price.toFixed(2)}`
        )}
      </TableCell>

      {/* Stock */}
      <TableCell>
        {isEditing ? (
          <input
            type="number"
            className="w-full px-2 py-1 border border-gray-300 rounded"
            value={editingProduct.stock}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                stock: Number(e.target.value),
              })
            }
          />
        ) : (
          product.stock
        )}
      </TableCell>

      {/* Status - Not editable */}
      <TableCell>
        {editingProduct.stock > 0 ? (
          <span className="text-green-600 font-medium">In Stock</span>
        ) : (
          <span className="text-red-500 font-medium">Out of Stock</span>
        )}
      </TableCell>

      {/* Actions */}
      <TableCell className="flex gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="default"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditingProduct(product);
              onEdit(product.id);
            }}
          >
            Edit
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
