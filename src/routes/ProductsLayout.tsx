// src/pages/ProductsLayout.tsx
import { Outlet } from "@tanstack/react-router";

function ProductsLayout() {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  );
}

export default ProductsLayout;
