import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();

  function handleSuccess() {
    navigate('/map', { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="text-sm text-slate-400">
            Start exploring entities on the map
          </p>
        </div>
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 px-6 py-5 backdrop-blur">
          <RegisterForm onSuccess={handleSuccess} />
        </div>
        <p className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
