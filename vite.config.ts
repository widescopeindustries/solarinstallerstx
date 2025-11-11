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
    include: ["react", "react-dom", "react-router-dom", "react/jsx-runtime"],
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
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group core React dependencies first
            if (id.includes('react-dom') || id.includes('react-router') || id.includes('react/jsx-runtime')) {
              return 'react-core';
            }
            if (id.includes('react') && !id.includes('react-')) {
              return 'react-core';
            }
            // Split UI libraries into smaller chunks
            if (id.includes('@radix-ui')) {
              // Split Radix UI by component groups
              if (id.includes('dialog') || id.includes('sheet') || id.includes('drawer')) return 'ui-modal';
              if (id.includes('dropdown') || id.includes('select') || id.includes('popover')) return 'ui-menu';
              return 'ui-radix';
            }
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('@tanstack')) return 'query';
            if (id.includes('react-hook-form') || id.includes('zod')) return 'forms';
            if (id.includes('tailwind') || id.includes('class-variance')) return 'ui-utils';
            if (id.includes('stripe') || id.includes('mapbox')) return 'external-services';
            // Split other large vendor libs
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
          // CSS files per page/component
          if (/\.css$/i.test(name)) {
            // Extract page name if it exists
            const match = name.match(/^(.*?)(-\w+)?\.css$/);
            if (match && match[1].length > 0) {
              return "assets/css/[name]-[hash][extname]";
            }
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js"
      }
    },
    chunkSizeWarningLimit: 800,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.warn"],
        passes: 3,
        unsafe_arrows: true,
        unsafe_methods: true,
        reduce_funcs: true,
        booleans_as_integers: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    }
  }
});
