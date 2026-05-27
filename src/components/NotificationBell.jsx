export default function NotificationBell() {
  return (
    <button className="relative p-2 text-textMuted hover:text-primary transition-colors focus:outline-none">
      <span className="text-2xl">🔔</span>
      {/* Red dot indicator */}
      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-surface"></span>
    </button>
  );
}