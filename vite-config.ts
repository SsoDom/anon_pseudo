import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/anon_pseudo/', // WICHTIG: Ersetzen Sie REPOSITORY-NAME mit Ihrem GitHub Repository Namen
  build: {
    outDir: 'dist'
  }
})