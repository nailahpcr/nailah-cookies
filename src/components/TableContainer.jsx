export default function TableContainer({ children }) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {children}
        </table>
      </div>
    </div>
  );
}