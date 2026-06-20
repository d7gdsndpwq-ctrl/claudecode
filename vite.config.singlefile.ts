import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Builds one self-contained index.html with JS/CSS inlined, so it can be
// hosted anywhere (Netlify drop, Vercel, S3, or opened directly from disk)
// without any path/base configuration.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-singlefile',
  },
})
