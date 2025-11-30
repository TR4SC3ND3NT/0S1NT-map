import { create } from 'zustand';

export const useEntityStore = create((set) => ({
  entities: [],
  filterType: 'all',
  search: '',
  setEntities: (entities) => set({ entities }),
  setFilterType: (type) => set({ filterType: type }),
  setSearch: (value) => set({ search: value })
}));
