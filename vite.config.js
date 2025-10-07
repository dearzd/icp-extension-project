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
  server: {
    cors: true,
    open: '/ui',
    proxy: {
      '^((\/ui)|(\/[^/]+\/api\/)).*': {
        target: 'https://192.168.1.101:8080/',
        changeOrigin: true,
        secure: false,
        headers: {
          'x-ui-url': 'your proxy url',
        },
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
