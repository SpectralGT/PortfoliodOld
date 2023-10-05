// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: ["**/*.gltf"],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "pages/Contact/index.html"),
        objects: resolve(__dirname, "pages/Contact/index.html"),
      },
    },
  },
});
