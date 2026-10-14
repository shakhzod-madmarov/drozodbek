import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  base: "/",
  plugins: [react()],
  server: {
    port: 5175,
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    manifest: !isSsrBuild,
    ...(isSsrBuild
      ? {}
      : {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes("node_modules")) {
                  if (id.includes("react-router-dom") || id.includes("react-router")) return "router";
                  if (id.includes("react-toastify")) return "vendor-utils";
                  if (id.includes("react") || id.includes("react-dom")) return "react-vendor";
                }
              },
            },
          },
        }),
  },
}));
