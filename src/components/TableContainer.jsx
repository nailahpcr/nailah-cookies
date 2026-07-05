import React from "react";

export default function TableContainer({ children }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {children}
    </div>
  );
}