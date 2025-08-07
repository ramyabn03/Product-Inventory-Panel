import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Select a category"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock: z.coerce.number().min(0, "Stock must be a positive number"),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof formSchema>;

const addProduct = async (data: ProductFormData) => {
  await new Promise((res) => setTimeout(res, 1000));
  console.log("Product submitted:", data);
  return data;
};

function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  const category = watch("category");

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product added successfully");
      reset();
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 space-y-6 border border-zinc-200 dark:border-zinc-700">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Add New Product
        </h1>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-6"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., iPhone 14 Pro"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={category}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smartphones">Smartphones</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="fragrances">Fragrances</SelectItem>
                <SelectItem value="skincare">Skincare</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price")}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock")}
              placeholder="e.g., 100"
            />
            {errors.stock && (
              <p className="text-sm text-red-500">{errors.stock.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              {...register("description")}
              placeholder="Short product description..."
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
