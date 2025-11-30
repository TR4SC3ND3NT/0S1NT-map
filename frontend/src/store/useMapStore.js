import { create } from 'zustand';

export const useMapStore = create((set) => ({
  entities: [],
  links: [],
  notes: [],
  selectedEntityId: null,
  setGraph: (entities, links, notes) => set({ entities, links, notes }),
  setSelectedEntity: (id) => set({ selectedEntityId: id }),
  updateEntityPositionLocally: (id, x, y) =>
    set((state) => ({
      entities: state.entities.map((e) => (e.id === id ? { ...e, x, y } : e))
    }))
}));
