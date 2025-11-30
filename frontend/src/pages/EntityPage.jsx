import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { useMap } from '../hooks/useMap.js';

export default function EntityPage() {
  const { id } = useParams();
  const { entities } = useMap();
  const entity = entities.find((e) => e.id === id);

  return (
    <div className="min-h-screen px-4 py-3 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="glass-panel p-5 text-sm">
          {entity ? (
            <>
              <h2 className="text-base font-semibold text-slate-50 mb-2">{entity.name}</h2>
              <p className="text-xs text-slate-400 mb-3">Type: {entity.type}</p>
              <p className="text-slate-200 text-sm">
                {entity.description || 'No description available.'}
              </p>
            </>
          ) : (
            <p className="text-slate-400">Entity not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
