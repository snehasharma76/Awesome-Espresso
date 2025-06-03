import { create } from 'zustand';

// Create the store with initial state and actions
const useStore = create((set) => ({
  // Current active section
  activeSection: 'intro',
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
  
  // Filter state
  activeFilters: [],
  setActiveFilters: (filters) => set({ activeFilters: filters }),
  toggleFilter: (filter) => set((state) => ({
    activeFilters: state.activeFilters.includes(filter)
      ? state.activeFilters.filter(f => f !== filter)
      : [...state.activeFilters, filter]
  })),
  
  // Modal state
  modalContent: null,
  isModalOpen: false,
  openModal: (content) => set({ modalContent: content, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // Data state - moving from App.jsx to centralize state
  data: null,
  loading: true,
  error: null,
  setData: (data) => set({ data, loading: false }),
  setError: (error) => set({ error, loading: false }),
}));

export default useStore;
