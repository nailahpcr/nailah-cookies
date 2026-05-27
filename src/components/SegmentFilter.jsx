export default function SegmentFilter({ options, activeSegment, onSelect }) {
  return (
    <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-xl w-fit">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
            activeSegment === opt
              ? "bg-[#4880FF] text-white shadow-sm" // Warna diselaraskan dengan Figma Utama
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}