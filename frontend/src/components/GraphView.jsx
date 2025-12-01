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
            // ИСПРАВЛЕНО: data(label), а не data(name)
            'label': 'data(label)',
            'font-size': 10,
            'color': '#fff',
            'text-valign': 'bottom',
            'text-halign': 'center',
            'text-outline-color': '#020617',
            'text-outline-width': 2,
            'width': 30,
            'height': 30
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#64748b',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': 8,
            'color': '#94a3b8',
            'text-background-opacity': 1,
            'text-background-color': '#020617'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-color': '#f97316',
            'border-width': 3,
            'background-color': '#fb923c'
          }
        }
      ],
      layout: {
        name: 'preset',
        fit: true,
        padding: 40
      },
      wheelSensitivity: 0.2
    });

    // Преобразуем данные (ID в строки, name -> label)
    const nodes = entities.map((e) => ({
      group: 'nodes',
      data: { 
        id: String(e.id), 
        label: e.label || e.type, // Используем label из БД
        type: e.type 
      },
      position: { 
        x: e.x !== null ? e.x : Math.random() * 500, 
        y: e.y !== null ? e.y : Math.random() * 500 
      }
    }));

    const edges = links.map((l) => ({
      group: 'edges',
      data: {
        id: String(l.id),
        source: String(l.sourceId),
        target: String(l.targetId),
        label: l.type
      }
    }));

    cy.add([...nodes, ...edges]);
    
    // Если узлы новые (без координат), делаем авто-раскладку
    if (nodes.length > 0 && nodes.every(n => n.position.x === 0)) {
        cy.layout({ name: 'circle' }).run();
    }

    cy.on('tap', 'node', (evt) => {
      // Преобразуем ID обратно в число для стора
      setSelectedEntity(parseInt(evt.target.id()));
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        setSelectedEntity(null);
      }
    });

    cy.on('dragfree', 'node', async (evt) => {
      const node = evt.target;
      const id = parseInt(node.id());
      const pos = node.position();
      
      updateEntityPositionLocally(id, pos.x, pos.y);
      try {
        await updateEntityPosition(id, pos.x, pos.y);
      } catch (err) {
        console.error(err);
      }
    });

    cyRef.current = cy;

    return () => {
      if (cyRef.current) cyRef.current.destroy();
    };
  }, [entities, links, setSelectedEntity, updateEntityPositionLocally]);

  return <div className="osint-graph w-full h-full" ref={containerRef} />;
}
