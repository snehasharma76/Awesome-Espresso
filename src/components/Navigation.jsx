import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaLayerGroup, FaTools, FaRocket, FaCoffee } from 'react-icons/fa';
import useStore from '../store/useStore';

const Navigation = ({ sections }) => {
  const { activeSection, setActiveSection } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Map section IDs to icons
  const sectionIcons = {
    'sasa': <motion.div whileHover={{ rotate: 15 }}><FaCoffee /></motion.div>,
    'features': <motion.div whileHover={{ rotate: 15 }}><FaCode /></motion.div>,
    'roadmap': <motion.div whileHover={{ rotate: 15 }}><FaLayerGroup /></motion.div>,
    'utilities': <motion.div whileHover={{ rotate: 15 }}><FaTools /></motion.div>,
    'getStarted': <motion.div whileHover={{ rotate: 15 }}><FaRocket /></motion.div>
  };

  // Function to handle scroll and update active section using useCallback
  const handleScroll = useCallback(() => {
    // Update scroll state for styling
    setIsScrolled(window.scrollY > 50);
    
    const scrollPosition = window.scrollY + 100; // Offset to trigger slightly before reaching section
    
    // Find the section that is currently in view
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          if (activeSection !== section.id) {
            setActiveSection(section.id);
          }
        }
      }
    });
  }, [sections, activeSection, setActiveSection]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav 
      className={`roadmap-nav ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div 
        className="nav-logo"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <span className="logo-text">Espresso Dev Tour</span>
      </motion.div>
      
      <motion.div 
        className="roadmap-nav-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {sections.map((section) => (
          <motion.button
            key={section.id}
            className={`roadmap-nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
            aria-current={activeSection === section.id ? 'step' : undefined}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className="nav-item-content">
              <span className="nav-icon">{sectionIcons[section.id]}</span>
              <span className="roadmap-nav-text">{section.title}</span>
            </div>
            <AnimatePresence>
              {activeSection === section.id && (
                <motion.span 
                  className="active-indicator" 
                  layoutId="navIndicator"
                  initial={{ opacity: 0, width: '0%' }}
                  animate={{ opacity: 1, width: '100%' }}
                  exit={{ opacity: 0, width: '0%' }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
