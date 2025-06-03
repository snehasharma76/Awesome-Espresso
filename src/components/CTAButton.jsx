import React from 'react';

const CTAButton = ({ text, link, type = 'primary', icon, className = '' }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-${type} ${className}`}
    >
      <span className="btn-text">{text}</span>
      {icon && (
        <span className="btn-icon">
          {icon}
        </span>
      )}
      {!icon && type === 'primary' && (
        <span className="btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </span>
      )}

    </a>
  );
};

export default CTAButton;
