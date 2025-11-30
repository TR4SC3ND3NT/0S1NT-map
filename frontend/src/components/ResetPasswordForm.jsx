import { useState } from 'react';
import { forgotPassword } from '../services/authService.js';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      alert('If the email exists, reset instructions were sent');
    } catch {
      alert('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-3">
      <label className="flex flex-col gap-1 text-xs text-slate-300">
        <span>Email for password reset</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-600 text-slate-100 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60"
      >
        {loading ? 'Sending...' : 'Send reset link'}
      </button>
    </form>
  );
}
