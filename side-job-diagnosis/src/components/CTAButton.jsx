import React from "react";

const CTAButton = ({ children, onClick, className = "" }) => (
  <button
    className={`bg-[#D4AF37] text-white font-bold py-3 px-8 rounded-full shadow-lg animate-pulse hover:brightness-125 transition-all duration-300 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default CTAButton; 