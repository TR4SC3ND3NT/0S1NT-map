import { useState } from 'react';
import { createEntity, updateEntity } from '../services/entityService.js';

const types = ['person', 'domain', 'email', 'phone', 'organization', 'ip', 'address', 'other'];

export default function EntityForm({ initial, onSaved }) {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || 'person');
  const [description, setDescription] = useState(initial?.description || '');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name, type, description: description || null };
      const entity = initial ? await updateEntity(initial.id, payload) : await createEntity(payload);
      onSaved(entity);
    } catch {
      alert('Failed to save entity');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-xs text-slate-300">
        <span>Name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-slate-300">
        <span>Type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs text-slate-300">
        <span>Description</span>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 rounded-xl bg-accent text-slate-900 text-sm font-semibold shadow-glass disabled:opacity-60"
      >
        {loading ? 'Saving...' : 'Save entity'}
      </button>
    </form>
  );
}
