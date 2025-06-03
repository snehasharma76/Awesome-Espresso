
import useStore from '../store/useStore';
import { getSections } from '../utils/dataLoader';

const FilterBar = () => {
  const { activeFilters, toggleFilter } = useStore();
  const sections = getSections();
  
  // Get all unique tags from sections with projects
  const allTags = [...new Set(
    sections
      .filter(section => section.projects)
      .flatMap(section => section.projects
        .flatMap(project => project.tags || [])
      )
  )];
  
  return (
    <div className="sticky top-0 z-40 w-full bg-background-dark bg-opacity-90 backdrop-blur-md py-4 px-4 md:px-8 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-start gap-2">
          <span className="text-sm font-mono text-gray-400 mr-2">Filter:</span>
          
          {allTags.map(tag => {
            const section = sections.find(s => s.id === tag);
            return (
              <button
                key={tag}
                className={`filter-tag ${activeFilters.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleFilter(tag)}
                aria-pressed={activeFilters.includes(tag)}
              >
                <span className="filter-tag-dot"></span>
                <span className="filter-tag-text">{section ? section.title.toLowerCase() : tag}</span>
              </button>
            );
          })}
        </div>
        {activeFilters.length > 0 && (
          <button 
            className="filter-clear" 
            onClick={() => activeFilters.forEach(tag => toggleFilter(tag))}
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
