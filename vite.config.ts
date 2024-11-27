import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 2999, // デフォルトのポートを3000に設定
    strictPort: false,
    open: true,
  },
});