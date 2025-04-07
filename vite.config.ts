import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { crx } from '@crxjs/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest: {
        manifest_version: 3,
        name: "Tabular",
        version: "1.0.0",
        description: "A Chrome extension that adds browser action functionality",
        action: {
          default_title: "Tabular",
          default_icon: {
            "16": "icons/icon-16.png",
            "48": "icons/icon-48.png",
            "128": "icons/icon-128.png"
          }
        },
        background: {
          service_worker: "src/pages/background/index.ts",
          type: "module" as const  // Type assertion to ensure correct type
        },
        icons: {
          "16": "icons/icon-16.png",
          "48": "icons/icon-48.png",
          "128": "icons/icon-128.png"
        },
        permissions: [
          "tabs"
        ],
        host_permissions: []
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    rollupOptions: {
      input: {
        background: 'src/pages/background/index.ts',
        'browser-action': 'src/pages/browser-action/index.html'
      }
    }
  }
});
