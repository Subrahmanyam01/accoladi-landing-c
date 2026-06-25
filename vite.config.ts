import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 4200,
    },
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ['**/node_modules/**', '**/.angular/**', '**/dist/**'],
    },
    // Disable caching for SSR pre-bundles in development
    cacheDir: '.vite',
  },
  // Prevent dependency pre-bundling during dev to force fresh loads
  optimizeDeps: {
    noDiscovery: true,
    exclude: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/platform-server',
      '@angular/router',
      '@angular/forms',
    ],
  },
});

