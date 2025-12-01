import { useState } from 'react';
import { login } from '../services/authService.js';
import { useAuth } from '../hooks/useAuth.js';

export default function LoginForm({ onSuccess }) {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      setAuth(data.user, data.token);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to sign in';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-500/10 border border-red-500/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}
      <div className="space-y-1">
        <label className="block text-xs font-medium text-slate-300">
          Email
        </label>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-xs font-medium text-slate-300">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
