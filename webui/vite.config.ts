import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const outDir = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "../scrapper/dist"
)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0"
  },
  build: {
    outDir
  }
})
