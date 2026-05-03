import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 👆 Tailwind v4 ya no usa PostCSS
    //    ahora se conecta directo como plugin de Vite
    //    por eso borramos postcss.config.js
  ], resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})