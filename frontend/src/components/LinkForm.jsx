import { useState } from 'react';
import { createLink } from '../services/linkService.js';

export default function LinkForm({ source, target, onCreated }) {
  const [type, setType] = useState('connected_to');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createLink({
        type,
        description: description || undefined,
        sourceId: source.id,
        targetId: target.id
      });
      onCreated();
    } catch {
      alert('Failed to create link');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 text-xs">
      <p className="text-slate-300">
        Linking <span className="font-semibold">{source.name}</span> ↔{' '}
        <span className="font-semibold">{target.name}</span>
      </p>
      <label className="flex flex-col gap-1 text-xs text-slate-300">
        <span>Relationship type</span>
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-slate-300">
        <span>Description (optional)</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 rounded-xl bg-accent text-slate-900 text-sm font-semibold shadow-glass disabled:opacity-60"
      >
        {loading ? 'Creating...' : 'Create link'}
      </button>
    </form>
  );
}
