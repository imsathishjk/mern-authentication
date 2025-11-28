import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from 'react'

// https://vite.dev/config/



export default defineConfig({
  plugins: [
    tailwindcss(),
    react,
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
