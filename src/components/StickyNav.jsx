import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaCoffee, FaCode, FaLayerGroup, FaTools, FaRocket } from 'react-icons/fa';
import useStore from '../store/useStore';
import { getSections } from '../utils/dataLoader';
import './styles/stickyNav.css';

const StickyNav = () => {
  const { activeSection, setActiveSection } = useStore();
  const sections = getSections();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Map section IDs to icons
  const sectionIcons = {
    'intro': <FaCoffee />,
    'features': <FaCode />,
    'roadmap': <FaLayerGroup />,
    'utilities': <FaTools />,
    'getStarted': <FaRocket />
  };
  
  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Collapse nav on scroll down
      if (window.scrollY > 100) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
      
      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(item => item.element);
      
      if (sectionElements.length) {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const { id, element } = sectionElements[i];
          if (element.offsetTop <= scrollPosition) {
            if (activeSection !== id) {
              setActiveSection(id);
            }
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection, setActiveSection]);
  
  // Scroll to section when nav item is clicked
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };
  
  return (
    <motion.nav 
      className="sticky-nav"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ left: isCollapsed ? '1rem' : '2rem' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="sticky-nav-container"
        animate={{
          width: isHovered ? '160px' : '60px',
          padding: isHovered ? '1.5rem' : '1.5rem 0.75rem'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="sticky-nav-indicator">
          <div className="nav-progress-line"></div>
          <motion.div 
            className="nav-coffee-bean"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
          >
            <FaCoffee />
          </motion.div>
        </div>
        
        <div className="sticky-nav-dots">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              className={`sticky-nav-dot ${activeSection === section.id ? 'active' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(section.id)}
              aria-label={section.title}
              title={section.title}
              initial={false}
              animate={{
                backgroundColor: activeSection === section.id ? '#b87333' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: activeSection === section.id ? '0 0 8px rgba(184, 115, 51, 0.5)' : 'none'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="nav-icon"
                animate={{ 
                  opacity: isHovered ? 1 : (activeSection === section.id ? 1 : 0.7),
                  scale: activeSection === section.id ? 1.1 : 1
                }}
              >
                {sectionIcons[section.id] || <FaCoffee />}
              </motion.div>
              
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    className="dot-label"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.title}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Mobile bottom navigation */}
      <motion.div 
        className="mobile-nav"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {sections.map((section) => (
          <motion.button
            key={section.id}
            className={`mobile-nav-item ${activeSection === section.id ? 'active' : ''}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(section.id)}
          >
            <div className="mobile-nav-icon">
              {sectionIcons[section.id] || <FaCoffee />}
            </div>
            <span className="mobile-nav-title">{section.title.split(' ')[0]}</span>
            {activeSection === section.id && (
              <motion.div 
                className="mobile-nav-indicator" 
                layoutId="mobileNavIndicator"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default StickyNav;
