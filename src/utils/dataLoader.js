import data from '../../data.json';

/**
 * Utility functions to access and filter data from the JSON configuration
 */
export const getData = () => data;

export const getSections = () => data.sections;

export const getSection = (sectionId) => {
  return data.sections.find(section => section.id === sectionId);
};

export const getAllProjects = () => {
  return data.sections
    .filter(section => section.projects)
    .flatMap(section => section.projects);
};

export const getProjectsByTag = (tag) => {
  return getAllProjects().filter(project => 
    project.tags && project.tags.includes(tag)
  );
};

export const getHighlightedProjects = () => {
  return getAllProjects().filter(project => project.highlight);
};

export default {
  getData,
  getSections,
  getSection,
  getAllProjects,
  getProjectsByTag,
  getHighlightedProjects,
};
