import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@schemas": path.resolve(__dirname, "src/schemas"),
      "@models": path.resolve(__dirname, "src/models"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
});
