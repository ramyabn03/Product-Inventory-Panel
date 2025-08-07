// src/components/ProductRow.tsx
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
}

export default function ProductRow({ product }: { product: Product }) {
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>
        <Badge variant={product.stock > 0 ? "default" : "destructive"}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
