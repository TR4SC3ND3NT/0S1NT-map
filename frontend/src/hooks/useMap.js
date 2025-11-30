import { useEffect, useState } from 'react';
import { fetchGraph } from '../services/mapService.js';
import { useMapStore } from '../store/useMapStore.js';

export function useMap() {
  const { entities, links, notes, setGraph, selectedEntityId, setSelectedEntity } = useMapStore();
  const [loading, setLoading] = useState(false);

  async function loadGraph() {
    setLoading(true);
    try {
      const graph = await fetchGraph();
      setGraph(graph.entities, graph.links, graph.notes);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGraph();
  }, []);

  return { entities, links, notes, loading, reload: loadGraph, selectedEntityId, setSelectedEntity };
}
