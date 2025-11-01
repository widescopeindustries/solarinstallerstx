import React from "react";
import { Link } from "react-router-dom";

export const StickyCta = () => (
  <div className="md:hidden fixed bottom-4 right-4 z-50 drop-shadow-2xl">
    <Link
      to="/quote"
      className="bg-primary text-primary-foreground font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center gap-2"
      aria-label="Get My Free Quote"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      </svg>
      Get My Free Quote
    </Link>
  </div>
);
