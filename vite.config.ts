import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Custom plugin for preload optimization
function preloadOptimizationPlugin(): Plugin {
  return {
    name: "preload-optimization",
    transformIndexHtml(html) {
      const preloadHints = [
        { href: "/assets/js/react-core-[hash].js", as: "script" },
        { href: "/assets/js/ui-components-[hash].js", as: "script" },
        { href: "/fonts/inter-var.woff2", as: "font", type: "font/woff2", crossorigin: true }
      ];

      const preloadTags = preloadHints
        .map(({ href, as, type, crossorigin }) => 
          `<link rel="preload" href="${href}" as="${as}"${type ? ` type="${type}"` : ""}${crossorigin ? " crossorigin" : ""}>`
        )
        .join("\n");

      return html.replace("</head>", `${preloadTags}\n</head>`);
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    preloadOptimizationPlugin()
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
    rollupOptions: {
      output: {
        manualChunks: {
          "react-core": ["react", "react-dom", "react/jsx-runtime", "scheduler"],
          "router": ["react-router", "react-router-dom", "@remix-run/router"],
          "mapbox": ["mapbox-gl"],
          "react-map": ["react-map-gl/mapbox"],
          "ui": ["@radix-ui/react-dialog", "@radix-ui/react-select", "@radix-ui/react-slot", "class-variance-authority", "tailwind-merge"],
          "data": ["@supabase/supabase-js", "@tanstack/react-query"]
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
