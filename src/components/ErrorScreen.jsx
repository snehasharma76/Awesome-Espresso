import React from 'react';
import CoffeeIcon from './icons/CoffeeIcon';

const ErrorScreen = ({ message, onRetry }) => {
  return (
    <div className="error-screen">
      <div className="error-container">
        <div className="error-icon">
          <CoffeeIcon size={48} className="error-coffee-icon" />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="error-alert-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 className="error-title">Error Loading Roadmap</h2>
        <p className="error-message">{message}</p>
        <button 
          onClick={onRetry}
          className="btn btn-primary"
        >
          Try Again
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <path d="M23 4v6h-6"></path>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;
