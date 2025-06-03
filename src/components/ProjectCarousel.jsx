import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import CoffeeIcon from './icons/CoffeeIcon';
import './styles/projectCarousel.css';

const ProjectCarousel = ({ projects, sectionTitle }) => {
  const [, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="project-carousel-container">
      <div className="carousel-header">
        <h3>{sectionTitle} Projects</h3>
        <div className="carousel-controls">
          <motion.button 
            className="carousel-control" 
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </motion.button>
          <motion.button 
            className="carousel-control" 
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </motion.button>
        </div>
      </div>
      
      <motion.div 
        className="project-carousel"
        ref={carouselRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project) => (
          <motion.div 
            key={project.name}
            className="carousel-item"
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2 }
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
        
        <div className="carousel-end">
          <div className="carousel-end-icon">
            <CoffeeIcon size={24} />
          </div>
          <p>Explore more projects in the Espresso ecosystem</p>
          <motion.button 
            className="carousel-end-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://www.espressosys.com/ecosystem', '_blank')}
          >
            Visit Ecosystem
          </motion.button>
        </div>
      </motion.div>
      
      <div className="carousel-indicator">
        <div className="indicator-line">
          <div className="indicator-dot active"></div>
          <div className="indicator-dot"></div>
          <div className="indicator-dot"></div>
        </div>
        <div className="indicator-text">Scroll to explore</div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
