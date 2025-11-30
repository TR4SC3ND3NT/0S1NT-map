import { useEntityStore } from '../store/useEntityStore.js';

const types = [
  { label: 'All', value: 'all' },
  { label: 'Person', value: 'person' },
  { label: 'Domain', value: 'domain' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Org', value: 'organization' },
  { label: 'IP', value: 'ip' }
];

export default function Sidebar() {
  const filterType = useEntityStore((s) => s.filterType);
  const setFilterType = useEntityStore((s) => s.setFilterType);
  const search = useEntityStore((s) => s.search);
  const setSearch = useEntityStore((s) => s.setSearch);

  return (
    <aside className="glass-panel h-full flex flex-col gap-4 p-4 text-xs min-w-[230px] max-w-xs">
      <div>
        <h3 className="text-slate-200 font-semibold mb-2 text-xs">Filter entities</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilterType(t.value)}
              className={`rounded-full px-2 py-1 border text-[11px] ${
                filterType === t.value
                  ? 'bg-accent/90 border-accent text-slate-900'
                  : 'bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="flex flex-col gap-1 text-xs text-slate-300">
          <span>Search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, description..."
            className="w-full rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </label>
      </div>
      <div className="mt-auto text-[11px] text-slate-500">
        Shift + drag to pan, scroll to zoom.
      </div>
    </aside>
  );
}
