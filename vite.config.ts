import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Visualizer optional: sadece kuruluysa ve ANALYZE=true ise kullan
let visualizer: any;
try {
  visualizer = require('rollup-plugin-visualizer').visualizer;
} catch {
  // ignore, visualizer not installed
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: process.env.NODE_ENV === 'production' 
          ? [['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]]
          : [],
      },
    }),
    process.env.ANALYZE === 'true' && visualizer ? visualizer({
      filename: 'dist/bundle-stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) : undefined,
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
    },
  },

  root: path.resolve(__dirname, 'client'),

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    cssMinify: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-dom/client'],
          'vendor-animation': ['framer-motion', 'lucide-react'],
          'vendor-router': ['wouter', '@tanstack/react-query'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          'vendor-forms': ['react-hook-form', 'zod', '@hookform/resolvers'],
        },
        experimentalMinChunkSize: 20000,
      },
    },
    reportCompressedSize: true,
  },

  server: {
    host: true,
    hmr: {
      overlay: true,
    },
  },

  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  cacheDir: '.vite-cache',
});