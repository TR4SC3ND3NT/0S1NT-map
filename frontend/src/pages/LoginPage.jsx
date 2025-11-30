import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import ResetPasswordForm from '../components/ResetPasswordForm.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="glass-panel max-w-md w-full p-6 space-y-4">
        <h1 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
          🕸️ OSINT Map
        </h1>
        <p className="text-xs text-slate-300">
          Sign in to explore and map relationships between OSINT entities.
        </p>
        <LoginForm onSuccess={() => navigate('/map', { replace: true })} />
        <ResetPasswordForm />
        <p className="text-[11px] text-slate-400">
          No account?
          <Link to="/register" className="text-accent ml-1 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
