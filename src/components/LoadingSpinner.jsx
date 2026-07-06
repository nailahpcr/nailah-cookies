export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-2">
      <div className="w-8 h-8 border-4 border-red-100 border-t-red-700 rounded-full animate-spin"></div>
      <p className="text-xs font-bold text-slate-400">Memuat data panel...</p>
    </div>
  );
}