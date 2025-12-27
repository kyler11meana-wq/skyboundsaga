
import React from 'react';

export const DiamondIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 3h12l4 6-10 13L2 9z" stroke="black" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11 3 8 9l4 13 4-13-3-6" stroke="black" strokeWidth="1" />
    </svg>
);

export const CoinIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="12" fontWeight="900" stroke="black" strokeWidth="1" fill="currentColor">$</text>
    </svg>
);
