import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { updateEntityPosition } from '../services/entityService.js';
import { useMapStore } from '../store/useMapStore.js';

export default function GraphView({ entities, links }) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const setSelectedEntity = useMapStore((s) => s.setSelectedEntity);
  const updateEntityPositionLocally = useMapStore((s) => s.updateEntityPositionLocally);

  useEffect(() => {
    if (!containerRef.current) return;
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    const cy = cytoscape({
      container: containerRef.current,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#22d3ee',
            label: 'data(label)',
            'font-size': 8,
            color: '#e5e7eb',
            'text-outline-color': '#020617',
            'text-outline-width': 2,
            'border-width': 2,
            'border-color': '#0f172a'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 1.5,
            'line-color': '#64748b',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-color': '#f97316',
            'border-width': 3
          }
        }
      ],
      layout: {
        name: 'preset',
        fit: true,
        padding: 40
      },
      wheelSensitivity: 0.25
    });

    const nodes = entities.map((e) => ({
      group: 'nodes',
      data: { id: e.id, label: e.name, type: e.type },
      position: { x: e.x || 0, y: e.y || 0 }
    }));

    const edges = links.map((l) => ({
      group: 'edges',
      data: {
        id: l.id,
        source: l.sourceId,
        target: l.targetId,
        label: l.type
      }
    }));

    cy.add([...nodes, ...edges]);

    cy.on('select', 'node', (evt) => {
      setSelectedEntity(evt.target.id());
    });

    cy.on('unselect', 'node', () => {
      setSelectedEntity(null);
    });

    cy.on('dragfree', 'node', async (evt) => {
      const node = evt.target;
      const id = node.id();
      const pos = node.position();
      updateEntityPositionLocally(id, pos.x, pos.y);
      try {
        await updateEntityPosition(id, pos.x, pos.y);
      } catch {}
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [entities, links, setSelectedEntity, updateEntityPositionLocally]);

  return <div className="osint-graph glass-panel w-full h-full" ref={containerRef} />;
}
