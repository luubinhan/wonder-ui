import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

function copyCssExports(): Plugin {
  return {
    name: 'copy-css-exports',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      copyFileSync(resolve(__dirname, 'src/styles/tokens.css'), resolve(distDir, 'tokens.css'));
      copyFileSync(resolve(__dirname, 'src/styles/reset.css'), resolve(distDir, 'reset.css'));
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true,
    }),
    copyCssExports(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WonderUI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'wonder-ui.css',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
