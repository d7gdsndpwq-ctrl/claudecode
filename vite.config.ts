import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works both at the GitHub Pages project URL
  // (username.github.io/claudecode/) and at the root of a custom domain.
  base: './',
  plugins: [react()],
})
