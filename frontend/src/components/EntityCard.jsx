export default function EntityCard({ entity, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex flex-col items-start gap-1 rounded-xl border px-3 py-2 text-left text-xs transition ${
        selected
          ? 'border-accent bg-slate-900/80'
          : 'border-slate-700 bg-slate-900/50 hover:bg-slate-900/80'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <span className="font-semibold text-slate-100 truncate max-w-[160px]">{entity.name}</span>
        <span className="inline-flex items-center rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] font-semibold text-slate-200 border border-slate-700">
          {entity.type}
        </span>
      </div>
      {entity.description && (
        <p className="text-[11px] text-slate-400 line-clamp-2">{entity.description}</p>
      )}
    </button>
  );
}
