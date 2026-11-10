import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { mocksEnabled } from "./lib/apiMode";
import { queryClient } from "./lib/queryClient";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
});

async function enableMocking() {
  // Set VITE_USE_MOCKS in .env: "true" = MSW mocks, "false" = real Express API.
  // The inline DEV check lets the bundler drop MSW from production builds.
  if (!import.meta.env.DEV || !mocksEnabled) return;
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
