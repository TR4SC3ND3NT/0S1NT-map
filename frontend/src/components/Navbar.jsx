import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Navbar() {
  const { user, clear } = useAuth();
  const location = useLocation();
  return (
    <header className="glass-panel flex items-center justify-between px-4 py-2 mb-4">
      <Link to="/map" className="flex items-center gap-2">
        <span className="text-lg">🕸️</span>
        <span className="text-sm font-semibold tracking-wide">OSINT Map</span>
      </Link>
      <nav className="flex items-center gap-3 text-xs">
        <Link
          to="/dashboard"
          className={`px-2 py-1 rounded-lg ${
            location.pathname.startsWith('/dashboard') ? 'bg-slate-800' : 'hover:bg-slate-900/80'
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/map"
          className={`px-2 py-1 rounded-lg ${
            location.pathname.startsWith('/map') ? 'bg-slate-800' : 'hover:bg-slate-900/80'
          }`}
        >
          Map
        </Link>
        <Link
          to="/settings"
          className={`px-2 py-1 rounded-lg ${
            location.pathname.startsWith('/settings') ? 'bg-slate-800' : 'hover:bg-slate-900/80'
          }`}
        >
          Settings
        </Link>
      </nav>
      <div className="flex items-center gap-2 text-xs">
        {user && <span className="text-slate-300">{user.email}</span>}
        <button
          onClick={clear}
          className="px-3 py-1 rounded-xl border border-slate-600 text-slate-100 text-xs hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
