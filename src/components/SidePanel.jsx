import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import './styles/sidePanel.css';

const SidePanel = ({ isOpen, onClose, projects, featureTitle }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="side-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="side-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="side-panel-header">
              <h3>{featureTitle} Projects</h3>
              <button className="close-button" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="side-panel-content">
              <p className="side-panel-description">
                Explore projects that showcase the {featureTitle.toLowerCase()} capabilities of the Espresso ecosystem.
              </p>
              
              <div className="side-panel-projects">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <motion.div 
                      key={project.name}
                      className="side-panel-project"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))
                ) : (
                  <div className="no-projects">
                    <p>No projects available for this feature yet.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
