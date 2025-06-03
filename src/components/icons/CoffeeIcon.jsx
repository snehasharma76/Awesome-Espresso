import React from 'react';

const CoffeeIcon = ({ size = 24, color = 'currentColor', className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`coffee-icon ${className}`}
      aria-hidden="true"
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
      {/* Steam */}
      <path 
        d="M7 5.5C7 5.5 8 3.5 10 5.5" 
        className="coffee-steam steam-1" 
        strokeWidth="1.5" 
      />
      <path 
        d="M12 5.5C12 5.5 13 3.5 15 5.5" 
        className="coffee-steam steam-2" 
        strokeWidth="1.5" 
      />
    </svg>
  );
};

export default CoffeeIcon;
