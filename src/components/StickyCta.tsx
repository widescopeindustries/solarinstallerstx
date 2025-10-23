import React from "react";

export const StickyCta = () => (
  <div className="md:hidden fixed bottom-4 right-4 z-50 drop-shadow-lg">
    <a
      href="/contact"
      className="bg-primary text-primary-foreground font-semibold py-3 px-5 rounded-full animate-bounce focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Get free solar quotes"
    >
      Get Free Quotes
    </a>
  </div>
);
