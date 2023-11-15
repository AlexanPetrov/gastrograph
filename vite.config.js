import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // root: 'root',
  // base: "/gastrograph/",
  plugins: [react()],
  server: {
    port: 3001,
  },
});
