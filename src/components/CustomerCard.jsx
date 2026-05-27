export default function CustomerCard({ name, email, joinDate }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
      <h4 className="font-bold text-slate-800 text-base">{name}</h4>
      <p className="text-xs text-slate-400 mb-3">{email}</p>
      <div className="border-t border-slate-50 pt-3 text-[11px] text-slate-400">
        Bergabung: <span className="font-semibold text-slate-600">{joinDate}</span>
      </div>
    </div>
  );
}