import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        'tab-page': resolve(__dirname, 'src/tab-page/index.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
      },
      output: {
        entryFileNames: chunk => {
          return `assets/${chunk.name}.js`;
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
