import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import vitePlugin from './vitePlugin';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    vitePlugin(),
    //
  ],
  // base: '/extension',
  server: {
    cors: true,
    headers: {
      // 'Cross-Origin-Resource-Policy': 'cross-origin',
      // 'Cross-Origin-Embedder-Policy': 'require-corp',
      // 'X-Custom-Header': 'MyValue',
    },
    proxy: {
      '/ui': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
      },
      '^(\/[^/]+\/api\/).*': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  build: {
    sourcemap: true,
    lib: {
      entry: 'entry.js',
      formats: ['es'],
      fileName: 'bundle',
    },
    assetsInlineLimit: Number.POSITIVE_INFINITY,
    manifest: true,
    rollupOptions: {
      output: {
        // disable code splitting even with dynamic imports
        manualChunks: () => 'bundle.js',
      },
    },
  },
});
