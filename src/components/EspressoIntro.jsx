import React from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaBolt, FaDatabase, FaNetworkWired, FaChevronDown } from 'react-icons/fa';
import './styles/espressoIntro.css';

const EspressoIntro = () => {
  return (
    <section id="espresso-intro" className="espresso-intro">
      <motion.div 
        className="intro-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="intro-header"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="intro-icon">
            <FaCoffee size={32} aria-hidden="true" />
          </div>
          <h2>The Espresso Ecosystem</h2>
        </motion.div>

        <motion.div 
          className="intro-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            The Espresso Network has been designed with modularity in mind, offering several benefits for chain operators and developers:
          </p>
          
          <div className="intro-features">
            <motion.div 
              className="intro-feature"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="feature-icon">
                <FaBolt size={20} aria-hidden="true" />
              </div>
              <div className="feature-content">
                <h3>Fast Confirmations</h3>
                <p>All chains leveraging Espresso benefit from fast, reliable confirmations—replacing the need for preconfirmations from centralized sequencers.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="intro-feature"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="feature-icon">
                <FaDatabase size={20} aria-hidden="true" />
              </div>
              <div className="feature-content">
                <h3>Efficient Data Availability</h3>
                <p>Chains using Espresso benefit from highly efficient data availability, while remaining compatible with other DA solutions like EigenDA, Celestia, or Ethereum itself.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="intro-feature"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <div className="feature-icon">
                <FaNetworkWired size={20} aria-hidden="true" />
              </div>
              <div className="feature-content">
                <h3>Decentralized Sequencing</h3>
                <p>Chains can use Espresso as a decentralized sequencing layer to determine transaction order, or continue using their own sovereign sequencers while benefiting from Espresso's confirmations.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="intro-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>Explore the Espresso developer journey below to discover the projects and tools in our ecosystem.</p>
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaChevronDown size={18} aria-hidden="true" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EspressoIntro;
