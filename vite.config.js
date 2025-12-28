import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to '/' for custom domain or root deployment
  // For GitHub Pages at username.github.io/repo-name/, set to '/repo-name/'
  base: "/dialogues-site/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
