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

interface Props {
  categories: string[];
}

export default function ProductFilters({ categories }: Props) {
  const { setSearch, setCategory } = useFilterStore();
  const timeoutId = useRef<number | null>(null);

  const debouncedSetSearch = (value: string) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => {
      setSearch(value);
      timeoutId.current = null;
    }, 300);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Input
        placeholder="Search products..."
        className="w-full sm:w-64"
        onChange={(e) => debouncedSetSearch(e.target.value)}
      />
      <Select defaultValue="all" onValueChange={setCategory}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
