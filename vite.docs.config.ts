import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'docs'),
  base: process.env.GITHUB_ACTIONS ? '/wonder-ui/' : '/',
  build: {
    outDir: resolve(__dirname, 'docs-dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
