import { MdErrorOutline } from "react-icons/md";

export default function StockAlert({ item, currentStock }) {
  return (
    <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-700">
      <MdErrorOutline size={20} className="shrink-0" />
      <div className="text-sm font-medium">
        Stok <span className="font-black">{item}</span> sisa <span className="underline font-bold">{currentStock}</span> unit! Segera lakukan restock.
      </div>
    </div>
  );
}