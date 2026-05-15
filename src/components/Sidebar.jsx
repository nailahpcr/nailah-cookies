import React from "react";
import { NavLink } from "react-router-dom";
// Gunakan MdReceipt, karena MdReceiptText seringkali tidak ada di library
import { 
  MdDashboard, 
  MdGroup, 
  MdReceipt, 
  MdLogout 
} from "react-icons/md";

const menuItems = [
  { icon: MdDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MdGroup, label: "Customer", path: "/customers" },
  { icon: MdReceipt, label: "Transaksi", path: "/transactions" }, // Pastikan icon ini ada di import atas
];

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive ? "bg-red-700 text-white" : "text-slate-600 hover:bg-red-50"
    }`;

  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-6 text-2xl font-black text-slate-800">
        Cendekia<span className="text-red-700">.</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={linkClasses}>
            <item.icon size={22} />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}