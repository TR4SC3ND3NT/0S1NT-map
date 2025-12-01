import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  function linkClasses(path) {
    const active =
      location.pathname === path ||
      location.pathname.startsWith(path + '/');
    return `px-2 py-1 rounded-lg text-xs ${
      active
        ? 'bg-cyan-500/20 text-cyan-300'
        : 'text-slate-300 hover:bg-slate-800'
    }`;
  }

  return (
    <header className="glass-panel flex items-center justify-between px-4 py-2 mb-4">
      <Link to="/map" className="flex items-center gap-2">
        <span className="text-lg">🕸️</span>
        <span className="text-sm font-semibold tracking-wide">
          OSINT Map
        </span>
      </Link>
      <nav className="flex items-center gap-3">
        <Link to="/map" className={linkClasses('/map')}>
          Map
        </Link>
        <Link to="/dashboard" className={linkClasses('/dashboard')}>
          Dashboard
        </Link>
        <Link to="/settings" className={linkClasses('/settings')}>
          Settings
        </Link>
      </nav>
      <div className="flex items-center gap-2 text-xs">
        {user && <span className="text-slate-300">{user.email}</span>}
        <button
          type="button"
          onClick={handleLogout}
          className="px-3 py-1 rounded-xl border border-slate-600 text-slate-100 hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
