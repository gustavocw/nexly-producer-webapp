import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      components: "/src/components",
      contexts: "/src/contexts",
      services: "/src/services",
      assets: "/src/assets",
      hooks: "/src/hooks",
      stores: "/src/stores",
      pages: "/src/pages",
      utils: "/src/utils",
    },
  },
})
