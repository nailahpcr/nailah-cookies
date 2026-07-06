import React from "react";

export default function SegmentFilter({ options, activeSegment, onSelect }) {
  return (
    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 overflow-x-auto max-w-full whitespace-nowrap scrollbar-none">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
            activeSegment === option
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}