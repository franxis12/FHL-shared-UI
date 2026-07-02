import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'FHLSharedUI',
      fileName: 'FHL-shared-UI',
      cssFileName: 'FHL-shared-UI',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
