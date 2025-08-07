// main.tsx or App.tsx
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  rootRoute,
  indexRoute,
  productsRoute,
  productsIndexRoute,
  addProductRoute,
} from "./routes/routes";
import { Toaster } from "@/components/ui/sonner";

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute.addChildren([productsIndexRoute, addProductRoute]),
]);

const router = createRouter({ routeTree });

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
