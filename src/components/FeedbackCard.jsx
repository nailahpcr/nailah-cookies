import { MdStar } from "react-icons/md";

export default function FeedbackCard({ user, rating, comment }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm text-slate-800">{user}</span>
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <MdStar key={i} className={i < rating ? "text-amber-400" : "text-slate-200"} size={16} />
          ))}
        </div>
      </div>
      <p className="text-slate-600 text-xs italic leading-relaxed">"{comment}"</p>
    </div>
  );
}