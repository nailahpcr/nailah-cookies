export default function StatCard({ title, value, icon, trend, trendType }) {
  const isUp = trendType === 'up';

  return (
    <div className="bg-surface rounded-xl p-6 border border-border flex flex-col gap-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-textMuted font-semibold text-sm">{title}</p>
          <h3 className="text-3xl font-extrabold text-textMain mt-1">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
      <p className={`text-sm font-semibold flex items-center gap-1 ${isUp ? 'text-success' : 'text-danger'}`}>
        <span>{isUp ? '↑' : '↓'}</span> {trend}
      </p>
    </div>
  );
}