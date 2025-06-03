import React, { useState, useEffect, useMemo } from 'react';
import './styles/loadingScreen.css';

const LoadingScreen = ({ message = "Brewing roadmap..." }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message);
  
  // Messages to cycle through - wrapped in useMemo to avoid recreating on each render
  const messages = useMemo(() => [
    "Brewing roadmap...",
    "Grinding coffee beans...",
    "Heating water...",
    "Extracting flavor...",
    "Almost ready..."
  ], []);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 700);
    
    return () => clearInterval(interval);
  }, []);
  
  // Change message based on progress
  useEffect(() => {
    const messageIndex = Math.min(
      Math.floor(progress / (100 / messages.length)),
      messages.length - 1
    );
    setCurrentMessage(messages[messageIndex]);
  }, [progress, messages]);

  return (
    <div className="loading-screen">
      <div className="coffee-loading">
        <div className="coffee-cup-container">
          <div className="coffee-cup">
            <div 
              className="coffee-liquid"
              style={{ height: `${Math.max(5, progress * 0.7)}%` }}
            ></div>
            <div className="coffee-steam" style={{ opacity: progress > 50 ? 1 : 0 }}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
        <div className="loading-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <p className="loading-message">
          {currentMessage}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
