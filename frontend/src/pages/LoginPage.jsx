import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import authService from '../services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log("Sending login request...", formData);
      const data = await authService.login(formData);
      console.log("Login response:", data);
      
      if (data && data.token) {
        setAuth(data.user, data.token);
        localStorage.setItem('token', data.token); // Дублируем для надежности
        navigate('/map');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-cyan-400">Sign In</h1>
        
        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 text-red-200 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-500 rounded font-bold text-white transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <div className="text-center text-sm text-slate-500">
          No account yet? <Link to="/register" className="text-cyan-400 hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  );
}