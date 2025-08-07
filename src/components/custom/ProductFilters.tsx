// src/components/ProductFilters.tsx
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFilterStore } from "@/store/filterStore";
import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface Props {
  categories: string[];
}

export default function ProductFilters({ categories }: Props) {
  const { setSearch, setCategory } = useFilterStore();
  const timeoutId = useRef<number | null>(null);
  const navigate = useNavigate();

  const debouncedSetSearch = (value: string) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => {
      setSearch(value);
      timeoutId.current = null;
    }, 300);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Select defaultValue="all" onValueChange={setCategory}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative w-full sm:w-64">
        <Input
          placeholder="Search products..."
          className="pr-10" // space for icon
          onChange={(e) => debouncedSetSearch(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>

      <Button
        onClick={() => navigate({ to: "/products/new" })}
        className="ml-auto"
      >
        + Add New Product
      </Button>
    </div>
  );
}
