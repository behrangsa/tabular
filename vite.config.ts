import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to move HTML files to assets folder after build
    {
      name: 'move-html-to-assets',
      closeBundle: async () => {
        // Create assets directory if it doesn't exist
        if (!fs.existsSync('dist/assets')) {
          fs.mkdirSync('dist/assets', { recursive: true });
        }
        
        // Read the tab-page HTML file
        const htmlPath = 'dist/src/tab-page/index.html';
        if (fs.existsSync(htmlPath)) {
          let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
          
          // Fix asset paths for Chrome extension context
          // For Chrome extensions, paths are relative to the root of the extension
          // Since both the HTML and JS/CSS are in the assets folder, we need to use relative paths
          htmlContent = htmlContent.replace(/src="\/assets\//g, 'src="./');
          htmlContent = htmlContent.replace(/href="\/assets\//g, 'href="./');
          
          // Write to the new location
          fs.writeFileSync('dist/assets/tab-page.html', htmlContent);
          console.log('Created tab-page.html in assets directory');
          
          // Remove the original file to avoid confusion
          try {
            fs.unlinkSync(htmlPath);
            // Remove the src/tab-page directory if it's empty
            const dirPath = path.dirname(htmlPath);
            const files = fs.readdirSync(dirPath);
            if (files.length === 0) {
              fs.rmdirSync(dirPath);
              // Try to remove parent directory if empty
              const parentDir = path.dirname(dirPath);
              const parentFiles = fs.readdirSync(parentDir);
              if (parentFiles.length === 0) {
                fs.rmdirSync(parentDir);
              }
            }
            console.log('Cleaned up original HTML file');
          } catch (err) {
            console.error('Error cleaning up original HTML file:', err);
          }
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        'tab-page': resolve(__dirname, 'src/tab-page/index.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
