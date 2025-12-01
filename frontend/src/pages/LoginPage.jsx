import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';

export default function LoginPage() {
  const navigate = useNavigate();

  function handleSuccess() {
    navigate('/map', { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Sign in to 0S1NT-map</h1>
          <p className="text-sm text-slate-400">
            Map-driven OSINT workspace
          </p>
        </div>
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 px-6 py-5 backdrop-blur">
          <LoginForm onSuccess={handleSuccess} />
        </div>
        <p className="text-center text-xs text-slate-400">
          No account yet?{' '}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
