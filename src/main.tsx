import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import App from "./App.tsx";
import "./index.css";
import { initPerformanceOptimizations } from "./lib/performance";

// Initialize performance optimizations
initPerformanceOptimizations();

// Initialize Google Tag Manager (GTM)
// GTM noscript fallback is in index.html
if (window.location.hostname !== 'localhost') {
  const scriptId = 'gtm-script';
  if (!document.getElementById(scriptId)) {
    const gtmScript = document.createElement('script');
    gtmScript.id = scriptId;
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX'; // Replace with actual GTM ID
    document.head.appendChild(gtmScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'GTM-XXXXXXX'); // Replace with actual GTM ID
  }
}

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
