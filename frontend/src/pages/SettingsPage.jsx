import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../hooks/useAuth.js';

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen px-4 py-3 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="glass-panel p-5 text-sm space-y-3">
          <h2 className="text-base font-semibold text-slate-50">Settings</h2>
          <div className="text-xs text-slate-300 space-y-1">
            <p>User: {user?.email}</p>
            <p>Theme: Dark</p>
          </div>
        </div>
      </div>
    </div>
  );
}
