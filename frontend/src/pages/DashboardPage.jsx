import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../hooks/useAuth.js';

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen px-4 py-3 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="glass-panel p-5 text-sm">
          <h2 className="text-base font-semibold mb-2 text-slate-50">Welcome back</h2>
          <p className="text-slate-300">
            {user ? user.email : 'Investigate and map data using graph-based OSINT analysis.'}
          </p>
        </div>
      </div>
    </div>
  );
}
