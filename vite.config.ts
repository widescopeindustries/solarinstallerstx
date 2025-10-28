import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    dedupe: ["react", "react-dom", "react-router-dom", "react/jsx-runtime"]
  },
  optimizeDeps: {
    include: ["react-map-gl/mapbox", "mapbox-gl", "react", "react-dom", "react-router-dom", "react/jsx-runtime"],
    esbuildOptions: {
      mainFields: ["module", "main"]
    },
    force: true
  },
  build: {
    sourcemap: false,
    target: "esnext",
    modulePreload: {
      polyfill: true
    },
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core libraries
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/scheduler/')) {
            return 'react-core';
          }
          // Router
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run/router')) {
            return 'router';
          }
          // Map libraries
          if (id.includes('node_modules/mapbox-gl')) {
            return 'mapbox';
          }
          if (id.includes('node_modules/react-map-gl')) {
            return 'react-map';
          }
          // UI components (Radix)
          if (id.includes('node_modules/@radix-ui')) {
            return 'ui-radix';
          }
          // Utilities
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          if (id.includes('node_modules/class-variance-authority') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge')) {
            return 'ui-utils';
          }
          // Data/API
          if (id.includes('node_modules/@supabase') || 
              id.includes('node_modules/@tanstack/react-query')) {
            return 'data';
          }
          // Everything else stays in vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? "";
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js"
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    }
  }
});
