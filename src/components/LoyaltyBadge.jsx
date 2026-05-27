import { MdStars } from "react-icons/md";

export default function LoyaltyBadge({ points = 0 }) {
  const getTier = (pts) => {
    if (pts >= 1000) return { label: 'Platinum', color: 'bg-slate-800 text-slate-100 border-slate-700' };
    if (pts >= 500)  return { label: 'Gold', color: 'bg-amber-50 text-amber-600 border-amber-200' };
    return { label: 'Silver', color: 'bg-gray-100 text-gray-600 border-gray-200' };
  };

  const tier = getTier(points);

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tier.color}`}>
      <MdStars size={16} />
      {tier.label} ({points} pts)
    </span>
  );
}