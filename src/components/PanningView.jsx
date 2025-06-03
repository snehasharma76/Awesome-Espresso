import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './styles/panningView.css';

// Simple Coffee Icon component
const CoffeeIcon = ({ size = 20 }) => (
  <motion.span className="coffee-icon" style={{ fontSize: `${size}px` }}>☕</motion.span>
);

const PanningView = ({ isOpen, onClose, projects, featureTitle, featureDescription }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [storyStep, setStoryStep] = useState(0);

  useEffect(() => {
    if (projects && projects.length > 0 && isOpen) {
      setActiveProject(projects[0]);
      setStoryStep(0);
    }
  }, [isOpen, projects]);
  
  // Disable body scrolling and hide StickyNav when panning view is open
  useEffect(() => {
    if (isOpen) {
      // Save the current overflow style
      const originalOverflow = document.body.style.overflow;
      // Disable scrolling on the body
      document.body.style.overflow = 'hidden';
      
      // Hide StickyNav component
      const stickyNav = document.querySelector('nav.fixed');
      if (stickyNav) {
        stickyNav.style.display = 'none';
      }
      
      // Re-enable scrolling and show StickyNav when component unmounts or closes
      return () => {
        document.body.style.overflow = originalOverflow;
        if (stickyNav) {
          stickyNav.style.display = '';
        }
      };
    }
  }, [isOpen]);

  // Use motion for smooth animations in project cards
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Developer story narrative for each feature
  const getStoryNarrative = (title, step) => {
    const narratives = {
      "What is Espresso?": [
        "Imagine you're building the next generation of blockchain applications. You need infrastructure that's fast, reliable, and flexible. That's where Espresso comes in.",
        "Espresso isn't just another rollup solution. It's a modular infrastructure layer that lets you pick and choose the components that best fit your needs.",
        "With Espresso's HotShot consensus, you get ~10 second finality - that's orders of magnitude faster than traditional solutions. And the best part? You can integrate it with your existing stack."
      ],
      "The Confirmation Layer": [
        "As a developer, you know the pain of waiting for transaction confirmations. With centralized sequencers, you're at the mercy of their pre-confirmations.",
        "Espresso's confirmation layer changes the game. It provides Byzantine Fault Tolerant (BFT) finality in seconds, not minutes. This means your transactions can never be rolled back as long as less than one-third of the HotShot stake is compromised.",
        "This is revolutionary for bridges, which are particularly sensitive to reorgs in the source chain. With Espresso, you can build cross-chain applications with confidence."
      ],
      "Flexible Data Availability": [
        "Data availability is crucial for rollups, but it shouldn't lock you into a single solution. Espresso respects your choices.",
        "Whether you're using EigenDA, Celestia, Avail, or Ethereum itself, Espresso works alongside your chosen DA layer. You don't have to change your architecture to benefit from Espresso.",
        "This flexibility means you can optimize for your specific use case, mixing and matching components to create the perfect stack for your application."
      ],
      "Decentralized Sequencing": [
        "Centralized sequencers are a single point of failure. They can censor transactions, go offline, or act maliciously. Espresso offers a better way.",
        "With Espresso's decentralized sequencing, you get the benefits of decentralization without sacrificing performance. The network determines transaction order through consensus, eliminating the risks of centralized control.",
        "And if you prefer to use your own sovereign sequencer? No problem. You can still benefit from Espresso's confirmations while maintaining control over your sequencing."
      ],
      "Caffeinated Chains": [
        "A 'caffeinated chain' represents the full Espresso experience - confirmation, sequencing, and data availability working together in harmony.",
        "These chains benefit from maximum decentralization, security, and performance, all while still being able to settle to Ethereum or another L1 of your choice.",
        "It's the most comprehensive integration with the Espresso ecosystem, offering a complete solution for developers who want the best of all worlds."
      ],
      "Composability Unchained": [
        "In a multi-chain world, efficiency is key. Espresso's multi-chain blocks organize transactions by namespace, allowing chains to prove they've executed all relevant transactions without searching through entire blocks.",
        "Each block has a unique commitment that depends on the transactions and metadata. This makes it possible to create lightweight proofs that convince verifiers a namespace contains a specific list of transactions.",
        "For your applications, this means rollup nodes can download just the data they care about (plus a short proof) from an untrusted server and verify it efficiently - perfect for cross-chain operations."
      ],
      "Utilities & Extras": [
        "Espresso's infrastructure opens up exciting possibilities for developers to build essential utility services that enhance the blockchain ecosystem.",
        "Take the Espresso Name Service (.esp) for example - it provides human-readable addresses for users, making blockchain interactions more accessible and user-friendly. This is just one example of how developers can leverage Espresso to create services that solve real user problems.",
        "Beyond name services, developers are building analytics dashboards for real-time chain insights, identity solutions for simplified authentication, and cross-chain messaging services. These utility projects extend Espresso's reach across UX, identity, and analytics, creating a more complete and user-friendly ecosystem."
      ]
    };
    
    const storyArray = narratives[title] || [
      "Explore how this feature works in the Espresso ecosystem.",
      "See how it can benefit your development workflow.",
      "Check out projects that showcase this technology in action."
    ];
    
    return storyArray[step % storyArray.length];
  };
  
  // Technical details for each feature based on espresso.md content
  const getTechnicalDetails = (title) => {
    const details = {
      "What is Espresso?": "The Espresso Network has been designed with modularity in mind. We have seen that developers are best able to innovate when they have flexibility around designing their stack. Espresso offers several benefits for chain operators and their developers to choose from: fast confirmations, efficient data availability, and decentralized sequencing. These components can be used together or separately, giving you maximum flexibility.",
      
      "The Confirmation Layer": "Centralized sequencers may give rollup users a pre-confirmation that their transaction will eventually be included in the finalized rollup state. These pre-confirmations can be trusted via a combination of reputation, security bonds, and/or fraud proofs. With Espresso's HotShot consensus, clients can opt for stronger confirmations in just seconds. As long as no adversary controls more than one third of the HotShot stake, the client's transaction can never be rolled back.",
      
      "Flexible Data Availability": "All chains using Espresso benefit from highly efficient data availability offered by the Espresso Network. However, many chains also choose to leverage another form of DA, such as EigenDA, Celestia, Avail, or Ethereum itself. We've designed Espresso to respect and be additively compatible with these choices. This means you can use Espresso's DA layer alongside your existing DA solution, or you can use Espresso solely for confirmations while keeping your current DA setup unchanged.",
      
      "Decentralized Sequencing": "Chains integrating Espresso may use it as a decentralized sequencing layer, leveraging the network to determine the order of transactions. However, this is not required: chains that use their own sovereign sequencers can still benefit from Espresso's confirmations. A rollup that wants to decentralize its sequencing without using the L1 proposer may use the Espresso leader as its sequencer for any given round and use Espresso for confirmations – while using its own choice of data availability.",
      
      "Caffeinated Chains": "A 'caffeinated chain' is a rollup that uses Espresso for data availability, sequencing, and confirmations. This provides the most comprehensive integration with the Espresso ecosystem, offering maximum decentralization, security, and performance benefits. Caffeinated chains benefit from fast confirmations, decentralized sequencing, and efficient data availability all in one package, while still being able to settle to Ethereum or another L1 of choice.",
      
      "Composability Unchained": "When a sequencer wins the right to sequence for multiple chains simultaneously, Espresso organizes transactions by namespace within blocks. This allows chains to efficiently prove they've executed all relevant transactions without searching through entire blocks. Each block has a short, unique commitment that depends on the transactions and metadata. It's possible to create proofs relative to this commitment which convince a verifier that a given namespace contains a certain list of transactions.",

      "Utilities & Extras": "The Utilities & Extras section showcases smaller projects built by developers using Espresso's infrastructure to extend functionality across various domains. The Espresso Name Service (.esp) provides human-readable rollup-native usernames, making blockchain interactions more accessible to everyday users. Analytics projects offer real-time insights into chain activity and performance metrics. Identity solutions simplify user authentication while maintaining privacy and security. Cross-chain messaging services facilitate communication between different blockchains. These utility projects demonstrate how Espresso's modular design enables developers to create specialized services that enhance the overall ecosystem, improving user experience and solving specific pain points without requiring changes to the core protocol."
    };
    
    return details[title] || featureDescription || "Explore how this feature works in the Espresso ecosystem and see related projects.";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="panning-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className="panning-back-button" onClick={onClose} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Roadmap</span>
          </motion.div>
          
          <motion.div 
            className="panning-content"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="panning-header">
              <div className="panning-title">
                <CoffeeIcon size={24} />
                <h2>{featureTitle}</h2>
              </div>
              <button className="panning-close" onClick={onClose} aria-label="Close panel">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <motion.div 
              className="panning-story"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="story-step-indicator">
                <span>Story {storyStep + 1} of 3</span>
                <div className="story-progress-bar">
                  <motion.div 
                    className="story-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${((storyStep + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <motion.div 
                className="story-slide"
                key={storyStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p 
                  className="story-narrative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {getStoryNarrative(featureTitle, storyStep)}
                </motion.p>
                
                <motion.div 
                  className="story-illustration"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {storyStep === 0 && <span className="story-icon">☕</span>}
                  {storyStep === 1 && <span className="story-icon">🚀</span>}
                  {storyStep === 2 && <span className="story-icon">✨</span>}
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="story-navigation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button 
                  className="story-nav-button prev"
                  onClick={() => setStoryStep((prev) => (prev > 0 ? prev - 1 : 2))}
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={storyStep === 0}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span>Previous</span>
                </motion.button>
                
                <div className="story-dots">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <motion.button 
                      key={idx} 
                      className={idx === storyStep ? 'story-dot active' : 'story-dot'}
                      onClick={() => setStoryStep(idx)}
                      aria-label={`Story step ${idx + 1}`}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
                
                <motion.button 
                  className="story-nav-button next"
                  onClick={() => setStoryStep((prev) => (prev < 2 ? prev + 1 : 0))}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={storyStep === 2}
                >
                  <span>Next</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="panning-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Technical Details</h3>
              <p>{getTechnicalDetails(featureTitle)}</p>
            </motion.div>
            
            <motion.div 
              className="panning-projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3>Project Showcase: {featureTitle} in Action</h3>
              <div className="projects-grid">
                {projects && projects.map((project, i) => (
                  <motion.div 
                    className={activeProject?.id === project.id ? 'project-card active' : 'project-card'} 
                    key={project.id} 
                    onClick={() => setActiveProject(project)}
                    variants={cardVariants}
                    custom={i}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      transition: { delay: i * 0.1 } 
                    }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="project-icon">
                      <CoffeeIcon size={20} />
                    </div>
                    <div className="project-info">
                      <h4>{project.name}</h4>
                      <p>{project.description.substring(0, 80)}{project.description.length > 80 ? '...' : ''}</p>
                      {project.highlight && <span className="highlight-badge">Featured</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {activeProject && (
              <motion.div 
                className="project-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3>Developer Spotlight</h3>
                <h4>{activeProject.name}</h4>
                <p>{activeProject.description}</p>
                
                {activeProject.popup && (
                  <div className="project-insight">
                    <h5>Implementation Insight</h5>
                    <p>{activeProject.popup.content}</p>
                  </div>
                )}
                
                <div className="project-links">
                  {activeProject.links && activeProject.links.github && (
                    <a href={activeProject.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      View Code
                    </a>
                  )}
                  {activeProject.links && activeProject.links.submission && (
                    <a href={activeProject.links.submission} target="_blank" rel="noopener noreferrer" className="project-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Submission
                    </a>
                  )}
                </div>
                

              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PanningView;
