import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import PanningView from './PanningView';
import { FaCoffee, FaCheck, FaDatabase, FaSyncAlt, FaBolt, FaLink, FaArrowRight, FaTools, FaBook, FaChevronDown } from 'react-icons/fa';
import './styles/roadmapSection.css';

const RoadmapSection = ({ section, index, nextSection }) => {
  const [panningViewOpen, setPanningViewOpen] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const { setActiveSection } = useStore();

  useEffect(() => {
    if (inView) {
      setActiveSection(section.id);
    }
  }, [inView, section.id, setActiveSection]);

  const projects = section.projects || [];

  const togglePanningView = () => {
    setPanningViewOpen(!panningViewOpen);
  };

  // Animation variants for the section content
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  // Define animation variants for individual items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Function to get the icon for a section ID
  const getSectionIcon = (sectionId) => {
    switch(sectionId) {
      case 'intro': return <FaCoffee />;
      case 'confirmations': return <FaCheck />;
      case 'da': return <FaDatabase />;
      case 'sequencing': return <FaSyncAlt />;
      case 'fullstack': return <FaBolt />;
      case 'interop': return <FaLink />;
      case 'utilities': return <FaTools />;
      case 'docs': return <FaBook />;
      default: return <FaCoffee />;
    }
  };
  
  // Function to scroll to the next section
  const scrollToNextSection = () => {
    if (nextSection) {
      document.getElementById(nextSection.id).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`roadmap-section ${inView ? 'active' : ''} ${index % 2 === 0 ? 'even' : 'odd'}`} id={section.id} ref={ref}>
      <motion.div 
        className="section-content"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <motion.div className="section-header" variants={sectionVariants}>
          <div className="section-icon">
            <span className="feature-icon">
              {getSectionIcon(section.id)}
            </span>
          </div>
          <h2>{section.title}</h2>
        </motion.div>
        
        <motion.p className="section-summary" variants={sectionVariants}>
          {section.summary}
        </motion.p>
        
        {section.description && (
          <motion.div className="section-description" variants={sectionVariants}>
            <p>{section.description}</p>
          </motion.div>
        )}
        
        {section.features && section.features.length > 0 && (
          <motion.div className="section-features" variants={sectionVariants}>
            <h3>Key Features</h3>
            <ul>
              {section.features.map((feature, i) => (
                <motion.li 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: i * 0.1 }
                    }
                  }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {projects.length > 0 && (
          <motion.button 
            className="feature-action-btn" 
            onClick={togglePanningView}
            variants={sectionVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See the Feature in Action
            <FaArrowRight className="btn-icon" aria-hidden="true" />
          </motion.button>
        )}
        
        {section.popup && (
          <motion.div 
            className="roadmap-info-box"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="roadmap-info-icon">
              <FaTools className="info-icon" />
            </div>
            <div>
              <h3>{section.popup.title || "Developer Toolkit"}</h3>
              <p>{section.popup.content || "Unlock the full potential of Espresso with our specialized toolkit. From debugging utilities and performance analyzers to testing frameworks and deployment scripts, these carefully crafted tools streamline your workflow and solve common development challenges. Build, test, and deploy with confidence while focusing on what matters most—creating exceptional blockchain applications."}</p>
            </div>
          </motion.div>
        )}
        
        {section.cta && (
          <motion.div 
            className="roadmap-cta"
            variants={itemVariants}
          >
            <a href={section.cta.link && section.cta.link.startsWith('http') ? section.cta.link : "https://docs.espressosys.com"} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {section.cta.buttonText || "Get Started"} <FaArrowRight className="btn-icon" />
            </a>
          </motion.div>
        )}
      </motion.div>

      {/* Add PanningView component */}
      {panningViewOpen && (
        <PanningView 
          isOpen={panningViewOpen} 
          onClose={togglePanningView} 
          projects={projects} 
          featureTitle={section.title}
          featureDescription={section.description}
        />
      )}

      {/* Next section preview removed */}
    </section>
  );
};

export default RoadmapSection;
