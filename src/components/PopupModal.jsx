import React, { useEffect, useRef } from 'react';
import useStore from '../store/useStore';
import CoffeeIcon from './icons/CoffeeIcon';

const PopupModal = () => {
  const { isModalOpen, modalContent, closeModal } = useStore();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!modalContent) return null;

  return (
    isModalOpen && (
      <div className="modal-overlay">
        <div className="modal" ref={modalRef}>
          <div className="modal-header">
            <div className="modal-icon">
              <CoffeeIcon size={24} color="var(--color-accent-primary)" />
            </div>
            <h2 className="modal-title">{modalContent.title}</h2>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="modal-content">
            <p className="modal-description">{modalContent.content}</p>
            
            {modalContent.image && (
              <div className="modal-image">
                <img src={modalContent.image} alt={modalContent.title} loading="lazy" />
              </div>
            )}
            
            {modalContent.codeExample && (
              <div className="modal-code">
                <div className="modal-code-header">
                  <span>Example</span>
                </div>
                <pre>
                  <code>{modalContent.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={closeModal}>
              Got it
            </button>
            
            {modalContent.link && (
              <a 
                href={modalContent.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default PopupModal;
