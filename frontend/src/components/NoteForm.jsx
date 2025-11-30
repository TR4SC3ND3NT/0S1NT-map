import { useState } from 'react';
import { createNote } from '../services/noteService.js';

export default function NoteForm({ entityId, onCreated }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const note = await createNote({ content, entityId });
      setContent('');
      onCreated(note);
    } catch {
      alert('Failed to create note');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 mt-3">
      <label className="flex flex-col gap-1 text-xs text-slate-300">
        <span>New note</span>
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="rounded-xl bg-slate-900/70 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-600 text-slate-100 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60"
      >
        {loading ? 'Saving...' : 'Add note'}
      </button>
    </form>
  );
}
