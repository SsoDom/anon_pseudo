import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/anon_pseudo/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
