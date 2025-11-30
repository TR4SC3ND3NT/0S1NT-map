import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import GraphView from '../components/GraphView.jsx';
import EntityCard from '../components/EntityCard.jsx';
import EntityForm from '../components/EntityForm.jsx';
import NoteForm from '../components/NoteForm.jsx';
import { useMap } from '../hooks/useMap.js';
import { useEntityStore } from '../store/useEntityStore.js';
import { useMapStore } from '../store/useMapStore.js';
import { fetchNotes } from '../services/noteService.js';

export default function MapPage() {
  const { entities, links, loading, reload } = useMap();
  const { filterType, search, setEntities } = useEntityStore();
  const { selectedEntityId } = useMapStore();
  const [entityModalOpen, setEntityModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const selectedEntity = entities.find((e) => e.id === selectedEntityId) || null;

  const filtered = entities.filter((e) => {
    if (filterType !== 'all' && e.type !== filterType) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function openNotes() {
    if (!selectedEntity) return;
    const list = await fetchNotes(selectedEntity.id);
    setNotes(list);
  }

  return (
    <div className="min-h-screen px-4 py-3 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto h-[calc(100vh-24px)] flex flex-col">
        <Navbar />
        <div className="grid grid-cols-[260px_minmax(0,1fr)_260px] gap-4 flex-1 min-h-0">
          <Sidebar />
          <div className="glass-panel relative">
            {loading ? (
              <div className="flex items-center justify-center h-full text-sm text-slate-300">
                Loading graph...
              </div>
            ) : (
              <GraphView entities={entities} links={links} />
            )}
          </div>
          <aside className="glass-panel h-full flex flex-col p-4 gap-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-200 font-semibold text-xs">Entities</h3>
              <button
                onClick={() => setEntityModalOpen(true)}
                className="rounded-lg bg-accent text-slate-900 px-2 py-1 text-[11px] font-semibold"
              >
                + New
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto pr-1">
              {filtered.map((e) => (
                <EntityCard key={e.id} entity={e} selected={e.id === selectedEntityId} />
              ))}
              {filtered.length === 0 && (
                <p className="text-slate-500 text-[11px]">No entities match filters.</p>
              )}
            </div>
            <div className="mt-3 border-t border-slate-800 pt-3 flex-1 flex flex-col">
              <h3 className="text-slate-200 font-semibold text-xs mb-1">Details</h3>
              {selectedEntity ? (
                <div className="space-y-2 text-[11px]">
                  <p className="font-semibold text-slate-100">{selectedEntity.name}</p>
                  <p className="text-slate-400">
                    {selectedEntity.description || 'No description'}
                  </p>
                  <button
                    onClick={openNotes}
                    className="mt-2 text-accent hover:underline"
                  >
                    Load notes
                  </button>
                  <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                    {notes.map((n) => (
                      <li
                        key={n.id}
                        className="rounded-lg bg-slate-900/70 border border-slate-700 px-2 py-1"
                      >
                        {n.content}
                      </li>
                    ))}
                    {notes.length === 0 && (
                      <li className="text-slate-500 text-[11px]">No notes yet.</li>
                    )}
                  </ul>
                  <NoteForm
                    entityId={selectedEntity.id}
                    onCreated={(note) => setNotes((prev) => [note, ...prev])}
                  />
                </div>
              ) : (
                <p className="text-slate-500 text-[11px]">Select a node to see details.</p>
              )}
            </div>
          </aside>
        </div>
        {entityModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <div className="glass-panel w-full max-w-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-100">New entity</h2>
                <button
                  onClick={() => setEntityModalOpen(false)}
                  className="text-slate-400 hover:text-slate-100 text-lg leading-none"
                >
                  ✕
                </button>
              </div>
              <EntityForm
                onSaved={(created) => {
                  setEntities([...entities, created]);
                  setEntityModalOpen(false);
                  reload();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
