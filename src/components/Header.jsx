import React from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import './styles/header.css';

const Header = ({ title, description }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <motion.header 
      className="header"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="header-content" variants={itemVariants}>
        <motion.div className="header-logo" variants={itemVariants}>
          <div className="header-icon-container">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 3, -3, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaCoffee size={80} className="header-icon" />
            </motion.div>
            <div className="header-icon-glow"></div>
          </div>
          <motion.h1 
            className="header-title"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="header-description"
          variants={itemVariants}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="header-actions"
          variants={itemVariants}
        >
          <motion.a 
            href="https://www.espressosys.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
            <FaArrowRight className="btn-icon" aria-hidden="true" />
          </motion.a>
        </motion.div>
        
        <motion.div 
          className="header-scroll-indicator"
          variants={itemVariants}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="scroll-arrow">
            <FaChevronDown size={18} aria-hidden="true" />
          </div>
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
      
      <div className="header-background">
        <div className="coffee-beans-pattern"></div>
        <div className="gradient-overlay"></div>
      </div>
    </motion.header>
  );
};

export default Header;
