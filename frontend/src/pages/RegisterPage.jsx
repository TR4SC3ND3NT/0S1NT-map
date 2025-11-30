import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="glass-panel max-w-md w-full p-6 space-y-4">
        <h1 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
          🕸️ OSINT Map
        </h1>
        <p className="text-xs text-slate-300">
          Create an account to start building your investigation graphs.
        </p>
        <RegisterForm onSuccess={() => navigate('/map', { replace: true })} />
        <p className="text-[11px] text-slate-400">
          Already have an account?
          <Link to="/login" className="text-accent ml-1 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
