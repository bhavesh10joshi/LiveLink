import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true, // Corrected from 'hot' to 'hmr'
    watch: {
      usePolling: true, // helpful in WSL, Docker, or networked filesystems
    },
  },
})