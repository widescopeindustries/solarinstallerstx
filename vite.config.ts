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
    assetsInlineLimit: 4096, // Inline small assets as base64
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group core React dependencies first
            if (id.includes('react-dom') || id.includes('react-router') || id.includes('react/jsx-runtime')) {
              return 'react-core';
            }
            if (id.includes('react')) {
              return 'react-core';
            }
            // Then group other vendor libraries
            if (id.includes('@radix-ui')) return 'ui-radix';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('@supabase') || id.includes('@tanstack')) return 'data';
            if (id.includes('tailwind') || id.includes('class-variance')) return 'ui-utils';
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
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
        passes: 3,
        ecma: 2020,
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        unsafe_methods: true
      },
      mangle: {
        safari10: true,
        toplevel: true
      },
      format: {
        comments: false
      }
    }
  }
});
