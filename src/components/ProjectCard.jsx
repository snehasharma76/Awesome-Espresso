import React from 'react';
import useStore from '../store/useStore';
import CoffeeIcon from './icons/CoffeeIcon';

const ProjectCard = ({ project }) => {
  const { openModal } = useStore();

  const handleOpenPopup = () => {
    if (project.popup) {
      openModal(project.popup);
    }
  };

  return (
    <div className={`card ${project.highlight ? 'card-highlight' : ''}`}>
      <div className="card-header">
        <div className="card-icon">
          <CoffeeIcon size={20} color="var(--color-accent-primary)" />
        </div>
        <h3 className="card-title">{project.name}</h3>
      </div>
      
      <div className="card-content">
        <p>{project.description}</p>
        
        {project.tags && project.tags.length > 0 && (
          <div className="card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div className="card-links">
          {project.links?.github && (
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-icon btn-outline"
              aria-label="GitHub Repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          )}
          
          {project.links?.notion && (
            <a 
              href={project.links.notion} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-icon btn-outline"
              aria-label="Notion Documentation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <path d="M2 10h20"></path>
              </svg>
            </a>
          )}
        </div>
        
        {project.popup && (
          <button 
            onClick={handleOpenPopup} 
            className="btn btn-outline"
            aria-label="Learn more about this project"
          >
            Learn More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
