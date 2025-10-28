import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger()
  ].filter(Boolean),
  optimizeDeps: {
    include: ['react-map-gl', 'mapbox-gl'],
    esbuildOptions: {
      mainFields: ['module', 'main']
    }
  },
  build: {
    // Optimize for Core Web Vitals
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core bundle (critical)
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/') ||
              id.includes('/react/jsx-runtime') ||
              id.includes('node_modules/react-is')) {
            return 'react-core';
          }
          // Router bundle (critical)
          if (id.includes('node_modules/react-router') ||
              id.includes('node_modules/@remix-run')) {
            return 'router';
          }
          // UI Components bundle (critical)
          if (id.includes('@/components/ui/') ||
              id.includes('@radix-ui/react-') ||
              id.includes('class-variance-authority') ||
              id.includes('tailwind-merge')) {
            return 'ui-components';
          }
          // Maps bundle (lazy loaded)
          if (id.includes('mapbox-gl') || 
              id.includes('@/components/Map') ||
              id.includes('@/components/ServiceAreaMap') || 
              id.includes('@/components/ServiceAreaMap')) {
            return 'maps';
          }
          // Analytics and monitoring
          if (id.includes('analytics') || 
              id.includes('monitoring') || 
              id.includes('@vercel/analytics')) {
            return 'analytics';
          }
          // Data fetching and state management
          if (id.includes('@tanstack/react-query') || 
              id.includes('@supabase/supabase-js')) {
            return 'data-layer'; ||
            id.includes('@tanstack/react-query') // <-- Keep react-query with react
          ) {
            return undefined; // Keep in main bundle
          }
          
          // Chunk large vendor libraries separately and load async
          if (id.includes('mapbox-gl')) {
            return 'mapbox-gl';
          }
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          if (id.includes('@supabase')) {
            return 'supabase';
          }
          if (id.includes('recharts')) {
            return 'charts';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          return undefined;
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? '';
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Optimize chunk sizes for faster loading
    chunkSizeWarningLimit: 1000,
    // Enable compression and optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Target modern browsers for better optimization
    target: 'esnext',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Force single React instance
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'],
    force: true,
  },
}));
