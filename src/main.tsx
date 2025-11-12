import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import App from "./App.tsx";
import "./index.css";
import { initPerformanceOptimizations } from "./lib/performance";

// Initialize performance optimizations
initPerformanceOptimizations();

// Register service worker for improved repeat-visit performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Registration failed; ignore silently
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Analytics />
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
