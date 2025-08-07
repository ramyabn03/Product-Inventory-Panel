// routes.ts
import { createRoute, createRootRoute, redirect } from "@tanstack/react-router";
import ProductsLayout from "./ProductsLayout";
import InventoryTable from "../pages/InventoryTable";
import AddProduct from "../pages/AddProduct";

// Root route
export const rootRoute = createRootRoute({});

// Redirect "/" to "/products"
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: () => {
    throw redirect({ to: "/products" });
  },
});

// /products layout route
export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "products",
  component: ProductsLayout,
});

// ✅ /products (index route)
export const productsIndexRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "/", // ← important!
  component: InventoryTable,
});

// ✅ /products/new
export const addProductRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "new",
  component: AddProduct,
});
