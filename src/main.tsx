import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import App from "./App.tsx";
import "./index.css";
import { initPerformanceOptimizations } from "./lib/performance";

// Initialize performance optimizations
initPerformanceOptimizations();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Analytics />
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
